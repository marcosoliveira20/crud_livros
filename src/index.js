const express = require('express');
const app = express();

app.use(express.json());

let count = 1;
const livros = [{
        "id": 0,
        "ISBN": "1111111111",
        "titulo": "isso é um título", 
        "descricao": "isso é uma descrição", 
        "edicao": "essa é a edição", 
        "autor": "esse é o autor"
    },
    {
        "id": 1,
        "ISBN": "222222222",
        "titulo": "isso é um títul2", 
        "descricao": "isso é uma descrição2", 
        "edicao": "essa é a edição2", 
        "autor": "esse é o autor2"
    }
];

app.post('/livros', (req, res, next) => {
    const {ISBN, titulo, descricao, edicao, autor} = req.body;
    let livro = livros.find(livro => livro.ISBN == ISBN);

    if (livro) {
        return res.status(400).json({"message": "Book already exist",livro});
    }

    livro = {id: count += 1, ISBN, titulo, descricao, edicao, autor};
    livros.push(livro);

    return res.status(201).json(livro);
});

app.get('/livros', (req, res, next) => {
    return res.status(200).json(livros);
});

app.put('/livros', (req, res, next) => {
    const {id, ISBN, titulo, descricao, edicao, autor} = req.body;
    const livro = livros.find(livro => livro.id == id);
    
    if(!livro) {
        return res.status(400).send();
    }

    livro.ISBN = ISBN;
    livro.titulo = titulo;
    livro.descricao = descricao;
    livro.edicao = edicao;
    livro.autor = autor;

    return res.status(200).json(livro);
});

app.delete('/livros', (req, res, next) => {
    const {id} = req.body;
    const livroIndex = livros.findIndex(livro => livro.id == id);

    if(livroIndex < 0) {
        return res.status(400).send();
    }

    livros.splice(livroIndex, 1);

    return res.status(200).json(livros);
});

app.listen(3000);