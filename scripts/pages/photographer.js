//Mettre le code JavaScript lié à la page photographer.html
//variables lightbox
const modalLightBox = document.querySelector("#lightBox_Modal");
    const content = document.querySelector(".lightBoxContent");
//variables slider
let indexCourant = 0;
let photos=[];
const suivant = document.querySelector(".suivant");
const precedent = document.querySelector(".precedent");
//variables galerie
const gallery = document.querySelector(".photograph-gallery");
const children = gallery.children;

////////////////////////////////////////////////
let photographerPrice;
async function getPhotographerData() {
  try {
    // Récupérer les données du photographe à partir de l ID de l URL
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const response = await fetch("https://senga200.github.io/Front-End-Fisheye-main/data/photographers.json");
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
     // Récupérer le nom du photographe et l'ajouter au formulaire
  const nom = document.querySelector(".nom");
  nom.innerHTML = photographer.name;
}
////////////////////////////////////////////////
// Charger la page et appeler la fonction recupData
document.addEventListener("DOMContentLoaded", recupData);


//ecoute sur le clic 
suivant.addEventListener("click",() => {
  if (indexCourant >= photos.length - 1) {
      indexCourant = 0;
  } else {
    indexCourant++;
  }
  openLightBox(photos, indexCourant);
});
precedent.addEventListener("click", () => {
  if (indexCourant <= 0) {
    indexCourant = photos.length - 1;
  } else {
    indexCourant--;
  }
  openLightBox(photos, indexCourant);
});
//  ecoute sur le clavier /droite/gauche
document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowLeft") {
    precedent.click();
  } else if(e.key === "ArrowRight") {
    suivant.click();
  }
}); 
//"Echap"
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { 
    closeLightBox();
  }
});
//ENTER 
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") { 
    openLightBox(photos, indexCourant);
  }
});


//////AFFICHAGE DE LA GALERIE = PHOTOS + LIKES///////////
function displayMedia() {
  //mettre le compteur à 0
  let totalCompteur = 0;
  photos.forEach((photo, index) => {
    //grid : chaque bloc photo de la galerie
    const grid = document.createElement("div");
    grid.style.cursor ="pointer";
    const infoPhoto = document.createElement("div");
    infoPhoto.innerHTML = `<h4>${photo.title}</h4>`;
    infoPhoto.style.display = "flex";
    infoPhoto.style.justifyContent = "space-around";
    infoPhoto.style.alignItems = "center";
    infoPhoto.style.padding = "0";
    //chq boucle ajoute les likes d'une photo à total compteur
    //soit totalCompteur = totalCompteur + photo.likes;
    totalCompteur += photo.likes;
    let alreadyClicked = false;
    const blocPriceLikes = document.querySelector(".priceLikes");
    const totalLikes = document.querySelector(".totalLikes");
    //premier affichage
    totalLikes.innerHTML = totalCompteur + " ❤ " + photographerPrice + " € / jour ";
    //heart : coeur de la photo
    const heart = document.createElement("span");
    heart.style.cursor = "pointer";
    heart.innerHTML = "❤" + photo.likes;
    heart.addEventListener("click", function () {
      //si ce n'est pas cliqué, on peut ajouter+1
      if (!alreadyClicked) {
        //ajoute un like à la photo (alreadyClicked = 1fois = true)
        photo.likes++;
        totalCompteur ++;
        totalLikes.innerHTML = totalCompteur + " ❤ " + photographerPrice + " € / jour ";
        heart.innerHTML = "❤" + photo.likes;
        alreadyClicked = true;  
      }
    });//ecoute au clavier
    grid.setAttribute("aria-label","tapez + pour liker");
    grid.addEventListener("keydown", function(e) {
      if(e.key === "+") {
          if (!alreadyClicked) {
              photo.likes++;
              totalCompteur ++;
              totalLikes.innerHTML = totalCompteur + " ❤ " + photographerPrice + " € / jour ";
              heart.innerHTML = "❤" + photo.likes;
              alreadyClicked = true;  
          }
      }
  });
  
//ajoute photo ou video dans un bloc image (grid)
    if (photo.image) {
      grid.innerHTML = `<img src="assets/images/${photo.image}" alt="${photo.title}" />`;
    } else if (photo.video) {
      grid.innerHTML = `<video src="assets/images/${photo.video}" alt="${photo.title}" controls>`;
    }
//au clic sur un bloc image, ouverture de la lightBox
    grid.querySelector("img, video").addEventListener("click", () => {
      openLightBox(photos, index);
    });
    gallery.appendChild(grid);
    grid.setAttribute("tabindex", "1");
    grid.appendChild(infoPhoto);
    infoPhoto.appendChild(heart);
    blocPriceLikes.appendChild(totalLikes);
  });
}

///////////AFFICHAGE DE LA LIGHTBOX/////////////////////
const fermer= document.querySelector(".close");

function openLightBox(photos, index) {
  const photo = photos[index];
  let url;
  if (photo.image) {
    url = `assets/images/${photo.image}`;
    content.innerHTML = `<img src="${url}" alt="${photo.title}"/><h4>${photo.title}</h4>`;
  } else if (photo.video) {
    url = `assets/images/${photo.video}`;
    content.innerHTML = `<video src="${url}" alt="${photo.title}" controls></video><h4>${photo.title}</h4>`;
  }
  modalLightBox.style.display = "block";
}

function closeLightBox() {
  modalLightBox.style.display = "none";
}

function closeLightBox() {
  const modalLightBox = document.querySelector("#lightBox_Modal");
  modalLightBox.style.display = "none";
}

///////////////TRI//////////////////////

//vider la galerie avant d'afficher la galerie triée cf innerHTML="" ou remove  juste avant de les réafficher
const select = document.getElementById("selector");
select.addEventListener("change", () => {
  const selectedOption = select.value;
  indexCourant =[0];

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
        }
        while (children.length > 0) {     
          children[0].remove();
        }
        displayMedia();
          });

          ////////////////////////////////////////////////

