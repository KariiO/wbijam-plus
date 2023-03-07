const playerLinks = document.querySelectorAll('span.odtwarzacz_link');
const nextLink = document.querySelector('div.nawigacja_prawa a');

if (nextLink) {
    playerLinks.forEach(playerLink => {
        const text = playerLink.textContent;
        const rel = playerLink.getAttribute('rel');

        const anchor = document.createElement('a');
        anchor.href = `odtwarzacz-${rel}.html?next=${nextLink.href}`;
        anchor.innerHTML = text;
        playerLink.parentElement.appendChild(anchor);
        playerLink.remove();
    });
}
