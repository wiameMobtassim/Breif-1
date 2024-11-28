// Déclarations des variables
const prixUnitaire = 60.00; // Prix unitaire
const totalInput = document.getElementById('total');
const quantiteInput = document.getElementById('quantite');
const codePostalInput = document.getElementById('codePostal');
const numeroInput = document.getElementById('numero');

// Met à jour le total dynamiquement en fonction de la quantité
quantiteInput.addEventListener('input', function () {
    const quantite = parseInt(this.value) || 1; // Par défaut à 1 si vide
    totalInput.value = (prixUnitaire * quantite).toFixed(2) + " DH"; // Formater avec 2 décimales
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