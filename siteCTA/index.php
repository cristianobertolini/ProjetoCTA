<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
        ?>
        <title>colabAD | Sistema Colaboratido de Áudiodescrição</title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>  

    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">

        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Imagens mais vistas</h1>
        </div>

        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Últimas imagens</h1>
        </div>
    </div>
    <?php
        include("rodape.php");
    ?>    
</body>
</html> 