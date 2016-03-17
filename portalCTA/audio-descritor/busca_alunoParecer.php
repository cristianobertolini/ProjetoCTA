<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 2;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar_orientador.php");
?>

 <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de alunos para parecer</h2>
            <!--Formulário de busca-->
             <form id="busca-aluno" action="" method="post">            
                <div class="row"> 
                    <div class="span2"> 
                        <label class="label" for="ano">Ano<span class="required"></span></label>
                        <br >
                        <input id="ano" name="ano" class="textfield width-100 integer" type="text" value=""/>  
                    </div> 
                    <div class="span3"> 
                        <span class="label">Período<span class="required"></span></span>
                        <br >
                        <select id="periodo" name="periodo" class="selectfield">
                            <option value="0" selected>0. Todos</option>
                            <option value="1">1. Semestre</option>
                            <option value="2">2. Semestre</option>
                        </select>
                    </div>
                    <div class="span2"> 
                        <label class="label" for="ano">Aluno</label>
                        <br >
                        <select id="aluno" name="aluno" class="selectfield"> 
                            <option value="0" selected>Todos</option>
                            <option value="1">Aluno 1</option>
                            <option value="2">Aluno 2</option>
                            <option value="3">Aluno 3</option>
                            <option value="4">Aluno 4</option>
                        </select> 
                    </div> 
                </div>      

                <div class="form-actions bottom "> 
                    <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location='index.php'">
                        <i class="icon-ban-circle"></i> Cancelar</button>
                    <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                        <i class="icon-eraser"></i> Limpar</button>
                    <button class="btn primary saveBtn" id="salvar" name="save" type="button" onclick="parent.location='parecer-preBanca.php'">
                        <i class="icon-search"></i> Buscar</button>
                </div>
            </form>
            <!--fim do Formulário de busca-->
                                    
<?php include("../rodape.php"); 