import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        let divContent = ``;
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const statuses= await dataHandler.getStatuses(board.id);
            // console.log('statuses ', statuses)
            const columnBuilder = htmlFactory(htmlTemplates.columns);
            const columns = columnBuilder(board, statuses)
            const content = boardBuilder(board, columns);
            domManager.addChild("#root", content);
            // divContent+=content;
            // domManager.addEventListener(
            //     `.toggle-board-button[data-board-id="${board.id}"]`,
            //     "click",
            //     showHideButtonHandler
            // );
            await showHideButtonHandler(board.id)
        }
        // console.log(divContent)
        // return divContent;
    },
};

// function showHideButtonHandler(clickEvent) {
//     const boardId = clickEvent.target.dataset.boardId;
//     console.log(boardId)
//     cardsManager.loadCards(boardId);
// }

async function showHideButtonHandler(boardId) {

    await cardsManager.loadCards(boardId);

}