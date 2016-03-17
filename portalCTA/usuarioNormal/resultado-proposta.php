<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 4;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar-aluno.php");
    
    include("../include/conexao.php");
    include("../include/funcoes.php");    
    
    $tipo = 1;
    $tipoNome = 'Proposta';

    $aluno     = $_SESSION['UsuarioCOD'];
    $alunoNome = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$aluno);
?>

<!-- main -->
<div class="band">
    <div class="container">
        <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Resultado Proposta</h2>
        <?php
            if (BancaPossuiNota($aluno, 1)) {
                $sqlAchaBanca = "SELECT `ban_codigo`, `ban_data`, `ban_descricao`, `ban_local`, `usu_codigo`, `tur_codigo`, `ban_hora` 
                                 FROM `banca` 
                                 WHERE `usu_codigo` = $aluno
                                   AND `ban_tipo` = $tipo";

                $queryAchaBanca = $mysqli->query($sqlAchaBanca);

                //Se possui banca carrega as variáveis se não mostra mensagem
                if(mysqli_num_rows($queryAchaBanca) > 0){
                    $ResultBanca = $queryAchaBanca->fetch_assoc();
                    $banca     = $ResultBanca['ban_codigo'];
                    $data      = $ResultBanca['ban_data'];
                    $data      = date('d/m/Y', strtotime($data));
                    $hora      = $ResultBanca['ban_hora'];
                    $hora      = date('H:i', strtotime($hora));
                    $local     = $ResultBanca['ban_local'];
                    $descricao = $ResultBanca['ban_descricao'];
                    $turma          = $ResultBanca['tur_codigo'];
                    $orientador     = BuscaDado('usu_orientador', 'turma_detalhe', 'usu_aluno = '.$aluno.' AND tur_codigo = '.$turma);
                    $orientadorNome = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$orientador);

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

                    //inicializa as variáveis
                    $nota1  = 0;
                    $nota2  = 0;
                    $nota3  = 0;
                    $nota4  = 0;
                    $nota5  = 0;
                    $nota6  = 0;
                    $nota7  = 0;
                    $soma   = 0;
                    $texto  = '';               

                    //Busca pelos professores e pelas notas que eles deram, se ainda não tem a nota final mostra mensagem
                    $sqlDetalhe = "SELECT `band_codigo`
                                   FROM `banca_detalhe` 
                                   WHERE `ban_codigo` = $banca";

                    $queryDetalhe = $mysqli->query($sqlDetalhe);
                    if(mysqli_num_rows($queryDetalhe) >= 3){
                        while ($ResulDet = $queryDetalhe->fetch_assoc()) {
                            $detalhe = $ResulDet['band_codigo'];
                            //busca as notas
                            $sqlNota = "SELECT `bav_codigo`, 
                                               `bav_nota1`, 
                                               `bav_nota2`, 
                                               `bav_nota3`, 
                                               `bav_nota4`, 
                                               `bav_nota5`, 
                                               `bav_nota6`, 
                                               `bav_nota7`, 
                                               `bav_nota_soma`, 
                                               `bav_obs`, 
                                               `band_codigo`
                                        FROM `banca_detalhe_avaliacao` 
                                        WHERE `band_codigo` = $detalhe";
                            $queryNota = $mysqli->query($sqlNota);
                            $resultNota = $queryNota->fetch_assoc();

                            $nota1  = $nota1 + $resultNota['bav_nota1'];
                            $nota2  = $nota2 + $resultNota['bav_nota2'];
                            $nota3  = $nota3 + $resultNota['bav_nota3'];
                            $nota4  = $nota4 + $resultNota['bav_nota4'];
                            $nota5  = $nota5 + $resultNota['bav_nota5'];
                            $nota6  = $nota6 + $resultNota['bav_nota6'];
                            $nota7  = $nota7 + $resultNota['bav_nota7'];
                            $soma   = $soma + $resultNota['bav_nota_soma'];
                            $texto  = $texto." ||| ".$resultNota['bav_obs'];
                        }

                        //Calcula as médias
                        $nota1  = $nota1/3;
                        $nota2  = $nota2/3;
                        $nota3  = $nota3/3;
                        $nota4  = $nota4/3;
                        $nota5  = $nota5/3;
                        $nota6  = $nota6/3;
                        $nota7  = $nota7/3;
                        $soma   = $soma/3;

                        $nota1  = number_format($nota1, 2, '.', '');
                        $nota2  = number_format($nota2, 2, '.', '');
                        $nota3  = number_format($nota3, 2, '.', '');
                        $nota4  = number_format($nota4, 2, '.', '');
                        $nota5  = number_format($nota5, 2, '.', '');
                        $nota6  = number_format($nota6, 2, '.', '');
                        $nota7  = number_format($nota7, 2, '.', '');
                        $soma   = number_format($soma, 2, ',', '');   

                        //Mostra o resultado
                        echo '        <fieldset class="bordered rounded shadowed margin-bottom">'; 
                        echo '            <legend class="h3 primary text-shadowed no-margin-bottom">Dados do Aluno e '.$tipoNome.'</legend>';
                        echo '            <div class="row">';
                        echo '                <div class="span5">';
                        echo '                    <span class="label">Aluno</span><br>';
                        echo '                    <label for="nome_aluno">'.$alunoNome.'</label>';
                        echo '                </div>';
                        echo '                <div class="span2">';
                        echo '                    <span class="label">Tipo de Avaliação</span><br>';
                        echo '                    <label for="tipo_avaliacao">'.$tipoNome.'</label>';
                        echo '                </div>';
                        echo '                <div class="span2">';
                        echo '                    <span class="label">Data e Hora</span><br>';
                        echo '                    <label for="data">'.$data.' - '.$hora.'</label>';
                        echo '                </div>';
                        echo '                <div class="span3">';
                        echo '                   <span class="label">Professor(Orientador)</span> <br>';
                        echo '                   <label for="orientador">'.$orientadorNome.'</label>';
                        echo '                </div>';
                        echo '            </div>';
                        echo '';
                        echo '            <div class="row">';
                        echo '                <div class="span9">';
                        echo '                    <span class="label">Título do TGSI</span><br>';
                        echo '                    <label for="tipo_avaliacao">'.$descricao.'</label>';
                                                    if ($arqCodigo > 0){
                                                        echo '<br><br>';
                                                        echo '<button class="btn small" id="baixar" name="baixar"  type="button" onclick="window.open(\'../aluno/uploads/'.$arquivo.'\', \'_blank\')">';
                                                        echo '    <i class="icon-download-alt"></i> Download do arquivo';
                                                        echo '</button>';
                                                    }
                        echo '                </div>'; 
                        echo '                <div class="span3">';
                        echo '                    <span class="label">Local</span><br>';
                        echo '                    <label for="data">'.$local.'</label>';
                        echo '                </div>';
                        echo '            </div>';
                        echo '        </fieldset> ';
                        if ($soma >= 7){
                            echo '            <div class="row">';
                            echo '                <div class="span8"><br>';
                            echo '                    <h3>Grau Final Atribuído:'; 
                            echo '                    <span class="success">APROVADO</span></h3>';  
                            echo '                <br></div>';
                            echo '            </div>';
                        } else {
                            echo '            <div class="row">';
                            echo '                <div class="span8"><br>';
                            echo '                    <h3>Grau Final Atribuído:'; 
                            echo '                    <span class="error">REPROVADO</span></h3>';  
                            echo '                <br></div>';
                            echo '            </div>';                        
                        }                                  
                        echo '        <!-- tabela de Avaliacao -->';
                        echo '        <form id="buscaUsuario" action="avalia-aluno-insere.php" method="post">';
                        echo '            <table class="bordered rounded diced striped hovered shadowed narrow table">';
                        echo '                <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Avaliação de '.$tipoNome.'</h2>';
                        echo '                <thead class="header"> ';
                        echo '                    <tr>';
                        echo '                        <th> Critério</th> ';
                        echo '                        <th WIDTH="90">Peso</th>';
                        echo '                        <th WIDTH="120">Nota Atribuída</th>';
                        echo '                    </tr> ';
                        echo '                </thead>';
                        echo '';
                        echo '                <tbody>';
                        echo '                    <tr>';
                        echo '                        <td>Motivacao e/ou justificativa </td>';
                        echo '                        <td>1,0</td> ';
                        echo '                        <td> <input disabled class="textfield width-4em" type=number id="nota1" name="nota1" value="'.$nota1.'"></td>';
                        echo '                    </tr> ';
                        echo '';
                        echo '                    <tr>';
                        echo '                        <td>Redação adequada do artigo (ortografia, gramática)</td>';
                        echo '                        <td> 0,5</td>';
                        echo '                        <td><input disabled class="textfield width-4em" type="number" id="nota2" name="nota2" value="'.$nota2.'"> </td>';
                        echo '                    </tr> ';
                        echo '';
                        echo '                    <tr>';
                        echo '                        <td>Formatacão do artigo adequada (normas científicas)</td>';
                        echo '                        <td>0,5</td>';
                        echo '                        <td><input disabled class="textfield width-4em" type=number id="nota3" name="nota3" value="'.$nota3.'"></td>';
                        echo '                    </tr>';
                        echo '';
                        echo '                    <tr>';
                        echo '                        <td>Coerência na fundamentação, metodologia e desenvolvimento da produção com a temática estabelecida e objetivos propostos</td>';
                        echo '                        <td>4,0</td>';
                        echo '                        <td><input disabled class="textfield width-4em" type=number id="nota4" name="nota4" value="'.$nota4.'"> </td>';
                        echo '                    </tr>';
                        echo '';
                        echo '                    <tr>';
                        echo '                        <td>Resultados compatíveis com os previstos no cronograma estabelecido na proposta do TGSI</td>';
                        echo '                        <td>1,0 </td>';
                        echo '                        <td><input disabled class="textfield width-4em" type=number id="nota5" name="nota5" value="'.$nota5.'"></td>';
                        echo '                    </tr>';
                        echo '';
                        echo '                    <tr>';
                        echo '                        <td>Cumprimento das atividades definidas na proposta do TGSI</td>';
                        echo '                        <td>1,0 </td>';
                        echo '                        <td><input disabled class="textfield width-4em" type=number id="nota6" name="nota6" value="'.$nota6.'"></td>';
                        echo '                    </tr>';
                        echo '';
                        echo '                    <tr>';
                        echo '                        <td>Apresentação perante a banca</td>';
                        echo '                        <td>2,0 </td>';
                        echo '                        <td><input disabled class="textfield width-4em" type=number id="nota7" name="nota7" value="'.$nota7.'"> </td>';
                        echo '                    </tr>';
                        echo '                    <tr>';
                        echo '                        <td><strong>Nota Final</strong></td>';
                        echo '                        <td><strong>10</strong></td>';
                        echo '                        <td><span class="label"><strong> '.$soma.' </strong></span><br></td>';
                        echo '                    </tr>';
                        echo '                </tbody>';
                        echo '            </table>';
                        echo '';
                        echo '            <br>';
                        echo '            <div class="span11,1">';
                        echo '                <span class="label">Parecer Descritivo</span>';
                        echo '                <br>';
                        echo '                <div class="">';
                        echo '                    <textarea disabled id="texto" name="texto" class="textarea" rows="5" maxlength="1024">'.$texto.'</textarea>';
                        echo '                </div>';
                        echo '                <span id="contadorParecer"></span>';
                        echo '            </div>';
                        echo '            <br>';
                        echo '        </form>';
                        echo '        <div class="form-actions">';
                        echo '             <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location=\'index.php\'">';
                        echo '                 <i class="icon-arrow-left"></i> Voltar</button>';
                        echo '        </div>';

                    } else {
                        echo '<div class="box warning bordered tip shadowed rounded">';                   
                        echo '    <div class="row">';
                        echo '        <div class="span10">';
                        echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Ainda não possui resultado.</h2>';
                        echo '            <div class="row">';
                        echo '                <div class="span6 padding-v">';
                        echo '                   <p>Aguardando liberação das notas.</p>';
                        echo '                </div>';
                        echo '            </div>';
                        echo '        </div>';
                        echo '        <div class="span2 align-center padding-top">';
                        echo '            <h1 id="iconBig" class="primary"><i class="icon-ban-circle"></i></h1>';
                        echo '        </div>';
                        echo '    </div>';
                        echo '</div>';  
                    }
                } else {
                    //Aguardando banca
                    echo '<div class="box warning bordered tip shadowed rounded">';                   
                    echo '    <div class="row">';
                    echo '        <div class="span10">';
                    echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Ainda não possui resultado.</h2>';
                    echo '            <div class="row">';
                    echo '                <div class="span6 padding-v">';
                    echo '                   <p>Aguardando banca.</p>';
                    echo '                </div>';
                    echo '            </div>';
                    echo '        </div>';
                    echo '        <div class="span2 align-center padding-top">';
                    echo '            <h1 id="iconBig" class="primary"><i class="icon-ban-circle"></i></h1>';
                    echo '        </div>';
                    echo '    </div>';
                    echo '</div>';                
                }
            } else {
                    //Aguardando banca
                    echo '<div class="box warning bordered tip shadowed rounded">';                   
                    echo '    <div class="row">';
                    echo '        <div class="span10">';
                    echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Ainda não possui resultado.</h2>';
                    echo '            <div class="row">';
                    echo '                <div class="span6 padding-v">';
                    echo '                   <p>Aguardando banca.</p>';
                    echo '                </div>';
                    echo '            </div>';
                    echo '        </div>';
                    echo '        <div class="span2 align-center padding-top">';
                    echo '            <h1 id="iconBig" class="primary"><i class="icon-ban-circle"></i></h1>';
                    echo '        </div>';
                    echo '    </div>';
                    echo '</div>';                
                }
        ?>    
    </div>
</div>   
                                    
<?php include("../rodape.php"); 
  

