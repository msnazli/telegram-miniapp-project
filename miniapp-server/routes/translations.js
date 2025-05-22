const express = require('express');
const router = express.Router();
const Translation = require('../models/Translation');

router.get('/', async (req, res) => {
  const translations = await Translation.find();
  res.json(translations);
});

router.post('/', async (req, res) => {
  const { key, value } = req.body;
  const newItem = new Translation({ key, value });
  await newItem.save();
  res.status(201).json(newItem);
});

router.put('/:id', async (req, res) => {
  const { key, value } = req.body;
  const updated = await Translation.findByIdAndUpdate(req.params.id, { key, value }, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Translation.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
