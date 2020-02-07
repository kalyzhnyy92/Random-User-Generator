'use strict';

let button = document.querySelector('.js-button');
let preloader = document.querySelector('.preloader');
let title = document.querySelector('.title');

button.addEventListener('click', renerator);

function renerator(){

  let url = 'https://randomuser.me/api/?results=';
  let quantity = Math.floor(Math.random() * Math.floor(100));
  let randomUsers = `${url}${quantity}`;

  let men = [];
  let women = [];
  let nat = [];

  button.classList.add('hidden');
  preloader.classList.add('visible');
  title.classList.add('active');

  let myRequest = new XMLHttpRequest();
  myRequest.open('GET', randomUsers, true);
  myRequest.responseType = 'json';
  myRequest.onreadystatechange = function() {
    if (myRequest.readyState == 4 && myRequest.status == 200) {

      // Прелоадер до загрузки страницы
      setTimeout(function () {
        preloader.classList.remove('visible');
      }, 3000);

      let loadUsers = myRequest.response.results;
      
      loadUsers.forEach(function(author) {

        // Построить сетку из карточек пользователей.
        let card = document.createElement('div');
            card.classList.add('card');
        
        // Изображение.
        let cardimages = document.createElement('div');
            cardimages.classList.add('card__img');
            card.appendChild(cardimages);

        let cardphoto = document.createElement('img');
            cardphoto.classList.add('card__photo');
            cardphoto.setAttribute('src', author.picture.large);
            cardphoto.setAttribute('alt', 'user photo');
            cardimages.appendChild(cardphoto);

        // Имя выводить в формате ФИО.
        let cardname = document.createElement('div');
            cardname.classList.add('card__name');
            cardname.innerHTML = `${author.name.title} ${author.name.first} ${author.name.last}`;
            card.appendChild(cardname);

        // Пол.
        let cardgender = document.createElement('div');
            cardgender.classList.add('card__gender');
            cardgender.innerHTML = `${author.gender}`;
            card.appendChild(cardgender);

        // Номер телефона.
        let cardphone = document.createElement('div');
            cardphone.classList.add('card__phone');
            cardphone.innerHTML = `${author.phone}`;
            card.appendChild(cardphone);

        // Электронная почта - gmail.
        let cardemail = document.createElement('div');
            cardemail.classList.add('card__email');
            cardemail.innerHTML = `${author.email}`;
            card.appendChild(cardemail);

        // Адрес (Область, Город, Улица, Дом).
        let cardlocation = document.createElement('div');
            cardlocation.classList.add('card__location');
            cardlocation.innerHTML = `${author.location.state}, ${author.location.city}, ${author.location.street.name}, ${author.location.street.number}`;
            card.appendChild(cardlocation);

        // Вывести дату рождения.
        let carddob = document.createElement('div');
            carddob.classList.add('card__dob');
            carddob.innerHTML = `<span>Date of birth:</span> ${new Date(author.dob.date).toLocaleDateString()}`;
            card.appendChild(carddob);

        // Вывести дату регистрации.
        let cardregistered = document.createElement('div');
            cardregistered.classList.add('card__registered');
            cardregistered.innerHTML = `<span>Date of registration:</span> ${new Date(author.registered.date).toLocaleDateString()}`;
            card.appendChild(cardregistered);

        document.querySelector('.details').appendChild(card);

        // Мужчин и женщин
        if (author.gender == 'male'){
          men.push(author);
        } else {
          women.push(author);
        }

        // Hациональности
        nat.push(author.nat);

      })

        let common = document.createElement('div');
            common.classList.add('application');

        // Вывести общее кол-во пользователей в ответе
        let applicationamount = document.createElement('div');
            applicationamount.classList.add('application__amount');
            applicationamount.innerHTML = `Total Users: ${quantity}`;
            common.appendChild(applicationamount);

        // Вывести кол-во мужчин
        let resultsman = document.createElement('div');
            resultsman.classList.add('application__man');
            resultsman.innerHTML = `Total male users: ${men.length}`;
            common.appendChild(resultsman);

        // Вывести кол-во женщин
        let resultswomen = document.createElement('div');
            resultswomen.classList.add('application__women');
            resultswomen.innerHTML = `Total women users: ${women.length}`;
            common.appendChild(resultswomen);

        // Вывести текст, кого больше: мужчин или женщин
        let resultscomparison = document.createElement('div');
            resultscomparison.classList.add('application__comparison');
            common.appendChild(resultscomparison);

        if (men.length > women.length) {
          resultscomparison.innerHTML = 'More: men';
        } else if (men.length < women.length) {
          resultscomparison.innerHTML = 'More: women';
        } else if (men.length == women.length) {
          resultscomparison.innerHTML = 'Equally: Men and women';
        }

        // Посчитать кол-во человек по совпадающим кодам номеров телефонов
        let applicationphone = document.createElement('div');
            applicationphone.classList.add('application__phone');
            common.appendChild(applicationphone);

        let object = [];

        nat.forEach(function(value) {
          object[value] = object[value] + 1 || 1;
        });
        
        for (let value in object) {
          let applicationcode = document.createElement('div');
          applicationcode.classList.add('application__code');
          applicationcode.innerHTML = `${value} - ${object[value]} ${object[value] == 1 ? 'user' : 'useru'}`;
          applicationphone.appendChild(applicationcode);
        }

        document.querySelector('.result').appendChild(common);
    }
  }
  myRequest.send(null);
}
