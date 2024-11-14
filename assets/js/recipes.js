// L'URL où se trouve le fichier JSON des recettes
const recipesJSON = 'https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json'

// Fonction pour mettre à jour le nombre de recettes affichées
function updateNombreRecette(){
    // Sélectionne l'élément qui contient la liste des recettes
    const listeRecette = document.querySelector('.listeRecette')
    // Sélectionne l'élément où le nombre de recettes sera affiché
    const nombreRecette = document.getElementById('nombreRecettes')
    
    // Met à jour l'élément avec le nombre de recettes dans la liste
    if (listeRecette.querySelectorAll('.recette').length == 1) {
        nombreRecette.innerHTML = listeRecette.querySelectorAll('.recette').length + " recette";
    } else {
        nombreRecette.innerHTML = listeRecette.querySelectorAll('.recette').length + " recettes";
    }
}

// Fonction pour obtenir tous les ingrédients d'une recette et les formater en HTML
function tousLesIngredients(recette){
    var listeIngredients = "<div class='listeIngredients'>"; // On commence une div contenant la liste des ingrédients
    // Pour chaque ingrédient dans la recette, on crée une ligne HTML pour l'afficher
    recette.ingredients.forEach(ingredient => {
        listeIngredients += "<p>" + ingredient.ingredient
        if (ingredient.quantity) { // Si une quantité est spécifiée, on l'affiche aussi
            listeIngredients += "<br/><span>" + ingredient.quantity;
            if (ingredient.unit) { // Si une unité est spécifiée, on l'ajoute
                listeIngredients += " " + ingredient.unit;
            }
            listeIngredients += "</span>"
        }
        listeIngredients += "</p>"
    })
    // On retourne la div contenant tous les ingrédients
    return listeIngredients + "</div>"
}

