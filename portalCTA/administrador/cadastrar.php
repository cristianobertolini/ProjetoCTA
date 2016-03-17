<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 1;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar-coordenador.php");
?>

    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Cadastro de Usuário</h2>

            <!-- inicio do formulario -->
            <form id="cadastrar-seg" action="cadastrar-seg.php" method="POST">            
                <div class="row">
                    <div class="span4">
                        <span class="label">Matrícula<span class="required"></span></span><br>
                        <input id="matricula" name="matricula" class="textfield width-0" type="text" maxlength="150" required>
                     
                    </div>
                    <div class="span2">
                        <label class="label" for=""></label><br>
                        <button id="buscaCadastro" type="submit" class="btn primary small">
                            <i class="icon-edit"></i> Cadastrar
                        </button>                        
                    </div>
                </div>
            </form>
            <!-- fim do formulario -->                             
           
            <?php //função recebe mensagem
                if(isset($_GET['mensagem'])){
                    echo "<div class='row'><div class='span8'><div class='box ";
                    echo $_GET['mensagem'];
                    echo "'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                    echo $_GET['texto'];
                    echo "</div></div></div>";
                }
            ?>           
                      
        </div>
    </div>

<?php
	include("../rodape.php");
?>