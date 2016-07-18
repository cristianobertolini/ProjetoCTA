<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'AJ';
        ?>    
            
        <title>colabAD | Dúvidas gerais </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Dúvidas gerais</h1>
        </div>
        <div  class="w3-container">
            <h2>Como cada usuário contribui para o Sistema ColabAD:</h2>
            <br>
            <p class="w3-justify">
                <strong>Usuário comum </strong>: Gera demanda de imagens, ao cadastrar-se, automaticamente
                é aceito como usuário normal, podendo fazer o envio (upload) de imagens para áudio-descrição.
                <br><br>
                <strong>Áudio-descritor</strong>: Possui permissões de usuário normal e também pode áudio-descrever imagens, mas para fazer áudio-descrição
                     nas imagens é preciso aceitação do Administrador do Sistema que irá avaliar seu conhecimento
                     em áudio-descrição.
                <br><br>
                <strong>Revisor</strong>:  Possui permissões de usuário normal e a forma de cadastro funciona como para o 
                     áudio-descritor, contribui fazendo revisões nas imagens áudio-descritas, podendo inclusive
                     enviar novamente para o áudio-descritor com observações.
                <br><br>
            </p>
            <p>
                <strong>Você pode fazer login no site com qualquer um dos usuários abaixo, para que você possa
                testar as funcionalidades do sistema com todas as permissões de: usuario comum, 
                áudio-descritor e revisor.</strong>
            </p>
             <table class="w3-table w3-striped w3-bordered w3-card-4">
                <thead>
                    <tr class="w3-green">
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Senha</th>
                    </tr>
                    <tr>
                        <td>teste1</td>
                        <td>teste1@mail.com</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>teste2</td>
                        <td>teste2@mail.com</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>teste3</td>
                        <td>teste3@mail.com</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>teste4</td>
                        <td>teste4@mail.com</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>teste5</td>
                        <td>teste5@mail.com</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>teste6</td>
                        <td>teste6@mail.com</td>
                        <td>123</td>
                    </tr>
                </thead>
            </table>
       </div>
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

