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

function tousLesNomsIngredients(recette) {
    var noms = ''
    recette.ingredients.forEach(ingredient => {
        noms += ingredient.ingredient + ' | ';
    });
    console.log(noms);
    return noms;
}

var listeRecette = document.querySelector('.listeRecette')

function getRecettes(filter) {
    fetch('/assets/json/recipes.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Erreur de réseau');
            }
            return response.json();
        })
        .then(data => {
            listeRecette.innerHTML = '';
            data.forEach(recette => {
                // console.log(recette);
                if ((recette.name.toLowerCase().includes(filter)) || (recette.description.toLowerCase().includes(filter)) || tousLesNomsIngredients(recette).toLowerCase().includes(filter))  {
                    listeRecette.innerHTML += "<div class='recette'>" +
                
                    "<img src='/assets/images/" + recette.image + "'/>" +

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

getRecettes('');