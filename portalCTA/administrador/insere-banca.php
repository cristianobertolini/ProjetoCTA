<?php  
        include("../include/conexao.php");
        include("../include/funcoes.php");
  
        //as variaveis recebem os dados do formulário e campos hidden
        $codigo                      = $mysqli->real_escape_string($_POST['codigo']); 
        $nome                        = $mysqli->real_escape_string($_POST['nome']); 
        $data                        = $mysqli->real_escape_string($_POST['data']); 
        $descricao                   = $mysqli->real_escape_string($_POST['descricao']);
        $hora                        = $mysqli->real_escape_string($_POST['hora']);
        $local                       = $mysqli->real_escape_string($_POST['local']);
        $tipo                        = $mysqli->real_escape_string($_POST['tipo']);
        $turma                       = $mysqli->real_escape_string($_POST['turma']);
        $aluno                       = $mysqli->real_escape_string($_POST['aluno']);
        $orientadorAvaliador1_codigo = $mysqli->real_escape_string($_POST['orientador']);
        $avaliador2_codigo           = $mysqli->real_escape_string($_POST['avaliador2']);
        $avaliador3_codigo           = $mysqli->real_escape_string($_POST['avaliador3']);
        
        if (empty($codigo)) {
            //seleciona as o aluno e tipo de avaliação na banca 
            $sqlTeste = "SELECT usu_codigo, ban_tipo,
                                case 
                                    when `ban_tipo` = 1 then
                                        'Proposta'
                                    when `ban_tipo` = 2 then
                                        'TGSI 1'
                                    when `ban_tipo` = 3 then
                                        'TGSI 2'
                                end as `ban_tipo_nome`
                        FROM banca 
                        WHERE usu_codigo = '$aluno' and ban_tipo = '$tipo'";
           //executa a query
             $queryTeste = $mysqli->query($sqlTeste); 
           //verifica se há registro, se sim não permite que insira no banco
            if(mysqli_num_rows($queryTeste) > 0){
                $resultTeste = $queryTeste->fetch_assoc();
                $tipoNome = $resultTeste['ban_tipo_nome'];
                echo "<script>location.href='banca.php?mensagem=error&texto=A Banca do tipo $tipoNome para o aluno $nome já existe!';</script>";
                die();
            }
            //código para inserir a banca
            $sqlBanca = "INSERT INTO `banca` (`ban_tipo`, `ban_data`, `ban_descricao`, `ban_local`, `usu_codigo`, `tur_codigo`, `ban_hora`) 
                         VALUES ('$tipo', '$data', '$descricao', '$local', '$aluno', '$turma', '$hora')";
            //executa a query
            $mysqli->query($sqlBanca);
            //pega o código da banca inserido por último
            $idBanca = $mysqli->insert_id; 
        } else {
            $idBanca = $codigo;
            //faz update na banca
            $sqlUpdate = "UPDATE `banca` 
                          SET `ban_tipo`='$tipo',`ban_data`='$data',`ban_descricao`='$descricao',`ban_local`='$local',`usu_codigo`='$aluno',`tur_codigo`='$turma',`ban_hora`='$hora' 
                          WHERE `ban_codigo` = $idBanca";
            $mysqli->query($sqlUpdate);
            
            //deleta os avaliadores
            $sqlDelete = "DELETE FROM `banca_detalhe` 
                          WHERE `ban_codigo` = $idBanca";
            $mysqli->query($sqlDelete);
        }
        //insere orientador avaliador 1
        $sqlBancaDetalheOrientadorAvaliador1 = "INSERT INTO `banca_detalhe` (`ban_codigo`, `usu_codigo`)
                                                                     VALUES ('$idBanca','$orientadorAvaliador1_codigo');";

        $mysqli->query($sqlBancaDetalheOrientadorAvaliador1);
         //insere avaliador 2
        $sqlBancaDetalheAvaliador2 = "INSERT INTO `banca_detalhe` (`ban_codigo`, `usu_codigo`)
                                                           VALUES ('$idBanca','$avaliador2_codigo');";
        $mysqli->query($sqlBancaDetalheAvaliador2);

          //insere avaliador 3
        $sqlBancaDetalheAvaliador3 = "INSERT INTO `banca_detalhe` (`ban_codigo`, `usu_codigo`)
                                                           VALUES ('$idBanca','$avaliador3_codigo');";
        $mysqli->query($sqlBancaDetalheAvaliador3);

        echo "<script>location.href='banca.php?mensagem=success&texto=A Banca do aluno $nome do tipo de avaliação informado foi cadastrada com sucesso!';</script>";

        $mysqli->Close();
        die();        
   
//?>
