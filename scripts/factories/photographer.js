
function photographerFactory(data) {
    const { name, portrait, id, city, country, tagline, price } = data;
  
    const picture = `assets/photographers/${portrait}`;
  
    function getUserCardDOM() {
      const article = document.createElement('article');
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







// CODE OPEN CLASSROOM

//function photographerFactory(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }
