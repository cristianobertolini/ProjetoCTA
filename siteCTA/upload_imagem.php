<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'UP';
        ?>    
            
        <title>colabAD | Carregar imagem </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Carregar imagem</h1>
        </div>
        
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <?php
                if((isset($_GET['mensagem'])) && (isset($_GET['texto']))){
                    echo "<div class='w3-container ".$_GET['mensagem']."'><span onclick='this.parentElement.style.display=\"none\"' class='w3-closebtn'>X</span>";
                    echo $_GET['texto'];
                    echo "</div>";
                }
            ?>
            <form method="post" enctype="multipart/form-data" action="upload_recebe.php">
                <br>
                <label class="w3-label"><b>Descrição:</b></label> 
                <input class="w3-input w3-border" required name="descricao" type="text" />
                <label class="w3-label"><b>Audiodescrição:</b></label> 
                <textarea class="w3-input w3-border" required name="audiodescricao"></textarea>
                <br>
                <label class="w3-label"><b>Selecione uma imagem:</b></label> 
                <input class="w3-input w3-border" required name="arquivo" type="file" />
                <input class="w3-input w3-green" type="submit" value="Salvar" />
                <br>
            </form>  
        </div>             
        
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

