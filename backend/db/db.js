const fsp = require('fs').promises;
const { join } = require('path');

const jsonPath = join(__dirname, 'calculatorValue.json');

const getData = async () => {
  try {
    const rawJson = await fsp.readFile(jsonPath, 'utf-8');
    return JSON.parse(rawJson);
  } catch (error) {
    return [];
  }
};

const getValue = async () => {
  const data = await getData();
  const value = data[0];
  if (!value) throw 'empty db';
  return value;
};

const saveValue = async (value) => {
  return fsp.writeFile(jsonPath, JSON.stringify([{ value }]));
};

module.exports = {
  getValue,
  saveValue,
};
