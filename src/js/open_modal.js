const openModal = document.querySelector('.event #event_post');
const modalBody = document.querySelector('.modal__backdrop');
const modalClose = document.querySelector('.modal__esc');
const hiden = hiden => {
  modalBody.classList.remove('is-hiddenn');
};
const close = close => {
  modalBody.classList.add('is-hiddenn');
};

openModal.addEventListener('click', hiden);
modalClose.addEventListener('click', close);
modalClose.addEventListener('keydown', event => {
  console.log('key: ', event.key);
  console.log('code: ', event.code);
});
