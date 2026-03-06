import http from 'k6/http';
import { sleep } from 'k6';

// Configuration du test
export const options = {
  duration: '10s',  // Durée : 10 secondes
  vus: 10,          // 10 utilisateurs simultanés
};

export default function () {
  // Appel de la route products
  http.get('http://localhost:3000/products');
  sleep(1); // 1 seconde entre chaque requête
}