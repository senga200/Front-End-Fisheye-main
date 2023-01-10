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
    photographer.photos = photos;
    return photographer;
  } 
  catch (error) {
    console.error(error);
  }
}

async function recupData() {
  // Récupérer les données sur le photographe et afficher le photographe
  const photographer = await getPhotographerData();
  mediaFactory(photographer);
    // Récupérer les photos du photographe et les afficher
    const photos = photographer.photos;
    displayMedia(photos);
}

// Charger la page et appeler la fonction recupData
document.addEventListener('DOMContentLoaded', recupData);
//variables slider
let index = 0;
let photos;
//variables galerie
const gallery = document.querySelector('.photograph-gallery');
gallery.style.display="grid";
gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
gallery.style.gridRowGap = '60px';
gallery.style.color= "#901C1C";



function displayMedia(photos) {
// fleches suivant/precedent du slider
  const suivant = document.querySelector(".suivant");
  const precedent = document.querySelector(".precedent");

  suivant.addEventListener('click', () => {
    index++;
    if (index >= photos.length) {
      index = 0;
    }
    displayLightBox(photos, index);
  });
  
  precedent.addEventListener('click', () => {
    index--;
    if (index < 0) {
      index = photos.length - 1;
    }
    displayLightBox(photos, index);
  });
  

  photos.forEach((photo, index) => {

    const grid = document.createElement('div');
    if (photo.image) {
      // image
      grid.innerHTML = `<img src="assets/images/${photo.image}" alt="${photo.title}" /><h4>${photo.title}</h4>`;
    } else if (photo.video) {
      // vidéo
      grid.innerHTML = `<video src="assets/images/${photo.video}" alt="${photo.title}" controls></video><h4>${photo.title}</h4>`;
    }
        // Ajouter un événement clic sur chaque élément img ou video
        grid.querySelector('img, video').addEventListener('click', () => {
          displayLightBox(photos, index);
        });

    gallery.appendChild(grid);
  });
}


function displayLightBox(photos, index) {
    const photo = photos[index];
    let url ;
    if (photo.image) {
      url = `assets/images/${photo.image}`;
     } else if (photo.video) {
      url = `assets/images/${photo.video}`;
     }
    const modalLightBox = document.querySelector('#lightBox_Modal');
    const content = document.querySelector('.lightBoxContent');
    content.innerHTML = `<img src="${url}" alt="" />`;
    modalLightBox.style.display = 'block';
  }


function closeLightBox() {
  const modalLightBox = document.querySelector('#lightBox_Modal');
  modalLightBox.style.display = "none";
}

