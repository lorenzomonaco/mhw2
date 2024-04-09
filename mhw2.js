const IMG_LOGOS = ['img/site-logos/logo.png', 'img/site-logos/old-logo.png'];
const PROMO_IMG_SRC = 'img/promo-top-section/';
const PROMO_IMG_NUM = 3;


function changeLogo() {
    const actualLogo = logoImg.getAttribute('src');
    if (actualLogo === IMG_LOGOS[0])
        logoImg.src = IMG_LOGOS[1];
    else if (actualLogo === IMG_LOGOS[1])                      // if non necessario
        logoImg.src = IMG_LOGOS[0];
}

function menuHandler(event) {
    let menuParent = event.currentTarget.parentNode;
    let menu = menuParent.querySelector('.menu-hidden');
    if (menu === null) {
        // console.log('Chiudo');
        menu = menuParent.querySelector('.menu-showed');
        menu.classList.replace('menu-showed', 'menu-hidden');
    } else {
        // console.log('Apro');
        menu.classList.replace('menu-hidden', 'menu-showed');
    }
    event.preventDefault();                                    // Per il menù de "Il mio eBay"
}

function zoomImg(event) {
    if (event.type === 'mouseover')
        event.target.classList.add('zoom-transform');
    else if (event.type === 'mouseout')                        // if non necessario
        event.target.classList.remove('zoom-transform');
}

function createImage(src) {
    const image = document.createElement('img');
    image.src = src;
    image.addEventListener('mouseover', zoomImg);
    image.addEventListener('mouseout', zoomImg);
    return image;
}

function loadPromoTopSection(src, numImgPromo) {
    for (let i = 0; i < containerPromo.length; i++) {
        const containerPromoImg = containerPromo[i].querySelector('.flex-container-img');
        for (let j = 1; j <= numImgPromo; j++) {
            let img = createImage(src + i + '-' + j + '.jpg');
            containerPromoImg.append(img);
        }
        if (containerPromo[i].dataset.show === 'none')
            containerPromo[i].classList.add('hide-container-promo');
    }
}

function changePromoContainer(event) {
    const currentContainer = document.querySelector('[data-show="yes"]');
    const actualIndex = currentContainer.dataset.promoNumber;
    let newIndex;
    if (event.target.id === 'go-back-promo-button') {
        if (actualIndex == 1)
            newIndex = containerPromo.length;
        else
            newIndex = parseInt(actualIndex) - 1;               // parseInt() perchè actualIndex riconosciuto come string
    } else if (event.target.id === 'go-ahead-promo-button') {
        if (actualIndex == containerPromo.length)
            newIndex = 1;
        else
            newIndex = parseInt(actualIndex) + 1;
    }

    currentContainer.classList.replace('show-container-promo', 'hide-container-promo');
    currentContainer.dataset.show = 'none';
    
    const nextContainer = document.querySelector('[data-promo-number="' + newIndex + '"]');
    nextContainer.classList.replace('hide-container-promo', 'show-container-promo');
    nextContainer.dataset.show = 'yes';
}

function showFullTitleCard(event) {
    const titleElement = event.target.querySelector('[data-show-title="yes"]');
    if (titleElement === null) {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.textContent = event.target.textContent;
        tooltip.dataset.showTitle = 'yes';
        event.target.appendChild(tooltip);
    } else
        event.target.removeChild(titleElement);   
}


const logoImg = document.querySelector('#logo');
logoImg.addEventListener('click', changeLogo);

const myAccountLink = document.querySelector('#my-account-link');
const categoryButton = document.querySelector('#category-button');
myAccountLink.addEventListener('click', menuHandler);
categoryButton.addEventListener('click', menuHandler);

const sectionPromo = document.querySelector('#promo-top-section');
const containerPromo = document.querySelectorAll('.flex-container-promo-top');
loadPromoTopSection(PROMO_IMG_SRC, PROMO_IMG_NUM);

const goBackPromoButton = document.querySelector('#go-back-promo-button');
const goAheadPromoButton = document.querySelector('#go-ahead-promo-button');
goBackPromoButton.addEventListener('click', changePromoContainer);
goAheadPromoButton.addEventListener('click', changePromoContainer);

const promoArticlesCards = document.querySelectorAll('#promo-cards-section article .flex-item-cell-title h3');
for (let i = 0; i < promoArticlesCards.length; i++) {
    promoArticlesCards[i].addEventListener('mouseover', showFullTitleCard);
    promoArticlesCards[i].addEventListener('mouseout', showFullTitleCard);
}