const listeNoms = tousLesNomsIngredients();

function toggleArrow(value) {
    const arrow = document.querySelector('.arrow' + value);
    if (value == 'One') {
        liste = document.querySelector('#ingredientFilter').querySelector('.filterList');
    } else if (value == 'Two') {;
        liste = document.querySelector('#appareilFilter').querySelector('.filterList');
    }
    else {
        liste = document.querySelector('#ustensileFilter').querySelector('.filterList');
    }
    
    arrow.classList.toggle('arrow-up');
    liste.classList.toggle('d-flex-column');
    arrow.classList.toggle('arrow-down');
    liste.classList.toggle('d-none');
}

async function getNomsIngredients() {
    const liste = document.querySelector('#ingredientFilter').querySelector('.filterList');
    
    try {
        const noms = await tousLesNomsIngredients();  // Attendre que les noms soient chargés
        supprimerDoublons(noms).forEach(ingredient => {
            liste.innerHTML += "<p>" + ingredient + "</p>";
        });
    } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);
    }
}