<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 1;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar-coordenador.php");
    include("../include/funcoes.php");
      
?>
    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Cadastro de Turma</h2>
                <!--Inicio Caixa de busca-->
                
                <form id="buscaTurma" action="turma-seg.php" method="post"> <!--busca turma-->
              
                    <div class="row">
                        <div class="span4">
                            <span class="label">Ano<span class="required"></span></span><br>
                            <input id="ano" name="ano" class="textfield width-100" type="number" maxlength="150" required>
                        </div>
                        <div class="span4">
                            <span class="label">Período<span class="required"></span></span><br>
                            <select class="selectfield" id="semestre" name="semestre" required>
                                <option value="1">1. Semestre</option>
                                <option value="2">2. Semestre</option>
                              </select>
                        </div>
                         <div class="span2">
                        <label class="label" for=""></label><br >
                        <button id="buscaTurma" type="submit" class="btn primary small">
                            <i class="icon-edit"></i> Cadastrar
                        </button> 
                    </div>
                    </div>
                                                
            </form>
                <br>
                <!--FIM Caixa de busca-->
            <br>  
            
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