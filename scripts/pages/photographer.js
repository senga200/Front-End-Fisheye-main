//Mettre le code JavaScript lié à la page photographer.html

//variables slider
let index = 0;
let photos=[];
const suivant = document.querySelector(".suivant");
const precedent = document.querySelector(".precedent");
//variables galerie
const gallery = document.querySelector('.photograph-gallery');
gallery.style.display="grid";
gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
gallery.style.gridRowGap = '60px';
gallery.style.columnGap = '110px';
gallery.style.color= "#901C1C";


////////////////////////////////////////////////
let photographerPrice;
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
    photographerPrice = photographer.price;
    return photographer;
  } 
  catch (error) {
    console.error(error);
  }
}
///////////////////////////////////////////////
async function recupData() {
  // Récupérer les données sur le photographe et afficher le photographe
  const photographer = await getPhotographerData();
  mediaFactory(photographer);
    // Récupérer les photos du photographe et les afficher
     photos = photographer.photos;
    displayMedia(photos);
    
}
////////////////////////////////////////////////
// Charger la page et appeler la fonction recupData
document.addEventListener('DOMContentLoaded', recupData);
//ecoute sur le clic 
suivant.addEventListener('click',() => {
  if (index >= photos.length) {
      index = 0;
  }
    index++;
        displayLightBox(photos, index);
});
precedent.addEventListener('click', () => {
  if (index < 0) {
    index = photos.length - 1;
  }
  index--;
        displayLightBox(photos, index);
});
//  ecoute sur le clavier /droite/gauche
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    precedent.click();
  } else if(e.key === "ArrowRight") {
    suivant.click();
  }
        displayLightBox(photos, index);
});
//"Echap"
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { 
        closeLightBox();
  }
});
//
////////////////////////////////////////////////

////////////////////////////////////////////////
let totalCompteur = 0;
function displayMedia() {
  photos.forEach((photo, index) => {
    const grid = document.createElement('div');
    const infoPhoto = document.createElement('div');
    const price = document.querySelector('.price');
    price.innerHTML = `test`;
    infoPhoto.innerHTML = `<h4>${photo.title}</h4>`;
    infoPhoto.style.display ="flex";
    infoPhoto.style.justifyContent ="space-between";
    infoPhoto.style.alignItems = "center";
    infoPhoto.style.padding = "0";
    let totalCompteur = `${photo.likes}`;
    let alreadyClicked = false;

    function compteurLikes(likes) {
      const totalLikes = document.querySelector('.totalLikes');
      totalLikes.style.border ="solid 1px red";
      let compteur = likes; 
      const heart = document.createElement('span');
      heart.style.cursor="pointer";
      //compteur sous chq photo
      heart.innerHTML = "❤" + compteur;
      heart.addEventListener("click", function(){
        if (!alreadyClicked) {
          compteur++;
          totalCompteur++;
          totalLikes.innerHTML = totalCompteur + " ❤" + photographerPrice +" € / jour "; 
          heart.innerHTML = "❤" + compteur;
          alreadyClicked = true;
        }  
      });
      return heart;
    }
    
      if (photo.image) {
      // image
      grid.innerHTML = `<img src="assets/images/${photo.image}" alt="${photo.title}" />`;
      } else if (photo.video) {
      // vidéo
      grid.innerHTML = `<video src="assets/images/${photo.video}" alt="${photo.title}"controls>`;
      }
      // Ajouter un événement clic sur chaque élément img ou video
      grid.querySelector('img, video').addEventListener('click', () => {
          displayLightBox(photos, index);
      });
            gallery.appendChild(grid);
            grid.appendChild(infoPhoto);
            infoPhoto.appendChild(compteurLikes(totalCompteur));
  });
}

////////////////////////////////////////////////
function compteurLikes(){
  let compteur = 0; 
  const likes = document.createElement('span');
  likes.innerHTML = "❤" + compteur;
  likes.addEventListener("click", function(){
    if (compteur < 1) {
      compteur++;
      likes.innerHTML = "❤" + compteur;
    }
  });
  return likes;
}

////////////////////////////////////////////////
function displayLightBox(photos, index) {
  const photo = photos[index];
  let url;
  if (photo.image) {
    url = `assets/images/${photo.image}`;
    const content = document.querySelector('.lightBoxContent');
    content.innerHTML = `<img src="${url}" alt="${photo.title}"/><h4>${photo.title}</h4>`;
  } else if (photo.video) {
    url = `assets/images/${photo.video}`;
    const content = document.querySelector('.lightBoxContent');
    content.innerHTML = `<video src="${url}" alt="${photo.title}"controls><h4>${photo.title}</h4>`;
  }
  const modalLightBox = document.querySelector('#lightBox_Modal');
  modalLightBox.style.display = 'block';
}

////////////////////////////////////////////////
function closeLightBox() {
  const modalLightBox = document.querySelector('#lightBox_Modal');
  modalLightBox.style.display = "none";
}
///////////////////////////////////////////////

//vider la galerie avant d'afficher la galerie triée cf innerHTML="" ou remove  juste avant de les réafficher
const select = document.getElementById('selector');
select.addEventListener('change', () => {
 // const gallery = document.querySelector('.photograph-gallery');
  const selectedOption = select.value;

    switch(selectedOption) {
        case "popularite":
          photos.sort(function(a, b) {
            if (a.likes < b.likes) {
              return 1;
            }
            if (a.likes > b.likes) {
              return -1;
            }
            return 0;
          });
    
            break;
        case "Date":
          photos.sort(function(a, b) {
            if (a.date < b.date) {
              return -1;
            }
            if (a.date > b.date) {
              return 1;
            }
            return 0;
          });
            break;
        case "Titre":
          photos.sort(function(a, b) {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
          break;
        }const gallery = document.querySelector('.photograph-gallery');
        const children = gallery.children;
        while (children.length > 0) {
          children[0].remove();
        }
        
        displayMedia();
          });
          
