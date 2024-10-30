const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const banco = mysql.createConnection({
  host: 'localhost',
  user: 'listadetarefas',
  password: 'listadetarefas',
  database: 'listaDeTarefas'
});

banco.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar ao banco de dados:', erro);
  } else {
    console.log('Conectado ao MySQL');
  }
});

app.get('/tarefas', (req, res) => {
  banco.query('SELECT * FROM tarefas', (erro, resultados) => {
    if (erro) throw erro;
    res.json(resultados);
  });
});

app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;
  banco.query('INSERT INTO tarefas (titulo) VALUES (?)', [titulo], (erro, resultado) => {
    if (erro) throw erro;
    res.status(201).json({ id: resultado.insertId, titulo, concluida: false });
  });
});

app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, concluida } = req.body;
  banco.query(
    'UPDATE tarefas SET titulo = ?, concluida = ? WHERE id = ?',
    [titulo, concluida, id],
    (erro) => {
      if (erro) throw erro;
      res.sendStatus(200);
    }
  );
});

app.delete('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  banco.query('DELETE FROM tarefas WHERE id = ?', [id], (erro) => {
    if (erro) throw erro;
    res.sendStatus(200);
  });
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});