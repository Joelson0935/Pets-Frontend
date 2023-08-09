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
    //                    VERIFICAÇÕES                      //
    // ---------------------------------------------------- //

    if (inputImage.value === '') {
        document.getElementById('div-imagem').style.border = "1px solid red"
        small.style.display = "block"
        small.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    } else {
        document.getElementById('div-imagem').style.border = "none"
        small.style.display = "none"
    }

    if (name === '') {
        document.getElementById("div-nome").style.border = '1px solid red'
        const erroNome = document.getElementById('nome-text-error').style.display = "block"
        erroNome.scrollIntoView({ behavior: "smooth", block: 'center' })
        return
    } else {
        document.getElementById("div-nome").style.border = 'none'
        document.getElementById('nome-text-error').style.display = "none"
    }

    if (gender === '') {
        divSexo.style.border = "1px solid red"
        const select = document.getElementById('select').style.display = "block"
        select.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    } else {
        divSexo.style.border = "none"
        document.getElementById('select').style.display = "none"
    }

    if (color === '') {
        document.getElementById("div-cor").style.border = '1px solid red'
        const erroCor = document.getElementById('cor-text-error').style.display = "block"
        erroCor.scrollIntoView({ behavior: "smooth", block: 'center' })
        return
    } else {
        document.getElementById("div-cor").style.border = 'none'
        document.getElementById('cor-text-error').style.display = "none"
    }

    if (race === '') {
        document.getElementById("div-raca").style.border = '1px solid red'
        const erroRaca = document.getElementById('raca-text-error').style.display = "block"
        erroRaca.scrollIntoView({ behavior: "smooth", block: 'center' })
        return
    } else {
        document.getElementById("div-raca").style.border = 'none'
        document.getElementById('raca-text-error').style.display = "none"
    }

    // ---------------------------------------------------- //
    //            FUNÇÃO DE ENVIO DE IMAGEM                 //
    // ---------------------------------------------------- //

    const data = new FormData()
    data.append("image", photo.files[0])

    fetch('http://localhost:8080/pet/guardar-imagem', {
        method: "POST",
        body: data
    }).catch(error => {
        console.error('Erro na requisição:', error);
    })

    // ---------------------------------------------------- //
    //                 FUNÇÃO DE CADASTRO                   //
    // ---------------------------------------------------- //

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
            document.getElementById("sucesso").style.display = "block"
            const message = document.querySelector("#sucesso p")
            message.scrollIntoView({ behavior: 'smooth', block: 'center' })
            console.log('Resposta do servidor:', data);
        }).catch(error => {
            console.error('Erro na requisição:', error);
        });
}

botao.addEventListener('click', cadastrar)

