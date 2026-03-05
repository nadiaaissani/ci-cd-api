import {
  calculerPrixAvecReduction,
  calculerPrixTotal,
  incrementerQuantite,
  decrementerQuantite,
  estDansLePanier,
} from './cart';

// ─────────────────────────────────────────
// TESTS — calculerPrixAvecReduction
// ─────────────────────────────────────────
describe('calculerPrixAvecReduction', () => {
  test('calcule correctement une réduction de 10%', () => {
    expect(calculerPrixAvecReduction(100, 10)).toBe(90);
  });

  test('retourne le prix original si réduction = 0', () => {
    expect(calculerPrixAvecReduction(100, 0)).toBe(100);
  });

  test('retourne 0 si réduction = 100%', () => {
    expect(calculerPrixAvecReduction(100, 100)).toBe(0);
  });

  test('lance une erreur si réduction invalide', () => {
    expect(() => calculerPrixAvecReduction(100, -10)).toThrow();
    expect(() => calculerPrixAvecReduction(100, 110)).toThrow();
  });
});

// ─────────────────────────────────────────
// TESTS — calculerPrixTotal
// ─────────────────────────────────────────
describe('calculerPrixTotal', () => {
  test('calcule le prix total du panier', () => {
    const panier = [
      { prix: 100, quantite: 2 },
      { prix: 50, quantite: 1 },
    ];
    expect(calculerPrixTotal(panier)).toBe(250);
  });

  test('retourne 0 si le panier est vide', () => {
    expect(calculerPrixTotal([])).toBe(0);
  });
});

// ─────────────────────────────────────────
// TESTS — incrementerQuantite
// ─────────────────────────────────────────
describe('incrementerQuantite', () => {
  test('incrémente la quantité du bon produit', () => {
    const panier = [
      { id: 1, quantite: 2 },
      { id: 2, quantite: 1 },
    ];
    const result = incrementerQuantite(panier, 1);
    expect(result[0].quantite).toBe(3);
    expect(result[1].quantite).toBe(1);
  });
});

// ─────────────────────────────────────────
// TESTS — decrementerQuantite
// ─────────────────────────────────────────
describe('decrementerQuantite', () => {
  test('décrémente la quantité du bon produit', () => {
    const panier = [
      { id: 1, quantite: 2 },
      { id: 2, quantite: 1 },
    ];
    const result = decrementerQuantite(panier, 1);
    expect(result[0].quantite).toBe(1);
    expect(result[1].quantite).toBe(1);
  });

  test('ne descend pas en dessous de 0', () => {
    const panier = [{ id: 1, quantite: 0 }];
    const result = decrementerQuantite(panier, 1);
    expect(result[0].quantite).toBe(0);
  });
});

// ─────────────────────────────────────────
// TESTS — estDansLePanier
// ─────────────────────────────────────────
describe('estDansLePanier', () => {
  test('retourne true si le produit est dans le panier', () => {
    const panier = [{ id: 1 }, { id: 2 }];
    expect(estDansLePanier(panier, 1)).toBe(true);
  });

  test("retourne false si le produit n'est pas dans le panier", () => {
    const panier = [{ id: 1 }, { id: 2 }];
    expect(estDansLePanier(panier, 3)).toBe(false);
  });
});
