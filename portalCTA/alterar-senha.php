<?php
    include("restrito.php");    
    include("include/conexao.php");
?>
<html>
    <head>
        <?php include("cabecalho.php"); ?>
         <title> Gerenciador de TGSI | Alterar Senha</title>
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
                <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Alterar Senha </h2>
                <script type="text/javascript">
                    var dwrAddHooks = false;
                </script>
                <div class="box info bordered tip shadowed">
                    <p>Preencha os campos abaixo para alterar sua senha.<br/>
                    </p>
                </div>
            <?php
                if(isset($_GET['mensagem'])){
                    echo "<div class='row'><div class='span8'><div class='box warning'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                    echo $_GET['mensagem'];
                    echo "</div></div></div>";
                }
            ?>                
                
                <form id="alteraSenhaCommand" class="margin-top" action="alteracao-senha.php" method="POST">
                    <div class="row">
                        <div class="span4">
                            <label class="label" for="atual">Senha atual<span class="required"></span>:</label>
                            <div class="input-append block width-100">
                                <div class="addon-wrapper">
                                    <button id="toggleAtual" type="button" class="btn" tabindex="-1"><i class="icon-eye-open"></i></button>
                                </div>
                                <div class="input-wrapper">
                                    <input id="atual" name="atual" class="textfield hintOnCaps" type="password"/>
                                </div>
                            </div>
                            <span id="capsAlert_atual" class="pill danger" style="display: none;">Atenção! O CAPS LOCK está ligado!</span>

                        </div>
                    </div>
                    <div class="row">
                        <div class="span4">
                            <label class="label" for="nova1">Nova senha<span class="required"></span>:</label>
                            <div class="input-append block width-100">
                                <div class="addon-wrapper">
                                    <button id="toggle1" type="button" class="btn" tabindex="-1"><i class="icon-eye-open"></i></button>
                                </div>
                                <div class="input-wrapper">
                                    <input id="nova1" name="nova1" class="textfield hintOnCaps" type="password"/>
                                </div>
                            </div>
                            <span id="capsAlert_nova1" class="pill danger" style="display: none;">Atenção! O CAPS LOCK está ligado!</span>

                        </div>
                    </div>
                    <div class="row">
                        <div class="span4">
                            <label class="label" for="nova2">Digite novamente<span class="required"></span>:</label>
                            <div class="input-append block width-100">
                                <div class="addon-wrapper">
                                    <button id="toggle2" type="button" class="btn" tabindex="-1"><i class="icon-eye-open"></i></button>
                                </div>
                                <div class="input-wrapper">
                                    <input id="nova2" name="nova2" class="textfield hintOnCaps" type="password"/>
                                </div>
                            </div>
                            <span id="capsAlert_nova2" class="pill danger" style="display: none;">Atenção! O CAPS LOCK está ligado!</span>

                        </div>
                    </div>
                    <div class="row">
                        <div class="span4">
                            <button id="alterar" type="submit" class="btn primary"><i class="icon-save"></i> Alterar</button>
                        </div>
                    </div>
                </form>
                <script type="text/javascript" src="js/passwordCheckerAjax.js"></script>
            
                <script type="text/javascript">
                    $(document).ready(function() {
                        /* global passwordCheckerAjax */
                        $('#alterar').lockOnClick();
                        $('#toggleAtual').passwordToggle({passwordField: '#atual'});
                        $('#toggle1').passwordToggle({passwordField: '#nova1'});
                        $('#toggle2').passwordToggle({passwordField: '#nova2'});
                        $('.hintOnCaps').capsAlert();
                        $('#nova1').passwordChecker({ajaxChecker: passwordCheckerAjax});
                    });
                </script>

            </div>
        </div>
        <?php
            include("rodape.php");
            $mysqli->Close();
        ?>
    </body>
</html>
