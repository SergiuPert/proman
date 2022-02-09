import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        domManager.clearContent(`.board-column-content[status-new-id="${boardId}"]`);
        domManager.clearContent(`.board-column-content[status-progress-id="${boardId}"]`);
        domManager.clearContent(`.board-column-content[status-testing-id="${boardId}"]`);
        domManager.clearContent(`.board-column-content[status-done-id="${boardId}"]`);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            // domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            let parent;
            if (card.status_id === 1) {
                parent = `.board-column-content[status-new-id="${boardId}"]`
            } else if (card.status_id === 2) {
                parent = `.board-column-content[status-progress-id="${boardId}"]`
            } else if (card.status_id === 3) {
                parent = `.board-column-content[status-testing-id="${boardId}"]`
            } else if (card.status_id === 4) {
                parent = `.board-column-content[status-done-id="${boardId}"]`
            }
            domManager.addChild(parent, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
};

function deleteButtonHandler(clickEvent) {
    console.log("delete")
}
