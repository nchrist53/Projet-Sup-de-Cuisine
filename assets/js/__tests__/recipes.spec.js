import { describe, it, expect, beforeEach, vi } from 'vitest';


// test updateNombreRecette
import { updateNombreRecette } from '../recipes.js';

describe('updateNombreRecette', () => {
    let listeRecette, nombreRecette;

    beforeEach(() => {
        // Initialiser le DOM simulé
        document.body.innerHTML = `
            <div class="listeRecette"></div>
            <div id="nombreRecettes"></div>
        `;

        listeRecette = document.querySelector('.listeRecette');
        nombreRecette = document.getElementById('nombreRecettes');
    });

    it('affiche "1 recette" si une seule recette est présente', () => {
        // Ajouter un élément .recette
        listeRecette.innerHTML = '<div class="recette"></div>';
        
        updateNombreRecette();

        // Vérifier que le texte est correct
        expect(nombreRecette.innerHTML).toBe('1 recette');
    });

    it('affiche "2 recettes" si deux recettes sont présentes', () => {
        // Ajouter deux éléments .recette
        listeRecette.innerHTML = '<div class="recette"></div><div class="recette"></div>';
        
        updateNombreRecette();

        // Vérifier que le texte est correct
        expect(nombreRecette.innerHTML).toBe('2 recettes');
    });

    it('affiche "0 recette" si aucune recette n\'est présente', () => {
        // Ne pas ajouter d'éléments .recette
        
        updateNombreRecette();

        // Vérifier que le texte est correct
        expect(nombreRecette.innerHTML).toBe('0 recettes');
    });
});


// test tousLesIngredients()

import { tousLesIngredients } from '../recipes.js';

describe('tousLesIngredients', () => {
    it('génère la liste des ingrédients avec quantité et unité', () => {
        const recette = {
            ingredients: [
                { ingredient: 'Sucre', quantity: 100, unit: 'g' },
                { ingredient: 'Beurre', quantity: 50, unit: 'g' }
            ]
        };
        
        const result = tousLesIngredients(recette);
        expect(result).toContain('Sucre');
        expect(result).toContain('100 g');
        expect(result).toContain('Beurre');
        expect(result).toContain('50 g');
    });

    it('génère la liste sans unité si elle est absente', () => {
        const recette = {
            ingredients: [
                { ingredient: 'Sucre', quantity: 100 },
                { ingredient: 'Beurre' }
            ]
        };
        
        const result = tousLesIngredients(recette);
        expect(result).toContain('Sucre');
        expect(result).toContain('100');
        expect(result).not.toContain('undefined'); // Ne devrait pas contenir "undefined" comme unité
    });
});


// test tousLesNomsIngredients(), tousLesNomsAppareils() et tousLesNomsUstensiles()

import { tousLesNomsIngredients, tousLesNomsAppareils, tousLesNomsUstensiles } from '../recipes.js';

describe('tousLesNomsIngredients', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    it('récupère tous les noms d\'ingrédients', async () => {
        const mockData = [
            { ingredients: [{ ingredient: 'Sucre' }, { ingredient: 'Farine' }] },
            { ingredients: [{ ingredient: 'Oeufs' }] }
        ];
        
        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

        const noms = await tousLesNomsIngredients();
        expect(noms).toEqual(['Sucre', 'Farine', 'Oeufs']);
    });
});

describe('tousLesNomsAppareils', () => {
    it('récupère tous les noms d\'appareils', async () => {
        const mockData = [
            { appliance: 'Four' },
            { appliance: 'Micro-ondes' }
        ];

        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

        const noms = await tousLesNomsAppareils();
        expect(noms).toEqual(['Four', 'Micro-ondes']);
    });
});

describe('tousLesNomsUstensiles', () => {
    it('récupère tous les noms d\'ustensiles', async () => {
        const mockData = [
            { ustensils: ['Spatule', 'Couteau'] },
            { ustensils: ['Fouet'] }
        ];

        fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });

        const noms = await tousLesNomsUstensiles();
        expect(noms).toEqual(['Spatule', 'Couteau', 'Fouet']);
    });
});