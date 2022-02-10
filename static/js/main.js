import {boardsManager} from "./controller/boardsManager.js";
import {apiPut, apiDelete, apiPost, apiGet, dataHandler} from "./data/dataHandler.js"

function showLoginMessageError(message){
        let loginDiv = document.getElementById('login-div');
        let messageH = document.getElementById('message');
        if(messageH){
            loginDiv.removeChild(messageH)
        }
        loginDiv.innerHTML = message + loginDiv.innerHTML
        let buttonLogin = document.getElementById('button-login-form');
        buttonLogin.addEventListener('click', loginFunction);
        let buttonCancel =  document.getElementById('cancel-button');
        buttonCancel.addEventListener('click', cancelFunction);
}
function showRegisterMessageError(message){
     let registrationDiv = document.getElementById('registration-div');
     let messageH = document.getElementById('message');
     if(messageH){
         registrationDiv.removeChild(messageH)
     }
     registrationDiv.innerHTML = message + registrationDiv.innerHTML;
     let buttonRegister = document.getElementById('registration-button');
     buttonRegister.addEventListener('click', registerFunction)
     let buttonCancel =  document.getElementById('cancel-button');
     buttonCancel.addEventListener('click', cancelFunction);
}
function changeStatusTitle(status) {
    apiPut("")
}

function updateUserButtons(){
    let buttonLogin = document.getElementById('button-login');
    let buttonRegister = document.getElementById('button-register');
    if(buttonLogin.innerText === 'LOGIN'){
        buttonLogin.removeEventListener('click', login);
        buttonRegister.removeEventListener('click', registration)}
    else{
        buttonLogin.removeEventListener('click', logout);
        buttonRegister.removeAttribute('disabled');
    }
    apiGet('/api/user').then(result=>{
        if(result.username !== ''){
            buttonLogin.innerText = 'LOGOUT';
            buttonLogin.addEventListener('click', logout);
            buttonRegister.innerText = result.username;
            buttonRegister.setAttribute('disabled', 'disabled');
        }
        else{
            buttonLogin.innerText = 'LOGIN';
            buttonLogin.addEventListener('click', login);
            buttonRegister.innerText = 'REGISTER';
            buttonRegister.addEventListener('click', registration);
        }
    })
}

async function loginFunction() {
    let message;
    console.log({
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value
    })
    await apiPost('/api/user', {
        'username': document.getElementById('username').value,
        'password': document.getElementById('password').value
    }).then(result => {
        message = result.attempt;
        // console.log(result)
    });
    // console.log(message);
    if (message === 'Connected') {
        let divRoot = document.getElementById('root-over');
        divRoot.innerHTML = '';
        divRoot.style.visibility = 'hidden';
        init();
    } else if (message === 'Incorrect password') {
        let messageNode = `<h1 id="message" style="color: red"> ${message}</h1>`
        showLoginMessageError(messageNode)
    } else if (message === 'Incorrect username') {
        let messageNode = `<h1 id="message" style="color: red"> ${message}</h1>`
        showLoginMessageError(messageNode)
    }
}

function cancelFunction(){
    let divRoot = document.getElementById('root-over')
    divRoot.style.visibility= 'hidden';
    divRoot.innerHTML = '';

    }

async function registerFunction(ev) {
    ev.preventDefault();
        let message = "Passwords does not match!";
        if (document.getElementById('password').value === document.getElementById('password-confirm').value) {
            await apiPut(
                '/api/user',
                {
                    'username': document.getElementById('username').value,
                    'password': document.getElementById('password').value
                }).then(result =>{
                    message = result.attempt;
                    // console.log(result)
            });
            if(message === 'Success!'){
                 let registrationDiv = document.getElementById('registration-div');
                 registrationDiv.innerHTML = `<h1 style="color: greenyellow"> ${message}</h1>`+ registrationDiv.innerHTML;
                 login();
            }
            else if (message === 'Username already exists!'){
                 let messageNode = `<h1 id="message" style="color: orange"> ${message}</h1>`;
                 showRegisterMessageError(messageNode)
            }
        }
        else {
            let messageNode = `<h1 id="message" style="color: red"> ${message}</h1>`;
            showRegisterMessageError(messageNode);

        }


    }

