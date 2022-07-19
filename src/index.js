import './styles.css';

const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const GAME_ID = 'IMedGj11pIQ2hWnoIzvF';

const postScore = async (newScore) => {
  const response = await fetch(`${BASE_URL}/games/${GAME_ID}/scores/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  return data;
};

const getScores = async () => {
  const response = await fetch(`${BASE_URL}/games/${GAME_ID}/scores/`);
  const data = await response.json();
  return data;
};

const displayScores = async () => {
  const scores = await getScores();
  const table = document.getElementById('table');
  table.innerHTML = '';
  scores.result.forEach(({ score, user }) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user} : ${score}</td>
    `;
    table.appendChild(tr);
  });
};

window.addEventListener('load', displayScores);

// Add a new score
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get the user input
  const user = document.getElementById('user').value;
  const score = document.getElementById('score').value;
  if (!user || !score) return;
  const newScore = {
    user,
    score,
  };
  postScore(newScore);
  document.getElementById('user').value = '';
  document.getElementById('score').value = '';
});

// Refresh the scores list
const refresh = document.getElementById('refresh');
refresh.addEventListener('click', displayScores);
