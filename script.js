'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
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

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function () {
  // const s1coords = section1.getBoundingClientRect(); //
  // console.log(s1coords); // we get DOMRect with properties (x, y, height, width...)
  // console.log(e.target.getBoundingClientRect()); // DOMRect of the btn we clicked
  // console.log('Current scroll X/Y', window.pageXOffset, window.pageYOffset);
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // // window.scrollTo(
  // //   s1coords.left + window.pageXOffset,
  // //   s1coords.top + window.pageYOffset
  // // ); // top is relative to viewport not document

  // // window.scrollTo({
  // //   left: s1coords.left + window.pageXOffset,
  // //   top: s1coords.top + window.pageYOffset,
  // //   behavior: 'smooth',
  // // });

  // in modern browsers
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
//// Page navigation
// document.querySelectorAll('.nav__link').forEach(el =>
//   // adding the same callback to each element separately - negative impact on performance
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// );

// with event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
//// Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // guard clause - for the case that we click outside the buttons and recieve null
  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // activate tab
  clicked.classList.add('operations__tab--active');

  // activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
//// Menu fade animation
// handler function can take only one real argument, all the others are set to this keyword
const handleHover = function (e) {
  // console.log(this); // not working with arrow function
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// // mouseenter doesn't bubble, so use mouseover
// nav.addEventListener('mouseover', function (e) {
//   handlerHover(e, 0.5);
// });
// // bind methods creates a copy of a function that is called on and it will set this keyword to whatever value we pass into bind
// // using bind it returns function and this keyword is set to 0.5
// passing 'argument' into handler
nav.addEventListener('mouseover', handleHover.bind(0.5)); // this = 0.5
nav.addEventListener('mouseout', handleHover.bind(1)); // this = 1

///////////////////////////////////////
//// Sticky navigation
// // using scroll event is bad for performance
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   //console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

///////////////////////////////////////
//// Sticky navigation using Intersection Observer API
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, // viewport
//   threshold: 0.1, // 10% or [0, 0.2]
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);

const stickyNav = function (entries) {
  // to get the first entry, the same as entries[0]
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // when header is not visible
  rootMargin: `-${navHeight}px`, // heigth of the navigation
});

headerObserver.observe(header);

//**************Experimenting*************************///
//////////////////////////////////////////////
//////////////////////////////////////////////
///******/// Creating and inserting elements
// const header = document.querySelector('.header');
// const message = document.createElement('div');

// //// .insertAdjacentHTML
// // const html = `
// //     <div class="cookie-message">
// //       We use cookies
// //       <button class="btn btn--close-cookie">Got it</btn>
// //     </div>
// //   `;

// // header.insertAdjacentHTML('afterbegin', html);

// //// .createElement
// message.classList.add('cookie-message');
// message.textContent = 'We use cookies';
// message.innerHTML =
//   'We use cookies. <button class="btn btn--close-cookie">Got it</btn>';

// // can be only on one place at a time, not on both - we can move the element within DOM
// // as a child
// header.prepend(message);
// //header.append(message);
// //header.append(message.cloneNode(true)); // to have on both places

// // as a sibling
// //header.before(message);
// //header.after(message);

// //// delete elements
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());
// // message.parentElement.removeChild(message) - older way of doing it

// ///******/// Styles
// message.style.background = '#37383d'; // inline styles
// message.style.width = '120%';

// console.log(getComputedStyle(message).color);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // to change CSS properties (variables) on root element
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// ///******/// Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);
// console.log(logo.designer); //non-standard, property is not created automatically

// console.log(logo.src); // absolute path - https://....
// console.log(logo.getAttribute('designer')); // relative path

// logo.setAttribute('company', 'Bankist');

// ///******/// Data Attributes
// console.log(logo.dataset.versionNumber); // data-version-number in html

// ///******/// Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c'); // not includes as it is in arrays

// // don't use - you can add only one class, and it overwrites existing classes
// logo.className = 'jonas';

// //////////////////////////////////////////////
// ///******/// Events and Event Handlers
// const h1 = document.querySelector('h1');

// const alert1 = e => {
//   alert('addEventlistener: Great, you are reading the heading');

//   h1.removeEventListener('mouseenter', alert1); // event happens only once, we can put it anywhere in our code, e.g. in the setTimeout function and remove after 3 secs
// };

// // mouseenter - when hover over it
// h1.addEventListener('mouseenter', alert1);

// // older way of doing it
// // h1.onmouseenter = e => {
// //   alert('addEventlistener: Great, you are reading the heading');
// // };

// // advantage of EventListener
// // - we can add more events on one element
// // - we can remove it when don't need it

// ///// create random color
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 225)}, ${randomInt(0, 225)}, ${randomInt(0, 225)})`;
// //console.log(randomColor(0, 225));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
//   // e.target - where the event happen, not the element where the event handler was attached to
//   // due to the bubling the event is the same for the two below too
//   // e.currentTarget - is the element where the event handler is attached to - the same as this

//   // stop propagation - in general it's not used, only in some complex apps
//   e.stopPropagation();
// });

// // automatically listen to bubbling events
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target);
// });

// // to capture the event during capturing phase - add third parameter true/false
// // rarely used now
// // document.querySelector('.nav').addEventListener(
// //   'click',
// //   function (e) {
// //     this.style.backgroundColor = randomColor();
// //     console.log('NAV', e.target);
// //   },
// //   true
// // );

//////////////////////////////////////////////
// ///******/// Traversing DOM
// going downwards: child
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // NodeList: text, comments, span, br....
// console.log(h1.children); // HTMLCollection: elements - span, br
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // going upwards: parents
// console.log(h1.parentNode);
// h1.parentElement;
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // going sideways: siblings
// h1.previousElementSibling;
// h1.nextElementSibling;

// h1.previousSibling;
// h1.nextSibling;

// console.log(h1.parentElement.children); // to get all siblings
// [...h1.parentElement.children].forEach(el => {
//   if (el !== h1) {
//     el.style.transform = 'scale(0.5)';
//   }
// });
