const NEXT_LINK_ELEMENT_SELECTOR = 'div.nawigacja_prawa a';
const EPISODE_LIST_ELEMENT_SELECTOR = 'tr.lista_hover';

(async () => {
    const nextLinkElement = document.querySelector(NEXT_LINK_ELEMENT_SELECTOR);

    if (!nextLinkElement) {
        return;
    }

    const {samePlayer, firstAvailablePlayer} = await chrome.storage.local.get();
    const playerNameParam = getUrlParam('player');
    let episodeLink;

    document.querySelectorAll(EPISODE_LIST_ELEMENT_SELECTOR).forEach((row, index, rows) => {
        const [, , playerNameElement, , playerLinkElement] = row.children;
        const playerLinkText = playerLinkElement.textContent;
        const playerId = playerLinkElement.firstElementChild.getAttribute('rel');
        const playerName = playerNameElement.textContent;

        const anchor = this.createPlayerLinkElement(
            playerId,
            nextLinkElement.href,
            samePlayer,
            playerName,
            playerLinkText
        );
        playerLinkElement.appendChild(anchor);
        playerLinkElement.firstChild.remove();

        if (firstAvailablePlayer && playerNameParam && index === 0) {
            episodeLink = anchor.href;
        }

        if (samePlayer && playerName === playerNameParam) {
            episodeLink = anchor.href;
        }
    });

    if (episodeLink) {
        navigateToPlayer(episodeLink);
    }
})();

function getUrlParam(param) {
    return new URLSearchParams(window.location.search).get(param);
}

function createPlayerLinkElement(playerId, nextEpisodeLink, samePlayer, playerName, playerLinkText) {
    const anchor = document.createElement('a');
    const nextParam = `?next=${nextEpisodeLink}`;
    const playerParam = samePlayer ? `&player=${playerName}` : '';

    anchor.href = `odtwarzacz-${playerId}.html${nextParam}${playerParam}`;
    anchor.innerHTML = playerLinkText;

    return anchor;
}

function navigateToPlayer(url) {
    window.history.replaceState(null, null, window.location.pathname);
    window.location.assign(url);
}
