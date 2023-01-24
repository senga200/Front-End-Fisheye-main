function photographerFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;
 

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.style.textAlign = "center";
    const link = document.createElement("a");
    link.setAttribute("href", `photographer.html?id=${id}`);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("aria-label", `En savoir plus sur ${name}`);
    const h2 = document.createElement("h2");
    h2.textContent = `${name}`;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const p3 = document.createElement("p");
    p3.textContent = `${tagline}`;
    const p4 = document.createElement("p");
    p4.textContent = `${price}€/jour`;
    article.appendChild(link);
    link.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p3);
    article.appendChild(p4);
    return article;
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM };
}


function mediaFactory(photographer) {
  // Sélectionner la div photograph-header et styliser

  const header = document.querySelector(".photograph-header");
  header.style.display="flex";
  header.style.justifyContent = "space-around";
  header.style.alignItems = "center";
  // Créer des nouvelles div
  const blocGauche = document.createElement("div");
  blocGauche.innerHTML = `<h1>${photographer.name}</h1>
      <h2>${photographer.city}, ${photographer.country}</h2>
      <p>${photographer.tagline}</p>`;
  const blocCentre = document.createElement("div");
  const contact = document.querySelector(".contact_button");
  const blocDroit = document.createElement("div");
  blocDroit.innerHTML =  `<img src="assets/photographers/${photographer.portrait}" alt="${photographer.name}" />`;
  // Ajouter les nouvelles div à l'intérieur de photograph-header
  header.appendChild(blocGauche);
  header.appendChild(blocCentre);
  header.appendChild(blocDroit);
  blocCentre.appendChild(contact);
}
