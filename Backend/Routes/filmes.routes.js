const express = require('express');
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: `Velozes e Furiosos 3 - Tokyo Drift`,
        ano: `2006`,
        duracao: `104`,
        img: `https://upload.wikimedia.org/wikipedia/pt/thumb/f/f1/TFF-TokyoDrift-p%C3%B4ster.jpg/255px-TFF-TokyoDrift-p%C3%B4ster.jpg`,
        genero: `Ação`,
        nota: 1,
        assistido: `Sim`
    },
]


//[GET] - mostrar todos os filmes
router.get("/", (req,res) =>{
    res.send(filmes)
});

//[GET] - mostrar o filme de acordo com o id recebido via parametros
router.get("/:id", (req,res) =>{
    const idParams = req.params.id;
    const filme = filmes.find(filme => filme.id == idParams);
    res.send(filme)
});

//[POST] - inserir um novo filme na lista
router.post("/add",(req,res)=>{
    const filme = req.body;
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: `O filme ${filme.nome} foi cadastrado com sucesso!`,
        data: filme
    });
});

//[PUT] - editar um filme já cadastrado
router.put("/edit/:id", (req,res) =>{
    const filmeEdit = req.body;
    const idParams = req.params.id;
    let index = filmes.findIndex(filme => filme.id == idParams);

    if (filmeEdit.id == "" || filmeEdit.nome == "" || filmeEdit.ano == "" || filmeEdit.duracao == "" || filmeEdit.diretor == "" || filmeEdit.genero == "" || filmeEdit.nota == ""){
        res.status(400).send({
            message: `Nenhum campo pode estar vazio, por favor preencha todos e tente novamente.`
        })
    } else{
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    };
    }
    res.send({
        message: `Filme ${filmes[index].nome} atualizado com sucesso`,
        data: filmes[index]
    });
});

//[DELETE] - deletar um elemento de acordo com o id
router.delete("/delete/:id", (req,res) =>{
    const idParam = req.params.id;
    
    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    filmes.splice(index, 1);
    res.send({
        message: `Filme ${nome.nome} excluido com sucesso`
    });
})

module.exports = router;