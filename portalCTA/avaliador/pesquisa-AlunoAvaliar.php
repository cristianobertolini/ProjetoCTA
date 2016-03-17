<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 3;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("./navbar_avaliador.php");
?>

    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de alunos a serem avaliados</h2>
            <!--Formulário de busca-->
            <form id="busca-usuario" action="pesquisa-alunoAvaliar-busca.php" method="post">            
                <div class="row"> 
                    <div class="span2"> 
                        <label class="label" for="ano">Ano</label>
                        <br >
                        <input id="ano" name="ano" class="textfield width-100 integer" type="text" value=""/>  
                    </div> 
                    <div class="span3"> 
                        <span class="label">Período</span>
                        <br >
                        <select id="semestre" name="semestre" class="selectfield">
                            <option value="0" selected>0. Todos</option>
                            <option value="1">1. Semestre</option>
                            <option value="2">2. Semestre</option>
                        </select>
                    </div>
                </div>      

                <div class="form-actions bottom "> 
                    <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location='index.php'">
                        <i class="icon-ban-circle"></i> Cancelar</button>
                    <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                        <i class="icon-eraser"></i> Limpar</button>
                    <button class="btn primary saveBtn" id="salvar" name="save" type="submit">
                        <i class="icon-search"></i> Buscar</button>
                </div>
            </form>
            <!--fim do Formulário de busca-->
        </div>
    </div>

<?php
	include("../rodape.php");
?>