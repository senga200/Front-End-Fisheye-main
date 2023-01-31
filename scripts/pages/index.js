async function getPhotographer(photographer) {
  try {
    const photographerDetail = photographerFactory(photographer);
    const photographerElement = photographerDetail.getUserCardDOM();
    // Ajout de l'élément au conteneur dans l'élément main
    const main = document.getElementById("main");
    const photographerSection = main.querySelector(".photographer_section");
    photographerSection.appendChild(photographerElement);
  } catch (error) {
    console.error(error);
  }
}

async function getPhotographers() {
  try {
    const response = await fetch("https://senga200.github.io/Front-End-Fisheye-main/data/photographers.json");
    const data = await response.json();
    data.photographers.forEach(photographer => {
      getPhotographer(photographer);
      //console.table(data.photographers);
    });
  } catch (error) {
    console.error(error);
  }
}
getPhotographers(); // Affiche tous les photographes dans le DOM


 