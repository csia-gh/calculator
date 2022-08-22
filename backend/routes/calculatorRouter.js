const express = require('express');
const db = require('../db/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const value = await db.getValue();
    res.json(value);
  } catch (error) {
    res.status(403).json(error);
  }
});

router.post('/', async (req, res) => {
  const { numValue = '' } = req.body;
  if (numValue === '' || !/^-?[\.0-9]*$/.test(numValue)) {
    return res.status(400).json({
      message: 'Missing or invalid data',
    });
  }
  await db.saveValue(numValue);
  res.status(201).json('success');
});

module.exports = router;
