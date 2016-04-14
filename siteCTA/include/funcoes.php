<?php
    function smtpmailer($para, $de, $de_nome, $assunto, $corpo){
        include ("../phpmailer/class.phpmailer.php");
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->IsHTML(true);
        $mail->SMTPDebug = 1;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'ssl';
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        $mail->Username = "gerenciador.tgsi@gmail.com";
        $mail->Password = "testegerenciador";
        $mail->SetFrom($de, $de_nome);
        $mail->Subject = $assunto;
        $mail->Body = $corpo;
        $mail->AddAddress($para);
        if(!$mail->Send()){
            $erro = 'Erro: '.$mail->ErrorInfo;
            return $erro;
        }else{ return 'Mensagem de email enviada!'; }
    }
    
    function emailAnexo($para, $de, $de_nome, $assunto, $corpo, $file){
        include ("../phpmailer/class.phpmailer.php");
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->IsHTML(true);
        $mail->SMTPDebug = 1;
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'ssl';
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 465;
        $mail->Username = "gerenciador.tgsi@gmail.com";
        $mail->Password = "testegerenciador";
        $mail->SetFrom($de, $de_nome);
        $mail->Subject = $assunto;
        //$mail->msgHTML(file_get_contents('contents.html'), dirname(__FILE__));
        $mail->Body = $corpo;
        $mail->AddAddress($para);
        $mail->addAttachment($file);
        if(!$mail->Send()){
            $erro = 'Erro: '.$mail->ErrorInfo;
            return $erro;
        }else{ return 'Mensagem de email enviada!'; }
    }    
    
    function montaMensagem ($login,$senha){
        include ("config.php");
        $mensagem = 
        "<html>
            <body>
                Ol�!<p>
                Voc� foi cadastrado do Gerenciador de TGSI!<br>
                Login: ".$login." <br>
                Senha: ".$senha."<br></p> 
                <p>Para efetuar login acesse: <a href='".$URL_PADRAO."'>Gerenciador TGSI</a></p>
                
                <p>---------------------------------------------------------------<br>
                <em>N�o Responder! Mensagem gerada automaticamente pelo servidor.<br></em></p>
            </body>
        </html>";
       
       return $mensagem;
    }
    
    function pegaTurma($idAluno){
        include("conexao.php");       
        
        $sql = "SELECT `tur_codigo` 
                FROM `turma_detalhe` 
                WHERE `usu_aluno` = $idAluno 
                LIMIT 1";
           
        $query = $mysqli->query($sql);    
        $resposta = $query->fetch_assoc();
        if (mysqli_num_rows($query) > 0) {        
            return $resposta['tur_codigo'];
        }
        
        $mysqli->Close();
    }

    function pegaOrientador($idAluno){
        include("conexao.php");       
        
        $sql = "SELECT `usu_orientador` 
                FROM `turma_detalhe` 
                WHERE `usu_aluno` = $idAluno 
                LIMIT 1";
           
        $query = $mysqli->query($sql);    
        $resposta = $query->fetch_assoc();
        if (mysqli_num_rows($query) > 0) {        
            return $resposta['usu_orientador'];
        }
        
        $mysqli->Close();
    }  
    
function geraSenha($tamanho = 8, $maiusculas = true, $numeros = true, $simbolos = false)
{
    // Caracteres de cada tipo
    $lmin = 'abcdefghijklmnopqrstuvwxyz';
    $lmai = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $num = '1234567890';
    $simb = '!@#$%*-';
    
    // Vari�veis internas
    $retorno = '';
    $caracteres = '';
    
    // Agrupamos todos os caracteres que poder�o ser utilizados
    $caracteres .= $lmin;
    if ($maiusculas) $caracteres .= $lmai;
    if ($numeros) $caracteres .= $num;
    if ($simbolos) $caracteres .= $simb;
    
    // Calculamos o total de caracteres poss�veis
    $len = strlen($caracteres);
    
    for ($n = 1; $n <= $tamanho; $n++) {
        // Criamos um n�mero aleat�rio de 1 at� $len para pegar um dos caracteres
        $rand = mt_rand(1, $len);
        // Concatenamos um dos caracteres na vari�vel $retorno
        $retorno .= $caracteres[$rand-1];
    }
    
    return $retorno;
} 

function BuscaDado($NomedoCampo, $NomeDaTabela, $Condicao) {
    include("conexao.php");
    
    $sql = 'select '.$NomedoCampo.' from '.$NomeDaTabela;
    if (!empty($Condicao)){
        $sql = $sql.' where '.$Condicao;
    }
    
    $query = $mysqli->query($sql); 
    if(mysqli_num_rows($query) > 0){
        $retorno = mysqli_fetch_assoc($query);
        return $retorno[$NomedoCampo];
    }    
}

function contaCategoria($codCat){
    //Ve se existe as 3 avalia��es desse aluno
    include("conexao.php");       

    $sql = "SELECT `img_codigo` 
            FROM `imagens` 
            WHERE `cat_codigo` = $codCat";

    $query = $mysqli->query($sql);
        
    return mysqli_num_rows($query);

    $mysqli->Close();
}

function BancaResultado($codluno, $tipo){
    //Ve o resultado das avalia��es Aprovado ou Reprovado
    include("conexao.php");       

    $sql = "SELECT bav.`bav_codigo`, bav.`bav_nota_soma` 
            FROM `banca_detalhe_avaliacao` as bav
                RIGHT JOIN `banca_detalhe` as bd 
                    ON bd.`band_codigo` = bav.`band_codigo` 
                RIGHT JOIN `banca` as b 
                    ON bd.`ban_codigo` = b.`ban_codigo` 
            WHERE b.`usu_codigo` = $codluno 
              AND b.`ban_tipo`= $tipo
              AND bav.`bav_nota_soma` IS NOT NULL";

    $query = $mysqli->query($sql);
    
    $nota  = 0;
    $soma  = 0;
    
    if (mysqli_num_rows($query) >= 3) {
        while ($Resultado = $query->fetch_assoc()) {
            $soma = $soma + $Resultado['bav_nota_soma'];
        }        
        $nota = $soma/3;
        if ($nota >=7){    
            return True;
        } else {
            return False;
        }
    } else {
        return False;
    }        

    $mysqli->Close();
}

function nomeCatUsu($codigo){
    //Ve o resultado das avalia��es Aprovado ou Reprovado
    include("conexao.php");       

    $sql = "SELECT `cat_usu_nome` 
            FROM `categoria_usuario`
            WHERE `cat_usu_codigo` = $codigo";

    $query = $mysqli->query($sql);
    
    $Resultado = $query->fetch_assoc();

    return $Resultado['cat_usu_nome'];     

    $mysqli->Close();  
}

function gerar_pdf($corpo){
    
    return true;
}
