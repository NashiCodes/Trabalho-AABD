(async () => {
  const mongoose = require('mongoose');
  const { connectMongoDB } = require('./config/connection');
  const Aluno = require('./models/alunos/index');
  const Exercicio = require('./models/exercicios/index');
  const Treino = require('./models/treinos/index');
  const Avaliacao = require('./models/avaliacoes/index');
  const Execucao = require('./models/execucoes/index');
  const Mensagem = require('./models/mensagens/index');
  const Educador = require('./models/educadores/index');
  const Notificacao = require('./models/notificacoes/index');
  const { populateDB } = require('./populate');

  await connectMongoDB();

  await populateDB();

  console.log('\n=== Query 1: Buscar alunos com IMC entre 22 e 26 usando $gte e $lte ===');
  console.log(
    "\nQuery: \nAluno.find({ 'dadosFisicos.imc': { $gte: 22, $lte: 26 } }).select('nome dadosFisicos.imc');\n"
  );
  let alunos = await Aluno.find({
    'dadosFisicos.imc': { $gte: 22, $lte: 26 },
  }).select('nome dadosFisicos.imc');

  console.log(`Encontrados ${alunos.length} alunos com IMC entre 22 e 26:`);
  alunos.forEach((aluno) => {
    console.log(`- ${aluno.nome}: IMC ${aluno.dadosFisicos.imc}`);
  });

  console.log('\n=== QUERY 2: Buscar alunos iniciantes OU com restrições médicas usando $or ===');
  console.log(
    "\nQuery: \nAluno.find({ $or: [{ nivel: 'Iniciante' }, { restricoesMedicas: { $ne: [] } }] }).select('nome nivel restricoesMedicas');\n"
  );
  alunos = await Aluno.find({
    $or: [{ nivel: 'Iniciante' }, { restricoesMedicas: { $ne: [] } }],
  }).select('nome nivel restricoesMedicas');

  console.log(`Encontrados ${alunos.length} alunos iniciantes ou com restrições médicas:`);
  alunos.forEach((aluno) => {
    console.log(
      `- ${aluno.nome}: ${aluno.nivel}, Restrições: ${aluno.restricoesMedicas.length > 0 ? aluno.restricoesMedicas.join(', ') : 'Nenhuma'}`
    );
  });

  console.log('\n=== QUERY 3: Buscar exercícios de grupos musculares específicos usando $in ===');
  console.log(
    "\nQuery: \nExercicio.find({ grupoMuscular: { $in: ['Peitoral', 'Dorsais', 'Ombros'] } }).select('nome grupoMuscular tipo');\n"
  );
  const exercicios = await Exercicio.find({
    grupoMuscular: { $in: ['Peitoral', 'Dorsais', 'Ombros'] },
  }).select('nome grupoMuscular tipo');

  console.log(`Encontrados ${exercicios.length} exercícios para peito, costas ou ombros:`);
  exercicios.forEach((ex) => {
    console.log(`- ${ex.nome}: ${ex.grupoMuscular.join(', ')} (${ex.tipo})`);
  });

  console.log('\n=== QUERY 4: Calcular média de avaliações por educador usando $group e $avg ===');
  console.log(
    "\nQuery: \nAvaliacao.aggregate([\n  { $group: { _id: '$educadorId', mediaAvaliacoes: { $avg: '$nota' }, totalAvaliacoes: { $count: {} } } },\n  { $lookup: { from: 'educadores', localField: '_id', foreignField: '_id', as: 'educador' } },\n  { $unwind: '$educador' },\n  { $project: { nome: '$educador.nome', mediaAvaliacoes: { $round: ['$mediaAvaliacoes', 2] }, totalAvaliacoes: 1 } },\n  { $sort: { mediaAvaliacoes: -1 } }\n]);\n"
  );
  const medias = await Avaliacao.aggregate([
    {
      $group: {
        _id: '$educadorId',
        mediaAvaliacoes: { $avg: '$nota' },
        totalAvaliacoes: { $count: {} },
      },
    },
    {
      $lookup: {
        from: 'educadores',
        localField: '_id',
        foreignField: '_id',
        as: 'educador',
      },
    },
    {
      $unwind: '$educador',
    },
    {
      $project: {
        nome: '$educador.nome',
        mediaAvaliacoes: { $round: ['$mediaAvaliacoes', 2] },
        totalAvaliacoes: 1,
      },
    },
    { $sort: { mediaAvaliacoes: -1 } },
  ]);

  console.log('Média de avaliações por educador:');
  medias.forEach((m) => {
    console.log(`- ${m.nome}: ${m.mediaAvaliacoes} (${m.totalAvaliacoes} avaliações)`);
  });

  console.log(
    '\n=== QUERY 5: Buscar treinos mais eficientes (calorias/minuto) usando $project e expressões ==='
  );
  console.log(
    '\nQuery: \nTreino.aggregate([\n  { $match: { duracaoEstimada: { $gt: 0 }, caloriasEstimadas: { $gt: 0 } } },\n  { $project: { nome: 1, nivel: 1, duracaoEstimada: 1, caloriasEstimadas: 1, eficienciaCalórica: { $round: [{ $divide: ["$caloriasEstimadas", "$duracaoEstimada"] }, 2] }, totalExercicios: { $size: "$exercicios" } } },\n  { $sort: { eficienciaCalórica: -1 } },\n  { $limit: 5 },\n  { $lookup: { from: "educadores", localField: "criadoPor", foreignField: "_id", as: "educador" } },\n  { $unwind: "$educador" },\n  { $project: { nome: 1, nivel: 1, duracaoEstimada: 1, caloriasEstimadas: 1, eficienciaCalórica: 1, totalExercicios: 1, educadorNome: "$educador.nome" } }\n]);\n'
  );
  const treinosEficientes = await Treino.aggregate([
    {
      $match: {
        duracaoEstimada: { $gt: 0 },
        caloriasEstimadas: { $gt: 0 },
      },
    },
    {
      $project: {
        nome: 1,
        nivel: 1,
        duracaoEstimada: 1,
        caloriasEstimadas: 1,
        criadoPor: 1,
        eficienciaCalórica: {
          $round: [{ $divide: ['$caloriasEstimadas', '$duracaoEstimada'] }, 2],
        },
        totalExercicios: { $size: '$exercicios' },
      },
    },
    { $sort: { eficienciaCalórica: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'educadores',
        localField: 'criadoPor',
        foreignField: '_id',
        as: 'educador',
      },
    },
    { $unwind: '$educador' },
    {
      $project: {
        nome: 1,
        nivel: 1,
        duracaoEstimada: 1,
        caloriasEstimadas: 1,
        eficienciaCalórica: 1,
        totalExercicios: 1,
        educadorNome: '$educador.nome',
      },
    },
  ]);

  console.log('Top 5 treinos mais eficientes (calorias por minuto):');
  treinosEficientes.forEach((treino, idx) => {
    console.log(
      `${idx + 1}. ${treino.nome} (${treino.nivel}) - Eficiência: ${treino.eficienciaCalórica} kcal/min`
    );
    console.log(
      `   ${treino.duracaoEstimada}min, ${treino.caloriasEstimadas}kcal, ${treino.totalExercicios} exercícios`
    );
    console.log(`   Criado por: ${treino.educadorNome}`);
  });

  console.log('\n=== QUERY 6: Educadores com suas avaliações usando $lookup e agregação ===');
  console.log(
    "\nQuery: \nEducador.aggregate([\n  { $lookup: { from: 'avaliacoes', localField: '_id', foreignField: 'educadorId', as: 'avaliacoes' } },\n  { $project: { nome: 1, especialidades: 1, cref: 1, alunosAtivos: 1, totalAvaliacoes: { $size: '$avaliacoes' }, notasRecebidas: '$avaliacoes.nota', avaliacaoCalculada: { $avg: '$avaliacoes.nota' } } },\n  { $match: { totalAvaliacoes: { $gt: 0 } } },\n  { $addFields: { melhorNota: { $max: '$notasRecebidas' }, piorNota: { $min: '$notasRecebidas' } } },\n  { $sort: { avaliacaoCalculada: -1, totalAvaliacoes: -1 } }\n]);\n"
  );
  const educadoresComAvaliacoes = await Educador.aggregate([
    {
      $lookup: {
        from: 'avaliacoes',
        localField: '_id',
        foreignField: 'educadorId',
        as: 'avaliacoes',
      },
    },
    {
      $project: {
        nome: 1,
        especialidades: 1,
        cref: 1,
        alunosAtivos: 1,
        totalAvaliacoes: { $size: '$avaliacoes' },
        notasRecebidas: '$avaliacoes.nota',
        avaliacaoCalculada: { $avg: '$avaliacoes.nota' },
      },
    },
    {
      $match: { totalAvaliacoes: { $gt: 0 } },
    },
    {
      $addFields: {
        melhorNota: { $max: '$notasRecebidas' },
        piorNota: { $min: '$notasRecebidas' },
      },
    },
    { $sort: { avaliacaoCalculada: -1, totalAvaliacoes: -1 } },
  ]);

  console.log('Educadores com suas avaliações (ordenados por avaliação):');
  educadoresComAvaliacoes.forEach((educador, idx) => {
    console.log(
      `${idx + 1}. ${educador.nome} (CREF: ${educador.cref}) - Avaliação: ${educador.avaliacaoCalculada.toFixed(2)}/5.0`
    );
    console.log(`   Especialidades: ${educador.especialidades.join(', ')}`);
    console.log(
      `   ${educador.totalAvaliacoes} avaliações recebidas | Alunos ativos: ${educador.alunosAtivos}`
    );
    console.log(
      `   Notas: Melhor = ${educador.melhorNota}, Pior = ${educador.piorNota}`
    );
  });

  console.log('\n=== QUERY 7: Análise de notificações por usuário usando $group ===');
  console.log(
    "\nQuery: \nNotificacao.aggregate([\n  { $group: { _id: { usuarioId: '$usuarioId', usuarioTipo: '$usuarioTipo' }, totalNotificacoes: { $count: {} }, naoLidas: { $sum: { $cond: ['$lida', 0, 1] } }, tipos: { $addToSet: '$tipo' }, ultimaNotificacao: { $max: '$dataCriacao' } } },\n  { $match: { totalNotificacoes: { $gte: 2 } } },\n  { $sort: { naoLidas: -1, totalNotificacoes: -1 } },\n  { $limit: 5 },\n  { $lookup: { from: 'alunos', localField: '_id.usuarioId', foreignField: '_id', as: 'aluno' } },\n  { $lookup: { from: 'educadores', localField: '_id.usuarioId', foreignField: '_id', as: 'educador' } },\n  { $project: { usuarioTipo: '$_id.usuarioTipo', totalNotificacoes: 1, naoLidas: 1, tipos: 1, ultimaNotificacao: 1, nome: { $ifNull: [{ $arrayElemAt: ['$aluno.nome', 0] }, { $arrayElemAt: ['$educador.nome', 0] }] } } }\n]);\n"
  );
  const notificacoesPorUsuario = await Notificacao.aggregate([
    {
      $group: {
        _id: {
          usuarioId: '$usuarioId',
          usuarioTipo: '$usuarioTipo',
        },
        totalNotificacoes: { $count: {} },
        naoLidas: { $sum: { $cond: ['$lida', 0, 1] } },
        tipos: { $addToSet: '$tipo' },
        ultimaNotificacao: { $max: '$dataCriacao' },
      },
    },
    {
      $match: { totalNotificacoes: { $gte: 2 } },
    },
    { $sort: { naoLidas: -1, totalNotificacoes: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'alunos',
        localField: '_id.usuarioId',
        foreignField: '_id',
        as: 'aluno',
      },
    },
    {
      $lookup: {
        from: 'educadores',
        localField: '_id.usuarioId',
        foreignField: '_id',
        as: 'educador',
      },
    },
    {
      $project: {
        usuarioTipo: '$_id.usuarioTipo',
        totalNotificacoes: 1,
        naoLidas: 1,
        tipos: 1,
        ultimaNotificacao: 1,
        nome: {
          $ifNull: [
            { $arrayElemAt: ['$aluno.nome', 0] },
            { $arrayElemAt: ['$educador.nome', 0] },
          ],
        },
      },
    },
  ]);

  console.log('Top 5 usuários com mais notificações (mínimo 2):');
  notificacoesPorUsuario.forEach((dest, idx) => {
    const taxaLeitura = (
      ((dest.totalNotificacoes - dest.naoLidas) / dest.totalNotificacoes) *
      100
    ).toFixed(1);
    console.log(
      `${idx + 1}. ${dest.nome || 'Usuário não encontrado'} (${dest.usuarioTipo || 'Tipo desconhecido'})`
    );
    console.log(
      `   Total: ${dest.totalNotificacoes} notificações | Não lidas: ${dest.naoLidas} (Taxa leitura: ${taxaLeitura}%)`
    );
    console.log(`   Tipos recebidos: ${dest.tipos.join(', ')}`);
    if (dest.ultimaNotificacao) {
      console.log(
        `   Última notificação: ${new Date(dest.ultimaNotificacao).toLocaleDateString('pt-BR')}`
      );
    }
  });

  console.log('\n=== QUERY 8: Top 5 execuções mais difíceis usando $match, $sort e $limit ===');

  console.log(
    "\nQuery: \nExecucao.aggregate([\n  { $match: { concluido: true, dificuldadePercebida: { $exists: true } } },\n  { $sort: { dificuldadePercebida: -1 } },\n  { $limit: 5 },\n  { $lookup: { from: 'alunos', localField: 'alunoId', foreignField: '_id', as: 'aluno' } },\n  { $unwind: '$aluno' },\n  { $project: { nomeAluno: '$aluno.nome', dificuldadePercebida: 1, duracaoReal: 1, caloriasQueimadas: 1, feedbackAluno: 1 } }\n]);\n"
  );

  const execucoes = await Execucao.aggregate([
    {
      $match: {
        concluido: true,
        dificuldadePercebida: { $exists: true },
      },
    },
    { $sort: { dificuldadePercebida: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'alunos',
        localField: 'alunoId',
        foreignField: '_id',
        as: 'aluno',
      },
    },
    { $unwind: '$aluno' },
    {
      $project: {
        nomeAluno: '$aluno.nome',
        dificuldadePercebida: 1,
        duracaoReal: 1,
        caloriasQueimadas: 1,
        feedbackAluno: 1,
      },
    },
  ]);

  console.log('Top 5 execuções mais difíceis:');
  execucoes.forEach((exec, idx) => {
    console.log(
      `${idx + 1}. ${exec.nomeAluno}: Dificuldade ${exec.dificuldadePercebida}/10 - ${exec.duracaoReal}min, ${exec.caloriasQueimadas}kcal`
    );
    console.log(`   Feedback: "${exec.feedbackAluno}"`);
  });

  console.log('\n=== QUERY 9: Buscar alunos com histórico de avaliações usando $exists e $ne ===');
  console.log(
    "\nQuery: \nAluno.find({ historicoAvaliacoes: { $exists: true, $ne: [] } }).select('nome historicoAvaliacoes');\n"
  );
  alunos = await Aluno.find({
    historicoAvaliacoes: { $exists: true, $ne: [] },
  }).select('nome historicoAvaliacoes');

  console.log(`Encontrados ${alunos.length} alunos com histórico de avaliações:`);
  alunos.forEach((aluno) => {
    console.log(`- ${aluno.nome}: ${aluno.historicoAvaliacoes.length} avaliações registradas`);
    aluno.historicoAvaliacoes.forEach((av) => {
      console.log(
        `  * ${av.data.toLocaleDateString()}: Peso ${av.peso}kg, ${av.percentualGordura}% gordura`
      );
    });
  });

  console.log('\n=== QUERY 10: Contar mensagens enviadas/recebidas por educador usando $facet ===');
  console.log(
    '\nQuery: \nMensagem.aggregate([\n  { $facet: { enviadas: [ { $match: { remetenteTipo: "Educador" } }, { $group: { _id: "$remetenteId", totalEnviadas: { $count: {} } } } ], recebidas: [ { $match: { destinatarioTipo: "Educador" } }, { $group: { _id: "$destinatarioId", totalRecebidas: { $count: {} } } } ] } },\n  { $project: { mensagens: { $concatArrays: ["$enviadas", "$recebidas"] } } },\n  { $unwind: "$mensagens" },\n  { $group: { _id: "$mensagens._id", totalEnviadas: { $sum: "$mensagens.totalEnviadas" }, totalRecebidas: { $sum: "$mensagens.totalRecebidas" } } },\n  { $lookup: { from: "educadores", localField: "_id", foreignField: "_id", as: "educador" } },\n  { $unwind: "$educador" },\n  { $project: { nome: "$educador.nome", totalEnviadas: 1, totalRecebidas: 1, total: { $add: ["$totalEnviadas", "$totalRecebidas"] } } },\n  { $sort: { total: -1 } }\n]);\n'
  );

  const resultado = await Mensagem.aggregate([
    {
      $facet: {
        enviadas: [
          {
            $match: { remetenteTipo: 'Educador' },
          },
          {
            $group: {
              _id: '$remetenteId',
              totalEnviadas: { $count: {} },
            },
          },
        ],
        recebidas: [
          {
            $match: { destinatarioTipo: 'Educador' },
          },
          {
            $group: {
              _id: '$destinatarioId',
              totalRecebidas: { $count: {} },
            },
          },
        ],
      },
    },
    {
      $project: {
        mensagens: {
          $concatArrays: ['$enviadas', '$recebidas'],
        },
      },
    },
    { $unwind: '$mensagens' },
    {
      $group: {
        _id: '$mensagens._id',
        totalEnviadas: { $sum: '$mensagens.totalEnviadas' },
        totalRecebidas: { $sum: '$mensagens.totalRecebidas' },
      },
    },
    {
      $lookup: {
        from: 'educadores',
        localField: '_id',
        foreignField: '_id',
        as: 'educador',
      },
    },
    { $unwind: '$educador' },
    {
      $project: {
        nome: '$educador.nome',
        totalEnviadas: 1,
        totalRecebidas: 1,
        total: { $add: ['$totalEnviadas', '$totalRecebidas'] },
      },
    },
    { $sort: { total: -1 } },
  ]);

  console.log('Estatísticas de mensagens por educador:');
  resultado.forEach((stat) => {
    console.log(
      `- ${stat.nome}: ${stat.totalEnviadas} enviadas, ${stat.totalRecebidas} recebidas (Total: ${stat.total})`
    );
  });

  await mongoose.connection.close();

  process.exit(0);
})();
