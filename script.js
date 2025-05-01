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
let products = [
  {
    model: "Toyota Camry",
    price: 27000,
    description: "Ыңгайлуу жана ишенимдүү седан, күнүмдүк колдонуу үчүн идеалдуу.",
    image: "https://scene7.toyota.eu/is/image/toyotaeurope/cam0001a_21-2:Medium-Landscape?ts=0&resMode=sharp2&op_usm=1.75,0.3,2,0"
  },
  {
    model: "Honda Civic",
    price: 24000,
    description: "Жаштар арасында популярдуу, үнөмдүү жана заманбап дизайндуу унаа.",
    image: "https://media.ed.edmunds-media.com/honda/civic/2025/oem/2025_honda_civic_sedan_si_fq_oem_1_1600.jpg"
  },
  {
    model: "Tesla Model 3",
    price: 40000,
    description: "Электр унаалардын арасында лидер, укмуштай ылдамдыгы жана технологиялары менен белгилүү.",
    image: "https://avatars.mds.yandex.net/get-verba/997355/2a000001806534eba609ea0f6488aa0f0275/auto_main"
  },
  {
    model: "BMW 3 Series",
    price: 45000,
    description: "Жогорку класс, спорттук жүрүш жана комфортту айкалыштырган седан.",
    image: "https://parkers-images.bauersecure.com/wp-images/22074/cut-out/930x620/00-bmw_m340i_xdrive.jpeg"
  },
  {
    model: "Mercedes-Benz C-Class",
    price: 48000,
    description: "Премиум седан, люкс интерьер жана күчтүү динамика менен өзгөчөлөнөт.",
    image: "https://avatars.mds.yandex.net/get-verba/1535139/2a00000190ba90696e4f7ec32d8b65a480d7/456x342"
  },
  {
    model: "Audi A4",
    price: 46000,
    description: "Так башкаруу жана заманбап салон технологиялары менен популярдуу.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Audi_A4_B9_Limousine_3.0_TDI_quattro.JPG/960px-Audi_A4_B9_Limousine_3.0_TDI_quattro.JPG"
  },
  {
    model: "Ford Mustang",
    price: 37000,
    description: "Америкалык классикалык спорткар, күчтүү мотор жана агрессивдүү дизайн.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2018_Ford_Mustang_GT_5.0.jpg/960px-2018_Ford_Mustang_GT_5.0.jpg"
  },
  {
    model: "Chevrolet Camaro",
    price: 35000,
    description: "Тарыхый мурас жана спорттук духту айкалыштырган легендарлуу купе.",
    image: "https://hips.hearstapps.com/hmg-prod/images/2024-chevrolet-camaro-ss-collectors-edition-1-647e1933c6c20.jpg?crop=0.827xw:0.853xh;0.0946xw,0.129xh&resize=2048:*"
  },
  {
    model: "Lamborghini Aventador",
    price: 400000,
    description: "Ультра люкс спорткар, жогорку ылдамдык жана укмуштай дизайн менен өзгөчөлөнөт.",
    image: "https://avatars.mds.yandex.net/get-autoru-vos/5219606/b01252fd70c1d2edb3f5cc62130b65f2/456x342"
  },
  {
    model: "Ferrari 488",
    price: 280000,
    description: "Италиялык спорткар, эң сонун ылдамдык жана стилистика менен мактанат.",
    image: "https://autoiwc.ru/images/ferrari/ferrari-488.webp"
  },
  {
    model: "Nissan GT-R",
    price: 120000,
    description: "Жапондордун легендасы, күчтүү мотор жана мыкты башкаруу мүмкүнчүлүгү бар.",
    image: "https://motor.ru/imgs/2022/10/07/16/5617054/bd1962705eacf9219f15c97a585c70d26e1ddfce.jpg"
  },
  {
    model: "Porsche 911",
    price: 130000,
    description: "Спорткарлар арасында тарыхый модель, укмуштуудай тең салмактуу.",
    image: "https://res.cloudinary.com/unix-center/image/upload/c_limit,dpr_3.0,f_auto,fl_progressive,g_center,h_240,q_auto:good,w_385/kpjpk6syexcbruz7gasd.jpg"
  },
  {
    model: "Range Rover Velar",
    price: 70000,
    description: "Люкс SUV, офф-роуд жана шаардык шарт үчүн эң сонун тандоо.",
    image: "https://images.drive.ru/i/0/5fe34608ec6b857bf44ba9a8.jpg"
  },
  {
    model: "Jeep Wrangler",
    price: 45000,
    description: "Чыныгы офф-роуд машинеси, катаал шарттарга ылайыкташкан.",
    image: "https://www.autocar.co.uk/sites/autocar.co.uk/files/jeep-wrangler-review-2024-01-cornering-front.jpg"
  },
  {
    model: "Hyundai Sonata",
    price: 28000,
    description: "Эконом класстагы ыңгайлуу жана заманбап седан.",
    image: "https://www.carpro.com/hubfs/car-review-blog/review_337338_1.jpg"
  }
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
    sort.addEventListener('click', () => {
      products.sort((a, b) => a.price - b.price);
        editBtn.style.display = 'block'
      renderProducts(products);
    
    });
    cancelBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modalHero.style.display = 'block';
      control.style.display = 'none'
      
    });

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
