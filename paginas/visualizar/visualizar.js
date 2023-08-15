const nome = document.getElementById('nome');
const sexo = document.getElementById('sexo');
const cor = document.getElementById('cor');
const raca = document.getElementById('raca');
const imagem = document.getElementById("imagem");

window.onload = () => {
    const parametros = new URLSearchParams(window.location.search)
    const id = parametros.get("id")
    fetch(`http://localhost:8080/pet/buscar-pet-por-id/${id}`)
        .then(response => response.json())
        .then(data => {
            imagem.src = 'http://localhost:8080/' + data.foto;
            nome.innerText = data.nome
            sexo.innerText = data.sexo
            cor.innerText = data.cor
            raca.innerText = data.raca
        }).catch(err => console.error(err))
}