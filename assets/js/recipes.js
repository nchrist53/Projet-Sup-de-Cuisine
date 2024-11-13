const recipesJSON = 'https://gist.githubusercontent.com/baiello/0a974b9c1ec73d7d0ed7c8abc361fc8e/raw/e598efa6ef42d34cc8d7e35da5afab795941e53e/recipes.json'

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

function getRecettes(filter = '') {
    var listeRecette = document.querySelector('.listeRecette')
    fetch(recipesJSON)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erreur de réseau');
            }
            return response.json();
        })
        .then(async data => {
            listeRecette.innerHTML = '';
            const listeNoms = await tousLesNomsIngredients();
            data.forEach(recette => {
                // console.log(recette);
                listeNomIngredients = ''
                listeNoms.forEach(ingredient => {
                    listeNomIngredients += ingredient + ' | ';
                })
                if ((recette.name.toLowerCase().includes(filter)) || (recette.description.toLowerCase().includes(filter)) || listeNomIngredients.toLowerCase().includes(filter))  {
                    listeRecette.innerHTML += "<div class='recette'>" +
                
                    "<img src='/assets/images/" + recette.image.replace('jpg', 'webp') + "'/>" +

                    "<div class='recetteInfos'><h2>" + recette.name + "</h2>" +

                    "<h3>Recette</h3>" +
                    "<p>" + recette.description + "</p>" +

                    "<h3>Ingrédients</h3>" +
                    tousLesIngredients(recette) +

                    "</div></div>";
                }
            });
            if (!listeRecette.innerHTML) {
                listeRecette.innerHTML = "<h2 class='emptySearch'>Aucune recette ne contient '"+ filter +"'</h2>";
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
}