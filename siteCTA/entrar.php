<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'IN';
        ?>    
            
        <title>colabAD | Entrar </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Entrar no sistema</h1>
        </div>
        
 
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            
            <?php
                if((isset($_GET['mensagem'])) && (isset($_GET['texto']))){
                    echo "<div class='w3-container ".$_GET['mensagem']."'><span onclick='this.parentElement.style.display=\"none\"' class='w3-closebtn'>X</span>";
                    echo $_GET['texto'];
                    echo "</div>";
                }
            ?>           
            
            <div class="w3-container">
                <form id="cadastro_usuario" action="entrar_login.php" method="POST">
                    <div class="w3-section">
                        <label><strong>Email</strong></label>
                        <input class="w3-input w3-border w3-margin-bottom" id="email" name="email" type="text" placeholder="Insira seu email" required>

                        <label><strong>Senha</strong></label>
                        <input class="w3-input w3-border" id="senha" name="senha" type="password" placeholder="Insira sua senha" required>

                        <button class="w3-btn w3-btn-block w3-green">Entrar</button>
                    </div>
                    
                    <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                        <span class="w3-left"><a href="#">Esqueceu Senha</a>  
                        <br>
                        <span class="w3-left"><a href="./usuario_cadastrar.php">Cadastre-se</a>      
                    </div>                    
                </form>
            </div>
        </div>

        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 