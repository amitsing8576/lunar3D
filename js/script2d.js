const sidebar = document.getElementById('sidebar');
sidebar.addEventListener('click', (e) => {
  if (!e.target.classList.contains('sidebar-icon')) {
    sidebar.classList.toggle('open');
  }
});

const elementImages = {
  si: 'img/Si_final.png',
  al: 'img/Al_final.png',
  ca: 'img/Ca_final.png',
  mg: 'img/Mg_final.png',
  fe: 'img/Fe_final.png',
  'mg-si': 'img/Mg_Si_final.png',
  'ca-si': 'img/Ca_Si_final.png',
  'al-si': 'img/Al_Si_final.png'
};

const image = document.querySelector('.image');
const elements = document.querySelectorAll('.sidebar-icon');
elements.forEach(element => {
  element.addEventListener('click', () => {
    const ele = element.getAttribute('data-element');
    if (elementImages[ele]) {
      image.src = elementImages[ele];
    }
  });
});