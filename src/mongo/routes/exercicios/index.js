const express = require('express');
const router = express.Router();

const { getAll, getById, getByGrupo } = require('./read');
const { createExercicio } = require('./create');
const { updateExercicio } = require('./update');
const { deleteExercicio } = require('./delete');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/grupo/:grupoMuscular', getByGrupo);
router.post('/', createExercicio);
router.put('/:id', updateExercicio);
router.delete('/:id', deleteExercicio);

module.exports = router;
