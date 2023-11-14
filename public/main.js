// import apiRoutes.js
// import cors https://www.npmjs.com/package/cors

// https://wesbos.com/javascript/05-events/prevent-default-and-form-events


window.addEventListener('DOMContentLoaded', (event) =>{
    init();
    console.log('DOM fully loaded and parsed');
})


const interactiveElements = {
    userForm: `#userForm`,
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
    iElem.userForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // const fname = document.querySelector('#fname').value;
        // const lname = document.querySelector('#lname').value;

        var urlParams = new URLSearchParams(window.location.search);
        var fname = urlParams.get('fname');
        var lname = urlParams.get('lname');


        

        console.log(urlParams)
        console.log('fname', fname);
        console.log('lname', lname);
    });
}



