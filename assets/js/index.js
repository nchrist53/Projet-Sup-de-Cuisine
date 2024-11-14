// Fonction pour convertir un mot pluriel en singulier
function convertirSingulier(mot) {
    // Exemple simple pour convertir un mot au pluriel en singulier (fonction basique)
    // Ici, on suppose que les mots au pluriel se terminent par 's', ce qui est une simplification
    if (mot.endsWith('s')) {
        return mot.slice(0, -1);  // Enlever le 's' final pour le pluriel
    }
    return mot;  // Si le mot ne se termine pas par 's', on suppose qu'il est déjà singulier
}

// Fonction pour mettre la première lettre d'une chaîne en majuscule
function premiereLettreEnMajuscule(chaine) {
    return chaine.charAt(0).toUpperCase() + chaine.slice(1);  // Met la première lettre en majuscule et laisse le reste inchangé
}

// Fonction pour supprimer les doublons d'un tableau tout en gardant la casse et en triant les éléments
function supprimerDoublons(arr) {
    // Créer un ensemble (Set) avec les éléments normalisés (en minuscules et convertis en singulier)
    // Cela supprime automatiquement les doublons
    const uniqueItems = new Set(arr.map(item => convertirSingulier(item.toLowerCase())));
    
    // Convertir l'ensemble en tableau, puis trier de manière insensible à la casse
    const itemsTries = Array.from(uniqueItems)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));  // Tri insensible à la casse
    
    // Retourner les éléments triés, en gardant la casse d'origine
    return itemsTries.map(item => {
        // Trouver la première occurrence dans le tableau original pour conserver la casse
        return arr.find(originalItem => convertirSingulier(originalItem.toLowerCase()) === item.toLowerCase());
    });
}

// Fonction pour vérifier si deux chaînes contiennent les mêmes mots
function MotsSimilaires(str1, str2) {
    // On divise les chaînes en mots en utilisant le séparateur ' | '
    // Puis on élimine les éléments vides
    const mots1 = str1.toLowerCase().split(' | ').filter(mot => mot !== "");
    const mots2 = str2.toLowerCase().split(' | ').filter(mot => mot !== "");

    // Vérifier que chaque mot de mots1 est présent dans mots2
    for (let mot1 of mots1) {
        if (!mots2.includes(mot1)) {
            return false;  // Si un mot de mots1 n'est pas dans mots2, on retourne false
        }
    }

    return true;  // Si tous les mots de mots1 sont présents dans mots2, on retourne true
}