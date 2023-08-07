//  VARIÁVEIS //

const busca = document.getElementById("buscar");
const main = document.getElementById("list");
const divPagina = document.querySelector(".pagina");
const div = document.getElementById("div-pagina")
let pageNumber = 0
const tamanho = 5
// FUNÇÕES //
function buscarTodosOsPets() {


    const url = 'http://localhost:8080/pet/buscar-lista-paginada?page=' + pageNumber + '&size=' + tamanho + '&sort=id'

    fetch(url).then(response => response.json())
        .then(data => {

            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }

            for (let i = 0; i < data.content.length; i++) {
                const div = document.createElement("div");
                const a = document.createElement("a");
                a.href = "./paginas/visualizar/visualizar.html?id=" + data.content[i].id;
                const img = document.createElement("img");
                const p = document.createElement("p");

                img.src = data.content[i].foto;
                p.innerText = data.content[i].nome

                a.appendChild(img)
                div.appendChild(a)
                div.appendChild(p)
                main.appendChild(div)
            }
        })
        .catch(err => console.error(err));
}

function carregarPaginacao() {
    fetch("http://localhost:8080/pet/buscar-lista-completa").then(response => response.json())
        .then(responseData => {
            while (divPagina.firstChild) {
                divPagina.removeChild(divPagina.firstChild)
            }

            const primeiro = document.createElement("button")
            primeiro.innerText = 'Inicio'
            primeiro.addEventListener("click", buscarTodosOsPets)
            div.appendChild(primeiro)
            divPagina.appendChild(div)

            let botoes = (responseData.length / tamanho)

            if (botoes >= 1 && responseData.length > tamanho) {
                for (let i = 0; i < Math.trunc(botoes); i++) {
                    const botao = document.createElement("button");
                    botao.innerText = 'Página ' + (i + 1)
                    div.appendChild(botao)
                    divPagina.appendChild(div)
                    botao.onclick = () => {
                        let number = (i + 1)
                        fetch('http://localhost:8080/pet/buscar-lista-paginada?page=' + number + '&size=5&sort=id')
                            .then(response => response.json())
                            .then(data => {
                                while (main.firstChild) {
                                    main.removeChild(main.firstChild);
                                }

                                for (let i = 0; i < data.content.length; i++) {
                                    const div = document.createElement("div");
                                    const a = document.createElement("a");
                                    a.href = "./paginas/visualizar/visualizar.html"
                                    const img = document.createElement("img");
                                    const p = document.createElement("p");

                                    img.src = data.content[i].foto;
                                    p.innerText = data.content[i].nome

                                    a.appendChild(img)
                                    div.appendChild(a)
                                    div.appendChild(p)
                                    main.appendChild(div)
                                }
                            }).catch(err => console.log(err))
                    }
                }
            }
        })
}

function buscarPetPorNome() {
    const nome = document.querySelector("#nome").value;
    fetch('http://localhost:8080/pet/buscar-objeto-por-nome?nome=' + nome)
        .then(response => response.json())
        .then(data => {

            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }

            data.forEach(element => {
                const div = document.createElement("div");
                const a = document.createElement("a");
                a.href = "./paginas/visualizar/visualizar.html?id=" + element.id;
                const img = document.createElement("img");
                const p = document.createElement("p");

                img.src = `./img/${element.foto}`;
                p.innerText = element.nome;
                a.appendChild(img)
                div.appendChild(a)
                div.appendChild(p)
                main.appendChild(div)
            });
        }).catch(error => console.error(error));
    document.querySelector("#nome").value = ''
}

// CHAMADA DAS FUNÇÕES //

window.onload = buscarTodosOsPets()
busca.addEventListener("click", buscarPetPorNome);
window.onload = carregarPaginacao()
