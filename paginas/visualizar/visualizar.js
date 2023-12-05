const nome = document.getElementById('nome');
const sexo = document.getElementById('sexo');
const cor = document.getElementById('cor');
const raca = document.getElementById('raca');
const imagem = document.getElementById("imagem");
const testUrl = 'http://localhost:8080'
const prodUrl = 'https://pet-application.onrender.com'

const baseUrl = testUrl

window.onload = () => {
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get("id")
    fetch(`${baseUrl}/pet/buscar-pet-por-id/${id}`)
        .then(response => response.json())
        .then(data => {
            imagem.src = data.foto;
            nome.innerText = data.nome
            sexo.innerText = data.sexo.toLowerCase()
            cor.innerText = data.cor
            raca.innerText = data.raca
        }).catch(err => console.error(err))
}