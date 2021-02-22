'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////
//////////////////////////////////////////////
///******/// Creating and inserting elements
const header = document.querySelector('.header');
const message = document.createElement('div');

//// .insertAdjacentHTML
// const html = `
//     <div class="cookie-message">
//       We use cookies
//       <button class="btn btn--close-cookie">Got it</btn>
//     </div>
//   `;

// header.insertAdjacentHTML('afterbegin', html);

//// .createElement
message.classList.add('cookie-message');
message.textContent = 'We use cookies';
message.innerHTML =
  'We use cookies. <button class="btn btn--close-cookie">Got it</btn>';

// can be only on one place at a time, not on both - we can move the element within DOM
// as a child
//header.prepend(message);
header.append(message);
//header.append(message.cloneNode(true)); // to have on both places

// as a sibling
//header.before(message);
//header.after(message);

//// delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());
// message.parentElement.removeChild(message) - older way of doing it

///******/// Styles
message.style.background = '#37383d'; // inline styles
message.style.width = '120%';

console.log(getComputedStyle(message).color);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// to change CSS properties (variables) on root element
document.documentElement.style.setProperty('--color-primary', 'orangered');

///******/// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.designer); //non-standard, property is not created automatically

console.log(logo.src); // absolute path - https://....
console.log(logo.getAttribute('designer')); // relative path

logo.setAttribute('company', 'Bankist');

///******/// Data Attributes
console.log(logo.dataset.versionNumber); // data-version-number in html

///******/// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes as it is in arrays

// don't use - you can add only one class, and it overwrites existing classes
logo.className = 'jonas';


