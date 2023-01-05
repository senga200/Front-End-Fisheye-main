function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}



//CONST FORMULAIRE
const contact = document.querySelector('#contact');

///////////////////VALIDATION PRENOM///////////////

function isValidFirst(){
  const prenomRegex = new RegExp(/^[a-zA-Z][a-zéèêçîï]+([-'\s][a-zA-Z][a-zéèêçîï]+)?/);
  const prenomManquant = document.getElementById("prenomManquant");
  const first = document.getElementById("first");
 
  if (first.value==""){
    prenomManquant.textContent = "Merci de renseigner votre prénom";  
    prenomManquant.style.color ="red";
    prenomManquant.style.fontSize = "14px";
    first.style.border = "1px solid red";
    return false;
  }
  if (prenomRegex.test(first.value)===false){
    prenomManquant.textContent = "Veuillez entrer 2 caractères ou plus pour le champ du prénom";
    prenomManquant.style.color ="red";
    prenomManquant.style.fontSize = "14px";
    first.style.border = "1px solid red";
    return false;
  } 
    prenomManquant.textContent ="Prénom Valide";
    prenomManquant.style.color ="green";
    prenomManquant.style.fontSize = "14px";
    first.style.border = "1px solid green";
    return true;
};

///////////////////VALIDATION NOM///////////////
function isValidLast(){
  const last  = document.getElementById("last");
  const nomManquant = document.getElementById("nomManquant");
  const nomRegex = /^[a-zA-Z][a-zéèêçîï]+([-'\s][a-zA-Z][a-zéèêçîï]+)?/;

  if (last.value==""){
    nomManquant.textContent = "Merci de renseigner votre nom";  
    nomManquant.style.color ="red";
    nomManquant.style.fontSize = "14px";
    last.style.border = "1px solid red";
    return false;
  } 
  if (nomRegex.test(last.value)===false){
    nomManquant.textContent = "Votre nom doit contenir au moins deux caractères";
    nomManquant.style.color ="red";
    nomManquant.style.fontSize = "14px";
    last.style.border = "1px solid red";
    return false;
  }
    nomManquant.textContent ="nom Valide";
    nomManquant.style.color ="green";
    nomManquant.style.fontSize = "14px";
    last.style.border = "1px solid green";
    return true;
  }

  ///////////////////VALIDATION EMAIL///////////////
function isValidEmail(){
    const email = document.getElementById("email");
    const mailManquant = document.getElementById("mailManquant");
    const mailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    if (email.value==""){
      mailManquant.textContent = "Merci de renseigner votre e-mail";  
      mailManquant.style.color ="red";
      mailManquant.style.fontSize = "14px";
      email.style.border = "1px solid red";
      return false;
    } 
    if (mailRegex.test(email.value)===false){
      mailManquant.textContent = "format incorrect";
      mailManquant.style.color ="red";
      mailManquant.style.fontSize = "14px";
      email.style.border = "1px solid red";
      return false;
    }
      mailManquant.textContent ="e-mail Valide";
      mailManquant.style.color ="green";
      mailManquant.style.fontSize = "14px";
      email.style.border = "1px solid green";
      return true;
    }  


///////////////////VALIDATION MESSAGE///////////////

function isValidMessage(){
    const messageManquant = document.getElementById("messageManquant");
    const message = document.getElementById("message");
   
    if (message.value==""){
        messageManquant.textContent = "Merci de saisir votre message";  
        messageManquant.style.color ="red";
        messageManquant.style.fontSize = "14px";
      message.style.border = "1px solid red";
      return false;
    }
    if (message.value.length < 10) {
        messageManquant.textContent = "Votre message doit contenir au moins 10 caractères";
        messageManquant.style.color = "red";
        messageManquant.style.fontSize = "14px";
        message.style.border = "1px solid red";
        return false;
      }
    messageManquant.textContent ="Message Valide";
    messageManquant.style.color ="green";
    messageManquant.style.fontSize = "14px";
      message.style.border = "1px solid green";
      return true;
  };

    //////////////////ADDEVENTLISTENER/////////////////////////
//ecouter la modification du prenom
contact.first.addEventListener('change', function(){
    isValidFirst(this); 
  });
  //ecouter la modification du prénom
  contact.last.addEventListener('change', function(){
    isValidLast (this);
  });
  //ecouter la modification du mail
  contact.email.addEventListener('change', function(){
    isValidEmail (this);
  });
  //ecouter la modification du message
  contact.message.addEventListener('change', function(){
 isValidMessage(this);
  });
 

  //ecouter la soumission du formulaire
contact.addEventListener('submit', function(e){
    const modalBox = document.querySelector(".modalBox");
    const h2Header = document.querySelector(".titre");
    
      e.preventDefault();
      if 
      (isValidFirst()
      &&isValidLast()
      &&isValidEmail()
      && isValidMessage()
      )
{
    console.log(contact.elements.first.value);
    console.log(contact.elements.last.value);
    console.log(contact.elements.email.value);
    console.log(contact.elements.message.value);
h2Header.innerHTML="Merci pour votre message.";
 modalBox.style.display="block";  
  contact.style.display = "none";
}});


