const inputImage = document.querySelector("#imagem");
const botao = document.querySelector('.cadastro')

inputImage.addEventListener('change', (e) => {

    const target = e.target;

    const fileReader = new FileReader();

    fileReader.onload = () => {
        document.querySelector("#img").src = fileReader.result;
    }

    fileReader.readAsDataURL(target.files[0]);
    console.log(inputImage.value);
})



function cadastrar() {
    const url = 'http://localhost:8080/pet/guardar-dados'

    const photo = document.querySelector("#imagem").value;
    const name = document.querySelector("#nome").value;
    const gender = document.querySelector("#sexo").value;
    const color = document.querySelector("#cor").value;
    const race = document.querySelector("#raca").value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            foto: photo,
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

