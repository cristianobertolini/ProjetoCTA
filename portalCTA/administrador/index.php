<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 1;
    include("../restrito.php");
?>
<!DOCTYPE html>
<html>
    <head>
         <title> Gerenciador de TGSI | Coordenador </title>
         
        <?php
            include("cabecalho.php");
        ?>
    </head>

    <body>
        <div class="band shadowed no-print">
        <?php
            include("../navbar.php");
            include("navbar-coordenador.php");
        ?>
        </div> 

        <!-- main --> 
        <div class="band"> 
            <div class="container"> 
                <div class="box info bordered shadowed margin-v rounded ">
                Bem vindo! Escolha a opção desejada acima.
                </div> 
            </div>
        </div> 
        <ul class="vakata-context"></ul>
        <div id="jstree-marker" style="display: none;">&nbsp;</div>

        <?php
            include("../rodape.php");
        ?>
    </body>
</html>