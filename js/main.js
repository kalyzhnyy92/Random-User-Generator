'use strict';

// Preloader page
function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 5000);
  })
}

loadData()
.then(() => {
	let preloaderEl = document.getElementById('preloader');
    	preloaderEl.classList.add('hidden');
    	preloaderEl.classList.add('visible');
});


// let button = document.querySelector('.js-button');
// let title = document.querySelector('.title');


// button.addEventListener('click', loadUsers);

// function loadUsers(){

//   button.classList.add('hidden');
//   title.classList.add('active');
//   // preloader.classList.add('visible');

// }


let ajaxhttp = new XMLHttpRequest();
let url = 'https://randomuser.me/api/?results=';
let number = Math.floor(Math.random() * Math.floor(100));
let randomUsers = `${url}${number}`;

function createItem(location, picSrc) {
	let div = document.createElement('div')
	div.innerHTML = '<div><span>' + location + '</span><img src="' + picSrc + '" /></div>'
	return div
}

ajaxhttp.open("GET", randomUsers, true);
ajaxhttp.setRequestHeader("content-type", "application/json");
ajaxhttp.onreadystatechange = function() {
	if (ajaxhttp.readyState == 4 && ajaxhttp.status == 200) {
		let jcontent = JSON.parse(ajaxhttp.responseText);
		//
		let listWrapper = document.createElement('div')
		jcontent.results.forEach(function (userJSON) {
			listWrapper.appendChild(createItem(userJSON.location.city, userJSON.picture.medium))
		})
		document.body.appendChild(listWrapper)
	}
}
ajaxhttp.send(null);