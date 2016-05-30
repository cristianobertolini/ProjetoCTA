<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("restrito.php");
            include("cabecalho.php");
            $pagina = 'RE';
        ?>    
            
        <title>ColabAD | Cadastrar Nova Categoria </title>           
    </head>    

    <body>
        
        <?php
            include("navegacao.php");
        ?>
   
        <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
            <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
                <h1>Adicionar Categoria</h1>
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
                    <form id="categoria_cadastra" action="categoria_inserir.php" method="POST">
                        <div class="w3-section">
                           <label class="w3-label" for="nome"><strong>Descrição: </strong></label>
                            <input class="w3-input w3-border w3-margin-bottom" id="nome" name="nome" type="text" placeholder="Insira o nome da categoria que deseja cadastrar" required>

                            <button class="w3-btn w3-btn-block w3-green">Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
        <br>
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

