//Mettre le code JavaScript lié à la page photographer.html


function displayPhotographer(photographer) {
  // Sélectionner la div photograph-header
  const header = document.querySelector('.photograph-header');

  // Mettre à jour le contenu de la div
  header.innerHTML = `
    <img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" />
    <h1>${photographer.name}</h1>
    <h2>${photographer.tagline}</h2>
    <p>${photographer.city}, ${photographer.country}</p>
  `;
}

async function getPhotographerData() {
  try {
    // Récupérer les données sur le photographe à partir de l'ID de l'URL
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const response = await fetch(`http://127.0.0.1:5501/data/photographers.json`);
    const data = await response.json();
    const photographer = data.photographers.find(photographer => photographer.id == id);
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
  return { name, picture, id, city, country, tagline, price, getUserCardDOM }
}

