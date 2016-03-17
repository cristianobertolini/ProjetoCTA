<?php
    //Define a página como sendo do orientador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 2;
    include("../restrito.php");
    
    include("../include/conexao.php"); 
    include("../include/funcoes.php");     
    
    $Orientador = $_SESSION['UsuarioCOD'];
    date_default_timezone_set('America/Sao_Paulo');     
?>
<!DOCTYPE html>
<html>
    <head>
         <title> Gerenciador de TGSI | Orientador </title>
         
        <?php
            include("cabecalho.php");
        ?>
    </head>

    <body>
        <div class="band shadowed no-print">
        <?php
            include("../navbar.php");
            include("navbar_orientador.php");
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
                
                $sqlAluno = "select u.`USU_CODIGO`, u.`USU_NOME`, u.`USU_EMAIL`, u.`USU_MATRICULA`, u.`USU_SITUACAO`, td.`tud_titulo`	
                            from `usuario` as u
                                inner join `turma_detalhe` as td
                                    on u.`USU_CODIGO` = td.`usu_aluno`
                            where u.`USU_SITUACAO` = 0
                                and td.`usu_orientador` = ".$Orientador;

                /*retorna a quantidade registros encontrados na consulta acima */
                $queryAluno = $mysqli->query($sqlAluno);

                /*se quantidade de linhas maior que zero*/
                if(mysqli_num_rows($queryAluno) > 0){                
                    $contaLinhas = 0;
                    echo '<h2 class="primary stroked-bottom text-shadowed margin-bottom "> Orientandos</h2>';
                    while ($Resultado = $queryAluno->fetch_assoc()) {                        
                        if ($contaLinhas == 0) {
                            echo '<div class="row">';
                        }
                        
                        $contaLinhas = $contaLinhas + 1;                       
                        
                        if (mysqli_num_rows($queryAluno) == 1) {
                            echo '  <div class="span12">';
                        } else {
                            echo '  <div class="span6">';
                        }
                        echo '    <div class="box default bordered shadowed rounded">';
                        echo '        <br>';
                        echo '        <p><b>'.$Resultado['USU_MATRICULA'].' - '.$Resultado['USU_NOME'].'</b>';
                        echo '        <br><i>'.$Resultado['USU_EMAIL'].'</i>';
                        echo '        <br>'.$Resultado['tud_titulo'].'</p>';
                        echo '        <br>';
                        echo '        <div class="container">';
                        echo '            <div class="row">';
                        for ($i = 1; $i <= 3; $i++) {
                            $tipo = $i;
                            switch ($tipo){
                                case 1: $tipoNome = 'Proposta'; Break; 
                                case 2: $tipoNome = 'TGSI 1'; Break; 
                                case 3: $tipoNome = 'TGSI 2'; Break;
                            }                        
                            echo '                <div class="span4">';
                            echo '                    <div class="box info bordered tip shadowed rounded">';
                            echo '                        <span class="text">'.$tipoNome.'</span>';
                            $sqlBanca = "SELECT b.`ban_codigo`, b.`ban_data`, b.`ban_hora`, a.`arq_nome` 
                                        FROM `banca` as b
                                            LEFT JOIN `arquivo` as a
                                                ON a.`usu_aluno` = b.`usu_codigo`
                                                AND a.`arq_tipo` = b.`ban_tipo`
                                        WHERE b.`ban_tipo` = $tipo AND b.`usu_codigo` = ".$Resultado['USU_CODIGO'];
                            $queryBanca = $mysqli->query($sqlBanca);
                            if(mysqli_num_rows($queryBanca) > 0){
                                $resultBanca = $queryBanca->fetch_assoc();
                                //Se tem banca ostra a data e hora
                                echo '    <br><span class="text">'.date('d/m/Y', strtotime($resultBanca['ban_data'])).' - '.date('H:i', strtotime($resultBanca['ban_hora'])).'</span>';
                                echo '    <form id="banca" action="banca-aluno.php" method="POST">';
                                echo '        <input name="banca" class="textfield" type="hidden" value="'.$resultBanca['ban_codigo'].'">';
                                echo '        <button id="gerar" type="submit" class="btn mini align-center">';
                                echo '            <i class="icon-search"></i> Banca';
                                echo '        </button>';
                                echo '    </form>';                                
                                //Se tem arquivo mostra botão para baixar
                                if ($resultBanca['arq_nome'] == NULL) {
                                    echo '                  <button type="button" class="btn mini align-center disabled" disabled onclick=""><i class="icon-download-alt"></i> Arquivo</button>';    
                                } else {
                                    echo '                  <button type="button" class="btn mini align-center" onclick="window.open(\'../aluno/uploads/'.$resultBanca['arq_nome'].'\', \'_blank\')"><i class="icon-download-alt"></i> Arquivo</button>';
                                }                                   
                            } else {
                                echo '                        <br><span class="text">Sem banca</span>';
                                echo '                  <br><button type="button" class="btn mini align-center disabled" disabled onclick=""><i class="icon-search"></i> Banca</button>';    
                                echo '                  <button type="button" class="btn mini align-center disabled" disabled onclick=""><i class="icon-download-alt"></i> Arquivo</button>';    
                            }
                         
                            echo '                    </div>';
                            echo '                </div>';
                        }
                        echo '            </div>';
                        echo '        </div>';
                        echo '    </div>';
                        echo '</div>';
                        
                        if (($contaLinhas >= 2) || (mysqli_num_rows($queryAluno) == 1)) {
                            echo '</div>';
                            $contaLinhas = 0;
                        }
                    }
                } else {
                    echo '  <div class="box bordered rounded shadowed info">';
                    echo '      <div class="box-content">';
                    echo '          Você não possui nenhum aluno para orientar.';
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