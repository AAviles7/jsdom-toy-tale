
let addToy = false;
const TOY_URL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  toyFormContainer.addEventListener('submit', handleSubmit)
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const getToys = () => {
  fetch(TOY_URL)
    .then((res) => res.json())
    .then(toyData => toyData.forEach(renderToy))
}

const renderToy = (toy) => {
  let toyBox = document.createElement('div')
      toyBox.classList.add('card')

  let toyName = document.createElement('h2')
      toyName.textContent = toy.name

  let toyImg = document.createElement('img')
      toyImg.className = 'toy-avatar'
      toyImg.src = toy.image

  let toyLikes = document.createElement('p')
      toyLikes.innerText = `${toy.likes} Likes `
      toyLikes.id = toy.id

  let likeBtn = document.createElement('button')
      likeBtn.classList.add('like-btn')
      likeBtn.innerText = 'Like'
      likeBtn.id = toy.id
      likeBtn.addEventListener('click', likeToy)

  toyBox.append(toyName, toyImg, toyLikes, likeBtn)
  document.querySelector('#toy-collection').appendChild(toyBox)

}

function likeToy(event){

  let targetToy = event.target.parentElement.querySelector('p')

  let newLikes = {
    likes: +targetToy.innerText.split(" ")[0] + 1
  }

  let reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "PATCH",
    body: JSON.stringify(newLikes)
  }

  fetch(`${TOY_URL}/${event.target.id}`, reqObj)
    .then(r => r.json())
    .then(updatedToy => {
      document.getElementById(updatedToy.id).innerText = `${updatedToy.likes} Likes `
    })
}

function handleSubmit(event){
  event.preventDefault()

  let newToy = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }

  let reqObj = {
    headers: {"Content-Type": "application/json"},
    method: "POST",
    body: JSON.stringify(newToy)
  }

  fetch(TOY_URL, reqObj)
        .then(r => r.json())
        .then(renderToy)
  
  event.currentTarget.querySelector('form').reset()
}