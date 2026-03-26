import http from 'k6/http';
import { sleep, check } from 'k6';

// ─────────────────────────────────────────────────────────────
// CONFIGURATION DU TEST DE CHARGE
// 10 utilisateurs simultanés pendant 10 secondes
// ─────────────────────────────────────────────────────────────
export const options = {
  duration: '10s', // durée totale du test
  vus: 10,         // nombre d'utilisateurs simultanés

  // ─────────────────────────────────────────────────────────
  // SEUILS DE PERFORMANCE (thresholds)
  // Si ces seuils ne sont pas respectés, le test échoue.
  // ─────────────────────────────────────────────────────────
  thresholds: {
    // 95% des requêtes doivent répondre en moins de 500ms
    http_req_duration: ['p(95)<500'],

    // Le taux d'erreur HTTP doit rester sous 1%
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  // ─────────────────────────────────────────────────────────
  // REQUÊTE sur la route /products
  // ─────────────────────────────────────────────────────────
  const res = http.get('http://localhost:3000/products');

  // ─────────────────────────────────────────────────────────
  // VÉRIFICATIONS sur la réponse
  // check() permet de valider que la réponse est correcte.
  // Si une vérification échoue, elle est comptée dans les stats
  // mais n'arrête pas le test.
  // ─────────────────────────────────────────────────────────
  check(res, {
    // Le serveur doit répondre avec le statut 200 (OK)
    'status est 200': (r) => r.status === 200,

    // La réponse doit arriver en moins de 200ms
    'temps de réponse < 200ms': (r) => r.timings.duration < 200,

    // La réponse ne doit pas être vide
    'body non vide': (r) => r.body !== null && r.body.length > 0,
  });

  // ─────────────────────────────────────────────────────────
  // PAUSE entre chaque requête
  // Simule un utilisateur réel qui ne fait pas 1000 requêtes/sec
  // ─────────────────────────────────────────────────────────
  sleep(1);
}
