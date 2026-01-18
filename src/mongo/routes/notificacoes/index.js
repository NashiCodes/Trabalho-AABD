const express = require('express');
const router = express.Router();

const { getAll, getById, getByUsuario, getNaoLidas } = require('./read');
const { createNotificacao } = require('./create');
const { deleteNotificacao } = require('./delete');
const { marcarComoLida } = require('./marcar-lida');

router.get('/', getAll);
router.get('/:id', getById);
router.get('/usuario/:usuarioId', getByUsuario);
router.get('/usuario/:usuarioId/nao-lidas', getNaoLidas);
router.post('/', createNotificacao);
router.patch('/:id/lida', marcarComoLida);
router.delete('/:id', deleteNotificacao);

module.exports = router;
