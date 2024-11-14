const listeNoms = tousLesNomsIngredients();
const selectedFilters = document.querySelector('.selectedFilters');

function toggleArrow(value) {
    const arrow = document.querySelector('.arrow' + value);
    if (value == 'One') {
        liste = document.querySelector('#ingredientFilter')
    } else if (value == 'Two') {;
        liste = document.querySelector('#appareilFilter')
    }
    else {
        liste = document.querySelector('#ustensileFilter')
    }
    
    arrow.classList.toggle('arrow-up');
    liste.querySelector('.filterList').classList.toggle('d-flex-column');
    liste.classList.toggle('active');
    arrow.classList.toggle('arrow-down');
    liste.querySelector('.filterList').classList.toggle('d-none');
}

async function getNomsIngredients() {
    const liste = document.querySelector('#ingredientFilter').querySelector('.filterList').querySelector('.theList');
    
    try {
        const noms = await tousLesNomsIngredients();  // Attendre que les noms soient chargés
        num = 0
        supprimerDoublons(noms).forEach(ingredient => {
            num++;
            const p = document.createElement("p");
            p.id = "ingredientNb" + num;
            p.textContent = ingredient;
            p.addEventListener('click', () => {
                p.style.display = 'none';
                selectedFilters.innerHTML += "<p>" + ingredient + "</p>";
            });
            liste.appendChild(p);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);
    }
}

async function getNomsAppareils() {
    const liste = document.querySelector('#appareilFilter').querySelector('.filterList').querySelector('.theList');
    
    try {
        const noms = await tousLesNomsAppareils();  // Attendre que les noms soient chargés
        num = 0
        supprimerDoublons(noms).forEach(appareil => {
            num++;
            const p = document.createElement("p");
            p.id = "ingredientNb" + num;
            p.textContent = appareil;
            p.addEventListener('click', () => {
                p.style.display = 'none';
                selectedFilters.innerHTML += "<p>" + appareil + "</p>";
            });
            liste.appendChild(p);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des appareils :", error);
    }
}

async function getNomsUstensiles() {
    const liste = document.querySelector('#ustensileFilter').querySelector('.filterList').querySelector('.theList');
    
    try {
        const noms = await tousLesNomsUstensiles();  // Attendre que les noms soient chargés
        num = 0
        supprimerDoublons(noms).forEach(ustensile => {
            num++;
            const p = document.createElement("p");
            p.id = "ingredientNb" + num;
            p.textContent = premiereLettreEnMajuscule(ustensile);
            p.addEventListener('click', () => {
                p.style.display = 'none';
                selectedFilters.innerHTML += "<p>" + premiereLettreEnMajuscule(ustensile) + "</p>";
            });
            liste.appendChild(p);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des ustensiles :", error);
    }
}

getNomsIngredients();
getNomsAppareils();
getNomsUstensiles();