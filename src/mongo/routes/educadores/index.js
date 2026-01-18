const express = require('express');
const router = express.Router();

const { getAll, getById } = require('./read');
const { createEducador } = require('./create');
const { updateEducador } = require('./update');
const { deleteEducador } = require('./delete');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createEducador);
router.put('/:id', updateEducador);
router.delete('/:id', deleteEducador);

module.exports = router;
