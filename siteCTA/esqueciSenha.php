<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'IN';
        ?>    
            
        <title>colabAD | Esqueci minha Senha </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <?php
                if((isset($_GET['mensagem'])) && (isset($_GET['texto']))){
                    echo "<div class='w3-container ".$_GET['mensagem']."'><span onclick='this.parentElement.style.display=\"none\"' class='w3-closebtn'>X</span>";
                    echo $_GET['texto'];
                    echo "</div>";
                }
            ?> 
            <br>            
            <div id="instrucoes" class="w3-container w3-leftbar w3-grey">
                <br><p>Caso você tenha esquecido a sua senha, preencha o campo abaixo.</p>
                <p>Após, o sistema enviará UMA NOVA senha para o e-mail digitado
                se o mesmo for compatível com o e-mail de login cadastrado.</p>
            </div>
            <br>
            <form id="esqueciSenhaCommand" action="include/recuperar.php" method="post">
                <div class="w3-section">
                    <label for="email"><strong>Login (E-mail)</strong></label>
                    <input id="email" name="email" class="w3-input w3-border" type="email" value=""/>

                    <button id="solicitar" type="submit" class="w3-btn w3-btn-block w3-green">Solicitar senha</button>
                </div>
            </form>               
        </div>

        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

