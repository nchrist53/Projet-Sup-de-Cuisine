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

var listeRecette = document.querySelector('.listeRecette')

fetch('/assets/json/recipes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(recette => {
        console.log(recette);

        listeRecette.innerHTML += "<div class='recette'>" +
        
        "<img src='/assets/images/" + recette.image + "'/>" +

        "<div class='recetteInfos'><h2>" + recette.name + "</h2>" +

        "<h3>Recette</h3>" +
        "<p>" + recette.description + "</p>" +

        "<h3>Ingrédients</h3>" +
        tousLesIngredients(recette) +

        "</div></div>";
    });
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
