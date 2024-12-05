import {openModal} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupSrcAlt = document.querySelector('.popup__image');
const imagePopupName = document.querySelector('.popup__caption');

function createCard(name, link) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    const likeCard = card.querySelector('.card__like-button');
    const deleteCard = card.querySelector('.card__delete-button');

    likeCard.addEventListener('click', () => {
        likeCard.classList.toggle('card__like-button_is-active');
    });

    deleteCard.addEventListener('click', () => {
        card.remove();
    });

    cardImage.addEventListener('click', () => {
        imagePopupSrcAlt.src = link;
        imagePopupName.textContent = name;
        imagePopupSrcAlt.alt = name;

        openModal(imagePopup);
    });

    return card;
}

export { createCard };