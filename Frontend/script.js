//buscar o elemento no html da minha lista onde vou inserir as filmes
const lista = document.getElementById('lista');

//atribuindo o endpoint da Api do Backend em uma constante
const apiUrl = 'http://localhost:3000/filmes';

let edicao = false;
let idEdicao = 0;

const getFilmes = async () => {
    //fetch api é uma api do js responsavel por fazer comunicacao entre requisicoes http
    const response = await fetch(apiUrl)
    const filmes = await response.json()
    filmes.map((filme) =>{
        lista.insertAdjacentHTML('beforeend',`
                <div class="col">
                  <div class="card h-100">
                    <img src="${filme.img}" class="card-img-top" alt="..."height="300px">
                    <div class="card-body">
                      <h5 class="card-title">${filme.nome}</h5>
                      <span class="badge rounded-pill">Nota ${filme.nota}</span>
                      <p class="card-text">Duração: ${filme.duracao} min</p>
                      <p class="card-text">Gênero: ${filme.genero}</p>
                      <p class="card-text">Você assistiu? ${filme.assistido}</p>
                      <button id="env" class="btn btn-primary" onclick="editFilme('${filme.id}')">Editar</button>
                      <button id="cancel" class="btn btn-danger" onclick="deleteFilme('${filme.id}')">Deletar</button>
                    </div>
                  </div>
                </div>
              </div>`
              )
    })
}

//[POST] envia uma filme para o backend para ser cadastrada

const submitForm = async (event) => {
    event.preventDefault();
    //pegar os valores que o usuario digitou no Input
    let nome = document.getElementById('nome');
    let genero =  document.getElementById('genero');
    let duracao = document.getElementById('duracao');
    let img = document.getElementById('img')
    let nota =  document.getElementById('nota');
    let assistido = document.getElementById('assistido');
    

    const filme ={
      nome: nome.value,
      genero: genero.value,
      duracao: duracao.value,
      img: img.value,
      nota: parseFloat(nota.value),
      assistido: assistido.value
    }

    if(edicao) {
      putFilme(filme,idEdicao)
    } else {
      createFilme(filme);
    }
  limparCampos();

  lista.innerHTML = ''
}

const createFilme = async (filme) => {
  // estou construindo a requisição para ser enviada para o Backend
  const request = new Request(`${apiUrl}/add`, {
    method: 'POST',
    body: JSON.stringify(filme),
    headers: new Headers({
      'content-type': 'application/json'
    })
  })


    //chamamos a funcao fetch de acordo com as nossas configuracoes de requisicao
    const response = await fetch(request);
    const result = await response.json();
    //pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    getFilmes();
    }

const putFilme = async (filme, id) => {
    // estou construindo a requisição para ser enviada para o Backend
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
        'content-type': 'application/json'
        })
  })


//chamamos a funcao fetch de acordo com as nossas configuracoes de requisicao

const response = await fetch(request);

const result = await response.json();
//pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
alert(result.message)
edicao = false;
idEdicao = 0;
getFilmes();
}

const limparCampos = () => {
  nome.value = "";
  genero.value = "";
  duracao.value = "";
  img.value = "";
  nota.value = "";
  assistido.value = "";
}


//[DELETE] deletar uma filmes
const deleteFilme = async (id) =>{
  //construir a requisicao de delete
  const request = new Request(`${apiUrl}/delete/${id}`,{
    method: 'DELETE'
  })

  const response = await fetch(request);
  const result = await response.json();

  alert(result.message);
  lista.innerHTML= '';
  getFilmes();
}

//[GET] - função para receber o ID via paramentro e envia uma req para o back e retorna a filme de acordo com esse ID
const getFilmesById = async (id) => {
  const response = await fetch (`${apiUrl}/${id}`);
  return await response.json();
}

//[PUT] - ao clicar no botao editar, vai preencher os campos dos inputs para montar o objeto para ser editado
const editFilme = async (id) => {
  //habilitando o modo de edicao e enviando o ID para a variavel idEdicao
  edicao = true;
  idEdicao = id; 
  //Precisamos buscar a informação da filme por id para popular os campos
  //salvar os dados da vafa que vamos editar na variavel filme.
  const filme = await getFilmesById(id);

  //preencher os campos de acordo com a filme que vamos editar.
  nome.value = filme.nome;
  genero.value = filme.genero;
  duracao.value = filme.duracao;
  nota.value = filme.nota;
  assistido.value = filme.assistido;
  img.value = filme.img;
}
getFilmes();