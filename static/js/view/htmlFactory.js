export const htmlTemplates = {
    board: 1,
    card: 2,
    columns: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.columns]: board_columns_builder
};

export function htmlFactory(template) {
    switch(template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.columns:
            return board_columns_builder
    }
    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}


function boardBuilder(board, columns) {
    return `
        <section class="board" data-board-id=${board.id}>
            <div class="board-header"><span class="board-title">${board.title}</span>
                <button class="board-add" id="${board.id}" >Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
<!--                <button class="toggle-board-button" data-board-id="${board.id}${board.id}">Show Cards</button>-->
            </div>
            ${columns}
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

function board_columns_builder(board, statuses) {
    let columns = `<div class="board-columns">`;
    for (let status of statuses) {
        console.log('status id ',status.id)
        columns += `
                <div class="board-column">
                    <div class="board-column-title" contenteditable="true">${status.title}</div>
                    <div class="board-column-content" status-id=${status.id}></div>
                </div>
            `;
    }
    columns += `</div>`
    return columns
}


// <div className="board-columns">
//     <div className="board-column">
//         <div className="board-column-title">New</div>
//         <div className="board-column-content" status-new-id=${board.id}></div>
//     </div>
//     <div className="board-column">
//         <div className="board-column-title">In Progress</div>
//         <div className="board-column-content" status-progress-id=${board.id}></div>
//     </div>
//     <div className="board-column">
//         <div className="board-column-title">Testing</div>
//         <div className="board-column-content" status-testing-id=${board.id}></div>
//     </div>
//     <div className="board-column">
//         <div className="board-column-title">Done</div>
//         <div className="board-column-content" status-done-id=${board.id}></div>
//     </div>
// </div>