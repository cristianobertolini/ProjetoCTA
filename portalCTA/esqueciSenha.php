<!DOCTYPE html>
<html lang="pt-br">
    <head>
            <?php
                include("cabecalho.php");
            ?>
            <title>Gerenciador de TGSI | Esqueci minha Senha</title>               
    </head> 

    <body>
        <!-- barra de navegação especial -->            
        <?php include("include/config.php"); ?>
        <nav class="band navbar ufsm gradient">    
            <div class="container"> 
                <ul class="nav"> 
                    <li>
                        <a class="uppercase humanist-font" href="<?php echo $URL_PADRAO; ?>">
                        <span class="bold">UFSM</span> | Gerenciador de TGSI</a>
                    </li> 
                </ul> 

                <ul class="nav pull-right">
                    <li> 
                        <div class="btn-group">    
                        <a class="dropdown-toggle" data-toggle="dropdown" href="<?php echo $URL_PADRAO; ?>"> 
                            <i class="icon-user"></i> Anônimo <span class="caret"></span> 
                        </a>

                        <ul class="dropdown-menu" role="menu">  
                            <li role="menuitem">
                                <a tabindex="-1" href="index.php">
                                <i class="icon-signin"></i> Login</a>
                            </li>
                        </ul>
                        </div>
                    </li>
                </ul>
            </div> 
        </nav>
        <!-- main -->
        <div class="band expansible">
            <div class="container">
                <div id="instrucoes" class="box warning bordered tip shadowed">
                    <p>Caso você tenha esquecido a sua senha, preencha os campos abaixo da seguinte forma:</p>
                    <ul class="no-bullets">
                        <li><strong>Alunos:</strong> informar a matrícula do curso atual no campo 'Login';</li>
                        <li><strong>Docentes:</strong> informar a matrícula SIAPE no campo 'Login';</li>
                        <li><strong>Demais usuários:</strong> informar o login normalmente utilizado nos sistemas;</li>
                    </ul>
                    <p>Após, o sistema enviará UMA NOVA senha para o e-mail cadastrado no gerenciador.</p>
                </div>
                <br>
                <form id="esqueciSenhaCommand" action="include/recuperar.php" method="post">
                    <div class="row">
                        <div class="span4">
                            <label for="usuario" class="label">Login<span class="required"></span>:</label>
                            <input id="usuario" name="usuario" class="textfield block width-100" type="text" value=""/>
                            
                        </div>
                        <div class="span4">
                            <label for="email" class="label">E-mail<span class="required"></span>:</label>
                            <input id="email" name="email" class="textfield block width-100" type="email" value=""/>
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="span4">
                            <button id="solicitar" type="submit" class="btn primary"><i class="icon-envelope"></i> Solicitar senha</button>
                        </div>
                    </div>
                </form>
                
                <script type="text/javascript">
                    $(document).ready(function() {
                        /* global passwordCheckerAjax */
                        $('#solicitar').lockOnClick();
                    });
                </script>                

                <?php
                    if(isset($_GET['mensagem1'])){
                        echo "<br><div class='row'><div class='span9'><div class='box success'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                        echo $_GET['mensagem1'];
                        echo "</div></div></div>";
                    } else if(isset($_GET['mensagem2'])){
                        echo "<br><div class='row'><div class='span8'><div class='box error'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                        echo $_GET['mensagem2'];
                        echo "</div></div></div>";
                    }
                ?>                   
               
            </div>
            <?php include("rodape.php"); ?> 
        </div>
    </body>
</html>