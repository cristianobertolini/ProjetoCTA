<?php
    //Define a página como sendo do orientador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 2;
    include("../restrito.php");
    
    include("cabecalho.php");
    include("../navbar.php");
    include("./navbar_orientador.php");
    include("../include/funcoes.php");
    include("../include/conexao.php"); 

    if (isset($_POST['banca'])){
        $bancaCodigo = $mysqli->real_escape_string($_POST['banca']);
        
        $sqlBanca = "SELECT `ban_tipo`, `ban_data`, `ban_descricao`, `ban_local`, `usu_codigo`, `tur_codigo`, `ban_hora` 
                     FROM `banca` 
                     WHERE `ban_codigo` = $bancaCodigo";
        $queryBanca = $mysqli->query($sqlBanca);
        $resultBanca = $queryBanca->fetch_assoc();
        
        $tipo = $resultBanca['ban_tipo'];
        switch ($tipo){
            case 1: $tipoNome = 'Proposta'; Break; 
            case 2: $tipoNome = 'TGSI 1'; Break; 
            case 3: $tipoNome = 'TGSI 2'; Break;
        } 
        
        $aluno     = $resultBanca['usu_codigo'];
        $data      = $resultBanca['ban_data'];
        $data      = date('d/m/Y', strtotime($data));
        $hora      = $resultBanca['ban_hora'];
        $hora      = date('H:i', strtotime($hora));
        $local     = $resultBanca['ban_local'];
        $orientadorNome = $alunoNome = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$aluno);
        
        $sqlArquivo = "SELECT `arq_codigo`, `arq_nome` 
                        FROM `arquivo` 
                        WHERE `usu_aluno` = $aluno
                          AND `arq_tipo` = $tipo    
                        ORDER BY `arq_data` DESC, `arq_hora` DESC 
                        lIMIT 1";
        $queryArquivo = $mysqli->query($sqlArquivo);
        if(mysqli_num_rows($queryArquivo) > 0){
            $ResultArquivo = $queryArquivo->fetch_assoc();
            $arquivo   = $ResultArquivo['arq_nome'];
            $arqCodigo = $ResultArquivo['arq_codigo'];
        } else {
            $arquivo   = '';
            $arqCodigo = 0;
        }
        $nome       = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$aluno);
        $tituloTGSI = BuscaDado('tud_titulo', 'turma_detalhe', 'usu_aluno = '.$aluno);

    } else {
      echo "<script>location.href='index.php';</script>";
      $mysqli->Close();
      die();
    }   
 ?>
<!--Formulário Fazer igual ao avalia aluno.php-->
    <div class="band">
        <div class="container">
           <fieldset class="bordered rounded shadowed margin-bottom"> 
                <legend class="h3 primary text-shadowed no-margin-bottom">Banca de <?php echo $tipoNome?> para <?php echo $nome?></legend> 
                <div class="row">
                    <div class="span12"> 
                        <strong>Título do TGSI: </strong><?php echo $tituloTGSI?>
                    </div>  
                </div>
                <br>
                <div class="row">
                    <div class="span12"> 
                        <strong>Local da Defesa:</strong> <?php echo $local?>
                    </div>  
                </div>                
                <div class='row'>
                    <div class="span3">
                        <strong>Data:</strong> <?php echo $data?>
                    </div>
                    <div class="span3">
                        <strong>Hora:</strong> <?php echo $hora?>
                    </div>
                </div>
                <br>
                <?php
                $sqlDetalhe = "SELECT `usu_codigo`
                               FROM `banca_detalhe` 
                               WHERE `ban_codigo` = $bancaCodigo";
                $queryDetalhe = $mysqli->query($sqlDetalhe);
                if(mysqli_num_rows($queryDetalhe) > 0){
                    $cont = 1;
                    while ($ResulDet = $queryDetalhe->fetch_assoc()) {
                        $avaNome = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$ResulDet['usu_codigo']); ;
                        echo '<div class="row">';
                        echo '    <div class="span12">'; 
                        echo '        <strong>Avaliador '.$cont.':</strong> '.$avaNome;
                        echo '    </div>';  
                        echo '</div>';
                        $cont = $cont + 1;
                    }
                } else {
                    echo '<strong>Nenhum avaliador cadastrado.</strong>';
                }
                ?>
                <div class="row">
                    <div class="span12"> 
                        <?php
                        if ($arqCodigo > 0){
                            echo '<br>';
                            echo '<button class="btn" id="baixar" name="baixar"  type="button" onclick="window.open(\'../aluno/uploads/'.$arquivo.'\', \'_blank\')">';
                            echo '    <i class="icon-download-alt"></i> Download do arquivo';
                            echo '</button>';
                        }
                        if ($tipo == 1){
                            echo '    <form id="banca" action="resultado-proposta.php" method="POST">';
                            echo '        <input name="aluno" class="textfield" type="hidden" value="'. $aluno.'">';
                            echo '        <button id="gerar" type="submit" class="btn">';
                            echo '            <i class="icon-search"></i> Ver Resultado';
                            echo '        </button>';
                            echo '    </form>';                                 
                        }
                        if ($tipo == 2){
                            echo '    <form id="banca" action="resultado-tgsi1.php" method="POST">';
                            echo '        <input name="aluno" class="textfield" type="hidden" value="'. $aluno.'">';
                            echo '        <button id="gerar" type="submit" class="btn">';
                            echo '            <i class="icon-search"></i> Ver Resultado';
                            echo '        </button>';
                            echo '    </form>';                                   
                        }
                        if ($tipo == 3){
                            echo '    <form id="banca" action="resultado-tgsi2.php" method="POST">';
                            echo '        <input name="aluno" class="textfield" type="hidden" value="'. $aluno.'">';
                            echo '        <button id="gerar" type="submit" class="btn">';
                            echo '            <i class="icon-search"></i> Ver Resultado';
                            echo '        </button>';
                            echo '    </form>';                                   
                        } 
                        ?>
                    </div>  
                </div>
                <br> 
            </fieldset>
            <br>
            <button class="btn left" id="voltar" name="voltar" type="button" onclick="parent.location='index.php'"> 
            <i class="icon-arrow-left"></i> Voltar</button>             
        </div>
    </div>

<?php
	include("../rodape.php");
?>
<br>
