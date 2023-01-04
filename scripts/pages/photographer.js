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


function displayMedia(photos) {
  const gallery = document.querySelector('.photograph-gallery');
  gallery.style.display="grid";
  gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
  gallery.style.gridRowGap = '60px';
  photos.forEach(photo => {
    const grid = document.createElement('div');
    if (photo.image) {
      // C'est une image
      grid.innerHTML = `<img src="assets/images/${photo.image}" alt="${photo.title}" />`;
    } else if (photo.video) {
      // C'est une vidéo
      grid.innerHTML = `<video src="assets/images/${photo.video}" alt="${photo.title}" controls></video>`;
    }
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

