const inputImage = document.querySelector("#imagem");
const botao = document.querySelector('.cadastro')
const img = document.getElementById("img")
const divSexo = document.getElementById("div-sexo")
let small = document.querySelector(".msg-erro")
let msgSucesso = document.getElementById("sucesso")
const testUrl = 'http://localhost:8080'
const prodUrl = 'https://pets-backend-production.up.railway.app'

const baseUrl = testUrl

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

function guardarImagem() {
    const photo = document.querySelector("#imagem");
    const data = new FormData()
    data.append("image", photo.files[0])
    const imgbb_key = 'dbd4ee2f4d216e3042247039cf0ab7b4'

    if (inputImage.value === '') {
        document.getElementById('div-imagem').style.border = "1px solid red"
        small.style.display = "block"
        small.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    } else {
        document.getElementById('div-imagem').style.border = "none"
        small.style.display = "none"
    }

    //https://api.imgbb.com/1/upload
    fetch('https://api.imgbb.com/1/upload?key=' + imgbb_key, {
        method: "POST",
        body: data,
    }).then(response => response.json())
        .then(response => {
            cadastrar(response.data.url)
        })
        .catch(erro => console.error(erro))

}

function cadastrar(imageUrl) {
    const urlPost = baseUrl + '/pet/guardar-objeto'
    const name = document.querySelector("#nome").value;
    const gender = document.querySelector("#sexo").value;
    const color = document.querySelector("#cor").value;
    const race = document.querySelector("#raca").value;

    // ---------------------------------------------------- //
    //                    VERIFICAÇÕES                      //
    // ---------------------------------------------------- //

    if (name === '') {
        document.getElementById("div-nome").style.border = '1px solid red'
        document.getElementById('nome-text-error').style.display = "block"
        const inputName = document.getElementById("nome")
        inputName.scrollIntoView({ behavior: "smooth", block: 'center' })
        return
    } else {
        document.getElementById("div-nome").style.border = 'none'
        document.getElementById('nome-text-error').style.display = "none"
    }

    if (gender === '') {
        divSexo.style.border = "1px solid red"
        document.getElementById('select').style.display = "block"
        const select = document.getElementById("sexo")
        select.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    } else {
        divSexo.style.border = "none"
        document.getElementById('select').style.display = "none"
    }

    if (color === '') {
        document.getElementById("div-cor").style.border = '1px solid red'
        document.getElementById('cor-text-error').style.display = "block"
        const inputCor = document.getElementById("cor")
        inputCor.scrollIntoView({ behavior: "smooth", block: 'center' })
        return
    } else {
        document.getElementById("div-cor").style.border = 'none'
        document.getElementById('cor-text-error').style.display = "none"
    }

    if (race === '') {
        document.getElementById("div-raca").style.border = '1px solid red'
        document.getElementById('raca-text-error').style.display = "block"
        const inputRaca = document.getElementById("raca")
        inputRaca.scrollIntoView({ behavior: "smooth", block: 'center' })
        return
    } else {
        document.getElementById("div-raca").style.border = 'none'
        document.getElementById('raca-text-error').style.display = "none"
    }

    // ---------------------------------------------------- //
    //                 FUNÇÃO DE CADASTRO                   //
    // ---------------------------------------------------- //

    fetch(urlPost, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            foto: imageUrl,
            nome: name.toLowerCase(),
            sexo: gender,
            cor: color.toLowerCase(),
            raca: race.toLowerCase()
        }),
    }).catch(error => {
        console.error('Erro na requisição:', error);
    })

    msgSucesso.style.display = "block"
    document.getElementById("text-success").scrollIntoView({ behavior: "smooth", block: 'center' })
    setTimeout(() => {
        msgSucesso.style.display = 'none'
    }, 1000);
    img.style.display = "none"
    document.getElementById('form').reset()
}

botao.addEventListener('click', guardarImagem)
