import express from 'express';

const router = express.Router();

import patientsService from '../services/patientsService';

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
