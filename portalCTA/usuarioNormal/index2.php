<?php
    include("../restrito.php");
?>
<!DOCTYPE html>
<html>
    <head>
         <title> Gerenciador de TGSI | Aluno </title>
         
        <?php
            include("cabecalho.php");
        ?>
    </head>
    
    <style type="text/css">
        #iconBig {
            font-size: 90px;
        }
        #iconMed {
            font-size: 40px;
        }
    </style>

    <body>
        <div class="band shadowed no-print">
        <?php
            include("../navbar.php");
            include("navbar-aluno.php");
        ?>
        </div> 

        <!-- main --> 
        <div class="band align-center-phone">
            <div class="container"> 
                <div class="box success bordered tip shadowed rounded">
                    <div class="row">
                        <div class="span10">
                            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Proposta</h2>
                            <div class="row">
                                <div class="span6 padding-v">                            
                                    <p>
                                        Sua proposta foi aceita!<br>
                                        Agora você deve enviar o seu TGSI 1.
                                    </p>
                                </div>
                                <div class="span6 align-right padding-v align-center-phone"> 
                                    <button class="btn link" id="baixar" name="baixar"  type="button" onclick="">
                                        <i class="icon-download-alt"></i> Baixar Arquivo
                                    </button>   
                                </div>
                            </div>
                        </div>
                        <div class="span2 align-center padding-top">
                            <h1 id='iconBig' class="success"><i class="icon-ok-circle"></i></h1>
                        </div>
                    </div>
                </div>
                <p>
                <h1 id='iconMed' class="align-center"><i class="icon-arrow-down"></i></h1>
                </p>
                <div class="box warning bordered tip shadowed rounded">                    
                    <div class="row">
                        <div class="span10">
                            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 1</h2>
                            <div class="row">
                                <div class="span6 padding-v">                            
                                    <p>Aguardando envio!</p>
                                    <br>  
                                </div>
                                <div class="span6 padding-v align-right align-center-phone">
                                    <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="button" onclick="window.open('enviar-arquivo.php','_parent')">
                                        <i class="icon-upload-alt"></i> Enviar Arquivo
                                    </button> 
                                </div>
                            </div>
                        </div>
                        <div class="span2 align-center padding-top">
                            <h1 id='iconBig' class="warning"><i class="icon-upload"></i></h1>
                        </div>
                    </div>
                </div> 
                <p>
                <h1 id='iconMed' class="align-center"><i class="icon-arrow-down"></i></h1>
                </p>
                <div class="box info bordered tip shadowed rounded">
                    <div class="row">
                        <div class="span10">
                            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">TGSI 2</h2>
                            <div class="row">
                                <div class="span6 padding-v"> 
                                   <p>Aguardando liberação.</p>
                                </div>
                            </div>
                        </div>
                        <div class="span2 align-center padding-top">
                            <h1 id='iconBig' class="primary"><i class="icon-remove-circle"></i></h1>
                        </div>                        
                    </div>
                </div>  
            </div>
        </div>
        <ul class="vakata-context"></ul>
        <div id="jstree-marker" style="display: none;">&nbsp;</div>

        <?php
            include("../rodape.php");
        ?>
    </body>
</html>