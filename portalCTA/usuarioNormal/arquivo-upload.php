<?php
include("../include/conexao.php"); 
include("../include/funcoes.php");

if (isset($_FILES['arquivo'])) {
    $pasta = 'uploads/';

    // Pasta onde o arquivo vai ser salvo
    $_UP['pasta'] = $pasta;

    // Tamanho máximo do arquivo (em Bytes)
    $_UP['tamanho'] = 1024 * 1024 * 2; // 2Mb
    //
    // Array com as extensões permitidas
    $_UP['extensoes'] = array('pdf');

    // Renomeia o arquivo? (Se true, o arquivo será salvo como .pdf e um nome único)
    $_UP['renomeia'] = true;

    // Array com os tipos de erros de upload do PHP
    $_UP['erros'][0] = 'Não houve erro';
    $_UP['erros'][1] = 'O arquivo no upload é maior do que o limite!';
    $_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especifiado!';
    $_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente.';
    $_UP['erros'][4] = 'Não foi feito o upload do arquivo.';

    // Verifica se houve algum erro com o upload. Se sim, exibe a mensagem do erro
    if ($_FILES['arquivo']['error'] != 0) {
      die("Não foi possível fazer o upload, erro:" . $_UP['erros'][$_FILES['arquivo']['error']]);
      exit; // Para a execução do script
    }

    // Caso script chegue a esse ponto, não houve erro com o upload e o PHP pode continuar
    // Faz a verificação da extensão do arquivo
    $nomedoArquivo = $_FILES['arquivo']['name'];
    $extensao = strtolower(end(explode('.', $nomedoArquivo)));
    if (array_search($extensao, $_UP['extensoes']) === false) {
      echo "<script>location.href='index.php?mensagem=error&texto=Por favor, envie arquivos com as seguintes extensões: *.pdf';</script>";    
      die();
    }

    // Faz a verificação do tamanho do arquivo
    if ($_UP['tamanho'] < $_FILES['arquivo']['size']) {
      echo "<script>location.href='index.php?mensagem=error&texto=O arquivo enviado é muito grande, envie arquivos de até 2Mb.';</script>";    
      die();  
    }

    // O arquivo passou em todas as verificações, hora de tentar movê-lo para a pasta
    // Primeiro verifica se deve trocar o nome do arquivo
    if ($_UP['renomeia'] == true) {
      // Cria um nome baseado no UNIX TIMESTAMP atual e com extensão .pdf
      $nome_final = md5(time()).'.pdf';
    } else {
      // Mantém o nome original do arquivo
      $nome_final = $_FILES['arquivo']['name'];
    }
      $nome_original = $_FILES['arquivo']['name'];

    $upload = move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['pasta'] . $nome_final);

    session_start();
    date_default_timezone_set('America/Sao_Paulo');

    $aluno = $_SESSION['UsuarioCOD'];
    $turma = $_SESSION['AlunoTurma'];
    $data = date('Y-m-d');
    $hora = date('H:i:s');
    $obs  = $mysqli->real_escape_string($_POST['texto']);
    $arqNome = $nome_final;
    $arqSituacao = 'N'; // A - Aprovado ou N  - Não aprovado, aqui no cadastro sempre passa N
    $arqTipo = $mysqli->real_escape_string($_POST['tipo']);

    if ($upload == true) {
        // Cria uma query MySQL
        $sql = "INSERT INTO 
               `arquivo`(`usu_aluno`, `tur_codigo`, `arq_data`, `arq_hora`, `arq_obs`, `arq_nome`, `arq_situacao`, `arq_tipo`, `arq_nome_original`) 
                 VALUES ('$aluno', '$turma','$data','$hora','$obs','$arqNome','$arqSituacao','$arqTipo', '$nome_original')";

        // Executa o insert    
        mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));
        //Envia e-mail
        $Orientador = $_SESSION['AlunoOrientador'];
        $email = BuscaDado('usu_email', 'usuario', 'usu_codigo = '.$Orientador);
        $nome  = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Orientador);

        $emailmsg = "<html>
                    <body>
                        Olá!<p>
                        Você recebeu um arquivo do TGSI!<br>
                        </p> 
                        <p>Para efetuar login acesse: <a href='".$URL_PADRAO."'>Gerenciador TGSI</a></p>

                        <p>---------------------------------------------------------------<br>
                        <em>Não Responder! Mensagem gerada automaticamente pelo servidor.<br></em></p>
                    </body>
                </html>";

        //$msg = emailAnexo($email, 'gerenciador.tgsi@gmail.com', $nome, 'Arquivo TGSI', $emailmsg, '../aluno/uploads/'.$nome_final);

        //Volta ara a página anterior
        echo "<script>location.href='index.php?mensagem=success&texto=Envio de arquivo efetuado com sucesso! $msg';</script>";
        exit;

    /*    if ($query == true) {
            // Upload efetuado com sucesso, exibe uma mensagem e um link para o arquivo
            echo "Upload efetuado com sucesso!";
            echo '<a href="' . $_UP['pasta'] . $nome_final . '">Clique aqui para acessar o arquivo</a>';
        } else {
            // Não foi possível fazer o upload, provavelmente a pasta está incorreta
            echo "Não foi possível enviar o arquivo, tente novamente.";
        }*/
    }
} else {
    echo "<script>location.href='index.php?mensagem=error&texto=Arquivo não suportado.';</script>";    
    die();    
}
$mysqli->Close();
?>