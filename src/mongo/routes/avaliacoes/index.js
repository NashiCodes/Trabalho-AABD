const express = require('express');
const router = express.Router();

const { getAll, getById, getByEducador, getByAluno } = require('./read');
const { createAvaliacao } = require('./create');
const { updateAvaliacao } = require('./update');
const { deleteAvaliacao } = require('./delete');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/educador/:educadorId', getByEducador);
router.get('/aluno/:alunoId', getByAluno);
router.post('/', createAvaliacao);
router.put('/:id', updateAvaliacao);
router.delete('/:id', deleteAvaliacao);

module.exports = router;
