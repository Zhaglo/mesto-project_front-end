function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');

    popup.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleEscClose);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', handleOverlayClose);
    document.removeEventListener('keydown', handleEscClose);
}

export { openModal, closeModal };