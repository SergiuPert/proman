import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const columnBuilder = htmlFactory(htmlTemplates.columns);
            const content = boardBuilder(board);
            console.log(boards)
            console.log(board)
            console.log(boardBuilder)
            console.log(content)
            domManager.addChild("#root", content);
            // domManager.addEventListener(
            //     `.toggle-board-button[data-board-id="${board.id}"]`,
            //     "click",
            //     showHideButtonHandler
            // );
            showHideButtonHandler(board.id)
        }
    },
};

// function showHideButtonHandler(clickEvent) {
//     const boardId = clickEvent.target.dataset.boardId;
//     console.log(boardId)
//     cardsManager.loadCards(boardId);
// }

function showHideButtonHandler(boardId) {
    cardsManager.loadCards(boardId);
}