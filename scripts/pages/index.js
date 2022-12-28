
async function getPhotographer(id) {
  try {
    const response = await fetch("http://127.0.0.1:5501/data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(p => p.id === id);
    const photographerObject = photographerFactory(photographer);
    const photographerElement = photographerObject.getUserCardDOM();
    document.body.appendChild(photographerElement);
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






