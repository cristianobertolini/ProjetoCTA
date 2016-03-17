<?php 
    include("../include/conexao.php");

    //as variaveis recebem os dados do formulário
    $codigoTurma  = $mysqli->real_escape_string($_POST['codigoturma']);
    $descTurma    = $mysqli->real_escape_string($_POST['descricao']);
    $aluno        = $mysqli->real_escape_string($_POST['aluno']);
    $orientador   = $mysqli->real_escape_string($_POST['orientador']);
    $coorientador = $mysqli->real_escape_string($_POST['coorientador']);
    $titulo       = $mysqli->real_escape_string($_POST['titulo']);

    //Se o ano e semestre forem diferentes do ano e semestre inicial e estes modificados já existirem no banco então
    //não deixa cadastrar nem editar e mostra mensagem
/*    if (($anoInicial != $ano) || ($semestreInicial != $semestre)) {
        $query = "SELECT tur_codigo, tur_ano, tur_semestre  from turma where tur_ano = '$ano' and tur_semestre = '$semestre'";
        /*retorna a quantidade registros encontrados na consulta acima */
/*        $queryTurma = $mysqli->query($query);        
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
*/   
    
    $sql = "INSERT INTO `turma_detalhe`(`tur_codigo`, `usu_aluno`, `usu_orientador`, `usu_coorientador`, `tud_titulo`) 
            VALUES ('$codigoTurma', '$aluno', '$orientador', '$coorientador', '$titulo')";    

    $mysqli->query($sql);
    
    session_start();
    $_SESSION['CodigoTurma'] = $codigoTurma;
     
    echo "<script>location.href='turma-aluno.php?Turma=$descTurma';</script>";
    $mysqli->Close();
    die();        
    //Se não, se o código tiver valor, faz um UPDATE where codigo = $codigo;            
?>     
