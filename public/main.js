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
    searchAllBtn: `#searchAllBtn`
}

const iElem = interactiveElements;
let apiURL = `http://localhost:3000/api/game`;

function init(){
    initQselectors()
    initEventListeners();
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
        const data = await getData(apiURL);
        renderData(data);
    });

    iElem.searchAllBtn.addEventListener('click', async () => {
        console.log('searchAll click')
        const data = await getData(apiURL);
        renderData(data);

    })

    iElem.addNewValBtn.addEventListener('click', async () => {
        const userInputObj = {
            gameName: document.querySelector('#gameName').value,
            developer: document.querySelector('#developerName').value,
            gameShopId: document.querySelector('#gameShopId').value
        }
        
        console.log('addNewValBtn clicked', gameName, developerName, gameShopId)

        const data = await insertData(apiURL, userInputObj);
        renderData(data);
    });
}

//  ------------------------------------------------------- UTIL FUNCTIONS

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

function renderData(arr){
    console.log(arr)
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
        </div>
        <br><br>
        `
    });

    contentsCtn.innerHTML= contentsHTML;
    
}




