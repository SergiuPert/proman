export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function (boardId) {
        return await apiGet(`/api/statuses/${boardId}`);
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        return await apiPost("/api/boards");
    },
    createNewCard: async function (boardId) {
        return await apiPost(`/api/boards/${boardId}/cards/`)
    },
};

export async function apiGet(url) {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        return data;
    }
}

export async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        // console.log(data)
        return data;
    }
}

export async function apiDelete(url, payload) {
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        return data;
    }
}

export async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        let data = await response.json();
        return data;
    }
}

async function apiPatch(url) {
}
