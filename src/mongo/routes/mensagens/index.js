const express = require('express');
const router = express.Router();

const { getAll, getById, getRecebidas, getEnviadas } = require('./read');
const { createMensagem } = require('./create');
const { deleteMensagem } = require('./delete');
const { marcarComoLida } = require('./marcar-lida');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/recebidas/:usuarioId', getRecebidas);
router.get('/enviadas/:usuarioId', getEnviadas);
router.post('/', createMensagem);
router.patch('/:id/lida', marcarComoLida);
router.delete('/:id', deleteMensagem);

module.exports = router;
