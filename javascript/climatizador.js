// Variáveis para ligação com o HTML.
let nome_dia_um = document.querySelector('.nome_dia_um');
let graus_dia_um = document.querySelector('.graus_dia_um');
let imagem_dia_um = document.querySelector('.imagem_dia_um');
let nome_dia_dois = document.querySelector('.nome_dia_dois');
let graus_dia_dois = document.querySelector('.graus_dia_dois');
let imagem_dia_dois = document.querySelector('.imagem_dia_dois');
let nome_dia_tres = document.querySelector('.nome_dia_tres');
let graus_dia_tres = document.querySelector('.graus_dia_tres');
let imagem_dia_tres = document.querySelector('.imagem_dia_tres');
let nome_dia_quatro = document.querySelector('.nome_dia_quatro');
let graus_dia_quatro = document.querySelector('.graus_dia_quatro');
let imagem_dia_quatro = document.querySelector('.imagem_dia_quatro');
let nome_dia_cinco = document.querySelector('.nome_dia_cinco');
let graus_dia_cinco = document.querySelector('.graus_dia_cinco');
let imagem_dia_cinco = document.querySelector('.imagem_dia_cinco');

//Função para pegar a latitude e longitude do usuário.
function pegar_local(){
//Define um obj com a latitude e longitude encontrada na posição do usuário.
    let achar_posicao = posicao =>{
        let dados = {
            latitude: posicao.coords.latitude,
            longitude: posicao.coords.longitude
        }
        mostrar_clima(dados);
    }
//Mensagem de erro caso o usuário negue a permissão.
    let local_erro = erro =>{
        nome_dia_um.innerHTML = "Acesso não concedido.";
        graus_dia_um.innerHTML = "Acesso não concedido.";
        imagem_dia_um.innerHTML = "Acesso não concedido.";
        nome_dia_dois.innerHTML = "Acesso não concedido.";
        graus_dia_dois.innerHTML = "Acesso não concedido.";
        imagem_dia_dois.innerHTML = "Acesso não concedido.";
        nome_dia_tres.innerHTML = "Acesso não concedido.";
        graus_dia_tres.innerHTML = "Acesso não concedido.";
        imagem_dia_tres.innerHTML = "Acesso não concedido.";
        nome_dia_quatro.innerHTML = "Acesso não concedido.";
        graus_dia_quatro.innerHTML = "Acesso não concedido.";
        imagem_dia_quatro.innerHTML = "Acesso não concedido.";
        nome_dia_cinco.innerHTML = "Acesso não concedido.";
        graus_dia_cinco.innerHTML = "Acesso não concedido.";
        imagem_dia_cinco.innerHTML = "Acesso não concedido.";
    }
//Solicita permissão e encontra a posição do usuário.
    navigator.geolocation.getCurrentPosition(achar_posicao, local_erro);
}

//Função para mostrar as informações do clima.
function mostrar_clima(dados){
    fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,weathercode&timezone=auto")
    .then((dado) =>{
        return dado.json();
    })
    .then((dado_json) =>{
        console.log(dado_json);
    })
}

pegar_local();