var listeRecette = document.querySelector('.listeRecette')
fetch('/assets/json/recipes.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de réseau');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(element => {
        console.log(element);
        listeRecette.innerHTML += "<div class='recette'>";
        
        listeRecette.innerHTML += "<img src='/assets/images/" + element.image + "'/>";
        listeRecette.innerHTML += "test";

        listeRecette.innerHTML += "</div>";
    });
  })
  .catch(error => {
    console.error('Erreur:', error);
  });
