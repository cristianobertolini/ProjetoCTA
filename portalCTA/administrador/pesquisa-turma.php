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
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de Turma</h2>
            <!--Formulário de busca-->
             <form id="busca-turma" action="" method="post">            
                <div class="box shadowed bordered rounded">                   
                    <div class="row">
                        <div class="span4">
                            <span class="label">Ano</span><br>
                            <input id="login" name="login" class="textfield width-100" type="text" maxlength="150">
                        </div>
                       
                        <div class="span4">
                            <span class="label">Período</span><br>
                            <select class="textfield width-100" id="periodo" name="periodo">
                                <option value="0">1. Semestre</option>
                                <option value="1">2. Semestre</option>
                              </select>
                        </div>
                        <div class="span4">
                            <span class="label">Situação</span><br>
                            <select class="textfield width-100" id="situacao" name="situacao">
                                <option value="0">Ativo</option>
                                <option value="1">Inativo</option>
                            </select>
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="span8">
                            <span class="label">Descrição</span><br>
                            <input id="nome" name="nome" class="textfield width-100" type="text" maxlength="150">
                        </div>

                        <div class="span2">
                            <span class="label">Data Inicial</span><br>
                            <input id="dataIni" name="dataIni" class="textfield width-100" type="date" maxlength="150">
                        </div>
                        <div class="span2">
                            <span class="label">Data Final</span><br>
                            <input id="dataFin" name="dataFin" class="textfield width-100" type="date" maxlength="150">
                        </div> 
                    </div>
                </div>
                 <div class="form-actions">
                    <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button"  onclick="parent.location='index.php'">
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
                            <th>Descrição</th>  
                            <th WIDTH="100">Situação</th> 
                        </tr> 
                    </thead> 
                    
                    <tbody> 
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="100">2015</td> 
                            <td WIDTH="200">1. Semestre</td>
                            <td WIDTH="100">09/06/15</td> 
                            <td>Turma do primeiro semestre de 2015</td> 
                            <td WIDTH="100">Ativo</td> 
                        </tr>
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="100">2015</td> 
                            <td WIDTH="200">2. Semestre</td>
                            <td WIDTH="100">09/11/15</td> 
                            <td>Turma do segundo semestre de 2015</td>
                            <td WIDTH="100">Ativo</td> 
                        </tr> 
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="100">2014</td> 
                            <td WIDTH="200">1. Semestre</td>
                            <td WIDTH="100">13/06/15</td> 
                            <td>Turma do primeiro semestre de 2014</td>
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