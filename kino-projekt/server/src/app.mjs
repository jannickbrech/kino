import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const cDir = dirname(fileURLToPath(import.meta.url));
const app = express();

const port = process.argv[2] || process.env.PORT || 8080;

app.use(express.json());

app.use(express.static(join(cDir, '../../webapp/dist')));

const kinosäle = [];

// Kinosaal speichern
app.post('/api/saal', (req, res) => {
  const neuerSaal = req.body;

  if (!neuerSaal.name || !neuerSaal.reihen || !neuerSaal.sitzeProReihe) {
    return res.status(400).json({ error: 'Daten unvollständig' });
  }

  console.log('Neuer Saal empfangen:', neuerSaal);

  // speeichern
  kinosäle.push(neuerSaal);

  res.status(201).json({ message: 'Saal erfolgreich angelegt!', saal: neuerSaal });
});

app.get('/api/saal', (req, res) => {
  res.json(kinosäle);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