function login(){
    let divRoot = document.getElementById('root-over');
    divRoot.innerHTML = ` <div id="login-div">
                              <input autocomplete="false"  placeholder="username" type="text" name="username" id="username" class="login-input">
                              <input autocomplete="false" placeholder="password" type="password" name="password" id="password" class="login-input">
                              <div id="buttons-div">
                                   <button id="button-login-form"> LOGIN </button>
                                   <button id="cancel-button"> CANCEL </button>
                              </div>
                          </div>`;
    divRoot.style.visibility = 'visible'
    let buttonLogin = document.getElementById('button-login-form');
    buttonLogin.addEventListener('click', loginFunction);
    let buttonCancel =  document.getElementById('cancel-button');
    buttonCancel.addEventListener('click', cancelFunction);
}

function registration(){
    let divRoot = document.getElementById('root-over');
    divRoot.innerHTML = ` 
            <div id="registration-div">
                <input autocomplete="off" placeholder="username" type="text" name="username" id="username" class="registration-input">
                <input autocomplete="off" placeholder="password" type="password" name="password" id="password" class="registration-input">
                <input autocomplete="off" placeholder="password-confirm" type="password" name="password-confirm" id="password-confirm" class="login-input">
                <div id="buttons-div">
                   <button type="submit" id="registration-button"> REGISTER </button>
                   <button id="cancel-button"> CANCEL </button>
                </div>
            </div>`;
    divRoot.style.visibility = 'visible';
    let buttonRegister = document.getElementById('registration-button');
    buttonRegister.addEventListener('click', registerFunction)
    let buttonCancel =  document.getElementById('cancel-button');
    buttonCancel.addEventListener('click', cancelFunction);
}

function logout(){
    apiDelete('/api/user', {}).then(r => {init()} );
}

function addEventForStatusTitleChange() {
    let column_titles = document.getElementsByClassName("board-column-title");
    for (let column_title of column_titles){
        column_title.addEventListener('onchange',evt => {
            changeStatusTitle({
                "status_id": evt.currentTarget.getAttribute('status_id'),
                "title": evt.currentTarget.innerText
            })
        })
    }

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
    if (dom.hasClass(dropzone, "board-column")) {

        apiPut('/api/cards', {
            'status_id': dropzone.lastElementChild.getAttribute('status-id'),
            'title': game.dragged.lastElementChild.innerText,
            'card_id': game.dragged.getAttribute('data-card-id')
        }).then(e => {
            // console.log(game.dragged, 'Card updated')
        });
        dropzone.children[1].appendChild(game.dragged);
    }

}


function init_buttons() {
    let create_board_button = document.getElementById("create-board");
    create_board_button.addEventListener("click", dataHandler.createNewBoard);
    let create_card_buttons = document.querySelectorAll(".board-add");
    for (let button of create_card_buttons) {
        button.addEventListener("click", evt => dataHandler.createNewCard(button.id))
    }
    let create_status_buttons = document.querySelectorAll(".board-add-status");
    for (let button of create_status_buttons) {
        button.addEventListener("click", evt => dataHandler.createNewStatus(button.id))
    }
    let delete_card_buttons = document.querySelectorAll(".card-remove");
    for (let button of delete_card_buttons) {
        button.addEventListener("click", evt => dataHandler.deleteCard(button.id))
    }
    let delete_status_buttons = document.querySelectorAll(".status-remove");
    for (let button of delete_status_buttons) {
        button.addEventListener("click", evt => dataHandler.deleteStatus(button.id))
    }
    let delete_board_buttons = document.querySelectorAll(".board-delete");
    for (let button of delete_board_buttons) {
        button.addEventListener("click", evt => dataHandler.deleteBoard(button.id))
    }
}

let initial_content = "";

 async function init() {
     document.getElementById('root').innerHTML = ''
     await boardsManager.loadBoards();
     update_ui()
     init_buttons();
     updateUserButtons();
     initial_content = document.getElementById('root').innerText;

 }


async function cur_content() {
    let cur_content = document.getElementById('root').innerText;
    if (cur_content !== initial_content) {
        await init()
    }
}

await init();

setInterval(cur_content, 3000);