// Fonction pour récupérer tous les noms d'ingrédients à partir du fichier JSON
function tousLesNomsIngredients() {
    return new Promise((resolve, reject) => {
        var noms = [];
        fetch(recipesJSON)
            .then(response => {
                // Si la réponse est ok, on passe à l'étape suivante
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json(); // Parse la réponse JSON
            })
            .then(data => {
                // Pour chaque recette dans le fichier JSON
                data.forEach(recette => {
                    // Pour chaque ingrédient dans la recette
                    recette.ingredients.forEach(ingredient => {
                        noms.push(ingredient.ingredient); // On ajoute l'ingrédient à notre tableau
                    });
                });
                resolve(noms);  // Résoudre la promesse avec la liste des noms d'ingrédients
            })
            .catch(error => {
                console.error('Erreur:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            });
    });
}

// Fonction pour récupérer tous les noms d'appareils (ustensiles) à partir du fichier JSON
function tousLesNomsAppareils() {
    return new Promise((resolve, reject) => {
        var noms = [];
        fetch(recipesJSON)
            .then(response => {
                // Si la réponse est ok, on passe à l'étape suivante
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json(); // Parse la réponse JSON
            })
            .then(data => {
                // Pour chaque recette dans le fichier JSON
                data.forEach(recette => {
                    noms.push(recette.appliance); // On ajoute l'appareil (appareil de la recette) à notre tableau
                });
                resolve(noms);  // Résoudre la promesse avec la liste des noms d'appareils
            })
            .catch(error => {
                console.error('Erreur:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            });
    });
}

// Fonction pour récupérer tous les noms d'ustensiles à partir du fichier JSON
function tousLesNomsUstensiles() {
    return new Promise((resolve, reject) => {
        var noms = [];
        fetch(recipesJSON)
            .then(response => {
                // Si la réponse est ok, on passe à l'étape suivante
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json(); // Parse la réponse JSON
            })
            .then(data => {
                // Pour chaque recette dans le fichier JSON
                data.forEach(recette => {
                    // Pour chaque ustensile dans la recette
                    recette.ustensils.forEach(ustensil => {
                        noms.push(ustensil); // On ajoute l'ustensile à notre tableau
                    });
                });
                resolve(noms);  // Résoudre la promesse avec la liste des noms d'ustensiles
            })
            .catch(error => {
                console.error('Erreur:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            });
    });
}

// Fonction pour récupérer et filtrer les recettes selon les filtres sélectionnés
function getRecettes(filter = '') {
    // Sélection des éléments nécessaires à partir du DOM
    const listeRecette = document.querySelector('.listeRecette')
    const filtresIngredients = document.querySelectorAll('.ingredient');
    const filtresAppareils = document.querySelectorAll('.appareil');
    const filtresUstensiles = document.querySelectorAll('.ustensile');
    
    fetch(recipesJSON)
        .then(response => {
            // Vérifie la validité de la réponse
            if (!response.ok) {
            throw new Error('Erreur de réseau');
            }
            return response.json(); // Parse la réponse JSON
        })
        .then(async data => {
            recettes = ''; // Variable pour stocker les recettes filtrées
            data.forEach(recette => {
                // Déclaration des listes pour la recette actuelle
                ingredientsListe = recette.ingredients;
                appareil = convertirSingulier(recette.appliance);
                ustensilesListe = recette.ustensils;
                listeFiltreIngredient = '';
                listeFiltreAppareil = '';
                listeFiltreUstensile = '';
                listeNomIngredients = ''; 
                listeNomIngredientsSingulier = '';
                listeNomUstensilesSingulier = '';

                // Ajouter les filtres sélectionnés aux listes
                ingredientsListe.forEach(ingredient => {
                    listeNomIngredients += ingredient.ingredient + ' | ';
                    listeNomIngredientsSingulier += convertirSingulier(ingredient.ingredient) + ' | ';
                });

                ustensilesListe.forEach(ustensile => {
                    listeNomUstensilesSingulier += convertirSingulier(ustensile) + ' | ';
                });

                filtresIngredients.forEach(filtre => {
                    listeFiltreIngredient += convertirSingulier(filtre.innerHTML) + ' | ';
                });
                filtresAppareils.forEach(filtre => {
                    listeFiltreAppareil += convertirSingulier(filtre.innerHTML) + ' | ';
                });
                filtresUstensiles.forEach(filtre => {
                    listeFiltreUstensile += convertirSingulier(filtre.innerHTML) + ' | ';
                });
                
                // Vérification des filtres appliqués
                if ((recette.name.toLowerCase().includes(filter)) || (recette.description.toLowerCase().includes(filter)) || (listeNomIngredients.toLowerCase().includes(filter))) {
                    // Vérification si tous les filtres sont présents dans la recette
                    if ((MotsSimilaires(listeFiltreIngredient, listeNomIngredientsSingulier)) && (MotsSimilaires(listeFiltreAppareil, appareil)) && (MotsSimilaires(listeFiltreUstensile, listeNomUstensilesSingulier))) {
                        // Définition de la carte pour afficher la recette
                        recettes += "<div class='recette'>" +
                    
                        "<img src='/assets/images/" + recette.image.replace('jpg', 'webp') + "'/>" +

                        "<div class='recetteInfos'><h2>" + recette.name + "</h2>" +

                        "<h3>Recette</h3>" +
                        "<p style='overflow: auto; height: 100px'>" + recette.description + "</p>" +

                        "<h3>Ingrédients</h3>" +
                        tousLesIngredients(recette) +

                        "</div></div>";
                    }
                }
            });

            // Vérification si la liste de recettes a changé avec les filtres appliqués
            if (recettes != listeRecette.innerHTML) {
                listeRecette.innerHTML = recettes;
                // Afficher un message si aucune recette n'est trouvée
                if (!listeRecette.innerHTML) {
                    if (filter.length >= 3) {
                        listeRecette.innerHTML = "<h2 class='emptySearch'>Aucune recette ne contient '"+ filter +"'</h2>";
                    } else {
                        listeRecette.innerHTML = "<h2 class='emptySearch'>Aucune recette ne correspond à votre recherche...</h2>";
                    }
                }
            }
            updateNombreRecette(); // Mise à jour du nombre de recettes affichées
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}