<?php 
    include("../include/conexao.php");

    //as variaveis recebem os dados do formulário
    $ano             = $mysqli->real_escape_string($_POST['ano']); 
    $semestre        = $mysqli->real_escape_string($_POST['semestre']);
    $descricao       = $mysqli->real_escape_string($_POST['descricao']);
    $data_proposta   = $mysqli->real_escape_string($_POST['data_proposta']);
    $codigo          = $mysqli->real_escape_string($_POST['codigo']);
    $anoInicial      = $mysqli->real_escape_string($_POST['anoInicial']);   
    $semestreInicial = $mysqli->real_escape_string($_POST['semestreInicial']);

    //Se o ano e semestre forem diferentes do ano e semestre inicial e estes modificados já existirem no banco então
    //não deixa cadastrar nem editar e mostra mensagem
    if (($anoInicial != $ano) || ($semestreInicial != $semestre)) {
        $query = "SELECT tur_codigo, tur_ano, tur_semestre
                    FROM turma 
                        WHERE tur_ano = '$ano' and tur_semestre = '$semestre'";
        /*retorna a quantidade registros encontrados na consulta acima */
        $queryTurma = $mysqli->query($query);        
        //se existe turma com ano e semestre iguais então a turma ja existe
        if(mysqli_num_rows($queryTurma) > 0){
            echo "<script>location.href='turma.php?mensagem=error&texto=A turma do ano $ano / $semestre º semestre já existe!';</script>";
            die();
        }       
    } 

    if (($codigo >= 0)  && ($codigo != '')) {
        $sql = "UPDATE `turma`
                SET `tur_ano`='$ano',`tur_semestre`='$semestre',`tur_descricao`='$descricao',`tur_data_proposta`='$data_proposta'
                WHERE `tur_codigo`= '$codigo'"; 
    } else {
        $sql = "INSERT INTO `turma` (`tur_ano`, `tur_semestre`, `tur_descricao`, `tur_data_proposta`)
                VALUES ('$ano','$semestre','$descricao', '$data_proposta')";

    }

    //echo "<script>location.href='turma.php?mensagem=success&texto=A turma foi inserida/alterada com sucesso!';</script>";

    $mysqli->query($sql);
    
    session_start();
    if (($codigo >= 0)  && ($codigo != '')) {           
        $_SESSION['CodigoTurma'] = $codigo;
    } else {
        $_SESSION['CodigoTurma'] = $mysqli->insert_id;
    }       
    echo "<script>location.href='turma-aluno.php?Turma=$descricao';</script>";
    $mysqli->Close();
    die();        
    //Se não, se o código tiver valor, faz um UPDATE where codigo = $codigo;            
?>     