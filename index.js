 let participantes = [
  {
    nome: "Adriano Junior",
    email: "juninhoup6@gmail.com",
    dataInscricao: new Date(2023, 6, 22, 7, 30),
    dataChekIN: null
  },
  {
    nome: "Thiago Goulart",
    email: "thiagog@gmail.com",
    dataInscricao: new Date(2023, 3, 17, 17, 0),
    dataChekIN: new Date(2024, 3, 30, 17, 0)
  },
  {
    nome: "Maria Silva",
    email: "mariasilva@example.com",
    dataInscricao: new Date(2023, 2, 10, 10, 15),
    dataChekIN: new Date(2024, 2, 25, 10, 15)
  },
  {
    nome: "João Oliveira",
    email: "joao.oliveira@example.com",
    dataInscricao: new Date(2023, 5, 5, 9, 45),
    dataChekIN: null
  },
  {
    nome: "Camila Santos",
    email: "camilasantos@example.com",
    dataInscricao: new Date(2023, 4, 12, 14, 20),
    dataChekIN: new Date(2024, 4, 27, 14, 20)
  },
  {
    nome: "Pedro Almeida",
    email: "pedro.almeida@example.com",
    dataInscricao: new Date(2023, 8, 8, 11, 0),
    dataChekIN: new Date(2024, 8, 23, 11, 0)
  },
  {
    nome: "Carla Souza",
    email: "carla.souza@example.com",
    dataInscricao: new Date(2023, 7, 15, 8, 30),
    dataChekIN: new Date(2024, 7, 30, 8, 30)
  },
  {
    nome: "Rafaela Oliveira",
    email: "rafaela.oliveira@example.com",
    dataInscricao: new Date(2023, 1, 28, 13, 45),
    dataChekIN: new Date(2024, 1, 29, 13, 45)
  },
  {
    nome: "Gustavo Martins",
    email: "gustavomartins@example.com",
    dataInscricao: new Date(2023, 10, 3, 16, 10),
    dataChekIN: new Date(2024, 10, 18, 16, 10)
  },
  {
    nome: "Ana Carolina",
    email: "anacarolina@example.com",
    dataInscricao: new Date(2023, 11, 20, 10, 0),
    dataChekIN: null
  }
]

  const criarNovoParticipante = (participante) => 
    
  {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataChekIN = dayjs(Date.now()).to(participante.dataChekIN)
    
    //Condicional
    if(participante.dataChekIN == null){
      dataChekIN = `
       <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
       >
        Confirmar CheckIn
       </button>
      `

      
    }

    
    return `
    <tr>
    <td>
    <strong>
    ${participante.nome}
    </strong>
    <br>
    <small>${participante.email}</small>
    </td>
    <br>
    <td>
    ${dataInscricao}
    </td>
    <td>
    ${dataChekIN}
    </td>
    </tr>`
  }

const atualizarlista = (participantes) => { 
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante) 
  }
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarlista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get("nome"),
    email: dadosDoFormulario.get("email"),
    dataInscricao: new Date(),
    dataChekIN: null


  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find((p) => {

    return p.email == participante.email
  }
  
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
  }

  participantes = [participante, ...participantes]
  atualizarlista(participantes)

  //limpar formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer fazer chekin
  const mensagemConfirmacao = "Tem certeza que deseja realizar o Check-IN?"
  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  

  //encontrar participante dentro da lista
  const participante = participantes.find((p)=> {
    return p.email == event.target.dataset.email
  })
  //atualizar check in do participante
  participante.dataChekIN = new Date()
  //atualizar a lista de participante
  atualizarlista(participantes)
}