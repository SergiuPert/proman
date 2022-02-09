import {boardsManager} from "./controller/boardsManager.js";
import {apiPut}  from "./data/dataHandler.js"
function init() {
    boardsManager.loadBoards();
}

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
init();

//dragging
const dom = {
    isEmpty: function (el) {
        return el.children.length === 0;
    },
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

// function initDragAndDrop() {
//     initElements();
//     shuffleCards();
//     initDragEvents();
// }

function initElements() {
    ui.cards = document.querySelectorAll(".card");
    ui.slots = document.querySelectorAll(".board-column");
    ui.cards.forEach(function (card) {
        card.setAttribute("draggable", true);
    });
    console.log(ui)
}
    initElements();



console.log(game)
//

//
// function initDragEvents() {
//     ui.cards.forEach(function (card) {
//         initDraggable(card);
//     });
//
//     ui.slots.forEach(function (slot) {
//         initDropzone(slot);
//     });
//     initDropzone(ui.mixedCardsContainer);
// }
//
// function initDraggable(draggable) {
//     draggable.setAttribute("draggable", true);
//     draggable.addEventListener("dragstart", handleDragStart);
//     draggable.addEventListener("dragend", handleDragEnd);
// }
//
// function initDropzone(dropzone) {
//     dropzone.addEventListener("dragenter", handleDragEnter);
//     dropzone.addEventListener("dragover", handleDragOver);
//     dropzone.addEventListener("dragleave", handleDragLeave);
//     dropzone.addEventListener("drop", handleDrop);
// }
//
// function handleDragStart(e) {
//     game.dragged = e.currentTarget;
//     console.log("Drag start of", game.dragged);
// }
//
// function handleDragEnd() {
//     console.log("Drag end of", game.dragged);
//     game.dragged = null;
// }
//
// function handleDragOver(e) {
//     e.preventDefault();
// }
//
// function handleDragEnter(e) {
//     if (game.dragged.classList.contains(e.target.classList[1])) {
//         e.target.classList.add("card-slot-hover");
//     } else if (e.target.classList.contains("mixed-cards")) {
//         e.target.classList.add("card-slot-hover");
//     } else {
//         e.target.classList.add("card-slot-hover-wrong");
//     }
//
//     console.log("Drag enter of", e.currentTarget);
// }
//
// function handleDragLeave(e) {
//     e.target.classList.remove("card-slot-hover");
//     e.target.classList.remove("card-slot-hover-wrong");
//     console.log("Drag leave of", e.currentTarget);
// }
//
// function has_won() {
//     let score = 0;
//     for (let index = 0; index < ui.slots.length; index++) {
//         try {
//             if (ui.slots[index].firstChild.classList.contains(ui.slots[index].classList[2])) {
//                 // console.log(ui.slots[index].classList[2]);
//                 // console.log(ui.slots[index].child.classList[2]);
//                 score++;
//             }
//         } catch (err) {
//             return false;
//         }
//     }
//     if (score === 8) {
//         return true;
//     }
// }
//
//
//
// function handleDrop(e) {
//     e.preventDefault();
//     const dropzone = e.currentTarget;
//     console.log("Drop of", dropzone);
//     e.target.classList.remove("card-slot-hover");
//     e.target.classList.remove("card-slot-hover-wrong");
//     if (dom.hasClass(dropzone, "card-slot") && game.dragged.classList.contains(dropzone.classList[1]) ) {
//         if (dom.isEmpty(dropzone)) {
//             dropzone.appendChild(game.dragged);
//         }
//     } else if (dropzone.classList.contains("mixed-cards")) {
//         dropzone.appendChild(game.dragged)
//     }
//     if (has_won()) {
//         document.getElementById("win").style.opacity = "1";
//     } else {
//         document.getElementById("win").style.opacity = "0";
//     }
// }
//
// initDragAndDrop();