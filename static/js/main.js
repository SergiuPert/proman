import {boardsManager} from "./controller/boardsManager.js";
// import {apiPut}  from "./data/dataHandler.js"


function login(){
    let divRoot = document.getElementById('root');
    divRoot.innerHTML = ` <div id="login-div">
                          <input placeholder="username" type="text" name="username" id="username" class="login-input">
                          <input placeholder="password" type="password" name="password" id="password" class="login-input">
                          <button id="login-button"> LOGin </button>
                          </div>`;
     divRoot.style.visibility = 'visible'
    let buttonLogin = document.getElementById('button-login');
    buttonLogin.addEventListener('click', async ev => {
            let message;
            await apiPut('/api/user', {
                'username': document.getElementById('username').innerText,
                'password': document.getElementById('password').innerText
            }).then(result => {
                message=result.attempt;
            });
            if(message === 'Connected'){
                divRoot.innerHTML = '';
                divRoot.style.visibility = 'hidden'
            }
            else if(message === 'Incorrect password' ){
                let loginDiv = document.getElementById('login-div')
                loginDiv.innerHTML = `<h1 style="color: red"> ${message}</h1>`+ loginDiv.innerHTML
            }
            else if(message === 'Incorrect username' ){
                let loginDiv = document.getElementById('login-div')
                loginDiv.innerHTML = `<h1 style="color: red"> ${message}</h1>`+ loginDiv.innerHTML
            }
        }
    )
}


//dragging
const dom = {
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

const ui = {
    slots: null,
    cards: null,
};

const game = {
    dragged: null,
};

function update_ui() {
    ui.cards = document.querySelectorAll(".card");
    ui.slots = document.querySelectorAll(".board-column");
    console.log(ui.cards)
    console.log(ui.slots)
    initDragEvents();
}

function initDragEvents() {
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

    ui.slots.forEach(function (slot) {
        initDropzone(slot);
    });
}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
    game.dragged = e.currentTarget;
}

function handleDragEnd() {
    game.dragged = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
}

function handleDragLeave(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);
    if (dom.hasClass(dropzone, "board-column")) {
        dropzone.appendChild(game.dragged);
    }
}


function init() {
    boardsManager.loadBoards();
    setTimeout(update_ui, 1000);
}
init();