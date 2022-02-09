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
    return `
        <section class="board" data-board-id=${board.id}>
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
<!--                // <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>-->
            </div>
            <div class="board-columns">
                <div class="board-column">
                    <div class="board-column-title"><h2>New</h2></div>
                    <div class="board-column-content" status-new-id=${board.id}></div>
                </div>
                <div class="board-column" >
                    <div class="board-column-title"><h2>In Progress</h2></div>
                    <div class="board-column-content" status-progress-id=${board.id}></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title"><h2>Testing</h2></div>
                    <div class="board-column-content" status-testing-id=${board.id}></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title"><h2>Done</h2></div>
                    <div class="board-column-content" status-done-id=${board.id}></div>
                </div>
            </div>
        </section>
    `;
}

function cardBuilder(card) {
    return `
            <div class="card" data-card-id="${card.id}">
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title">${card.title}</div>
            </div>
    `;
}