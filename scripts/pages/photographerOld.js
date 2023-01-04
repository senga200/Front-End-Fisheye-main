//Mettre le code JavaScript lié à la page photographer.html


function displayPhotographer(photographer) {
    // Sélectionner la div photograph-header et styliser
    const header = document.querySelector('.photograph-header');
    header.style.display="flex";
    header.style.justifyContent = "space-around";
    header.style.alignItems = "center";
  
    // Créer des nouvelles div
    const blocGauche = document.createElement('div');
    blocGauche.innerHTML = `<h1>${photographer.name}</h1>
        <h2>${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p>`;
    const blocCentre = document.createElement('div');
    const contact = document.querySelector(".contact_button");
    const blocDroit = document.createElement('div');
    blocDroit.innerHTML =  `<img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" />`;
  
    // Ajouter les nouvelles div à l'intérieur de photograph-header
    header.appendChild(blocGauche);
    header.appendChild(blocCentre);
    header.appendChild(blocDroit);
    blocCentre.appendChild(contact);
  }
  
  async function getPhotographerData() {
    try {
      // Récupérer les données sur le photographe à partir de l'ID de l'URL
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      const response = await fetch(`http://127.0.0.1:5501/data/photographers.json`);
      const data = await response.json();
      const photographer = data.photographers.find(photographer => photographer.id == id);
      const photos = data.media.filter(photo => photo.photographerId == id);
      photographer.photos = photos;
      return photographer;
    } catch (error) {
      // Gérer les erreurs ici
      console.error(error);
    }
  }
  
  function displayMedia(media) {
    const gallery = document.querySelector('.photograph-gallery');
  
    media.photos.forEach(photo => {
      const grid = document.createElement('div');
      grid.innerHTML = `<img src="assets/images/${photo.image}" alt="${photo.title}" />`;
      gallery.appendChild(grid);
    });
  }
  
  
  async function recupData() {
    // Récupérer les données sur le photographe et afficher le photographe
    const photographer = await getPhotographerData();
    displayPhotographer(photographer);
  }
  
  // Charger la page et appeler la fonction recupData
  document.addEventListener('DOMContentLoaded', recupData);
  
  
   function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
      const article = document.createElement('article');
      const link = document.createElement('a');
      link.setAttribute('href', `photographer.html?id=${id}`);
      link.textContent = `lien`;
      const img = document.createElement('img');
      img.setAttribute('src', picture);
      const h2 = document.createElement('h2');
      h2.textContent = `${name}`;
      const p1 = document.createElement('p');
      p1.textContent = `ID: ${id}`;
      const p2 = document.createElement('p');
      p2.textContent = `Location: ${city}, ${country}`;
      const p3 = document.createElement('p');
      p3.textContent = `Tagline: ${tagline}`;
      const p4 = document.createElement('p');
      p4.textContent = `Price: ${price}`;
      article.appendChild(link);
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(p1);
      article.appendChild(p2);
      article.appendChild(p3);
      article.appendChild(p4);
      return article;
    }
    return { name, picture, id, city, country, tagline, price, getUserCardDOM } }
  
  function mediaFactory(img){
    const {image} = img;
    const photos =`assets/images/${image}`;
    function getImageDOM(){
      const blocImage = document.createElement('div');
      const img = document.createElement('img');
      img.setAttribute('src', photos);
      blocImage.appendChild(img);
      return blocImage;
    }
    return {image,getImageDOM}
  }
  
  
  function displayMedia(media){
    const gallery = document.querySelector(".photograph-gallery");
    const grid = document.createElement('div');
    grid.innerHTML = `<img src="assets/images/${media.image}" alt="${media.name}" />`;
  gallery.appendChild(grid);
  }
  
  async function getMedia() {
    try {
      // Récupérer tous les médias à partir du fichier JSON
      const response = await fetch(`http://127.0.0.1:5501/data/photographers.json`);
      const data = await response.json();
      const media = data.media;
      return media;
    } catch (error) {
      // Gérer les erreurs ici
      console.error(error);
    }
  }
  
  
  
  async function recupMedia(){
    const media = await getMedia();
    displayMedia(media);
  }
  
  document.addEventListener('DOMContentLoaded',recupMedia);
  
  