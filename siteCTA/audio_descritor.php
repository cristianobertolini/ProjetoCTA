<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'IN';
            
    
                /*pega no banco de dados todas as imagens com situação de imagem descrever*/
                $sqlImagens = "select  i.img_data,i.img_hora,i.img_nome,c.cat_nome,u.usu_nome 
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
                        echo '<h2>Imagens para áudio-descrição</h2>';
                        echo '<div class="w3-responsive">';
                         echo '<table class="w3-table w3-striped w3-border">';
                        echo '<thead>';
//                            <tr class="w3-green">
//              <th>Nome da Imagem</th>
//              <th>Data</th>
//              <th>Categoria</th>
//              <th>Usuário</th
//              <th>Fazer Audio_descrição</th>
//           </tr>
//            </thead>
//                        
                        
                        
                 
            
            
            
            
            
           
    ?>
        
     
        <h2>Imagens para áudio-descrição</h2>
        
        <div class="w3-responsive">

            <table class="w3-table w3-striped w3-border">
            <thead>
            <tr class="w3-green">
              <th>Nome da Imagem</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Usuário</th
              <th>Fazer Audio_descrição</th>
              
    
            </tr>
            </thead>
            <tr>
              <td>Jill</td>
              <td>Smith</td>
              <td>50</td>
            </tr>
            <tr>
              <td>Eve</td>
              <td>Jackson</td>
              <td>94</td>
            </tr>
            <tr>
              <td>Adam</td>
              <td>Johnson</td>
              <td>67</td>
            </tr>
            <tr>
              <td>Adam</td>
              <td>Johnson</td>
              <td>67</td>
            </tr>
            <tr>
              <td>Adam</td>
              <td>Johnson</td>
              <td>67</td>
            </tr>
            <tr>
              <td><button class="w3-btn w3-teal">Button</button>/td>
              <td>Johnson</td>
              <td>67</td>
            </tr>
            </table>
        </div>

    <?php
        include("rodape.php");
    ?>    

</html> 
</body>

