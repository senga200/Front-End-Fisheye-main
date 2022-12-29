
async function getPhotographer(id) {
  try {
    const response = await fetch("http://127.0.0.1:5501/data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(photographer => photographer.id === id);
    //FONCTION CLASSIQUE
    // const photographer = data.photographers.find(function(photographer) {
    //   if (photographer.id === id) {
    //     return true;
    //   } else {
    //     return false;
    //   }});
    const photographerDetail = photographerFactory(photographer);
    const photographerElement = photographerDetail.getUserCardDOM();
    // Ajout de l'élément au conteneur dans l'élément main
    const main = document.getElementById('main');
    const photographerSection = main.querySelector('.photographer_section');
    photographerSection.appendChild(photographerElement);
  } catch (error) {
    console.error(error);
  }
}

async function getPhotographers() {
  try {
    const response = await fetch("http://127.0.0.1:5501/data/photographers.json");
    const data = await response.json();
    data.photographers.forEach(photographer => {
      getPhotographer(photographer.id);
    });
  } catch (error) {
    console.error(error);
  }
}

getPhotographers(); // Affiche tous les photographes dans le DOM






