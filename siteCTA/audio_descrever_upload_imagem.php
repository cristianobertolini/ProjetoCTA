<?php   
    include("include/conexao.php");
    include("include/funcoes.php"); 
    include("include/config.php");
    
    session_start();
    
    $situacao = $mysqli->real_escape_string($_POST['situacao']);;
    $obs      = $mysqli->real_escape_string($_POST['obs']);
    $codigo   = $mysqli->real_escape_string($_POST['img']);
    $categoria = $mysqli->real_escape_string($_POST['categoria']);
    $audiodescricao = $mysqli->real_escape_string($_POST['audiodescricao']);
    $usuario  = $_SESSION['UsuarioCOD'];

    $update = "update `imagens` 
               set `img_situacao` = '$situacao',
                   `cat_codigo`   = '$categoria',
                   `img_audiodescricao` = '$audiodescricao'
               where `img_codigo` = '$codigo' ";
    $mysqli->query($update);    
    
    $tags = Trim($mysqli->real_escape_string($_POST['tag']));
    $arrayTag = explode(',', $tags);

    foreach($arrayTag as $valoresTag) {
        if ($valoresTag != '') {
            $sqlTag = "SELECT `tag_codigo`,
                              `tag_descricao`, 
                              `tag_cont`, 
                              `tag_ultima_busca` 
                         FROM `tag` 
                        WHERE `tag_descricao` LIKE '$valoresTag' ";

            $queryTag     = $mysqli->query($sqlTag);
            $resultadoTag = $queryTag->fetch_assoc();

            if (mysqli_num_rows($queryTag) > 0){
                //Testo se essa tag já está vinculada a esta imagem
                $sqlImgTag = "SELECT `img_codigo`, 
                                     `tag_codigo` 
                                FROM `imagem_tag`
                               WHERE `img_codigo` = $codigo
                                 AND `tag_codigo` = ".$resultadoTag['tag_codigo'];

                $queryImgTag = $mysqli->query($sqlImgTag);
                
                //Se não está vinculada então vincula
                if (mysqli_num_rows($queryImgTag) == 0){
                    $sqlTagInsert = "INSERT INTO `imagem_tag`
                                               (`img_codigo`, 
                                                `tag_codigo`) 
                                        VALUES ('$codigo',
                                                '".$resultadoTag['tag_codigo']."');";
                    $mysqli->query($sqlTagInsert);
                }
            } else {
                //se não encontrar insere tag nova e insere na imagem
                $sqlTagInsert = "INSERT INTO `tag`
                                            (`tag_descricao`, 
                                             `tag_cont`,
                                             `tag_ultima_busca`) 
                                     VALUES ('$valoresTag',
                                             '0',
                                              now())";
                $mysqli->query($sqlTagInsert);
                $codigotag = $mysqli->insert_id;

                $sqlTagImgInsert = "INSERT INTO `imagem_tag`
                                               (`img_codigo`, 
                                                `tag_codigo`) 
                                        VALUES ('$codigo',
                                                '$codigotag');";
                $mysqli->query($sqlTagImgInsert);
            }
        }
    }    

    gravaLog($usuario, $codigo, 2, $obs);
    
    echo "<script>location.href='./audio_descrever.php?mensagem=w3-green&texto=Operação realizada com sucesso!';</script>";
    $mysqli->Close();
    die(); 
?>    
  