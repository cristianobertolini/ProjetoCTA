<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'IN';
        ?>    
            
        <title>colabAD | Submeter imagem </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Submeter imagem</h1>
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
                <label class="w3-label"><b>Audiodescrição: (opcional)</b></label> 
                <textarea class="w3-input w3-border" name="audiodescricao"></textarea>
                <br>
                <label class="w3-label"><b>Categoria: (opcional)</b></label> 
                <select class="w3-select w3-border" name="categoria" required>
                    <option value="" disabled selected> Escolha uma opção</option>
                    <?php
                        //Carrega as categorias do banco de dados
                        $sqlCat = "SELECT `cat_codigo`, `cat_nome` FROM `categoria` ORDER BY `cat_nome`"; 

                        $queryCat = $mysqli->query($sqlCat);       

                        $rowsCat = mysqli_num_rows($queryCat);       
                        if ($rowsCat > 0) {
                            //Mostra as categorias
                            while ($registroCat = $queryCat->fetch_assoc()) {
                                echo '<option value="'.$registroCat['cat_codigo'].'"> '.$registroCat['cat_nome'].'</option>';
                            }   
                        } else {
                            echo '<option value="" disabled selected>Nenhuma categoria encontrada</option>';
                        }    
                    ?>
                </select>
                <br><br>
                <label class="w3-label"><b>Selecione uma imagem:</b></label> 
                <input class="w3-input w3-border" required name="arquivo" type="file" />
                <br>
                <div class="w3-row">
                    <input class="w3-input w3-green w3-half" type="submit" value="Salvar" />
                    <input class="w3-input w3-blue-grey w3-half" type="reset" value="Limpar" />
                </div>
                <br>
            </form>  
        </div>             
        
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 
