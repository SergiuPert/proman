export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
};

export function htmlFactory(template) {
    switch(template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder


    }
    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container">
                <div class="board" data-board-id=${board.id}>${board.title}
                    <div class="status-div" status-new-id=${board.id}><h2>New</h2></div>
                    <div class="status-div" status-progress-id=${board.id}><h2>In Progress</h2></div>
                    <div class="status-div" status-testing-id=${board.id}><h2>Testing</h2></div>
                    <div class="status-div" status-done-id=${board.id}><h2>Done</h2></div>
                </div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

