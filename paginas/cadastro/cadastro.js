const inputImage = document.querySelector("#imagem");
const botao = document.querySelector('.cadastro')
const img = document.getElementById("img")
const divSexo = document.getElementById("div-sexo")
let small = document.querySelector(".msg-erro")

if (img.getAttribute("src") === "") {
    img.style.display = "none"
}

// Colocar a imagem do input na tag imagem
inputImage.addEventListener('change', (event) => {
    img.style.display = 'flex'
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = () => {
        img.src = fileReader.result;
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

    if (inputImage.value == '') {
        document.getElementById('div-imagem').style.border = "5px solid red"
        small.style.display = "block"
    }

    fetch('http://localhost:8080/pet/guardar-imagem', {
        method: "POST",
        body: data
    }).catch(error => {
        console.error('Erro na requisição:', error);
    })

    // ---------------------------------------------------- //

    if (gender === undefined | null | '') {
        divSexo.style.border = "5px solid red"
        document.getElementById('select').style.display = "block"
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            foto: `../../img/${photo.files[0].name}`,
            nome: name.toLowerCase(),
            sexo: gender,
            cor: color.toLowerCase(),
            raca: race.toLowerCase()
        })
    }).then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
        }).catch(error => {
            console.error('Erro na requisição:', error);
        });
}

botao.addEventListener('click', cadastrar)

