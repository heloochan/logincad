// Função para acessar a página de cadastro após validação de login
function acessar() {
    // Obtém o valor dos campos de e-mail e senha
    let loginEmail = document.getElementById('loginEmail').value;
    let loginSenha = document.getElementById('loginSenha').value;
   
    // Verifica se os campos de e-mail e senha estão preenchidos
    if (!loginEmail || !loginSenha) {
        // Exibe um alerta se algum campo estiver vazio
        alert("Favor preencher todos os campos");
    } else {
        // Redireciona para a página de cadastro se todos os campos estiverem preenchidos
        window.location.href='cadastro.html';
    }
  }
   
  // Arrays para armazenar dados dos usuários
  var dadosLista = []; // Array para armazenar os nomes dos usuários
  var salvaEmail = []; // Array para armazenar os e-mails dos usuários
  var salvacpf = [];
   
  // Função para salvar os dados do usuário
  function salvarUser() {
    // Obtém o valor dos campos de nome e e-mail
    let nomeUser = document.getElementById('nomeUser').value;
    let emailUser = document.getElementById('emailUser').value;
    let cpfUser = document.getElementById('cpfUser').value;
   
    // Verifica se os campos de nome e e-mail estão preenchidos
    if (nomeUser && emailUser && cpfUser) {
        // Adiciona o nome e o e-mail aos arrays correspondentes
        dadosLista.push(nomeUser);
        salvaEmail.push(emailUser);
        salvacpf.push(cpfUser);
   
        // Cria a lista atualizada na tabela
        criaLista();
   
        // Limpa os campos de entrada após salvar
        document.getElementById('nomeUser').value = "";
        document.getElementById('emailUser').value = "";
        document.getElementById('cpfUser').value = "";
    } else {
        // Exibe um alerta se algum campo estiver vazio
        alert("Favor preencher todos campos!");
    }
  }
   
  // Função para criar a lista na tabela
  function criaLista() {
    // Inicializa o conteúdo da tabela com o cabeçalho
    let table = "<tr><th>Nome Usuário</th><th>E-mail</th><th>cpf</th><th>Ações</th></tr>";
   
    // Adiciona uma linha para cada usuário na lista
    for (let i = 0; i < dadosLista.length; i++) {
        table += "<tr><td>" + dadosLista[i] + "</td><td>" + salvaEmail[i] + "</td><td>" + salvacpf[i] + "</td></td><td><button type='button' onclick='editar(this.parentNode.parentNode.rowIndex)' class='btn btn-success'>Editar</button><button class='btn btn-success' id='btnaltera' type='button' onclick='excluir(this.parentNode.parentNode.rowIndex)'>Excluir</button></td></tr>";
    }
   
    // Atualiza o conteúdo da tabela com a nova lista
    document.getElementById('table').innerHTML = table;
  }
   
  // Função para editar um usuário na lista
function editar(i) {
    // Preenche os campos de entrada com os dados do usuário selecionado
    document.getElementById('nomeUser').value = dadosLista[(i-1)];
    document.getElementById('emailUser').value = salvaEmail[(i-1)];
    document.getElementById('cpfUser').value = salvacpf[(i-1)];
  }
   
    // Remove o usuário da lista para permitir re-adicionar com alterações
    dadosLista.splice(i - 1);
    salvaEmail.splice(i - 1);
    salvaCpf.splice(i - 1);
 
   
  // Função para excluir um usuário da lista
  function excluir(i){
    // Remove o usuário da lista
    document.getElementById('table').deleteRow(i + 1);
    dadosLista.splice(i - 1);
    salvaEmail.splice(i - 1);
    salvacpf.splice(i - 1);
 
   
    // Remove a linha correspondente da tabela
    document.getElementById('table').deleteRow(i + 1); // +1 para ajustar o índice da tabela
  }      
  // CODIGO DE VALIDAÇÃO DE EMAIL
//-------------------------------------------------------------------------------------------
function checarEmail(){
    if(document.forms[0].email.value == "" ||
     document.forms[0].email.value.indexOf('@') == -1||
      document.forms[0].email.value.indexOf('.') == -1 ){
        alert("porfavor, informe um e-mail valido");}else{
           // alert("EMAIL INFORMADO COM SUCESSO")
        }
     
  }
  // VALIDAÇÃO DE CPF DIRETO NO JAVASCRIPT
   
  // Adicionando escutador ao formulário
  document.getElementById('cpfForm').addEventListener('submit', function(event){
    event.preventDefault();
   
    const cpf = document.getElementById('cpf').value;
    const msg = document.getElementById('message');
   
    if(validarCPF(cpf)){
        msg.textContent = 'O CPF é válido!';
        msg.style.color = 'green';
    }else{
        msg.textContent = 'O CPF é inválido!';
        msg.style.color = 'red';
    }
  }
  );
   
  function validarCPF(cpf){
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
   
    // Estrutura de decisão para verificar quantidade de dígitos e se todos os digitos são iguais
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
        return false;
    }
   
    let soma = 0;
    let resto;
   
    // Validando 10º digito do CPF - o primeiro digito verificador
    for(let i=1;i <= 9;i++){
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
   
    resto = (soma * 10) % 11;
   
    if((resto === 10) || (resto === 11)){
        resto = 0;
    }
    if(resto !== parseInt(cpf.substring(9, 10))){
        return false;
    }
    // Validando 11º digito do CPF - o segundo digito verificador
    soma = 0;
    for(let i = 1; i <= 10; i++){
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
   
    resto = (soma * 10) % 11;
   
    if((resto === 10) || (resto === 11)){
        resto = 0;
    }
   
    if(resto !== parseInt(cpf.substring(10, 11))){
        return false;
    }
   
    return true;
  }