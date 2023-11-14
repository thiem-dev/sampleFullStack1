/* TODO:
    - try bootstrap for styling
*/


window.addEventListener('DOMContentLoaded', (event) =>{
    init();
    console.log('DOM fully loaded and parsed');
})


const interactiveElements = {
    gameSearch: `#gameSearch`,
    addNewValBtn: `#addNewValBtn`,
    searchAllBtn: `#searchAllBtn`,
    modalCloseBtn: `#closeBtn-mdl`
}

//todo save data retrived from db in a variable for callback

const iElem = interactiveElements;
let apiURL = `http://localhost:3000/api/game`;
let gameData = [];

async function init(){
    initQselectors()
    initEventListeners();
    initCardListeners();

    gameData = await getData(apiURL);
    renderData(gameData);
}

function initQselectors(){
    for(let [elem, selector] of Object.entries(iElem)){
        iElem[elem] = document.querySelector(selector)
    }
}

function initEventListeners(){
    iElem.gameSearch.addEventListener('click', async () => {
        const userSearch = document.querySelector('#userSearch').value

        console.log('single search click', userSearch)

        if(userSearch.value !== ''){
            console.log(`user search is empty: `, userSearch)
            apiURL = `http://localhost:3000/api/game/${userSearch}`
        }
        gameData = await getData(apiURL);
        renderData(gameData);
    });

    iElem.searchAllBtn.addEventListener('click', async () => {
        console.log('searchAll click')
        const gameData = await getData(apiURL);
        renderData(gameData);

    })

    iElem.addNewValBtn.addEventListener('click', async () => {
        const userInputObj = {
            gameName: document.querySelector('#gameName').value,
            developer: document.querySelector('#developerName').value,
            gameShopId: document.querySelector('#gameShopId').value
        }
        
        console.log('addNewValBtn clicked', gameName, developerName, gameShopId)

        const gameData = await insertData(apiURL, userInputObj);
        renderData(gameData);
    });

    iElem.modalCloseBtn.addEventListener('click', () => {
        const modalCtn = document.querySelector('.modal-ctn')
        modalCtn.classList.add('hide')
    })
}


//  ------------------------------------------------------- API ROUTE FUNCTIONS
async function getData(url){
    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('GET success', data)
        return data;
    } catch(error) {
        console.error('Error during POST request:', error);
    }
}

async function insertData(url, obj){
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //include other headers?
            },
            body: JSON.stringify(obj)
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        data = await response.json();
        console.log('POST request SUCCESS:', data)
        return data;
    } catch (error){
        console.error('ERROR during POST request:', error);
    }
}

async function updateData(url, obj){
    try{
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                //include other headers?
            },
            body: JSON.stringify(obj)
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        data = await response.json();
        console.log('PUT request SUCCESS:', data)
        // return data;
    } catch (error){
        console.error('ERROR during POST request:', error);
    }
}

async function deleteData(url){
    try{
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        data = await response.json();
        console.log('DELETE request SUCCESS:', data)
        // return data;
    } catch (error){
        console.error('ERROR during POST request:', error);
    }
}

//  ------------------------------------------------------- UTIL FUNCTIONS

function renderData(arr){
    // console.log(arr)
    const contentsCtn = document.querySelector('#data-contents');
    contentsCtn.innerHTML=``; //empty out container

    let contentsHTML = ``;

    contentsHTML += `<h2>Search/Input Results here</h2>`;
    arr.forEach((game,index) => {
        contentsHTML +=`
        <div class="gameCard" id="gameId${game.id}">
            <div class="gameId">GameId: ${game.id}</div>
            <div class="title">${game.name}</div>
            <div class="developer">${game.developer}</div>
            <div class="shopLocation">ShopLocation: ${game.gameshop_id}</div>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </div>
        <br><br>
        `
    });

    contentsCtn.innerHTML= contentsHTML;
    initCardListeners();
}

function initCardListeners(){
    const editBtnsElements = document.querySelectorAll('.editBtn')
    const deleteBtnElements = document.querySelectorAll('.deleteBtn')

    editBtnsElements.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // console.log(e.target.parentElement.id)
            const id = String(e.target.parentElement.id).split('gameId')[1]
            renderModal(id)
            console.log(id)
        })
    })
}

async function renderModal(gameId){
    // if(gameData.length === 0){
    //     gameData = getData;
    // }
    gameArrIndex = gameId - 1; //db counts from 1;

    const game = gameData[gameArrIndex]
    const modalCtn = document.querySelector('.modal-ctn')
    modalCtn.innerHTML=`` //empty the contents
    modalCtn.classList.remove('hide')

    let modalHTML = `
            <div class="modal-content rounded-4 shadow">
                <div class="modal-body p-5">
                <button id="closeBtn-mdl">X</button>
                  <h2 class="fw-bold mb-0">Edit: ${game.name}?</h2>
                  <label>Game Name</label>
                  <input type="text" id="gameName-mdl" name="gameName" value='${game.name}'><br>
                  <label>Developer Name</label>
                  <input type="text" id="developerName-mdl" name="developerName" value='${game.developer}'><br>
                  <label>GameShop Location by ID</label>
                  <input type="number" id="gameShopId-mdl" name="gameShopId" value='${game.gameshop_id}'><br>
                  <button id="editBtn-mdl">Finish Edit</button>
                </div>
              </div>
              `
    
    modalCtn.innerHTML = modalHTML;

    const editBtnMdl = document.querySelector('#editBtn-mdl')

    editBtnMdl.addEventListener('click', (e) => {
        const userInputObj = {
            gameName: document.querySelector('#gameName-mdl').value,
            developer: document.querySelector('#developerName-mdl').value,
            gameShopId: document.querySelector('#gameShopId-mdl').value
        }

        apiURL += `/${gameId}`
        console.log('put',apiURL)
        updateData(apiURL, userInputObj)
    })

    const modalCloseBtn = document.querySelector('#closeBtn-mdl')
    
    modalCloseBtn.addEventListener('click', () => {
        const modalCtn = document.querySelector('.modal-ctn')
        modalCtn.classList.add('hide')
    })
}




