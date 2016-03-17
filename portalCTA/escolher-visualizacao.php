<?php
    include("restrito.php");    
    include("include/conexao.php");
    
    $sql = "SELECT C.`cat_descricao`, C.`cat_codigo` 
            FROM `categoria` AS C 
                    INNER JOIN `usuario_categoria` AS U 
                    ON U.`cat_codigo` = C.`cat_codigo` 
            WHERE U.`usu_codigo` = ".$_SESSION['UsuarioCOD'];
//    $mysqli = $conexao;
    $resposta = $mysqli->query($sql);
?>    
  
<!DOCTYPE html>
<html>
    <head>
        <?php include("cabecalho.php"); ?>
         <title> Gerenciador de TGSI </title>
    </head>

    <body>
        <div class="band shadowed no-print">
        <?php
            include("navbar.php");
        ?>
        </div> 

        <!-- main --> 
         <div class="band"> 
            <div class="container"> 
                <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Visualização do Gerenciador </h2>
                <form id="formRelatorio" action="include/redireciona.php" method="post"> 
                    <div class="margin-bottom">     
                        <span class="label">Visualizar como<span class="required"></span></span>
                        <br>
                        <?php                        
                            while ($registro = $resposta->fetch_assoc()) {    
                                echo '<span>';
                                echo '<input id="categoria'.$registro['cat_codigo'].'" name="categoria" type="radio" value="'.$registro['cat_codigo'].'">';
                                echo '<label for="categoria'.$registro['cat_codigo'].'">'.$registro['cat_descricao'].'</label></span>';
                                echo '<br>';
                            }
                        ?>  
                    </div>   

                    <div class="form-actions bottom ">    
                        <button class="btn primary gerarBtn" id="entrar" name="entrar" type="submit"><i class="icon-save"></i> Entrar</button>
                    </div>
                </form>

                <script type="text/javascript"> $(document).ready(function() { $('#gerar').lockOnClick({timeout: 5000});$('#gerar').click(function() { $('#formRelatorio').submit(); }); }); </script> 

            </div> 
        </div> 

        <?php
            include("rodape.php");
            $mysqli->Close();
        ?>
    </body>
</html>