'use strict'
// variables
const ulComments = document.querySelector('.comments__container')
let comments = []
let counter = 0
let clearStorageButton = document.querySelector('.clear-storage')

// date transformation
let today = new Date
today = today.toString().slice(4, 15).split(' ')
const day = today.splice(1, 1)
today.unshift(day[0])
const dateString = today.join('-')

loadComments()

// event listener function on form submit
document.querySelector('.form__admin').addEventListener('submit', function (e) {
  e.preventDefault()

  let formFioValue = document.querySelector('.form__admin')[1].value
  let formEmailValue = document.querySelector('.form__admin')[2].value
  let formTextInputValue = document.querySelector('.form__admin')[3].value

// adding comments to localstorage
  let comment = {
    name: formFioValue,
    date: dateString,
    email: formEmailValue,
    text: formTextInputValue
  }
  comments.push(comment)
  saveComments()
  showComments(comments, comments.length - 1)
})

function saveComments() {
  localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
  if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
  for (let i = 0; i < comments.length; i++) {
    showComments(comments, i)
  }
}

function showComments(arr, i) {
  let liComment = document.createElement('li')
  liComment.classList.add('comments__comment')
  liComment.innerHTML = `
      <p class="comments__name comments__item" id="name-${counter}"></p>
      <p class="comments__date comments__item">${dateString}</p>
      <a class="comments__email comments__item" href="mailto: abc@example.com">${arr[i].email}</a>
      <p class="comments__text comments__item" id="text-${counter}"></p>
    `
  ulComments.appendChild(liComment)
  document.getElementById('name-' + counter).textContent = arr[i].name
  document.getElementById('text-' + counter).textContent = arr[i].text
  counter++
  clearStorageButton.classList.add('clear-storage_display-block')
}

// clear local storage button
clearStorageButton.addEventListener('click', function () {
  localStorage.removeItem("comments")
  location.reload()
})
