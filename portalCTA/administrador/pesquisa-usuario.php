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
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de Usuário</h2>
            <!--Formulário de busca-->
             <form id="busca-usuario" action="" method="post">            
                <div class="box shadowed bordered rounded">                   
                    <div class="row">
                        <div class="span4">
                            <span class="label">Login</span><br>
                            <input id="login" name="login" class="textfield width-100" type="text" maxlength="150">
                        </div>
                       
                        <div class="span4">
                            <span class="label">Matrícula</span><br>
                            <input id="matricula" name="matricula" class="textfield width-100" type="text" maxlength="150">
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
                            <span class="label">Nome</span><br>
                            <input id="nome" name="nome" class="textfield width-100" type="text" maxlength="150">
                        </div>

                        <div class="span4">
                            <span class="label">E-mail</span><br>
                            <input id="email" name="email" class="textfield width-100" type="email" maxlength="150">
                        </div>

                    </div>

                    <div class="row">
                        <div class="span12">                            
                            <span class="label">Categoria</span><br>
                            <input id="categoria1" name="categoria[]" type="checkbox" value="1" >
                            <label for="categoria1">Coordenador  </label>
                            <input id="categoria2" name="categoria[]" type="checkbox" value="2">
                            <label for="categoria2">Professor(Orientador)  </label>
                            <input id="categoria3" name="categoria[]" type="checkbox" value="3">
                            <label for="categoria3">Professor(Avaliador)  </label>
                            <input id="categoria4" name="categoria[]" type="checkbox" value="4">
                            <label for="categoria4">Aluno  </label></span>
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
                            <th WIDTH="150">Login</th> 
                            <th WIDTH="150">Matrícula</th> 
                            <th>Nome</th> 
                            <th>E-mail</th> 
                            <th>Categoria</th> 
                            <th WIDTH="100">Situação</th> 
                        </tr> 
                    </thead> 
                    
                    <tbody> 
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="150">201509013</td> 
                            <td WIDTH="150">201509013</td>
                            <td>Nome do Aluno</td> 
                            <td>aluno@ufsm.com.br</td> 
                            <td>Aluno</td> 
                            <td WIDTH="100">Ativo</td> 
                        </tr>
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="150">201509014</td> 
                            <td WIDTH="150">201509014</td>
                            <td>Nome do Aluno 2</td> 
                            <td>aluno2@ufsm.com.br</td> 
                            <td>Aluno</td> 
                            <td WIDTH="100">Ativo</td> 
                        </tr> 
                        <tr data-role="tableRow" data-id=""> 
                            <td WIDTH="150">201009013</td> 
                            <td WIDTH="150">201009013</td>
                            <td>Nome do Professor</td> 
                            <td>professor@ufsm.com.br</td> 
                            <td>Professor(Avaliador)</td> 
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