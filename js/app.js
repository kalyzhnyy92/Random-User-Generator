'use strict'; // Строгий режим

// Document метод querySelector() возвращает первый элемент ( Element ) документа, 
// который соответствует указанному селектору или группе селекторов.
let button = document.querySelector('.js-button'); // Кнопка "Загрузить пользователей" по клику на кнопку.
let preloader = document.querySelector('.preloader'); // Анимационный прелоадер загрузки.
let title = document.querySelector('.title'); // Заголовок

// click – происходит, когда кликнули на элемент левой кнопкой мыши (на устройствах с сенсорными экранами 
// оно происходит при касании).
button.addEventListener('click', renerator); // Кнопка click на элемент левой кнопкой мыши загрузки страницы renerator 

function renerator() { // Начало функции renerator

  // Ваш код для обработки данных, которые вы получаете от API

  let url = 'https://randomuser.me/api/?results='; // Получить случайных пользователей
  let quantity = Math.floor(Math.random() * 101);  // Результат случайное целое число от 0 до 100
  let randomUsers = `${url}${quantity}`; // генерироваться случайных пользователей общие 

  // Объявление cуществует 3 варианта синтаксиса для создания пустого массива:
  let men = []; // men - создаём массив
  let women = []; // women - создаём массив
  let nat = []; // nat - создаём массив

  // Свойство classList – это объект для работы с классами.
  // Метод add добавляет указанный класс: элемент.classList.add('класс');
  button.classList.add('hidden'); // после загрузки кнопка спрятана
  preloader.classList.add('visible'); // нажимает на кнопку после прелоадер загрузки
  title.classList.add('active'); // нажимает на кнопку загрузки после появляется заголовок

  let myRequest = new XMLHttpRequest(); // Создаём новый объект XMLHttpRequest
  myRequest.open('GET', randomUsers, true); // Конфигурируем его: GET-запрос на URL 'randomUsers'
  myRequest.responseType = 'json'; // Указываем тип данных, ожидаемых в ответе
  myRequest.onreadystatechange = function () { // Начало функции onreadystatechange

    // Функция в свойстве onreadystatechange вызывается каждый раз, когда изменяется свойство readyState.
    // Когда в свойстве readyState установлено значение 4, а в свойстве status – 200, ответ сервера готов 
    if (myRequest.readyState == 4 && myRequest.status == 200) {

      // Прелоадер до загрузки страницы
      preloader.classList.remove('visible');

      let loadUsers = myRequest.response.results; // Получить результаты
      let detailsFragment = document.createDocumentFragment(); // fragment это ссылка на пустой объект DocumentFragment

      loadUsers.forEach(function (author) { // forEach через результаты и для каждого запуска приведенный ниже код

        // Построить сетку из карточек пользователей.

        // Методы для создания узлов: document.createElement(tag) – создаёт элемент с заданным тегом
        // element.setAttribute(name, value); - устанавливает атрибут
        //  name - имя атрибута (строка).
        //  value  - значение атрибута.

        let card = document.createElement('div'); // создаем новый элемент div
        card.classList.add('card'); // создаем новый класс card

        // Изображение.
        let cardimages = document.createElement('div'); // создаем новый элемент div
        cardimages.classList.add('card__img'); // создаем новый класс card__img
        card.appendChild(cardimages); // append вставить cardimages в конец card

        let cardphoto = document.createElement('img'); // создаем новый элемент img
        cardphoto.classList.add('card__photo'); // создаем новый класс card__photo
        cardphoto.setAttribute('src', author.picture.large); // Добавьте источник изображения, чтобы быть источником атрибут src  
        cardphoto.setAttribute('alt', 'user photo'); // создаем новый атрибут alt устанавливает альтернативный текст 'user photo'  
        cardimages.appendChild(cardphoto); // append вставить cardphoto в конец cardimages

        // Имя выводить в формате ФИО.
        let cardname = document.createElement('div'); // создаем новый элемент div
        cardname.classList.add('card__name'); // создаем новый класс card__name
        cardname.innerHTML = `${author.name.title} ${author.name.first} ${author.name.last}`; // установка содержимого для элемента
        card.appendChild(cardname); // append вставить cardname в конец card

        // Пол.
        let cardgender = document.createElement('div'); // создаем новый элемент div
        cardgender.classList.add('card__gender'); // создаем новый класс card__gender
        cardgender.innerHTML = `${author.gender}`; // установка содержимого для элемента
        card.appendChild(cardgender); // append вставить cardgender в конец card

        // Номер телефона.
        let cardphone = document.createElement('div'); // создаем новый элемент div
        cardphone.classList.add('card__phone'); // создаем новый класс card__phone
        cardphone.innerHTML = `${author.phone}`; // установка содержимого для элемента
        card.appendChild(cardphone); // append вставить cardphone в конец card

        // Электронная почта - gmail.
        let cardemail = document.createElement('div'); // создаем новый элемент div
        cardemail.classList.add('card__email'); // создаем новый класс card__email
        cardemail.innerHTML = `${author.email}`; // установка содержимого для элемента
        card.appendChild(cardemail); // append вставить cardemail в конец card

        // Адрес (Область, Город, Улица, Дом).
        let cardlocation = document.createElement('div'); // создаем новый элемент div
        cardlocation.classList.add('card__location'); // создаем новый класс card__location
        cardlocation.innerHTML = `${author.location.state}, ${author.location.city}, ${author.location.street.name}, ${author.location.street.number}`; // установка содержимого для элемента
        card.appendChild(cardlocation); // append вставить cardlocation в конец card

        // Вывести дату рождения.
        let carddob = document.createElement('div'); // создаем новый элемент div
        carddob.classList.add('card__dob'); // создаем новый класс card__dob
        carddob.innerHTML = `<span>Date of birth:</span> ${new Date(author.dob.date).toLocaleDateString()}`; // установка содержимого для элемента
        card.appendChild(carddob); // append вставить carddob в конец card

        // Вывести дату регистрации.
        let cardregistered = document.createElement('div'); // создаем новый элемент div
        cardregistered.classList.add('card__registered'); // создаем новый класс card__registered
        cardregistered.innerHTML = `<span>Date of registration:</span> ${new Date(author.registered.date).toLocaleDateString()}`; // установка содержимого для элемента
        card.appendChild(cardregistered); // append вставить cardregistered в конец card

        detailsFragment.appendChild(card); // append вставить card в конец detailsFragment

        // Мужчин и женщин
        if (author.gender == 'male') { // Оператор if(...)
          men.push(author); // Метод push() добавляет один или более элементов в конец массива и возвращает новую длину массива.
        } else {
          women.push(author);
        }

        // Hациональности
        nat.push(author.nat);

      })

      document.querySelector('.details').appendChild(detailsFragment);

      let common = document.createElement('div'); // создаем новый элемент div
      common.classList.add('application'); // создаем новый класс application

      // Вывести общее кол-во пользователей в ответе
      let applicationamount = document.createElement('div'); // создаем новый элемент div
      applicationamount.classList.add('application__amount'); // создаем новый класс application__amount
      applicationamount.innerHTML = `Total Users: ${quantity}`; // установка содержимого для элемента
      common.appendChild(applicationamount); // append вставить applicationamount в конец common

      // Вывести кол-во мужчин
      let resultsman = document.createElement('div'); // создаем новый элемент div
      resultsman.classList.add('application__man'); // создаем новый класс application__man
      resultsman.innerHTML = `Total male users: ${men.length}`; // установка содержимого для элемента
      common.appendChild(resultsman); // append вставить resultsman в конец common

      // Вывести кол-во женщин
      let resultswomen = document.createElement('div'); // создаем новый элемент div
      resultswomen.classList.add('application__women'); // создаем новый класс application__women
      resultswomen.innerHTML = `Total women users: ${women.length}`; // установка содержимого для элемента
      common.appendChild(resultswomen); // append вставить resultswomen в конец common

      // Вывести текст, кого больше: мужчин или женщин
      let resultscomparison = document.createElement('div'); // создаем новый элемент div
      resultscomparison.classList.add('application__comparison'); // создаем новый класс application__comparison
      common.appendChild(resultscomparison); // append вставить resultscomparison в конец common

      // Оператор if(...)
      if (men.length > women.length) {  // men, если значение больше women
        resultscomparison.innerHTML = 'More: men'; // установка содержимого для элемента
      } else if (men.length < women.length) { // men, если значение меньше women
        resultscomparison.innerHTML = 'More: women'; // установка содержимого для элемента
      } else if (men.length == women.length) { // men, если значение равно women
        resultscomparison.innerHTML = 'Equally: Men and women'; // установка содержимого для элемента
      }

      // Посчитать кол-во человек по совпадающим национальностях
      let applicationhationalities = document.createElement('div'); // создаем новый элемент div
      applicationhationalities.classList.add('application__hationalities'); // создаем новый класс application__hationalities
      common.appendChild(applicationhationalities); // append вставить applicationphone в конец common

      let object = []; // object - создаём массив

      nat.forEach(function (value) {
        object[value] = object[value] + 1 || 1;
      });

      let codesFragment = document.createDocumentFragment(); // fragment это ссылка на пустой объект DocumentFragment

      // Циклы for
      for (let value in object) {
        // ... тело цикла ...
        let applicationcountry = document.createElement('div'); // создаем новый элемент div        
        applicationcountry.classList.add('application__country'); // создаем новый класс application__country
        applicationcountry.innerHTML = `${value} - ${object[value]} ${object[value] == 1 ? 'user' : 'useru'}`; // установка содержимого для элемента
        codesFragment.appendChild(applicationcountry); // append вставить applicationcountry в конец codesFragment
      }

      applicationhationalities.appendChild(codesFragment); // append вставить codesFragment в конец applicationhationalities

      document.querySelector('.result').appendChild(common);
    }
  } // Конец функции onreadystatechange
  myRequest.send(null); // Отсылаем запрос
} // Конец функции renerator
