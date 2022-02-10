import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        // domManager.clearContent(`.board-column-content[status-new-id="${boardId}"]`);
        // domManager.clearContent(`.board-column-content[status-progress-id="${boardId}"]`);
        // domManager.clearContent(`.board-column-content[status-testing-id="${boardId}"]`);
        // domManager.clearContent(`.board-column-content[status-done-id="${boardId}"]`);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            // console.log(card.status_id, ' ',card.title)
            // domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            let parent;
            parent = `.board-column-content[status-id="${card.status_id}"]`

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
