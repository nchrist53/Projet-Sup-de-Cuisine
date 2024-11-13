const searchbar = document.getElementById('search');
const searchIngredient = document.getElementById('searchIngredient');
var listeRecette = document.querySelector('.listeRecette')

searchbar.addEventListener('input', function() {
    var search = searchbar.value.toLowerCase();
    if ((search) && (search.length >= 3)) {
        getRecettes(search);
    } else {
        getRecettes('');
    }
})