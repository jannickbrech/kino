import { postSaal, getSaele } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const roleSelection = document.getElementById('role-selection');
  const contentArea = document.getElementById('content-area');
  const areaTitle = document.getElementById('area-title');
  const feedbackMessage = document.getElementById('feedback');
  const ul = document.getElementById('saal-liste');
  const formKinosaal = document.getElementById('form-kinosaal');

  function showScreen (screenName) {
    if (screenName === 'betreiber') {
      roleSelection.style.display = 'none';
      contentArea.style.display = 'block';
      areaTitle.innerText = 'Betreiber-Bereich';
      document.getElementById('betreiber-controls').style.display = 'block';
      document.getElementById('kunde-controls').style.display = 'none';
      loadSaalListe(); // Liste laden
    } else if (screenName === 'kunde') {
      roleSelection.style.display = 'none';
      contentArea.style.display = 'block';
      areaTitle.innerText = 'Kunden-Bereich';
      document.getElementById('betreiber-controls').style.display = 'none';
      document.getElementById('kunde-controls').style.display = 'block';
    } else {
      // Zurück Start
      contentArea.style.display = 'none';
      roleSelection.style.display = 'block';
      feedbackMessage.innerText = '';
    }
  }

  async function loadSaalListe () {
    ul.innerHTML = '<li>Lade...</li>';
    const saele = await getSaele();
    ul.innerHTML = '';

    if (saele.length === 0) {
      ul.innerHTML = '<li>Noch keine Säle.</li>';
      return;
    }

    saele.forEach(saal => {
      const li = document.createElement('li');
      li.textContent = `${saal.name} (${saal.reihen} Reihen, ${saal.sitzeProReihe} Sitze)`;
      ul.appendChild(li);
    });
  }

  document.getElementById('betreiber-button').addEventListener('click', () => showScreen('betreiber'));
  document.getElementById('kunde-button').addEventListener('click', () => showScreen('kunde'));
  document.getElementById('back-button').addEventListener('click', () => showScreen('home'));

  formKinosaal.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(formKinosaal);
    const data = {
      name: formData.get('name'),
      reihen: formData.get('reihen'),
      sitzeProReihe: formData.get('sitzeProReihe')
    };

    const response = await postSaal(data);

    if (response && response.ok) {
      feedbackMessage.innerText = 'Gespeichert!';
      feedbackMessage.style.color = 'green';
      formKinosaal.reset();
      loadSaalListe();
    } else {
      feedbackMessage.innerText = 'Fehler.';
      feedbackMessage.style.color = 'red';
    }
  });
});
