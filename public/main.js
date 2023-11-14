
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
    iElem.gameSearch.addEventListener('click', () => {
        const userSearch = document.querySelector('#userSearch').value

        console.log('single search click', userSearch)

        if(userSearch.value !== ''){
            console.log(`user search is empty: `, userSearch)
            apiURL = `http://localhost:3000/api/game/${userSearch}`
        }
        getData(apiURL);
    });

    iElem.searchAllBtn.addEventListener('click', () => {
        console.log('searchAll click')
        getData(apiURL);

    })

    iElem.addNewValBtn.addEventListener('click', () => {
        const userInputObj = {
            gameName: document.querySelector('#gameName').value,
            developer: document.querySelector('#developerName').value,
            gameShopId: document.querySelector('#gameShopId').value
        }
        
        console.log('addNewValBtn clicked', gameName, developerName, gameShopId)

        insertData(apiURL, userInputObj);
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
    } catch (error){
        console.error('ERROR during POST request:', error);
    }
}

function renderData(data){
    const contentsHTML = document.querySelector('#data-contents');
    
}




