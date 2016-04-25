<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'AU';
         ?>   
        
        <title>colabAD | Descrever Imagens </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
        
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Imagens para Áudio descrição </h1>
        </div>
        
               <?php
                /*pega no banco de dados todas as imagens com situação de imagem descrever*/
                $sqlImagens = "select  i.img_codigo,i.img_data,i.img_hora,i.img_nome,c.cat_nome,u.usu_nome 
                                from imagens as i 
                                    inner join usuario as u 
                                        on i.usu_codigo = u.usu_codigo
                                    inner join categoria as c 
                                        on  i.cat_codigo= c.cat_codigo 
                                where i.img_situacao = 'descrever'
                                order by i.img_data,i.img_hora;";
                
              /*retorna a quantidade registros encontrados na consulta acima */
                $queryImagens = $mysqli->query($sqlImagens);
                  
                 if(mysqli_num_rows($queryImagens) > 0){
                     
                
                        echo '<br>';
                        echo '<div class="w3-responsive">';
                        echo '<table class="w3-table w3-striped w3-border">';
                        echo '<thead>';
                        echo'<tr class="w3-green">';
                        echo'<th>Nome da Imagem</th>';
                        echo'<th>Data/Hora</th>';
                        echo'<th>Categoria</th>';
                        echo'<th>Nome do Usuário</th>';
                        echo'<th WIDTH="75">Descrever</th>';
                        echo'</tr>';
                        echo'</thead>';
                        
                        while ($Linha = $queryImagens->fetch_assoc()) { 
                         
                        echo '<tr>';
                        echo '  <td>'.$Linha['img_nome'].'</td>';
                        echo '  <td>'.date('d/m/Y', strtotime($Linha['img_data'])).' - '.$Linha['img_hora'].'</td>';
                        echo '  <td>'.$Linha['cat_nome'].'</td>';
                        echo '  <td>'.$Linha['usu_nome'].'</td>';
                        echo '  <td WIDTH="75">  <form id="descrever_imagem" action="audio_descrever_imagem.php" method="post">';
                        echo '          <input id="imagem" name="imagem" type="hidden" value="'.$Linha['img_codigo'].'"/>';
                        echo '          <button id="Descrever" type="submit" class="w3-btn w3-green"><i class="fi-page-edit"></i></button>';
                        echo '      </form>'; 
                        echo '  </td>';
                        echo '</tr>';                        
                    }
                    echo '</table>';
                    echo '</div>';
                } else {
                    echo "<a>Nenhuma imagem para descrever</a>";
                } 
   
    
        include("rodape.php");
    ?>    

</html> 
</body>

