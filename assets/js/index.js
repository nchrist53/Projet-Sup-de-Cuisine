function convertirSingulier(mot) {
    // Exemple simple pour convertir un mot au pluriel en singulier (fonction basique)
    // Il pourrait y avoir des exceptions à gérer en fonction de la langue, mais ici on prend l'exemple des pluriels en 's'
    if (mot.endsWith('s')) {
        return mot.slice(0, -1);  // Enlever le 's' final pour le pluriel
    }
    return mot;  // Si ce n'est pas un pluriel standard, on retourne le mot tel quel
}

function premiereLettreEnMajuscule(chaine) {
    return chaine.charAt(0).toUpperCase() + chaine.slice(1);
  }

function supprimerDoublons(arr) {
    // Créer un ensemble (Set) avec les éléments normalisés (en minuscules et convertis en singulier)
    const uniqueItems = new Set(arr.map(item => convertirSingulier(item.toLowerCase())));
    
    // Convertir en tableau, puis trier de manière insensible à la casse
    const itemsTries = Array.from(uniqueItems)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));  // Tri insensible à la casse
    
    // Retourner les éléments triés, en gardant la casse d'origine
    return itemsTries.map(item => {
        // Trouver la première occurrence dans le tableau original pour conserver la casse
        return arr.find(originalItem => convertirSingulier(originalItem.toLowerCase()) === item.toLowerCase());
    });
}