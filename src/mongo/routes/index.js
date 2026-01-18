const express = require('express');
const router = express.Router();

const educadoresRoutes = require('./educadores');
const alunosRoutes = require('./alunos');
const exerciciosRoutes = require('./exercicios');
const treinosRoutes = require('./treinos');
const execucoesRoutes = require('./execucoes');
const mensagensRoutes = require('./mensagens');
const avaliacoesRoutes = require('./avaliacoes');
const notificacoesRoutes = require('./notificacoes');

router.use('/educadores', educadoresRoutes);
router.use('/alunos', alunosRoutes);
router.use('/exercicios', exerciciosRoutes);
router.use('/treinos', treinosRoutes);
router.use('/execucoes', execucoesRoutes);
router.use('/mensagens', mensagensRoutes);
router.use('/avaliacoes', avaliacoesRoutes);
router.use('/notificacoes', notificacoesRoutes);

module.exports = router;
