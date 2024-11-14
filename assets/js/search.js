// Sélectionne la barre de recherche par son identifiant
const searchbar = document.getElementById('search');

// Fonction qui est appelée pour mettre à jour les résultats de la recherche
function updateSearch() {
    // Récupère la valeur actuelle de la barre de recherche
    const searchbar = document.getElementById('search');
    var search = searchbar.value.toLowerCase(); // Convertit la valeur en minuscules pour une comparaison insensible à la casse

    // Si la recherche contient au moins 3 caractères, on effectue la recherche
    // Sinon, on appelle `getRecettes('')` pour afficher toutes les recettes
    if ((search) && (search.length >= 3)) {
        getRecettes(search);  // Appelle la fonction `getRecettes` en passant le texte de la recherche comme filtre
    } else {
        getRecettes('');  // Appelle `getRecettes` avec une chaîne vide pour réinitialiser les résultats
    }
}

// Ajoute un écouteur d'événement sur la barre de recherche qui déclenche la mise à jour à chaque saisie de l'utilisateur
searchbar.addEventListener('input', function() {
    updateSearch()  // Appelle la fonction `updateSearch` chaque fois que l'utilisateur tape quelque chose dans la barre de recherche
})
