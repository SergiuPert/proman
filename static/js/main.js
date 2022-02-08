import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
}

init();


//
// async function apiGet(url) {
//     let response = await fetch(url);
//     if (response.ok) {
//         let data = await response.json();
//         return data;
//     }
// }
//
// async function apiPost(url, payload) {
//     let response = await fetch(url, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
//     if (response.ok) {
//         let data = await response.json();
//         // console.log(data)
//         return data;
//     }
// }
//
// async function apiDelete(url, payload) {
//     let response = await fetch(url, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
//     if (response.ok) {
//         let data = await response.json();
//         return data;
//     }
// }
//
// async function apiPut(url, payload) {
//     let response = await fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//     });
//     if (response.ok) {
//         let data = await response.json();
//         return data;
//     }
// }
//
// async function get_boards() {
//     let boards = await apiGet("/api/boards");
//     // console.log(boards);
//     let boardsDiv = document.getElementById("boards_div");
//     for(let index=0; index < boards.length; index++) {
//         console.log(boards[index])
//         boardsDiv.innerHTML += `
//         <div class="board">
//             <h1>${boards[index].title}</h1>
//
//         </div>
//     `;
//     }
// }
//
//
// async function get_cards() {
//
// }
//
//
//
// async function init_page() {
//     await get_boards();
// }
//
//
// await init_page();