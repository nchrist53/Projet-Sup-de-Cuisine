const recipesJSON = 'https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json'

function updateNombreRecette(){
    const listeRecette = document.querySelector('.listeRecette')
    const nombreRecette = document.getElementById('nombreRecettes')
    
    nombreRecette.innerHTML = listeRecette.querySelectorAll('.recette').length + " recettes";
}

function tousLesIngredients(recette){
    var listeIngredients = "<div class='listeIngredients'>";
    recette.ingredients.forEach(ingredient => {
        listeIngredients += "<p>" + ingredient.ingredient
        if (ingredient.quantity) {
            listeIngredients += "<br/><span>" + ingredient.quantity;
            if (ingredient.unit) {
                listeIngredients += " " + ingredient.unit;
            }
            listeIngredients += "</span>"
        }
        listeIngredients += "</p>"
    })
    return listeIngredients + "</div>"
}

function tousLesNomsIngredients() {
    return new Promise((resolve, reject) => {
        var noms = [];
        fetch(recipesJSON)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(recette => {
                    recette.ingredients.forEach(ingredient => {
                        noms.push(ingredient.ingredient);
                    });
                });
                resolve(noms);  // Résoudre la promesse avec le tableau des noms
            })
            .catch(error => {
                console.error('Erreur:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            });
    });
}

function tousLesNomsAppareils() {
    return new Promise((resolve, reject) => {
        var noms = [];
        fetch(recipesJSON)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(recette => {
                    noms.push(recette.appliance);
                });
                resolve(noms);  // Résoudre la promesse avec le tableau des noms
            })
            .catch(error => {
                console.error('Erreur:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            });
    });
}

function tousLesNomsUstensiles() {
    return new Promise((resolve, reject) => {
        var noms = [];
        fetch(recipesJSON)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(recette => {
                    recette.ustensils.forEach(ustensil => {
                        noms.push(ustensil);
                    });
                });
                resolve(noms);  // Résoudre la promesse avec le tableau des noms
            })
            .catch(error => {
                console.error('Erreur:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            });
    });
}

function getRecettes(filter = '') {
    const listeRecette = document.querySelector('.listeRecette')
    
    fetch(recipesJSON)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erreur de réseau');
            }
            return response.json();
        })
        .then(async data => {
            recettes = '';
            console.log(data);
            data.forEach(recette => {
                ingredientsListe = recette.ingredients;
                listeNomIngredients = '';
                ingredientsListe.forEach(ingredient => {
                    listeNomIngredients += ingredient + ' | ';
                })
                if ((recette.name.toLowerCase().includes(filter)) || (recette.description.toLowerCase().includes(filter)) || listeNomIngredients.toLowerCase().includes(filter))  {
                    recettes += "<div class='recette'>" +
                
                    "<img src='/assets/images/" + recette.image.replace('jpg', 'webp') + "'/>" +

                    "<div class='recetteInfos'><h2>" + recette.name + "</h2>" +

                    "<h3>Recette</h3>" +
                    "<p style='overflow: auto; height: 100px'>" + recette.description + "</p>" +

                    "<h3>Ingrédients</h3>" +
                    tousLesIngredients(recette) +

                    "</div></div>";
                }
            });
            if (recettes != listeRecette.innerHTML) {
                listeRecette.innerHTML = recettes;
                if (!listeRecette.innerHTML) {
                    listeRecette.innerHTML = "<h2 class='emptySearch'>Aucune recette ne contient '"+ filter +"'</h2>";
                }
            }
            updateNombreRecette();
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}