import {openModal} from './modal.js';
import {myId} from './index.js';
import {deleteCard, likeCard} from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupSrcAlt = document.querySelector('.popup__image');
const imagePopupName = document.querySelector('.popup__caption');

function handleLikeButton(_id, likeCount, evt) {
    console.log(evt);
    if(evt.target.classList.contains('card__like-button_is-active')) {
        const method = 'DELETE';
        likeCard(method, _id)
            .then((card) => {
                likeCount.textContent = card.likes.length;
                evt.target.classList.remove('card__like-button_is-active');
            })
            .catch(err => console.log(err))
    }
    else {
        const method = 'PUT';
        likeCard(method, _id)
            .then((card) => {
                likeCount.textContent = card.likes.length;
                evt.target.classList.add('card__like-button_is-active');
            })
            .catch(err => console.log(err))
    }
}

function createCard(cardInfo) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeCards = card.querySelector('.card__like-button');
    const deleteCards = card.querySelector('.card__delete-button');
    const likeCount = card.querySelector('.card__likes_count');

    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;
    likeCount.textContent = cardInfo.likes.length;

    if (cardInfo.likes.some((info) => {return info._id === myId})) {
        likeCards.classList.add('card__like-button_is-active');
    }

    if (cardInfo.owner._id !== myId) {
        deleteCards.classList.add('card__delete-button_noactive');
    }

    likeCards.addEventListener('click', (evt) => {
        handleLikeButton(cardInfo._id, likeCount, evt);
    });

    deleteCards.addEventListener('click', () => {
        deleteCard(cardInfo._id)
            .then(() => {
                const parentCardDelete = deleteCards.closest('.card');
                parentCardDelete.remove();
            })
            .catch(err => console.log(err));
    });

    cardImage.addEventListener('click', () => {
        imagePopupSrcAlt.src = cardInfo.link;
        imagePopupName.textContent = cardInfo.name;
        imagePopupSrcAlt.alt = cardInfo.name;

        openModal(imagePopup);
    });

    return card;
}

export { createCard };