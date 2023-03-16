(async () => {
    chrome.runtime.onInstalled.addListener(() => onInstalled());

    chrome.contextMenus.onClicked.addListener((event) => {
        if (event.menuItemId === 'same-player') {
            const checked = event.checked;

            chrome.storage.local.set({samePlayer: checked, firstAvailablePlayer: checked});
            chrome.contextMenus.update('first-available-player', {enabled: checked, checked: checked});
        }

        if (event.menuItemId === 'first-available-player') {
            chrome.storage.local.set({firstAvailablePlayer: event.checked});
        }
    });
})();

function onInstalled() {
    const state = {
        samePlayer: true,
        firstAvailablePlayer: true,
    };

    chrome.contextMenus.create({
        'id': 'same-player',
        'title': 'Same player',
        'type': 'checkbox',
        'checked': state.samePlayer,
    });

    chrome.contextMenus.create({
        'id': 'first-available-player',
        'title': 'First available player',
        'type': 'checkbox',
        'checked': state.firstAvailablePlayer,
    });

    void chrome.storage.local.set(state);
}
