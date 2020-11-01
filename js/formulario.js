function validateForm() {
    let nome = document.forms["form"]["nome"];
    let email = document.forms["form"]["email"];
    let mensagem = document.forms["form"]["mensagem"];

    if(isNull(nome.value)){
        errorMessage(nome);
        return false;
    }
    if(isNull(email.value) || !emailIsValid(email.value)){
        errorMessage(email);
        return false;
    }
    if(isNull(mensagem.value)){
        errorMessage(mensagem);
        return false;
    }
    alert('Sucesso!');
}

function validateFormFooter() {
    let email = document.forms["form"]["email"];
    if(isNull(email.value) || !emailIsValid(email.value)){
        errorMessage(email);
        return false;
    }
    alert('Enviado com sucesso!');
}

//Retorna true se o email for valido
function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

//retorna true se o item for null ou vazio
function isNull(item){
    return (item == null || item == '');  
}

function errorMessage(item){
    alert('Campo invalido: ' + item.name); 
}
