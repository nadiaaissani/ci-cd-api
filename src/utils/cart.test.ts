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
  // happy test
  test('calcule correctement une réduction de 10%', () => {
    expect(calculerPrixAvecReduction(100, 10)).toBe(90);
  });
  //  EDGE CASE

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
  // happy cases
  it('devrait calculer le prix total pour plusieurs produits', () => {
    expect(
      calculerPrixTotal([
        { prix: 100, quantite: 2 },
        { prix: 50, quantite: 1 },
      ])
    ).toBe(250);
  });

  it('devrait calculer le prix total pour un seul produit', () => {
    expect(calculerPrixTotal([{ prix: 100, quantite: 3 }])).toBe(300);
  });

  it('devrait retourner 0 si le panier est vide', () => {
    expect(calculerPrixTotal([])).toBe(0);
  });

  it('devrait retourner 0 si la quantité est 0', () => {
    expect(calculerPrixTotal([{ prix: 100, quantite: 0 }])).toBe(0);
  });

  // edge cases
  it('devrait lancer une erreur si le panier est null', () => {
    expect(() => calculerPrixTotal(null as any)).toThrow();
  });

  it('devrait lancer une erreur si le panier est undefined', () => {
    expect(() => calculerPrixTotal(undefined as any)).toThrow();
  });

  it('devrait lancer une erreur si le prix est négatif', () => {
    expect(() => calculerPrixTotal([{ prix: -50, quantite: 2 }])).toThrow();
  });

  it('devrait lancer une erreur si la quantité est négative', () => {
    expect(() => calculerPrixTotal([{ prix: 100, quantite: -3 }])).toThrow();
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
