const express = require('express');
const router = express.Router();

const { getAll, getById, getByEducador } = require('./read');
const { createTreino } = require('./create');
const { updateTreino } = require('./update');
const { deleteTreino } = require('./delete');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/educador/:educadorId', getByEducador);
router.post('/', createTreino);
router.put('/:id', updateTreino);
router.delete('/:id', deleteTreino);

module.exports = router;
