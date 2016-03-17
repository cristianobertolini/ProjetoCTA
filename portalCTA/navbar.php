<?php include("include/config.php"); ?>
<nav class="band navbar ufsm gradient">    
    <div class="container">
        <div class="row-fluid">
            <div class="span6 align-center-phone-tablet">
                <ul class="nav"> 
                    <li>
                        <a class="uppercase humanist-font" href="<?php echo $URL_PADRAO; ?>">
                        <span class="bold">UFSM</span> | SISTEMA COLABORATIVO DE AUDIO DESCRIÇÃO</a>
                    </li> 
                </ul> 
            </div>
            <div class="span6 align-right align-center-phone-tablet">
                <ul class="nav align-right align-center-phone-tablet">
                    <li> 
                        <div class="btn-group align-left">    
                            <a class="dropdown-toggle" data-toggle="dropdown" href="<?php echo $URL_PADRAO; ?>"> 
                                <i class="icon-user"></i> <?php echo $_SESSION['UsuarioNome']; ?> <span class="caret"></span> 
                            </a>

                            <ul class="dropdown-menu" role="menu">  
                                <li role="menuitem">
                                    <a tabindex="-1" href="<?PHP echo $URL_PADRAO."/alterar-senha.php"; ?>">
                                    <i class="icon-pencil"></i> Alterar senha</a>
                                </li> 
                                
                                <?php
                                    if ($_SESSION['Categorias'] > 1) {
                                        echo "<li role='menuitem'>";
                                        echo "   <a tabindex='-1' href='$URL_PADRAO/escolher-visualizacao.php'>";
                                        echo "   <i class='icon-question-sign'></i> Alterar Visualização</a></li> <li role='menuitem' class='divider'>";
                                        echo "</li>";     
                                    }
                                ?>                                

                                <li role="menuitem">
                                    <a tabindex="-1" href="<?php echo $URL_PADRAO."/logout.php"; ?>">
                                    <i class="icon-signout"></i> Sair</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>    
    </div> 
</nav>
