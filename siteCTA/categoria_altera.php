<!DOCTYPE html>
<html lang="pt-br">
    
    <head>
        <?php
            include("restrito.php");
            include("cabecalho.php");
            $pagina = 'RE';
        ?>    
            
        <title>colabAD | Editar Categoria </title>           
    </head>    

    <body>
        <?php
            include("navegacao.php");
        ?>
   
        <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
            <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
                <h1>Categorias</h1>
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
                <form id="consulta" action="categoria_altera.php" method="GET">
                    <div class="w3-section">
                        <div class="w3-row">
                            <label class="w3-label" for="nome"><strong>Descrição: </strong></label>
                            <div class="w3-col s6">
                                <input class="w3-input w3-border w3-margin-bottom"  name="nome" id="nome" type="text" maxlength="50" placeholder="Insira o nome da categoria que deseja Buscar">
                            </div>
                            <div class="w3-col s2">
                                <button id="buscar" type="submit" class="w3-btn-block w3-green" value="Buscar">Buscar <i class="fi-magnifying-glass"></i></button>
                            </div> 
                        </div>
                    </div>
                </form>
                
                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                </div>
            </div>
                    
            <?php
                $sqlCat = "SELECT `cat_codigo`, `cat_nome` 
                             FROM `categoria` ";
                
                if ((isset($_GET['nome'])) && (!empty($_GET['nome']))) {
                    $busca  = $mysqli->real_escape_string($_GET['nome']);
                    $sqlCat = $sqlCat . " WHERE cat_nome LIKE '$busca'";
                }

                $queryCat = $mysqli->query($sqlCat);   

                if (mysqli_num_rows($queryCat) > 0) {

                    echo '<table class="w3-table w3-striped w3-border">';
                    echo '    <thead>';
                    echo '    <tr class="w3-green">';
                    echo '      <th>Nome</th>';
                    echo '      <th WIDTH="75"> Alterar</th>';
                    echo '      <th WIDTH="75">Excluir</th>';
                    echo '    </tr>';
                    echo '    </thead>';

                    while ($registroCat = $queryCat->fetch_assoc()) {    
                        echo '<tr>';
                        echo '  <td>'.utf8_encode($registroCat['cat_nome']).'</td>';
                        echo '  <td WIDTH="75">'; 
                        echo '      <form id="categoria_altera.php" action="categoria_altera.php" method="post">';
                        echo '          <input id="imagem" name="imagem" type="hidden" value="'.$registroCat['cat_codigo'].'"/>';
                        echo '          <button id="solicitar" type="submit" class="w3-btn w3-green"><i class="fi-page-delete"></i></button>';
                        echo '      </form>';
                        echo '  </td>';
                        echo '  <td WIDTH="75">';
                        echo '      <form id="categoria_altera.php" action="categoria_altera.php" method="post">';
                        echo '          <input id="imagem" name="imagem" type="hidden" value="'.$registroCat['cat_codigo'].'"/>';
                        echo '          <button id="solicitar" type="submit" class="w3-btn w3-red"><i class="fi-page-edit"></i></button>';
                        echo '      </form>'; 
                        echo '  </td>';
                        echo '</tr>';                        
                    }
                    echo '</table>';
                } else {
                    echo "<a>Nenhuma Categoria Cadastrada</a>";
                }    
            ?>

            <?php
                include("rodape.php");
            ?>   
        </div>
    </body>
</html> 