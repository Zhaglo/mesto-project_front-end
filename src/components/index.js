import '../pages/index.css';

import { getCards, getUserInfo, changeProfile, createNewCard, changeAvatar } from "./api.js";
import {createCard} from "./card.js";
import {openModal, closeModal} from "./modal.js";
import {enableValidation} from "./validate.js";

const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupButton = document.querySelectorAll('.popup__button');

const closePopup = document.querySelectorAll('.popup__close');
const editProfileBtn = document.querySelector('.profile__edit-button');

const newCardPopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms['new-place'];
const cardLoc = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const penAvatar = document.querySelector('.profile__image_pen');

const avatarPopup = document.querySelector('.popup_type_avatar');
const avatarForm = document.forms['edit-avatar'];

let myId;

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

getUserInfo()
    .then((res) => {
        profileName.textContent = res.name;
        profileJob.textContent = res.about;
        profileAvatar.style.backgroundImage = `url(${res.avatar})`;
        myId = res._id;
    })
    .catch((err) => console.log(err));

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const name = nameInput.value;
    const job = jobInput.value;

    popupButton[0].textContent = 'Сохранение...';
    changeProfile(name,job)
        .then((res) => {
            profileName.textContent = res.name;
            profileJob.textContent = res.about;
            closeModal(profilePopup);
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[0].textContent = 'Сохранить';
        });
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

editProfileBtn.addEventListener('click', function () {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openModal(profilePopup);
});

closePopup.forEach(function (popup) {
    popup.addEventListener('click', () => {
        const pop = popup.closest('.popup');
        closeModal(pop);
    });
});

getCards()
    .then((res) => {
        res.forEach(function (item) {
            placesList.append(createCard(item));
        });
    })
    .catch(err => console.log(err))

newCardPopup.addEventListener('click', () => {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const location = cardLoc.value;
    const url = cardUrl.value;

    popupButton[1].textContent = 'Создание...';
    createNewCard(location, url)
        .then((newCard) => {
            const card = createCard(newCard);

            placesList.prepend(card);
            closeModal(cardPopup);
            formCardElement.reset();
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[1].textContent = 'Создать';
        });
}
formCardElement.addEventListener('submit', handleCardFormSubmit);

profileAvatar.addEventListener('click', () => {
    openModal(avatarPopup);
});

penAvatar.addEventListener('click', () => {
    openModal(avatarPopup);
});

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    const avatar = document.getElementById('url-input_ava').value;

    popupButton[2].textContent = 'Сохранение...';
    changeAvatar(avatar)
        .then((res) => {
            profileAvatar.style.backgroundImage = `url(${res.avatar})`;
            closeModal(avatarPopup);
        })
        .catch(err => console.log(err))
        .finally(() => {
            popupButton[2].textContent = 'Сохранить';
        });
}
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);

export { myId }