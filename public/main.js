// import apiRoutes.js
// import cors https://www.npmjs.com/package/cors

// https://wesbos.com/javascript/05-events/prevent-default-and-form-events


window.addEventListener('DOMContentLoaded', (event) =>{
    init();
    console.log('DOM fully loaded and parsed');
})


const interactiveElements = {
    gameSearch: `#gameSearch`,
    addNewValBtn: `#addNewVal`,
    searchAllBtn: `#searchAllBtn`
}

const iElem = interactiveElements;


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
    iElem.gameSearch.addEventListener('click', (event) => {
        const userSearch = document.querySelector('#userSearch').value
        let url = `http://localhost:3000/api/game`

        console.log('single search click', userSearch)

        if(userSearch.value !== ''){
            console.log(`user search is empty: `, userSearch)
            url = `http://localhost:3000/api/game/${userSearch}`
        }
        getData(url);
    });

    iElem.searchAllBtn.addEventListener('click', (event) =>{
        console.log('searchAll click', userSearch)
        let url = `http://localhost:3000/api/game`
        getData(url);

    })
}



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



