// Calcule le prix d'un produit avec réduction
export function calculerPrixAvecReduction(
  prix: number,
  reduction: number
): number {
  if (reduction < 0 || reduction > 100) {
    throw new Error('La réduction doit être entre 0 et 100');
  }
  return prix - (prix * reduction) / 100;
}

// Calcule le prix total du panier
export function calculerPrixTotal(
  panier: { prix: number; quantite: number }[]
): number {
  return panier.reduce((total, item) => total + item.prix * item.quantite, 0);
}

// Incrémente la quantité d'un produit dans le panier
export function incrementerQuantite(
  panier: { id: number; quantite: number }[],
  id: number
): { id: number; quantite: number }[] {
  return panier.map((item) =>
    item.id === id ? { ...item, quantite: item.quantite + 1 } : item
  );
}

// Décrémente la quantité d'un produit dans le panier
export function decrementerQuantite(
  panier: { id: number; quantite: number }[],
  id: number
): { id: number; quantite: number }[] {
  return panier.map((item) =>
    item.id === id && item.quantite > 0
      ? { ...item, quantite: item.quantite - 1 }
      : item
  );
}

// Vérifie si un produit est déjà dans le panier
export function estDansLePanier(panier: { id: number }[], id: number): boolean {
  return panier.some((item) => item.id === id);
}
