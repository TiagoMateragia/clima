// Variáveis para ligação com o HTML.
let body = document.querySelector('body');

let nomeDias = [
    document.querySelector('.nome_dia_um'),
    document.querySelector('.nome_dia_dois'),
    document.querySelector('.nome_dia_tres'),
    document.querySelector('.nome_dia_quatro'),
    document.querySelector('.nome_dia_cinco')
];

let grausDias = [
    document.querySelector('.graus_dia_um'),
    document.querySelector('.graus_dia_dois'),
    document.querySelector('.graus_dia_tres'),
    document.querySelector('.graus_dia_quatro'),
    document.querySelector('.graus_dia_cinco')
];

let imagensDias = [
    document.querySelector('.imagem_dia_um'),
    document.querySelector('.imagem_dia_dois'),
    document.querySelector('.imagem_dia_tres'),
    document.querySelector('.imagem_dia_quatro'),
    document.querySelector('.imagem_dia_cinco')
];
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
        for (let i = 0; i < 5; i++) {
            nomeDias[i].textContent = "Acesso negado";
            grausDias[i].textContent = "Acesso negado";
            imagensDias[i].textContent = "Acesso negado";
        }
    }
//Solicita permissão e encontra a posição do usuário.
    navigator.geolocation.getCurrentPosition(achar_posicao, local_erro);
}

//Função para mostrar as informações do clima.
function mostrar_clima(dados){
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${dados.latitude}&longitude=${dados.longitude}&daily=temperature_2m_max,weathercode&timezone=auto`)
    .then((dado) =>{
        return dado.json();
    })
    .then((dado_json) =>{
//Separa os dados da API em 3 listas para poder usar depois no loop.
        const dias = dado_json.daily.time;
        const temperaturas = dado_json.daily.temperature_2m_max;
        const clima = dado_json.daily.weathercode;

//Loop para a visualização do clima para o usuário.
        for (let i = 0; i < 5; i++) {
            const dataObj = new Date(dias[i] + "T00:00:00-03:00");
            const nomeDia = dataObj.toLocaleDateString("pt-BR", { weekday: "long" });

            nomeDias[i].textContent = nomeDia;
            grausDias[i].textContent = `${temperaturas[i]}°C`;

            if (clima[i] == 0 || clima[i] == 1){
                imagensDias[i].innerHTML = "<img class = img_clima src=imagens/clima_sol.png alt=>";
            }
            else if (clima[i] == 2 || clima[i] == 3 || clima[i] == 45 || clima[i] == 48){
                imagensDias[i].innerHTML = "<img class = img_clima src=imagens/clima_nublado.png alt=>";
            }
            else if (clima[i] == 51 || clima[i] == 53 || clima[i] == 55){
                imagensDias[i].innerHTML = "<img class = img_clima src=imagens/clima_garoa.png alt=>";
            }
            else if (clima[i] >= 61 && clima[i] <= 99){
               imagensDias[i].innerHTML = "<img class = img_clima src=imagens/clima_chuva.png alt=>";
            }
//Muda o fundo da página conforme o clima do dia atual.
            if (clima[0] == 0 || clima[0] == 1){
                body.style.backgroundImage = "url('imagens/fundo_sol.png')";
                body.style.backgroundSize = "cover";
                body.style.backgroundRepeat = "no-repeat";
                body.style.backgroundPosition = "center";
            }

            else if (clima[0] == 2 || clima[0] == 3 || clima[0] == 45 || clima[0] == 48){
                body.style.backgroundImage = "url('imagens/fundo_nublado.png')";
                body.style.backgroundSize = "cover";
                body.style.backgroundRepeat = "no-repeat";
                body.style.backgroundPosition = "center";
            }

            else if (clima[0] == 51 || clima[0] == 53 || clima[0] == 55){
                body.style.backgroundImage = "url('imagens/fundo_chuva.png')";
                body.style.backgroundSize = "cover";
                body.style.backgroundRepeat = "no-repeat";
                body.style.backgroundPosition = "center";
            }

            else if (clima[0] >= 61 && clima[0] <= 99){
                body.style.backgroundImage = "url('imagens/fundo_tempestade.png')";
                body.style.backgroundSize = "cover";
                body.style.backgroundRepeat = "no-repeat";
                body.style.backgroundPosition = "center";
            }
        }
    })
}

pegar_local();