//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographerData() {
  try {
    // Récupérer les données du photographe à partir de l ID de l URL
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const response = await fetch(`http://127.0.0.1:5501/data/photographers.json`);
    const data = await response.json();
    const photographer = data.photographers.find(photographer => photographer.id == id);
    // Récupérer les photos du photographe
    const photos = data.media.filter(photo => photo.photographerId == id);
    console.log(photos)
    photographer.photos = photos;
    return photographer;
  } catch (error) {
    // Gérer les erreurs ici
    console.error(error);
  }
}

async function recupData() {
  // Récupérer les données sur le photographe et afficher le photographe
  const photographer = await getPhotographerData();
  displayPhotographer(photographer);
    // Récupérer les photos du photographe et les afficher
    const photos = photographer.photos;
    displayMedia(photos);
}

// Charger la page et appeler la fonction recupData
document.addEventListener('DOMContentLoaded', recupData);


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


function displayMedia(photos) {
  const gallery = document.querySelector('.photograph-gallery');
  photos.forEach(photo => {
    const grid = document.createElement('div');
    grid.innerHTML = `<img src="assets/images/${photo.image}" alt="${photo.title}" />`;
    gallery.appendChild(grid);
  });
}

// function mediaFactory(img){
//   const {image} = img;
//   const photos =`assets/images/${image}`;
//   function getImageDOM(){
//     const blocImage = document.createElement('div');
//     const img = document.createElement('img');
//     img.setAttribute('src', photos);
//     blocImage.appendChild(img);
//     return blocImage;
//   }
//   return {image,getImageDOM}
// }

