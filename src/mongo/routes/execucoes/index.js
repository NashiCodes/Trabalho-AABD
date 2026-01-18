const express = require('express');
const router = express.Router();

const { getAll, getById, getByAluno, getByTreino } = require('./read');
const { createExecucao } = require('./create');
const { updateExecucao } = require('./update');
const { deleteExecucao } = require('./delete');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/aluno/:alunoId', getByAluno);
router.get('/treino/:treinoId', getByTreino);
router.post('/', createExecucao);
router.put('/:id', updateExecucao);
router.delete('/:id', deleteExecucao);

module.exports = router;
