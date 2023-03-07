const param = new URLSearchParams(window.location.search);
const nextLinkParam = param.get('next');
const navPanel = document.querySelector('div.nawigacja.center');

if (nextLinkParam) {
    const anchor = document.createElement('a');
    anchor.href = nextLinkParam;
    anchor.innerHTML = 'NASTĘPNY -->';
    navPanel.appendChild(anchor);
    navPanel.style.display = 'flex';
    navPanel.style.justifyContent = 'space-between';
}
