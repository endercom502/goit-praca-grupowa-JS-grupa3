() => {
  const refs = {
    openModalBtn: document.getElementsByClassName('event_item'),
    closeModalBtn: document.getElementsByClassName('modal__esc'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);
    
};
