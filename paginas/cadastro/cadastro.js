const inputImage = document.querySelector("#imagem");
const botao = document.querySelector('.cadastro')
let imagem = ''
const img = document.getElementById("img")
if (img.getAttribute("src") === "") {
    img.style.display = "none"
}



inputImage.addEventListener('change', (event) => {
    img.style.display = 'flex'
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = () => {
        document.querySelector("#img").src = fileReader.result;
    }
})

function cadastrar() {
    const url = 'http://localhost:8080/pet/guardar-dados'
    const photo = document.querySelector("#imagem");
    const name = document.querySelector("#nome").value;
    const gender = document.querySelector("#sexo").value;
    const color = document.querySelector("#cor").value;
    const race = document.querySelector("#raca").value;
    // ---------------------------------------------------- //
    const data = new FormData()
    data.append("image", photo.files[0])

    fetch('http://localhost:8080/pet/guardar-imagem', {
        method: "POST",
        body: data
    }).then(data => {
        console.log('Resposta do servidor:', data);
    }).catch(error => {
        console.error('Erro na requisição:', error);
    })
    // ---------------------------------------------------- //
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            foto: `../../img/${photo.files[0].name}`,
            nome: name,
            sexo: gender.toUpperCase(),
            cor: color,
            raca: race
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição.');
        }
        return response.json();
    }).then(data => {
        console.log('Resposta do servidor:', data);
    }).catch(error => {
        console.error('Erro na requisição:', error);
    });
}

botao.addEventListener('click', cadastrar)
