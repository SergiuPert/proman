import {boardsManager} from "./controller/boardsManager.js";
import {apiPut}  from "./data/dataHandler.js"
function init() {
    // boardsManager.loadBoards();
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


