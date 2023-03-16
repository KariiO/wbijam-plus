const NAV_PANEL_ELEMENT_SELECTOR = 'div.nawigacja.center';

(async () => {
    const nextLinkParam = getUrlParam('next');

    if (!nextLinkParam) {
        return;
    }

    const playerParam = getUrlParam('player');
    const navPanelElement = document.querySelector(NAV_PANEL_ELEMENT_SELECTOR);
    const anchor = createNextEpisodeLinkElement(nextLinkParam, playerParam);

    navPanelElement.appendChild(anchor);
    navPanelElement.style.display = 'flex';
    navPanelElement.style.justifyContent = 'space-between';
})();

function getUrlParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

function createNextEpisodeLinkElement(nextLinkParam, playerName) {
    const anchor = document.createElement('a');
    const playerParam = playerName ? `?player=${playerName}` : '';

    anchor.href = `${nextLinkParam}${playerParam}`;
    anchor.innerHTML = 'NASTĘPNY -->';

    return anchor;
}
