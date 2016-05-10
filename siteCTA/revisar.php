<!DOCTYPE html>
<html lang="pt-br">
    
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'RE';
        ?>    
            
        <title>colabAD | Revisar imagens </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Imagens para revisão</h1>
        </div>
        <?php
            if((isset($_GET['mensagem'])) && (isset($_GET['texto']))){
                echo "<div class='w3-container ".$_GET['mensagem']."'><span onclick='this.parentElement.style.display=\"none\"' class='w3-closebtn'>X</span>";
                echo $_GET['texto'];
                echo "</div>";
            }
        ?>          
        <br>
        <?php
            $sqlRev = "SELECT `img_codigo`, `usu_codigo`, `img_data`, `img_hora`, `cat_codigo`, `img_nome`, `img_audiodescricao`, `img_nome_original`, `img_extensao`, `img_situacao` 
                       FROM `imagens`
                       WHERE `img_situacao` = 'revisar'
                       ORDER BY `img_data`, `img_hora`"; 

            $queryRev = $mysqli->query($sqlRev);       

            if (mysqli_num_rows($queryRev) > 0) {

                echo '<table class="w3-table w3-striped w3-border">';
                echo '    <thead>';
                echo '    <tr class="w3-green">';
                echo '      <th>Nome</th>';
                echo '      <th>Data/Hora</th>';
                echo '      <th>Categoria</th>';
                echo '      <th>Usuário</th>';
                echo '      <th WIDTH="75">Revisar</th>';
                echo '    </tr>';
                echo '    </thead>';

                while ($registroRev = $queryRev->fetch_assoc()) {    
                    echo '<tr>';
                    echo '  <td>'.utf8_encode($registroRev['img_nome']).'</td>';
                    echo '  <td>'.date('d/m/Y', strtotime($registroRev['img_data'])).' - '.$registroRev['img_hora'].'</td>';
                    echo '  <td>'.BuscaDado('cat_nome', 'categoria', 'cat_codigo = '.$registroRev['cat_codigo']).'</td>';
                    echo '  <td>'.BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$registroRev['usu_codigo']).'</td>';
                    echo '  <td WIDTH="75">';
                    echo '      <form id="revisar_imagem" action="revisar_imagem.php" method="post">';
                    echo '          <input id="imagem" name="imagem" type="hidden" value="'.$registroRev['img_codigo'].'"/>';
                    echo '          <button id="solicitar" type="submit" class="w3-btn w3-green"><i class="fi-page-edit"></i></button>';
                    echo '      </form>'; 
                    echo '  </td>';
                    echo '</tr>';                        
                }
                echo '</table>';
            } else {
                echo "<a>Nenhuma imagem para revisar</a>";
            }    
        ?>
        <br>
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

