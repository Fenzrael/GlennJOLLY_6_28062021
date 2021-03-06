// Javascript Homepage

// Variables
const params = new URLSearchParams(document.location.search.substring(1));
const sectionPhotographer = document.getElementById("photograph");
const navigation = document.getElementsByClassName("navigation__filters");
const filterTag = params.get("filterTag");
const headerLink = document.querySelector(".header__link");

// Import datas data.json

function getPhotographers() {
  return fetch("./data.json")
    .then((res) => res.json())
    .then((data) => data.photographers);
}
if (filterTag) {
  filterByTag(filterTag);
} else {
  getPhotographers().then((photographers) => {
    for (let i = 0; i < photographers.length; i++) {
      let photographer = photographers[i];
      constructPhotographerHtml(photographer);
    }
  });
}

function constructPhotographerHtml(photographer) {
  sectionPhotographer.innerHTML += `
  
  <article class="photograph__profile profile" aria-label="photographer generality">
  <a
    class="profile__link link"
    href="./proDetails.html?photographerId=${photographer.id}"
  >
    <img class="link__image" src="img/photographersIDPhotos/${
      photographer.portrait
    }" alt="" aria-label="${photographer.name}"/>
    <h1 class="link__title">${photographer.name}</h1>
  </a>
  <div class="profile__describe describe">
    <p class="describe__location">${photographer.city}, ${
    photographer.country
  }</p>
    <p class="describe__quote">${photographer.tagline}</p>
    <p class="describe__price">${photographer.price}€/jour</p>
  </div>
  <div class="profile__filters filters">${constructFilterTags(
    photographer.tags
  )}</div>
</article>
  `;
}

function constructFilterTags(tags) {
  let filterTags = "";
  for (let i = 0; i < tags.length; i++) {
    let tag = tags[i];
    filterTags += ` 
      <a class="filters__profile" onKeyUp="filterByTagKeyUp(event,'${tag}')" onclick="filterByTag('${tag}')" tabindex="0">#${tag}</a>
    `;
  }
  return filterTags;
}

function filterByTag(tagName) {
  getPhotographers()
    .then((photographers) => {
      return photographers.filter((photographer) => {
        return photographer.tags.includes(tagName);
      });
    })
    .then((photographers) => {
      sectionPhotographer.innerHTML = "";
      for (let i = 0; i < photographers.length; i++) {
        let photographer = photographers[i];
        constructPhotographerHtml(photographer);
      }
    });
}

function filterByTagKeyUp(event, tagName) {
  if (event.keyCode === 13 || event.keyCode === 32) {
    filterByTag(tagName);
  }
}

// Header__link (return to the Main) appear

window.addEventListener("scroll", function () {
  let scrollValue =
    (window.innerHeight + window.scrollY) / document.body.offsetHeight;

  if (scrollValue > 0.7) {
    headerLink.style.display = "block";
  } else {
    headerLink.style.display = "none";
  }
});
