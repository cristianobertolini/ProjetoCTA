<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 4;
    include("../restrito.php");
    
    include("../include/conexao.php");
    include("../include/funcoes.php");
    
    $codigoAluno = $_SESSION['UsuarioCOD'];
?>
<!DOCTYPE html>
<html>
    <head>
         <title> Gerenciador de TGSI | Aluno </title>
        <?php
            include("cabecalho.php");
        ?>
    </head>
    
    <style type="text/css">
        #iconBig {
            font-size: 90px;
        }
        #iconMed {
            font-size: 40px;
        }
    </style>

    <body>
        <div class="band shadowed no-print">
        <?php
            
            include("../navbar.php");
            include("/navbar-aluno.php");
       
        ?>
        </div> 

        <!-- main --> 
        <div class="band align-center-phone">
            <div class="container"> 
                <?php
                //Valida se o aluno está em alguma turma
                $sqlValida = "SELECT `usu_aluno` FROM `turma_detalhe` WHERE `usu_aluno` = $codigoAluno";
                
                $queryValida = $mysqli->query($sqlValida);
                //se encontrou turma para ele então mostra o fluxo, senão mostra uma mensagem no final
                if (mysqli_num_rows($queryValida) > 0){
                    //mensgem padrão que vem das outras telas
                    if(isset($_GET['mensagem'])){
                        echo "<div class='row'><div class='span8'><div class='box ".$_GET['mensagem']."'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                        echo $_GET['texto'];
                        echo "</div></div></div>";
                    }
                    //Inicializa as variáveis
                    $PropostaAceita        = False;
                    $TGSIAceita            = False; 
                    $TGSI2Aceita           = False;
                    
                    //Busca o arquivo do aluno caso já tenha enviado
                    $sqlAluno = "SELECT `arq_codigo`, `usu_aluno`, `tur_codigo`, `arq_data`, `arq_hora`, `arq_obs`, `arq_nome`, `arq_situacao`, `arq_tipo`
                                 FROM `arquivo` 
                                 WHERE `arq_tipo`= 1 AND `usu_aluno` = ".$codigoAluno." ORDER BY `arq_codigo` DESC LIMIT 1";

                    /*retorna a quantidade registros encontrados na consulta acima */
                    $queryAluno = $mysqli->query($sqlAluno);

                    /*se quantidade de linhas maior que zero*/
                    if(mysqli_num_rows($queryAluno) > 0){
                        $ResultadoProposta = $queryAluno->fetch_assoc();
                        $NomeArquivoFinal = $ResultadoProposta['arq_nome'];

                        //Se o arquivo já foi aprovado mostra em verde
                        $PropostaPossuiNota = BancaPossuiNota($codigoAluno, 1); //Ve se existe as 3 avaliações desse aluno 
                        //se a proposta possui todas as notas já dá pra saber o resultado
                        if ($PropostaPossuiNota){
                            //Ve o resultado das avaliações Aprovado ou Reprovado
                            $PropostaAceita = BancaResultado($codigoAluno, 1); 
                        }

                        if ($PropostaPossuiNota && $PropostaAceita) {
                            //Proposta aceita
                            echo '<div class="box success bordered tip shadowed rounded">';
                            echo '    <div class="row">';
                            echo '        <div class="span10">';
                            echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Proposta</h2>';
                            echo '            <div class="row">';
                            echo '                <div class="span4 padding-v">';
                            echo '                    <p>';
                            echo '                        Sua proposta foi aprovada!<br>';
                            echo '                        Agora você deve enviar o seu TGSI 1.';
                            echo '                    </p>';
                            echo '                </div>';
                            echo '                <div class="span8 align-right padding-v align-center-phone"> ';
                            echo '                    <button class="btn link" id="verproposta" name="verproposta" type="button" onclick="parent.location=\'resultado-proposta.php\'">';
                            echo '                        <i class="icon-search"></i> Ver Resultado';
                            echo '                    </button>';
                            echo '                    <button class="btn link" id="baixar" name="baixar" type="button" onclick="window.open(\'./uploads/'.$NomeArquivoFinal.'\', \'_blank\')">';
                            echo '                        <i class="icon-download-alt"></i> Baixar Arquivo';
                            echo '                    </button>';
                            echo '                </div>';
                            echo '            </div>';
                            echo '        </div>';
                            echo '        <div class="span2 align-center padding-top">';
                            echo '            <h1 id="iconBig" class="success"><i class="icon-ok-circle"></i></h1>';
                            echo '        </div>';
                            echo '    </div>';
                            echo '</div>';  
                        } else if ($PropostaPossuiNota && !$PropostaAceita){
                            //Proposta reprovada, reenviar
                            echo '<div class="box error bordered tip shadowed rounded">';
                            echo '    <div class="row">';
                            echo '        <div class="span10">';
                            echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Proposta</h2>';
                            echo '            <div class="row">';
                            echo '                <div class="span3 padding-v">';                            
                            echo '                    <p>Sua proposta foi reprovada!</p>';
                            echo '                    <br>';  
                            echo '                </div>';
                            echo '                <div class="span9 padding-v align-right align-center-phone">';                         
                            echo '                    <form name="gerar" method="POST" action="enviar-arquivo.php">';
                            echo '                        <button class="btn primary gerarBtn" id="verproposta" name="verproposta" type="button" onclick="parent.location=\'resultado-proposta.php\'">';
                            echo '                            <i class="icon-search"></i> Ver Resultado';
                            echo '                        </button>';                               
                            echo '                        <input type="hidden" name="tipo" value="1">';
                            echo '                        <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="Submit">';
                            echo '                            <i class="icon-upload-alt"></i> Enviar Arquivo';
                            echo '                        </button>';                                         
                            echo '                    </form>';
                            echo '                </div>';
                            echo '            </div>';
                            echo '        </div>';
                            echo '        <div class="span2 align-center padding-top">';
                            echo '            <h1 id="iconBig" class="error"><i class="icon-remove-circle"></i></h1>';
                            echo '        </div>';
                            echo '    </div>';
                            echo '</div>';                        
                        } else {
                            //Aguardando resultado
                            echo '<div class="box danger bordered tip shadowed rounded">';
                            echo '    <div class="row">';
                            echo '        <div class="span10">';
                            echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Proposta</h2>';
                            echo '            <div class="row">';
                            echo '                <div class="span6 padding-v">';
                            echo '                    <p>';
                            echo '                        Sua proposta está pendente!<br>';
                            echo '                        Aguarde o resultado da avaliação.';
                            echo '                    </p>';
                            echo '                </div>';
                            echo '                <div class="span6 align-right padding-v align-center-phone"> ';
                            echo '                    <button class="btn link" id="baixar" name="baixar"  type="button" onclick="window.open(\'./uploads/'.$NomeArquivoFinal.'\', \'_blank\')">';
                            echo '                        <i class="icon-download-alt"></i> Baixar Arquivo';
                            echo '                    </button>';
                            echo '                </div>';
                            echo '            </div>';
                            echo '        </div>';
                            echo '        <div class="span2 align-center padding-top">';
                            echo '            <h1 id="iconBig" class="danger"><i class="icon-remove-circle"></i></h1>';
                            echo '        </div>';
                            echo '    </div>';
                            echo '</div>';                              
                        }
                    } else {
                        //Aguardando envio
                        echo '<div class="box warning bordered tip shadowed rounded">';
                        echo '    <div class="row">';
                        echo '        <div class="span10">';
                        echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Proposta</h2>';
                        echo '              <div class="row">';
                        echo '                <div class="span6 padding-v">';                            
                        echo '                    <p>Aguardando envio!</p>';
                        echo '                    <br>';  
                        echo '                </div>';
                        echo '                <div class="span6 padding-v align-right align-center-phone">';
                        echo '                    <form name="gerar" method="POST" action="enviar-arquivo.php">';
                        echo '                        <input type="hidden" name="tipo" value="1">';
                        echo '                        <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="Submit">';
                        echo '                            <i class="icon-upload-alt"></i> Enviar Arquivo';
                        echo '                        </button>';                                         
                        echo '                    </form>';
                        echo '                </div>';
                        echo '            </div>';
                        echo '        </div>';
                        echo '        <div class="span2 align-center padding-top">';
                        echo '            <h1 id="iconBig" class="warning"><i class="icon-ok-circle"></i></h1>';
                        echo '        </div>';
                        echo '    </div>';
                        echo '</div>';                        
                    }
                    
                    echo '<p>';
                    echo '<h1 id="iconMed" class="align-center"><i class="icon-arrow-down"></i></h1>';
                    echo '</p>';
                
                    if ($PropostaAceita) {
                        $sqlTGSI = "SELECT `arq_codigo`, `usu_aluno`, `tur_codigo`, `arq_data`, `arq_hora`, `arq_obs`, `arq_nome`, `arq_situacao`, `arq_tipo`
                                     FROM `arquivo` 
                                     WHERE `arq_tipo`= 2 AND `usu_aluno` = ".$codigoAluno." ORDER BY `arq_codigo` DESC LIMIT 1";

                        /*retorna a quantidade registros encontrados na consulta acima */
                        $queryTGSI = $mysqli->query($sqlTGSI);
                        
                        //Se tem arquivo ve a situação dele se não libera pra enviar
                        if (mysqli_num_rows($queryTGSI) > 0){
                            $ResultadoTGSI = $queryTGSI->fetch_assoc();
                            $NomeArquivoTGSI = $ResultadoTGSI['arq_nome'];
                            
                            //Se o arquivo já foi aprovado mostra em verde
                            $TGSIPossuiNota = BancaPossuiNota($codigoAluno, 2); //Ve se existe as 3 avaliações desse aluno 
                            //se a proposta possui todas as notas já dá pra saber o resultado
                            if ($TGSIPossuiNota){
                                //Ve o resultado das avaliações Aprovado ou Reprovado
                                $TGSIAceita = BancaResultado($codigoAluno, 2); 
                            }                            
                        
                            if ($TGSIPossuiNota && $TGSIAceita) {
                                //TGSI 1 aceita
                                echo '<div class="box success bordered tip shadowed rounded">';
                                echo '    <div class="row">';
                                echo '        <div class="span10">';
                                echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 1</h2>';
                                echo '            <div class="row">';
                                echo '                <div class="span4 padding-v">';
                                echo '                    <p>';
                                echo '                        Seu TGSI 1 foi aprovado!<br>';
                                echo '                        Agora você deve enviar o seu TGSI 2.';
                                echo '                    </p>';
                                echo '                </div>';
                                echo '                <div class="span8 align-right padding-v align-center-phone"> ';
                                echo '                    <button class="btn link" id="vertgsi1" name="vertgsi1" type="button" onclick="parent.location=\'resultado-tgsi1.php\'">';
                                echo '                        <i class="icon-search"></i> Ver Resultado';
                                echo '                    </button>';
                                echo '                    <button class="btn link" id="baixar" name="baixar" type="button" onclick="window.open(\'./uploads/'.$NomeArquivoTGSI.'\', \'_blank\')">';
                                echo '                        <i class="icon-download-alt"></i> Baixar Arquivo';
                                echo '                    </button>';
                                echo '                </div>';
                                echo '            </div>';
                                echo '        </div>';
                                echo '        <div class="span2 align-center padding-top">';
                                echo '            <h1 id="iconBig" class="success"><i class="icon-ok-circle"></i></h1>';
                                echo '        </div>';
                                echo '    </div>';
                                echo '</div>';                                 
                            } else if ($TGSIPossuiNota && !$TGSIAceita){
                                //TGSI 1 reprovada 
                                echo '<div class="box error bordered tip shadowed rounded">';
                                echo '    <div class="row">';
                                echo '        <div class="span10">';
                                echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 1</h2>';
                                echo '            <div class="row">';
                                echo '                <div class="span3 padding-v">';                            
                                echo '                    <p>Seu TGSI 1 foi reprovado!</p>';
                                echo '                    <br>';  
                                echo '                </div>';
                                echo '                <div class="span9 padding-v align-right align-center-phone">';                         
                                echo '                    <form name="gerar" method="POST" action="enviar-arquivo.php">';
                                echo '                        <button class="btn primary gerarBtn" id="vertgsi1" name="vertgsi1" type="button" onclick="parent.location=\'resultado-tgsi1.php\'">';
                                echo '                            <i class="icon-search"></i> Ver Resultado';
                                echo '                        </button>';                               
                                echo '                        <input type="hidden" name="tipo" value="2">';
                                echo '                        <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="Submit">';
                                echo '                            <i class="icon-upload-alt"></i> Enviar Arquivo';
                                echo '                        </button>';                                         
                                echo '                    </form>';
                                echo '                </div>';
                                echo '            </div>';
                                echo '        </div>';
                                echo '        <div class="span2 align-center padding-top">';
                                echo '            <h1 id="iconBig" class="error"><i class="icon-remove-circle"></i></h1>';
                                echo '        </div>';
                                echo '    </div>';
                                echo '</div>'; 
                            } else {
                                //Aguardando resultado 
                                echo '<div class="box danger bordered tip shadowed rounded">';
                                echo '    <div class="row">';
                                echo '        <div class="span10">';
                                echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 1</h2>';
                                echo '            <div class="row">';
                                echo '                <div class="span6 padding-v">';
                                echo '                    <p>';
                                echo '                        Sua TGSI 1 está pendente!<br>';
                                echo '                        Aguarde o resultado da avaliação.';
                                echo '                    </p>';
                                echo '                </div>';
                                echo '                <div class="span6 align-right padding-v align-center-phone"> ';
                                echo '                    <button class="btn link" id="baixar" name="baixar"  type="button" onclick="window.open(\'./uploads/'.$NomeArquivoTGSI.'\', \'_blank\')">';
                                echo '                        <i class="icon-download-alt"></i> Baixar Arquivo';
                                echo '                    </button>';
                                echo '                </div>';
                                echo '            </div>';
                                echo '        </div>';
                                echo '        <div class="span2 align-center padding-top">';
                                echo '            <h1 id="iconBig" class="danger"><i class="icon-remove-circle"></i></h1>';
                                echo '        </div>';
                                echo '    </div>';
                                echo '</div>';                                  
                            }
                        } else {                        
                            //Libera para enviar o TGSI 1
                            echo '<div class="box warning bordered tip shadowed rounded">';                    
                            echo '    <div class="row">';
                            echo '        <div class="span10">';
                            echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 1</h2>';
                            echo '            <div class="row">';
                            echo '                <div class="span6 padding-v">';                           
                            echo '                    <p>Aguardando envio!</p>';
                            echo '                    <br>';  
                            echo '                </div>';
                            echo '                <div class="span6 padding-v align-right align-center-phone">';
                            echo '                    <form name="gerar" method="POST" action="enviar-arquivo.php">';
                            echo '                        <input type="hidden" name="tipo" value="2">';
                            echo '                        <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="Submit">';
                            echo '                            <i class="icon-upload-alt"></i> Enviar Arquivo';
                            echo '                        </button>';                                         
                            echo '                    </form>';
                            echo '                </div>';
                            echo '            </div>';
                            echo '        </div>';
                            echo '        <div class="span2 align-center padding-top">';
                            echo '            <h1 id="iconBig" class="warning"><i class="icon-upload"></i></h1>';
                            echo '        </div>';
                            echo '    </div>';
                            echo '</div>'; 
                        }
                    } else {
                        //Aguardando liberação
                        echo '<div class="box info bordered tip shadowed rounded">';                   
                        echo '    <div class="row">';
                        echo '        <div class="span10">';
                        echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 1</h2>';
                        echo '            <div class="row">';
                        echo '                <div class="span6 padding-v">';
                        echo '                   <p>Aguardando liberação.</p>';
                        echo '                </div>';
                        echo '            </div>';
                        echo '        </div>';
                        echo '        <div class="span2 align-center padding-top">';
                        echo '            <h1 id="iconBig" class="primary"><i class="icon-ban-circle"></i></h1>';
                        echo '        </div>';
                        echo '    </div>';
                        echo '</div>';
                    }                
                
                    echo '<p>';
                    echo '<h1 id="iconMed" class="align-center"><i class="icon-arrow-down"></i></h1>';
                    echo '</p>';
                
                    if ($PropostaAceita && $TGSIAceita) {
                        $sqlTGSI2 = "SELECT `arq_codigo`, `usu_aluno`, `tur_codigo`, `arq_data`, `arq_hora`, `arq_obs`, `arq_nome`, `arq_situacao`, `arq_tipo`
                                     FROM `arquivo` 
                                     WHERE `arq_tipo`= 3 AND `usu_aluno` = ".$codigoAluno." ORDER BY `arq_codigo` DESC LIMIT 1";

                        /*retorna a quantidade registros encontrados na consulta acima */
                        $queryTGSI2 = $mysqli->query($sqlTGSI2);
                        
                        //Se tem arquivo ve a situação dele se não libera pra enviar
                        if (mysqli_num_rows($queryTGSI2) > 0){
                            $ResultadoTGSI2 = $queryTGSI2->fetch_assoc();
                            $NomeArquivoTGSI2 = $ResultadoTGSI2['arq_nome'];
                            
                            //Se o arquivo já foi aprovado mostra em verde
                            $TGSI2PossuiNota = BancaPossuiNota($codigoAluno, 3); //Ve se existe as 3 avaliações desse aluno 
                            //se a proposta possui todas as notas já dá pra saber o resultado
                            if ($TGSI2PossuiNota){
                                //Ve o resultado das avaliações Aprovado ou Reprovado
                                $TGSI2Aceita = BancaResultado($codigoAluno, 3); 
                            }                              
                        
                            if ($TGSI2PossuiNota && $TGSI2Aceita) {
                                //TGSI 1 aceita
                                echo '<div class="box success bordered tip shadowed rounded">';
                                echo '    <div class="row">';
                                echo '        <div class="span10">';
                                echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 2</h2>';
                                echo '            <div class="row">';
                                echo '                <div class="span4 padding-v">';
                                echo '                    <p>';
                                echo '                        Seu TGSI 2 foi aprovado!<br>';
                                echo '                        Parabéns.';
                                echo '                    </p>';
                                echo '                </div>';
                                echo '                <div class="span8 align-right padding-v align-center-phone"> ';
                                echo '                    <button class="btn link" id="vertgsi2" name="vertgsi2" type="button" onclick="parent.location=\'resultado-tgsi2.php\'">';
                                echo '                        <i class="icon-search"></i> Ver Resultado';
                                echo '                    </button>';
                                echo '                    <button class="btn link" id="baixar" name="baixar" type="button" onclick="window.open(\'./uploads/'.$NomeArquivoTGSI2.'\', \'_blank\')">';
                                echo '                        <i class="icon-download-alt"></i> Baixar Arquivo';
                                echo '                    </button>';
                                echo '                </div>';
                                echo '            </div>';
                                echo '        </div>';
                                echo '        <div class="span2 align-center padding-top">';
                                echo '            <h1 id="iconBig" class="success"><i class="icon-ok-circle"></i></h1>';
                                echo '        </div>';
                                echo '    </div>';
                                echo '</div>';                                 
                            } else if ($TGSI2PossuiNota && !$TGSI2Aceita){
                                //TGSI 2 reprovada 
                                echo '<div class="box error bordered tip shadowed rounded">';
                                echo '    <div class="row">';
                                echo '        <div class="span10">';
                                echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 2</h2>';
                                echo '            <div class="row">';
                                echo '                <div class="span3 padding-v">';                            
                                echo '                    <p>Seu TGSI 2 foi reprovado!</p>';
                                echo '                    <br>';  
                                echo '                </div>';
                                echo '                <div class="span9 padding-v align-right align-center-phone">'; 
                                echo '                    <button class="btn primary gerarBtn" id="vertgsi2" name="vertgsi2" type="button" onclick="parent.location=\'resultado-tgsi2.php\'">';
                                echo '                        <i class="icon-search"></i> Ver Resultado';
                                echo '                    </button>';                               
                                echo '                </div>'; 
                                echo '            </div>';
                                echo '        </div>';
                                echo '        <div class="span2 align-center padding-top">';
                                echo '            <h1 id="iconBig" class="error"><i class="icon-remove-circle"></i></h1>';
                                echo '        </div>';
                                echo '    </div>';
                                echo '</div>'; 
                            } else {
                                //Aguardando resultado 
                                echo '<div class="box danger bordered tip shadowed rounded">';
                                echo '    <div class="row">';
                                echo '        <div class="span10">';
                                echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 2</h2>';
                                echo '            <div class="row">';
                                echo '                <div class="span6 padding-v">';
                                echo '                    <p>';
                                echo '                        Seu TGSI 2 está pendente!<br>';
                                echo '                        Aguarde o resultado da avaliação.';
                                echo '                    </p>';
                                echo '                </div>';
                                echo '                <div class="span6 align-right padding-v align-center-phone"> ';
                                echo '                    <button class="btn link" id="baixar" name="baixar"  type="button" onclick="window.open(\'./uploads/'.$NomeArquivoTGSI2.'\', \'_blank\')">';
                                echo '                        <i class="icon-download-alt"></i> Baixar Arquivo';
                                echo '                    </button>';
                                echo '                </div>';
                                echo '            </div>';
                                echo '        </div>';
                                echo '        <div class="span2 align-center padding-top">';
                                echo '            <h1 id="iconBig" class="danger"><i class="icon-remove-circle"></i></h1>';
                                echo '        </div>';
                                echo '    </div>';
                                echo '</div>';                                  
                            }
                        } else {                        
                            //Libera para enviar o TGSI 2
                            echo '<div class="box warning bordered tip shadowed rounded">';                    
                            echo '    <div class="row">';
                            echo '        <div class="span10">';
                            echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 2</h2>';
                            echo '            <div class="row">';
                            echo '                <div class="span6 padding-v">';                           
                            echo '                    <p>Aguardando envio!</p>';
                            echo '                    <br>';  
                            echo '                </div>';
                            echo '                <div class="span6 padding-v align-right align-center-phone">';
                            echo '                    <form name="gerar" method="POST" action="enviar-arquivo.php">';
                            echo '                        <input type="hidden" name="tipo" value="3">';
                            echo '                        <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="Submit">';
                            echo '                            <i class="icon-upload-alt"></i> Enviar Arquivo';
                            echo '                        </button>';                                         
                            echo '                    </form>';
                            echo '                </div>';
                            echo '            </div>';
                            echo '        </div>';
                            echo '        <div class="span2 align-center padding-top">';
                            echo '            <h1 id="iconBig" class="warning"><i class="icon-upload"></i></h1>';
                            echo '        </div>';
                            echo '    </div>';
                            echo '</div>'; 
                        }
                    } else {
                        //Aguardando liberação
                        echo '<div class="box info bordered tip shadowed rounded">';                   
                        echo '    <div class="row">';
                        echo '        <div class="span10">';
                        echo '            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 2</h2>';
                        echo '            <div class="row">';
                        echo '                <div class="span6 padding-v">';
                        echo '                   <p>Aguardando liberação.</p>';
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
                    echo '  <div class="box bordered rounded shadowed info">';
                    echo '      <div class="box-content">';
                    echo '          Você não está cadastrado em uma turma.';
                    echo '          <br>Entre em contato com o coordenador do curso para que ele efetue o cadastro.'; 
                    echo '      </div>';
                    echo '  </div>';  
                }                     
                ?>                
                 
            </div>
        </div>
        <ul class="vakata-context"></ul>
        <div id="jstree-marker" style="display: none;">&nbsp;</div>

<script>
    function BaixarArquivo(NomeArquivo){
        alert (NomeArquivo);
        
        <?php 
            $Nome = '<script>document.write(NomeArquivo);</script>';
       
            // Define o tempo máximo de execução em 0 para as conexões lentas
            set_time_limit(0);
            // Arqui você faz as validações e/ou pega os dados do banco de dados
            $aquivoNome = $Nome; // nome do arquivo que será enviado p/ download
            $arquivoLocal = '/uploads/'.$aquivoNome; // caminho absoluto do arquivo
            // Verifica se o arquivo não existe
            if (!file_exists($arquivoLocal)) {
                // Exiba uma mensagem de erro caso ele não exista
                echo "<script> alert 'Erro!'</script>";
                exit;
            }
            // Aqui você pode aumentar o contador de downloads
            // Definimos o novo nome do arquivo
            //$novoNome = 'imagem_nova.jpg';
            // Configuramos os headers que serão enviados para o browser
            header('Content-Description: File Transfer');
            header('Content-Disposition: attachment; filename="'.$aquivoNome.'"');
            header('Content-Type: application/octet-stream');
            header('Content-Transfer-Encoding: binary');
            header('Content-Length: ' . filesize($aquivoNome));
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Pragma: public');
            header('Expires: 0');
            // Envia o arquivo para o cliente
            readfile($aquivoNome); 
        ?>        

    }
</script>        
        <?php
            include("../rodape.php");
        ?>
    </body>
</html>