<?php
    include("include/conexao.php"); 
    include("include/funcoes.php");

    if (isset($_FILES['arquivo'])) {
        $pasta = 'img/';

        $_UP['pasta'] = $pasta;

        // Tamanho máximo do arquivo (em Bytes)
        $_UP['tamanho'] = 1024 * 1024 * 3; // 3Mb
        //
        // Array com as extensões permitidas
        $_UP['extensoes'] = array('jpg','jpeg','gif','png','bmp');

        // Renomeia o arquivo
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

        // Faz a verificaãoo da extensão do arquivo
        $novo_nome = $_FILES['arquivo']['name'];
        $extensao = strtolower(end(explode('.', $novo_nome)));
        if (array_search($extensao, $_UP['extensoes']) === false) {
          echo "<script>location.href='upload_imagem.php?mensagem=w3-red&texto=Por favor, envie arquivos com as seguintes extensões: *.jpg, *.jpeg, *.gif, *.png ou *.bmp';</script>";    
          die();
        }

        // Faz a verificação do tamanho do arquivo
        if ($_UP['tamanho'] < $_FILES['arquivo']['size']) {
          echo "<script>location.href='upload_imagem.php?mensagem=w3-red&texto=O arquivo enviado é muito grande, envie arquivos de até 3Mb.';</script>";    
          die();  
        }

        // Primeiro verifica se deve trocar o nome do arquivo
        if ($_UP['renomeia'] == true) {
          // Cria um nome baseado no UNIX TIMESTAMP atual e com extensão jpg;.jpeg;.gif;.png;.bmp'
          $novo_nome = md5(time()).'.'.$extensao; 
        } else {
          // Mantém o nome original do arquivo
          $novo_nome = $_FILES['arquivo']['name'];
        }
        
        $upload = move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['pasta'] . $novo_nome);

        //session_start();
        date_default_timezone_set('America/Sao_Paulo');

        //$usuario = $_SESSION['UsuarioCOD'];
        $data = date('Y-m-d');
        $hora = date('H:i:s');
        $nome = $mysqli->real_escape_string($_POST['descricao']);
        $audiodescricao = $mysqli->real_escape_string($_POST['audiodescricao']);
        $usuario  = 1;
        $categoria= 1;

        if ($upload == true) {
            // Cria uma query MySQL
           $sql = "INSERT INTO 
                   `imagens`(`usu_codigo`, `img_data`, `img_hora`, `cat_codigo`, `img_audiodescricao`, `img_nome`, `img_nome_original`,`img_extensao`) 
                   VALUES ('$usuario','$data','$hora','$categoria','$audiodescricao','$nome','$novo_nome','$extensao')";

    // Executa o insert    
            mysqli_query($mysqli, $sql) or die(mysqli_error($mysqli));

            //Volta ara a página anterior
            echo "<script>location.href='upload_imagem.php?mensagem=w3-green&texto=Arquivo enviado com sucesso!';</script>";
            echo "";
            exit;

        } else {
            echo "<script>location.href='upload_imagem.php?mensagem=w3-red&texto=Não foi possivel fazer upload da imagem!';</script>";   
            die();    
        }
    }
        $mysqli->Close();
?>