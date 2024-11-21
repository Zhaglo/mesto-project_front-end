const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editProfileBtn = document.querySelector('.profile__edit-button');
const closePopup = document.querySelectorAll('.popup__close');

const newCardPopup = document.querySelector('.profile__add-button');
const formCardElement = document.forms['new-place'];
const cardLoc = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');

const imagePopupSrcAlt = document.querySelector('.popup__image');
const imagePopupName = document.querySelector('.popup__caption');

const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

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

initialCards.forEach(function (card) {
    placesList.append(createCard(card.name, card.link));
});

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;

    closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

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

newCardPopup.addEventListener('click', () => {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.

    // Получите значение полей jobInput и nameInput из свойства value
    const location = cardLoc.value;
    const url = cardUrl.value;

    const newCard = createCard(location, url);

    placesList.prepend(newCard);

    closeModal(cardPopup);
    formCardElement.reset();
}
formCardElement.addEventListener('submit', handleCardFormSubmit);