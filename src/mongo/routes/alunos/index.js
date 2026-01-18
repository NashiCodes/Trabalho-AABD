const express = require('express');
const router = express.Router();

const { getAll, getById, getByEducador } = require('./read');
const { createAluno } = require('./create');
const { updateAluno } = require('./update');
const { deleteAluno } = require('./delete');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/educador/:educadorId', getByEducador);
router.post('/', createAluno);
router.put('/:id', updateAluno);
router.delete('/:id', deleteAluno);

module.exports = router;
