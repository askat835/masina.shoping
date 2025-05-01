const heroImg = document.querySelector(".hero-img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentIndex = 0;

nextBtn.addEventListener("click", () => {
    if (currentIndex < heroImg.children.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlide();
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = heroImg.children.length - 1;
    }
    updateSlide();
});

function updateSlide() {
    const width = heroImg.clientWidth;
    heroImg.style.transform = `translateX(-${width * currentIndex}px)`;
}


// Элементтерди алуу
const sort = document.querySelector('.sort')
const cards = document.querySelector('.cards');
const btnNew = document.querySelector('.btnNew');
const modal = document.querySelector('.modal');
const cancelBtn = document.querySelector('.edit');
const sendBtn = document.querySelector('.send');
const inputs = document.querySelectorAll('.container-modal input');
const modalHero = document.querySelector('.hero-img-text')
const phone = document.querySelector('.phone')
phone.addEventListener('click', () => {
  alert(' номер: +996 504 07 11 05');
});

let editIndex = null;

let products = JSON.parse(localStorage.getItem('cars')) || [
  {
    model: "Toyota Camry",
    price: 27000,
    description: "Ыңгайлуу жана ишенимдүү седан, күнүмдүк колдонуу үчүн идеалдуу.",
    image: "https://scene7.toyota.eu/is/image/toyotaeurope/cam0001a_21-2:Medium-Landscape?ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0"
  },
  // ... башка унаалар керек болсо кошуп ал
];

// Машина кошуу баскычы
btnNew.addEventListener('click', (e) => {
  e.preventDefault();
  modal.style.display = 'block';
  modalHero.style.display = 'none';
  inputs.forEach(input => input.value = '');
  editIndex = null;
});

// Сактоо
sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const newCar = {
    image: inputs[0].value,
    model: inputs[1].value,
    description: inputs[2].value,
    price: parseFloat(inputs[3].value)
    
  }; 


  if (newCar.image && newCar.model && newCar.description && newCar.price) {
    if (editIndex !== null) {
      products[editIndex] = newCar;
    } else {
      products.push(newCar);
    }

    editIndex = null;
    localStorage.setItem('cars', JSON.stringify(products));
    renderProducts(products);
    modal.style.display = 'none';
    modalHero.style.display = 'block';
    inputs.forEach(input => input.value = '');
  } else {
    alert('Бардык талааларды толтур!');
  }
});

// Отмена
cancelBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalHero.style.display = 'block';
});

// Сортировка
sort.addEventListener('click', () => {
  products.sort((a, b) => a.price - b.price);
  renderProducts(products);
});

// Саат
function clock() {
  let clock = new Date();
  let hour = clock.getHours();
  let minute = clock.getMinutes();
  let second = clock.getSeconds();

  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  document.querySelector('.date').textContent = `${hour}:${minute}:${second}`;
}
setInterval(clock, 1000);
clock();

// Карточкаларды чыгаруу
function renderProducts(arr) {
  cards.innerHTML = '';
  arr.forEach((car, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.width = '300px';
    card.style.border = '1px solid black';
    card.style.margin = '10px';
    card.style.padding = '10px';

    card.innerHTML = `
      <img class='card-img' src="${car.image}" alt="${car.model}" style="width: 100%; height: 200px; object-fit: cover;">
      <div>
        <h3>${car.model}</h3>
        <p>${car.description}</p>
      </div>
      <p><b>${car.price}$</b></p>
    `;

    const control = document.createElement('div');
    control.className = 'modal-control';
    control.style.display = 'none'; // Башында кнопкалар жашыруун болот

    const editBtn = document.createElement('button');
    editBtn.className = 'modal-btn send';
    editBtn.textContent = 'ӨЗГӨРТҮҮ';

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'modal-btn delete';
    deleteBtn.textContent = 'ӨЧҮРҮҮ';

    control.appendChild(editBtn);
    control.appendChild(deleteBtn);
    card.appendChild(control);

    // Өзгөртүү
    editBtn.addEventListener('click', () => {
      inputs[0].value = car.image;
      inputs[1].value = car.model;
      inputs[2].value = car.description;
      inputs[3].value = car.price;
      editIndex = index;
      modal.style.display = 'block';
      modalHero.style.display = 'none';
    });

    // Өчүрүү
    deleteBtn.addEventListener('click', () => {
      if (confirm('Чын эле өчүргүң келип жатабы?')) {
        products.splice(index, 1);

        localStorage.setItem('cars', JSON.stringify(products));
        renderProducts(products);
      }
    });

    cards.appendChild(card);
  });
}

// Машина кошулгандан кийин гана control'дорду көрсөт
btnNew.addEventListener('click', () => {
  setTimeout(() => {
    const allControls = document.querySelectorAll('.modal-control');
    allControls.forEach(ctrl => ctrl.style.display = 'flex');
  }, 100); // Бир аз убакыт берип анан көрсөтөбүз
});

// Алгачкы жүктөө
renderProducts(products);
