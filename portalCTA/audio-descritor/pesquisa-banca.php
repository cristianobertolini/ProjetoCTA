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
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de Banca</h2>
            <!--Formulário de busca-->
             <form id="busca-banca" action="" method="post">            
                <div class="box shadowed bordered rounded">                   
                    <div class="row">
                        <div class="span3">
                            <span class="label">Matrícula do Aluno</span><br>
                            <input id="nome" name="nome" class="textfield width-100" type="text" maxlength="150">
                        </div>  
                        <div class="span3">
                            <span class="label">Data Inicial</span><br>
                            <input id="dataIni" name="dataIni" class="textfield width-100" type="date" maxlength="150">
                        </div>
                        <div class="span3">
                            <span class="label">Data Final</span><br>
                            <input id="dataFin" name="dataFin" class="textfield width-100" type="date" maxlength="150">
                        </div> 
                        
                        <div class="span3">
                            <span class="label">Situação</span><br>
                            <select class="textfield width-100" id="situacao" name="situacao">
                                <option value="0">Ativo</option>
                                <option value="1">Inativo</option>
                            </select>
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="span9">
                            <span class="label">Local</span><br>
                            <input id="nome" name="nome" class="textfield width-100" type="text" maxlength="150">
                        </div>

                        <div class="span3">
                            <span class="label">Tipo</span><br>
                            <select class="textfield width-100" id="situacao" name="situacao">
                                <option value="1">1. Proposta</option>
                                <option value="1">2. TGSI 1</option>
                                <option value="2">3. TGSI 2</option>
                            </select>
                        </div>
                    </div>                 
                </div>

                <div class="form-actions">
                    <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location='index.php'">
                        <i class="icon-ban-circle"></i> Cancelar</button>
                    <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                        <i class="icon-eraser"></i> Limpar</button>
                    <button class="btn primary saveBtn" id="salvar" name="save" type="submit">
                        <i class="icon-search"></i> Buscar</button>
                </div>
            </form>
            <!--fim do Formulário de busca-->
            
            <!--tabela-->
            <br>
            <div id="paginationWrapper"> 
                <table class="bordered rounded diced striped hovered shadowed narrow table"> 
                    <thead class="header"> 
                        <tr> 
                            <th WIDTH="100">Ano</th> 
                            <th WIDTH="200">Período</th> 
                            <th WIDTH="100">Data</th>
                            <th>Matrícula do Aluno</th>
                            <th>Aluno</th> 
                            <th>Local</th>
                            <th WIDTH="100">Tipo</th> 
                            <th WIDTH="100">Situação</th> 
                        </tr> 
                    </thead> 
                    
                    <tbody> 
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="100">2015</td> 
                            <td WIDTH="200">1. Semestre</td>
                            <td WIDTH="100">09/06/15</td>
                            <td>201520164</td>
                            <td>Aluno 1</td> 
                            <td>Prédio central, sala 01</td>
                            <td>Proposta</td> 
                            <td WIDTH="100">Ativo</td> 
                        </tr>
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="100">2015</td> 
                            <td WIDTH="200">2. Semestre</td>
                            <td WIDTH="100">09/11/15</td> 
                            <td>201520187</td>
                            <td>Aluno 2</td> 
                            <td>Prédio A, sala 02</td>
                            <td>TGSI 1</td> 
                            <td WIDTH="100">Ativo</td> 
                        </tr> 
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="100">2014</td> 
                            <td WIDTH="200">1. Semestre</td>
                            <td WIDTH="100">13/06/15</td> 
                            <td>201310164</td>
                            <td>Aluno 3</td> 
                            <td>Prédio B, sala 03</td>
                            <td>TGSI 2</td>
                            <td WIDTH="100">Ativo</td> 
                        </tr>                         
                    </tbody> 
                </table> 
            </div>
            
        </div>
    </div>

<?php
	include("../rodape.php");
?>