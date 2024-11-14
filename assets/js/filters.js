// Récupération des noms d'ingrédients depuis la fonction asynchrone
const listeNoms = tousLesNomsIngredients();
// Sélectionne l'élément qui contient les filtres sélectionnés
const selectedFilters = document.querySelector('.selectedFilters');

// Fonction pour basculer l'affichage de la liste de filtres en fonction de l'élément sur lequel l'utilisateur clique
function toggleArrow(value) {
    // Sélectionne la flèche correspondant à l'élément cliqué (le "value" permet de différencier les filtres)
    const arrow = document.querySelector('.arrow' + value);
    
    // Détermine quel filtre afficher en fonction de la valeur de "value" (One = ingrédients, Two = appareils, etc.)
    if (value == 'One') {
        liste = document.querySelector('#ingredientFilter');  // Sélection du filtre des ingrédients
    } else if (value == 'Two') {
        liste = document.querySelector('#appareilFilter');  // Sélection du filtre des appareils
    } else {
        liste = document.querySelector('#ustensileFilter');  // Sélection du filtre des ustensiles
    }
    
    // Bascule les classes pour animer la flèche et l'affichage de la liste
    arrow.classList.toggle('arrow-up');  // Bascule la direction de la flèche
    liste.querySelector('.filterList').classList.toggle('d-flex-column');  // Bascule l'affichage des filtres
    liste.classList.toggle('active');  // Active ou désactive la classe "active" pour l'élément
    arrow.classList.toggle('arrow-down');  // Bascule la direction de la flèche
    liste.querySelector('.filterList').classList.toggle('d-none');  // Affiche ou masque la liste des filtres
}

