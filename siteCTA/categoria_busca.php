            
   <?php
	include "include/conexao.php";
        include "include/funcoes.php";
//            if (isset($_POST['nome'])) {
        
                        
            $nome = $mysqli->real_escape_string($_POST["nome"]);
            
            //Buscar categoria
            $sqlCatS = "SELECT `cat_codigo`, `cat_nome` 
                       FROM `categoria`
                       WHERE `cat_nome` = '$nome'
                       LIMIT 1"; 
                       
            $queryCatS = $mysqli->query($sqlCatS);
            
            $rows = mysqli_num_rows($queryCatS);       
             if ($rows != 1) {
                 // Mensagem de erro quando os dados são inválidos e/ou categoria não encontrada
            echo "<script>location.href='categoria_altera.php?mensagem=w3-red&texto=Categoria não existe!!';</script>";
            exit;
        } else {
                      
            // Salva os dados encontados na variável $registroCatS
            $registroCatS = $queryCatS->fetch_assoc();   
             
                echo '<table class="w3-table w3-striped w3-border">';
                echo '    <thead>';
                echo '    <tr class="w3-green">';
                echo '      <th>Nome</th>';
                echo '      <th WIDTH="75"> Alterar</th>';
                echo '      <th WIDTH="75">Excluir</th>';
                echo '    </tr>';
                echo '    </thead>';
        
                while ($registroCatS = $queryCatS->fetch_assoc()) {    
                    echo '<tr>';
                    echo '  <td>'.utf8_encode($registroCatS['cat_nome']).'</td>';
                    echo '  <td WIDTH="75">'; 
                    echo '      <form id="categoria_busca.php" action="categoria_altera.php" method="post">';
                    echo '          <input id="imagem" name="imagem" type="hidden" value="'.$registroCatS['cat_codigo'].'"/>';
                    echo '          <button id="solicitar" type="submit" class="w3-btn w3-green"><i class="fi-page-delete"></i></button>';
                    echo '      </form>';
                    echo '  </td>';
                    echo '  <td WIDTH="75">';
                    echo '      <form id="categoria_busca.php" action="categoria_altera.php" method="post">';
                    echo '          <input id="imagem" name="imagem" type="hidden" value="'.$registroCatS['cat_codigo'].'"/>';
                    echo '          <button id="solicitar" type="submit" class="w3-btn w3-red"><i class="fi-page-edit"></i></button>';
                    echo '      </form>'; 
                    echo '  </td>';
                    echo '</tr>';                        
                }
                echo '</table>';
                }
                
//            } else {
//                echo "<a>Categoria não encontrada</a>";
//            }    
             $mysqli->Close(); 

        ?>


