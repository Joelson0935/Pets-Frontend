//  VARIÁVEIS //

const busca = document.getElementById("buscar");
const main = document.getElementById("list");
const divPagina = document.querySelector(".pagina");

// FUNÇÕES //
function buscarTodosOsPets() {
    let pageNumber = 0
    const tamanho = 5
    const url = 'http://localhost:8080/pet/buscar-lista-paginada?page=' + pageNumber + '&size=' + tamanho + '&sort=id'

    fetch(url).then(response => response.json())
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

                img.src = './img/pitoco.jpg';
                p.innerText = data.content[i].nome

                a.appendChild(img)
                div.appendChild(a)
                div.appendChild(p)
                main.appendChild(div)
            }

            while (divPagina.firstChild) {
                divPagina.removeChild(divPagina.firstChild)
            }

            const primeiro = document.createElement("button")
            primeiro.innerText = 'Inicio'
            primeiro.addEventListener("click", buscarTodosOsPets)
            divPagina.appendChild(primeiro)

            let botoes = data.content.length / tamanho

            for (let i = 0; i < botoes; i++) {
                const botao = document.createElement("button");
                botao.innerText = 'Página ' + (i + 1)
                divPagina.appendChild(botao)
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

                                img.src = './img/pitoco.jpg';
                                p.innerText = data.content[i].nome

                                a.appendChild(img)
                                div.appendChild(a)
                                div.appendChild(p)
                                main.appendChild(div)
                            }
                        })
                }
            }
        })
        .catch(err => console.error(err));
}

function buscarPetPorNome() {
    const nome = document.querySelector("#nome").value;
    fetch('http://localhost:8080/pet/buscar-objeto-por-nome?nome=' + nome)
        .then(response => response.json())
        .then(data => {
            const div = document.createElement("div");
            const a = document.createElement("a");
            a.href = "./paginas/visualizar/visualizar.html"
            const img = document.createElement("img");
            const p = document.createElement("p");

            while (main.firstChild) {
                main.removeChild(main.firstChild);
            }

            img.src = './img/pitoco.jpg';
            p.innerText = data.nome;
            a.appendChild(img)
            div.appendChild(a)
            div.appendChild(p)
            main.appendChild(div)

        })
        .catch(error => console.error(error));
    document.querySelector("#nome").value = ''
}

// CHAMADA DAS FUNÇÕES //

window.onload = buscarTodosOsPets()
busca.addEventListener("click", buscarPetPorNome);
