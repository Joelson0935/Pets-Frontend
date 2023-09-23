# Pets-Frontend
* Frontend de um sistemas de cadastro de pets feito por mim para fins educativos, este projeto frontend
* comunica com uma api rest escrita em java com spring boot, tanto este frontend quanto a api backend
* estão terminadas até o momento e hospedadas.

## Descrição do projeto
* Esta aplicação é um cadastro de animais de estimação, eu usei integração com a api imgBB para guardar
* as fotos dos pets lá e pegar a url da foto hospedada para passar como parâmetro para guardar no
* banco de dados, os dados são enviados para minha api rest hospedada na plataforma RailWay no banco
* de dados PostgreSQL, este frontend possui apenas 3 páginas, sendo uma para cadastro e duas outras para
* busca e visualização dos pets cadastrados. Na página de visualização aparece uma lista paginada com os
* animais cadastrados e logo abaixo os botões que são criados dinâmicamente com javascript conforme a
* quantidade de dados forem aumentando no banco, no input de busca acima há a implementação de uma busca
* por nome do animal trazendo assim uma lista dos pets com o nome digitado. Ao clicar na imagem do
* animal o usuário é redirecionado para a página de visualização do animal e seus dados.

## Tecnologias usadas
* HTML
* CSS
* Javascript
## página inicial com lista paginada
![index pagina de animais](https://github.com/Joelson0935/Pets-Frontend/assets/56981455/af66b918-a97a-42a0-bfdf-358130c534a5)
## página de cadastro
![cadastro](https://github.com/Joelson0935/Pets-Frontend/assets/56981455/d3cfdf71-e620-419b-a61b-ef0549f9e66e)
## página de visualização do pet selecionado
![visualização](https://github.com/Joelson0935/Pets-Frontend/assets/56981455/991870d1-a7c1-4d5f-981b-67aecbc47086)
