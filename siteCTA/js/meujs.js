function validaForm(){
    /* 
     *  Ao enviar o formulário os dados devem ser validados usando. 
     *  Os campos Nome, e-mail, cidade e mensagem não podem ser vazios. 
     *  
     *  O campo nome tem de ter no mínimo 6 caracteres. 
     *  O campo cidade tem de ter no mínimo 4 caracteres. 
     *  O campo idade tem de ser numérico.
     */
    
    var nome     = contato.nome.value;
    var email    = contato.email.value;
    var cidade   = contato.cidade.value;
    var mensagem = contato.mensagem.value;
    var idade    = contato.idade.value;

    if(nome == "" || nome.length < 6) {
        alert( "É necessario preencher o campo NOME com no mínimo 6 caracteres!" );
        document.contato.nome.focus();
        return false;
    }
    
    if (isNaN(idade)) {
        alert( "O campo IDADE deve ser numérico!" );
        document.contato.idade.focus();
        return false;
    }       

    if(email == "") {
        alert( "Preencha campo E-MAIL!" );
        document.contato.email.focus();
        return false;
    }

    if (cidade == "") {
        alert( "Preencha o campo CIDADE!" );
        document.contato.cidade.focus();
        return false;
    }
    
    if (cidade.length < 4 ) {
        alert( "É necessario preencher o campo CIDADE com no mínimo 4 caracteres!" );
        document.contato.cidade.focus();
        return false;
    }    
    
    if (mensagem == "") {
        alert( "Preencha o campo MENSAGEM!" );
        document.contato.mensagem.focus();
        return false;
    }  
    
    return true;
}