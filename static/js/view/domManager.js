export let domManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.insertAdjacentHTML("beforeend", childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    addEventListener(parentIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    clearContent(parentIdentifier, heading) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.innerHTML = `<h2>${heading}</h2>`;
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
};
