<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 3;
    include("../restrito.php");
    
    include("../include/conexao.php");
    include("../include/funcoes.php"); 
    
    $Avaliador = $_SESSION['UsuarioCOD'];
    date_default_timezone_set('America/Sao_Paulo');    
?>

<!DOCTYPE html>
<html>
    <head>
         <title> Gerenciador de TGSI | Avaliador </title>
         
        <?php
            include("cabecalho.php");
        ?>
    </head>

    <body>
        <div class="band shadowed no-print">
        <?php
            include("../navbar.php");
            include("navbar_avaliador.php");
        ?>
        </div> 

        <!-- main --> 
        <div class="band"> 
            <div class="container">
                
                <?php
                    if(isset($_GET['mensagem'])){
                        echo "<div class='row'><div class='span8'><div class='box ".$_GET['mensagem']."'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                        echo $_GET['texto'];
                        echo "</div></div></div>";
                    }
                
                $sqlAvaliador = "SELECT b.`ban_data`, 
                                        b.`ban_hora`,
                                        b.`ban_descricao`, 
                                        b.`ban_local`,
                                        b.`ban_tipo`,
                                        b.`usu_codigo`,
                                        b.`ban_tipo`,
                                        b.`ban_codigo`,                                        
                                        case 
                                          when b.`ban_tipo` = 1 then
                                             'Proposta'
                                          when b.`ban_tipo` = 2 then
                                             'TGSI 1'
                                          when b.`ban_tipo` = 3 then
                                             'TGSI 2'
                                          when b.`ban_tipo` = 4 then
                                             'Proposta Inicial' 
                                        end as `ban_tipo_nome`,
                                            u.`usu_nome`,
                                        u.`usu_matricula`,
                                        ar.`arq_nome`,
                                        bd.`band_codigo`

                                 FROM `banca` as b 
                                         INNER JOIN `banca_detalhe` as bd
                                         ON b.`ban_codigo` = bd.`ban_codigo`
                                     INNER JOIN `usuario` as u
                                         ON u.`usu_codigo` = b.`usu_codigo`
                                     LEFT JOIN `arquivo` as ar
                                         ON ar.`usu_aluno` = b.`usu_codigo`
                                         AND ar.`arq_tipo` = b.`ban_tipo`
                                 WHERE bd.`usu_codigo` = ".$Avaliador."
                                   AND bd.`band_codigo` NOT IN (SELECT bav.`band_codigo` FROM `banca_detalhe_avaliacao` as bav)
                                 ORDER BY b.`ban_data`, b.`ban_hora`, b.`ban_tipo`";

                /*retorna a quantidade registros encontrados na consulta acima */
                $queryAvaliador = $mysqli->query($sqlAvaliador);

                /*se quantidade de linhas maior que zero*/
                if(mysqli_num_rows($queryAvaliador) > 0){                
                    $contaLinhas = 0;

                    while ($Resultado = $queryAvaliador->fetch_assoc()) {                        
                        if ($contaLinhas == 0) {
                            echo '<div class="row">';
                        }
                        
                        $contaLinhas = $contaLinhas + 1;
                        
                        $hoje = date('Y-m-d');
                        if (strtotime($Resultado['ban_data']) == strtotime($hoje)){
                            $cor = 'warning';
                        } else {
                            $cor = 'default';
                        }
                        $hoje = date('Y-m-d H:i');
                        if (mysqli_num_rows($queryAvaliador) == 1) {
                            echo '  <div class="span12">';
                        } else {
                            echo '  <div class="span6">';
                        }
                        echo '      <div class="box '.$cor.' bordered shadowed rounded">';     
                        echo '          <br><b>Banca de '.$Resultado['ban_tipo_nome'].'</b>';
                        echo '          <br><b>Data:</b> '.date('d/m/Y', strtotime($Resultado['ban_data'])).'';      
                        echo '          <br><b>Hora:</b> '.date('H:i', strtotime($Resultado['ban_hora'])).'';
                        echo '          <br><b>Local:</b> '.$Resultado['ban_local'].'';
                        echo '          <br><br>';
                        echo '          <p><b>'.$Resultado['usu_matricula'].' - '.$Resultado['usu_nome'].'</b>';
                        echo '          <br>'.$Resultado['ban_descricao'].'</p>';
                        echo '          <br>';
                        echo '          <div class="container align-center">';
                        if ($Resultado['arq_nome'] == NULL) {
                            echo '                  <button type="button" class="btn primary align-center disabled " disabled onclick=""><i class="icon-download-alt"></i> Download do Arquivo</button>';    
                        } else {
                            echo '                  <button type="button" class="btn primary align-center" onclick="window.open(\'../aluno/uploads/'.$Resultado['arq_nome'].'\', \'_blank\')"><i class="icon-download-alt"></i> Download do Arquivo</button>';
                        }
                        if ((strtotime($Resultado['ban_data']) <= strtotime($hoje))){
                            echo '    <form id="avaliar" action="avalia-aluno.php" method="post">';
                            echo '        <input name="aluno"     class="textfield" type="hidden" value="'.$Resultado['usu_codigo'].'">';
                            echo '        <input name="banca"     class="textfield" type="hidden" value="'.$Resultado['ban_codigo'].'">';
                            echo '        <input name="detalhe"   class="textfield" type="hidden" value="'.$Resultado['band_codigo'].'">';
                            echo '        <input name="tipo"      class="textfield" type="hidden" value="'.$Resultado['ban_tipo'].'">';
                            echo '        <input name="data"      class="textfield" type="hidden" value="'.$Resultado['ban_data'].'">';
                            echo '        <input name="hora"      class="textfield" type="hidden" value="'.$Resultado['ban_hora'].'">';
                            echo '        <input name="local"     class="textfield" type="hidden" value="'.$Resultado['ban_local'].'">';
                            echo '        <input name="descricao" class="textfield" type="hidden" value="'.$Resultado['ban_descricao'].'">';
                            echo '        <button id="gerar" type="submit" class="btn primary align-center">';
                            echo '            <i class="icon-edit"></i> Avaliar Aluno';
                            echo '        </button>';
                            echo '    </form>';
                        } else {
                            echo '                  <br><button type="button" class="btn primary align-center disabled" disabled onclick=""><i class=" icon-edit"></i> Avaliar Aluno</button>';
                        }
                        echo '          </div>';
                        echo '      </div>';
                        echo '  </div>';

                        if (($contaLinhas >= 2) || (mysqli_num_rows($queryAvaliador) == 1)) {
                            echo '</div>';
                            $contaLinhas = 0;
                        }
                    }
                } else {
                    echo '  <div class="box bordered rounded shadowed info">';
                    echo '      <div class="box-content">';
                    echo '          Você não possui nenhuma banca para participar/avaliar.';
                    echo '          <br>Escolha uma das opções acima.'; 
                    echo '      </div>';
                    echo '  </div>';                       
                }
                ?>    
            </div>
        </div> 
        <ul class="vakata-context"></ul>
        <div id="jstree-marker" style="display: none;">&nbsp;</div>

        <?php
            include("../rodape.php");
        ?>
    </body>
</html>