// Fonction pour récupérer les noms des ingrédients et afficher les filtres dans le DOM
async function getNomsIngredients() {
    const liste = document.querySelector('#ingredientFilter').querySelector('.filterList').querySelector('.theList');
    
    try {
        // Récupération des noms d'ingrédients via une fonction asynchrone
        const noms = await tousLesNomsIngredients();  
        let num = 0;
        const searchIngredient = document.getElementById('searchIngredient'); // Sélection du champ de recherche des ingrédients

        // Ajout d'un événement de recherche pour filtrer les ingrédients en temps réel
        searchIngredient.addEventListener('input', () => {
            const searchTerm = searchIngredient.value.toLowerCase();  // Récupère la valeur de recherche en minuscule
            const ingredients = liste.querySelectorAll('p');  // Sélectionne tous les éléments d'ingrédients

            ingredients.forEach(ingredient => {
                // Vérifie si le texte de l'élément contient le terme recherché
                if (ingredient.textContent.toLowerCase().includes(searchTerm)) {
                    ingredient.style.display = 'block';  // Affiche l'ingrédient s'il correspond
                } else {
                    ingredient.style.display = 'none';  // Masque l'ingrédient s'il ne correspond pas
                }
            });
        });

        // Suppression des doublons avant d'ajouter chaque ingrédient à la liste
        supprimerDoublons(noms).forEach(ingredient => {
            num++;
            const p = document.createElement("p");
            p.id = "ingredientNb" + num;
            p.textContent = ingredient;

            // Ajout d'un événement au clic pour sélectionner l'ingrédient
            p.addEventListener('click', () => {
                p.style.display = 'none';  // Masque l'élément de la liste une fois sélectionné
                
                // Crée une div pour afficher le filtre sélectionné
                const filterBox = document.createElement('div');
                filterBox.classList.add('filterBox');
                filterBox.innerHTML = '<label class="ingredient">' + ingredient + '</label>';

                // Crée un bouton de fermeture pour le filtre
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                closeButton.classList.add('closeFilterButton');

                // Ajoute l'événement de fermeture du filtre
                closeButton.addEventListener('click', () => {
                    filterBox.remove();  // Retire le filtre du DOM
                    p.style.display = 'block';  // Réaffiche l'ingrédient dans la liste
                    updateSearch();  // Met à jour la recherche
                });

                // Ajoute le bouton à la filterBox
                filterBox.appendChild(closeButton);

                // Ajoute la filterBox au conteneur des filtres sélectionnés sans réinitialiser la liste
                selectedFilters.appendChild(filterBox);
                updateSearch();  // Met à jour la recherche
            });

            // Ajoute l'ingrédient à la liste de filtres dans le DOM
            liste.appendChild(p);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);  // Affiche une erreur en cas de problème de récupération
    }
}

// Fonction pour récupérer les noms des appareils et afficher les filtres dans le DOM
async function getNomsAppareils() {
    const liste = document.querySelector('#appareilFilter').querySelector('.filterList').querySelector('.theList');
    
    try {
        // Récupération des noms des appareils
        const noms = await tousLesNomsAppareils();  
        num = 0
        const searchAppareil = document.getElementById('searchAppareil'); // Sélection du champ de recherche des appareils

        // Ajout d'un événement de recherche pour filtrer les appareils en temps réel
        searchAppareil.addEventListener('input', () => {
            const searchTerm = searchAppareil.value.toLowerCase();  // Récupère la valeur de recherche
            const appareils = liste.querySelectorAll('p');  // Sélectionne tous les appareils affichés

            appareils.forEach(appareil => {
                // Vérifie si le texte de l'élément contient le terme recherché
                if (appareil.textContent.toLowerCase().includes(searchTerm)) {
                    appareil.style.display = 'block';  // Affiche l'appareil si il correspond à la recherche
                } else {
                    appareil.style.display = 'none';  // Masque l'appareil si il ne correspond pas
                }
            });
        });

        // Suppression des doublons avant d'ajouter chaque appareil à la liste
        supprimerDoublons(noms).forEach(appareil => {
            num++;
            const p = document.createElement("p");
            p.id = "appareilNb" + num;
            p.textContent = appareil;

            // Ajout d'un événement au clic pour sélectionner l'appareil
            p.addEventListener('click', () => {
                p.style.display = 'none';  // Masque l'élément une fois sélectionné
                
                // Crée une div pour afficher le filtre sélectionné
                const filterBox = document.createElement('div');
                filterBox.classList.add('filterBox');
                filterBox.innerHTML = '<label class="appareil">' + appareil + '</label>';

                // Crée un bouton de fermeture pour le filtre
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                closeButton.classList.add('closeFilterButton');

                // Ajoute l'événement de fermeture du filtre
                closeButton.addEventListener('click', () => {
                    filterBox.remove();  // Retire le filtre du DOM
                    p.style.display = 'block';  // Réaffiche l'appareil dans la liste
                    updateSearch();  // Met à jour la recherche
                });

                // Ajoute le bouton à la filterBox
                filterBox.appendChild(closeButton);

                // Ajoute la filterBox au conteneur des filtres sélectionnés sans réinitialiser la liste
                selectedFilters.appendChild(filterBox);
                updateSearch();  // Met à jour la recherche
            });

            // Ajoute l'appareil à la liste de filtres dans le DOM
            liste.appendChild(p);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des appareils :", error);  // Affiche une erreur en cas de problème de récupération
    }
}

// Fonction pour récupérer les noms des ustensiles et afficher les filtres dans le DOM
async function getNomsUstensiles() {
    const liste = document.querySelector('#ustensileFilter').querySelector('.filterList').querySelector('.theList');
    
    try {
        // Récupération des noms des ustensiles
        const noms = await tousLesNomsUstensiles();  
        num = 0
        const searchUstensile = document.getElementById('searchUstensile'); // Sélection du champ de recherche des ustensiles

        // Ajout d'un événement de recherche pour filtrer les ustensiles en temps réel
        searchUstensile.addEventListener('input', () => {
            const searchTerm = searchUstensile.value.toLowerCase();  // Récupère la valeur de recherche
            const ustensiles = liste.querySelectorAll('p');  // Sélectionne tous les ustensiles affichés

            ustensiles.forEach(ustensile => {
                // Vérifie si le texte de l'élément contient le terme recherché
                if (ustensile.textContent.toLowerCase().includes(searchTerm)) {
                    ustensile.style.display = 'block';  // Affiche l'ustensile si il correspond à la recherche
                } else {
                    ustensile.style.display = 'none';  // Masque l'ustensile si il ne correspond pas
                }
            });
        });

        // Suppression des doublons avant d'ajouter chaque ustensile à la liste
        supprimerDoublons(noms).forEach(ustensile => {
            num++;
            const p = document.createElement("p");
            p.id = "ustensileNb" + num;
            p.textContent = premiereLettreEnMajuscule(ustensile);

            // Ajout d'un événement au clic pour sélectionner l'ustensile
            p.addEventListener('click', () => {
                p.style.display = 'none';  // Masque l'élément une fois sélectionné
                
                // Crée une div pour afficher le filtre sélectionné
                const filterBox = document.createElement('div');
                filterBox.classList.add('filterBox');
                filterBox.innerHTML = '<label class="ustensile">' + premiereLettreEnMajuscule(ustensile) + '</label>';

                // Crée un bouton de fermeture pour le filtre
                const closeButton = document.createElement('button');
                closeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                closeButton.classList.add('closeFilterButton');

                // Ajoute l'événement de fermeture du filtre
                closeButton.addEventListener('click', () => {
                    filterBox.remove();  // Retire le filtre du DOM
                    p.style.display = 'block';  // Réaffiche l'ustensile dans la liste
                    updateSearch();  // Met à jour la recherche
                });

                // Ajoute le bouton à la filterBox
                filterBox.appendChild(closeButton);

                // Ajoute la filterBox au conteneur des filtres sélectionnés sans réinitialiser la liste
                selectedFilters.appendChild(filterBox);
                updateSearch();  // Met à jour la recherche
            });

            // Ajoute l'ustensile à la liste de filtres dans le DOM
            liste.appendChild(p);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des ustensiles :", error);  // Affiche une erreur en cas de problème de récupération
    }
}

// Appels des fonctions pour récupérer et afficher les noms d'ingrédients, appareils et ustensiles
getNomsIngredients();
getNomsAppareils();
getNomsUstensiles();