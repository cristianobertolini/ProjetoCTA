<?php 
    include("include/conexao.php");
    $tipo = $mysqli->real_escape_string($_POST['tipo']);
    $img  = $mysqli->real_escape_string($_POST['img']);
    $tag  = $mysqli->real_escape_string($_POST['tag']);
    
    
    $sqlDelTag = "DELETE FROM `imagem_tag`
                  WHERE `img_codigo` = $img
                    AND `tag_codigo` = $tag";
    $queryTag     = $mysqli->query($sqlDelTag);

    echo "<script>location.href='audio_descrever_imagem.php?imagem=$img';</script>";
?>

