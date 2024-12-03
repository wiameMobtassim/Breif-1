// Sélection des éléments nécessaires
const slides = document.querySelectorAll('.image-container'); // Les images
const leftArrow = document.querySelector('.left-arrow'); // Flèche gauche
const rightArrow = document.querySelector('.right-arrow'); // Flèche droite

let currentIndex = 0; // Index de l'image active

// Fonction pour mettre à jour l'affichage du slider
function updateSlider() {
  // Masquer toutes les images et désactiver leur état actif
  slides.forEach((slide, index) => {
    slide.classList.remove('active');
    if (index === currentIndex) {
      slide.classList.add('active');// Met à jour le texte correspondant à l'image
      
    }
  });
}

// Navigation vers l'image précédente
leftArrow.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Retourne à la dernière image si on dépasse
  updateSlider();
});

// Navigation vers l'image suivante
rightArrow.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length; // Retourne à la première image si on dépasse
  updateSlider();
});

// Initialisation : affiche la première image et son texte
updateSlider();

// Déclarations des variables
const prixUnitaire = 60.00; // Prix unitaire
const totalInput = document.getElementById('total');
const quantiteInput = document.getElementById('quantite');
const codePostalInput = document.getElementById('codePostal');
const numeroInput = document.getElementById('numero');
const boutonCommande = document.querySelector('.submit-btn');
const tableauBody = document.getElementById('liste-ordonner');
const boutonAnnuler = document.getElementById('FormAnnuler');
const produitSelect = document.getElementById('prdt'); 

// Met à jour le total dynamiquement en fonction de la quantité
quantiteInput.addEventListener('input', function () {
    const quantite = parseInt(this.value) || 1; // Par défaut à 1 si vide
    totalInput.value = (prixUnitaire * quantite).toFixed(2); // Formater avec 2 décimales
});

// Validation du code postal pour s'assurer qu'il s'agit de 5 chiffres
codePostalInput.addEventListener('input', function() {
    const codePostal = this.value;
    if (isNaN(codePostal) || codePostal.length > 5) {
        alert('Vous ne devez saisir que 5 chiffres numériques !');
        this.value = codePostal.slice(0, 5); // Limiter à 5 chiffres
    }
});

// Validation du numéro de téléphone pour s'assurer qu'il s'agit de 10 chiffres
numeroInput.addEventListener('input', function() {
    const numero = this.value;
    if (isNaN(numero) || numero.length > 10) {
        alert('Vous devez saisir seulement 10 chiffres');
        this.value = numero.slice(0, 10); // Limiter à 10 chiffres
    }
});

// Fonction pour ajouter les données au tableau
boutonCommande.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs des champs du formulaire
    const nomPrenom = document.getElementById('nomprenom').value.trim();
    const email = document.getElementById('email').value.trim();
    const adresse = document.getElementById('adresse').value.trim();
    const numero = numeroInput.value.trim();
    const quantite = parseInt(quantiteInput.value.trim()) || 0;
    const total = parseFloat(totalInput.value.trim()) || 0;
    const produit = produitSelect.options[produitSelect.selectedIndex].text; // Texte du produit sélectionné

    // Vérification que les champs ne sont pas vides et que la quantité et le total sont valides
    if (!nomPrenom || !email || !adresse || !numero || isNaN(quantite) || quantite <= 0 || isNaN(total)) {
        alert("Veuillez remplir tous les champs correctement !");
        return;
    }
    // Vérification que l'email contient '@'
    if (!email.includes('@')) {
        alert("Veuillez entrer une adresse e-mail valide contenant '@'.");
        return;
    }
    // Vérification que le produit est sélectionné
    if (produitSelect.value === "Selection") {
      alert("Veuillez sélectionner un produit !");
      return;
  }

    // Créer une nouvelle ligne pour le tableau
    const nouvelleLigne = document.createElement('tr');

    // Ajouter des cellules avec les données
    nouvelleLigne.innerHTML = `
        <td>${nomPrenom.split(' ')[0]}</td>
        <td>${nomPrenom.split(' ')[1] || ''}</td>
        <td>${email}</td>
        <td>${adresse}</td>
        <td>${numero}</td>
        <td>${quantite}</td>
        <td>${produit}</td>
        <td>${(prixUnitaire * quantite).toFixed(2)} DH</td>
        <td>${total.toFixed(2)} DH</td>
    `;

    // Ajouter la nouvelle ligne au tableau
    tableauBody.appendChild(nouvelleLigne);

    // Réinitialiser le formulaire
    document.querySelector('form').reset();
    totalInput.value = "0";
    alert("Commande ajoutée avec succès !");
});

// Fonction pour réinitialiser le tableau lorsque le bouton "Annuler" est cliqué
boutonAnnuler.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Supprimer toutes les lignes du tableau
    tableauBody.innerHTML = '';

    // Réinitialiser le formulaire
    document.querySelector('form').reset();
    totalInput.value = "0";

    alert("Toutes les commandes ont été supprimées !");
});
