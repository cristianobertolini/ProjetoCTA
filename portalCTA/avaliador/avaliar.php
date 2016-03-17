<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 3;
    include("../restrito.php");
    include("./cabecalho.php");
    include("../navbar.php");
    include("./navbar_avaliador.php");
?>

    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Avaliação do TGSI</h2>
            
            <form id="insereUsuario" action="insere-usuario.php" method="post">
                <div class="row"> 
                    <div class="span2"> 
                        <label class="label" for="ano">Ano<span class="required"></span></label>
                        <br >
                        <input id="ano" name="ano" value="2016" class="textfield width-100 integer" type="text" value=""/>  
                    </div> 
                    <div class="span3"> 
                        <span class="label">Período<span class="required"></span></span>
                        <br >
                        <select id="periodo" name="periodo" class="textfield width-100"> 
                            <option value="101" selected>1. Semestre</option>
                            <option value="102">2. Semestre</option>
                        </select>
                    </div>
                    <div class="span4"> 
                        <label class="label" for="ano">Aluno</label>
                        <br >
                        <select id="aluno" name="aluno" class="textfield width-100" > 
                            <option value="0"> Julia da Silva Antunes Almeida</option>
                            <option value="1">Aluno 2</option>
                            <option value="2">Aluno 3</option>
                            <option value="3">Aluno 4</option>
                            <option value="4">Aluno 5</option>
                        </select> 
                    </div> 
                    <br>
                    <br>
                    <br>
                    <div class="form-actions bottom ">            
                                <button class="btn primary gerarBtn" id="gerar" name="gerar"  type="button" onclick="window.open('avalia-aluno.php','_parent')">
                                    <i class="icon-save"></i> Avaliar Aluno
                                </button>                               
                            </div>
                </div>               
                          
<?php include("../rodape.php"); ?>
