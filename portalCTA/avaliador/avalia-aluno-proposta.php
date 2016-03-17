<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 3;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar_avaliador.php");
?>
<!-- main -->
 

 <div class="band">
        <div class="container">
          
        <form id="buscaUsuario" action="busca-usuario.php" method="post"> 
        <fieldset class="bordered rounded shadowed margin-bottom"> 
                <legend class="h3 primary text-shadowed no-margin-bottom">Dados do Aluno e TGSI</legend>
                   <div class="row">
                        <div class="span5">
                            <span class="label">Aluno</span><br>
                            <label for="nome_aluno">Julia da Silva Antunes Almeida</label>
                        </div>
                        
                        <div class="span2">
                            <span class="label">Tipo de Avaliação</span></span><br>
                            <label for="tipo_avaliacao">Proposta de TGSI</label>
                        </div>
                       
                        <div class="span2">
                            <span class="label">Data<span ></span></span><br>
                            <label for="data">15/03/2016</label>
                        </div>
                           <div class="span3">
                           <span class="label">Professor(Orientador)</span> <br>
                           <label for="data">Cristiano Bertolini</label>
                           </div>
                    </div>

                    <div class="row">
                        <div class="span9">
                            <span class="label">Título do TGSI</span> <br>
                            <label for="tipo_avaliacao">Problemas Enfrentados pelos Sistemas Especialistas Atuais <a class="btn link" href="#myUrl">Download do arquivo</a></label> 
                        </div>
                            
                        <div class="span3">
                            <span class="label">Local</span><br>
                            <label for="data">UFSM|FW - Laborátorio de Software</label>    
                        </div>
                    </div>
                    
            </fieldset>             
                <!-- tabela de Avaliacao -->
               
                    <table class="bordered rounded diced striped hovered shadowed narrow table">
                       <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Avaliação da proposta de TGSI</h2>
                        <thead class="header"> <tr>
                                <th> Critério</th> <th WIDTH="120">Peso</th> <th WIDTH="90">Nota atribuída</th> </tr> </thead>
                        <tbody>
                            <tr>
                                <td> Motivacao e/ou justificativa </td>
                                <td>1,0</td> 
                                <td>  <input class="textfield width-4em" type=number value="1" id="nota" name="nota">   </td>
                            </tr> 
                            
                            <tr>
                                <td >Redação adequada do artigo (ortografia, gramática)</td>
                            <td> 0,5</td> 
                            <td> <input class="textfield width-4em" type=number value="0.5" id="nota" name="nota" > </td>
                            </tr> 
                             <tr>
                                 
                                <td>Formatacão do artigo adequada (normas científicas)</td>         
                                <td>0,5</td> 
                                <td><input class="textfield width-4em" type=number value="0.3"id="nota" name="nota" ></td>
                            </tr>
                            <tr>
                                <td>Coerência na fundamentação, metodologia e desenvolvimento da produção com a temática estabelecida e objetivos propostos</td>
                                <td>4,0</td>    
                                <td><input class="textfield width-4em" type=number value="3.5" id="nota" name="nota" > </td>
                            </tr>
                            <tr>
                                <td>Resultados compatíveis com os previstos no cronograma estabelecido na proposta do TGSI</td>
                                <td>1,0 </td>     
                                <td><input class="textfield width-4em" type=number value="1"id="nota" name="nota" ></td>
                            </tr>
                            <tr>
                                <td>Cumprimento das atividades definidas na proposta do TGSI</td>
                                <td>1,0 </td>     
                                <td><input class="textfield width-4em" type=number value="1" id="nota" name="nota" ></td>
                            </tr>
                            <tr>
                                <td>Apresentação perante a banca</td>
                                <td>2,0 </td>     
                                <td><input class="textfield width-4em" type=number value="1.9" id="nota" name="nota" > </td>
                            </tr>
                            
                             <tr>
                                <td><strong>Nota Final</></td>
                                <td><strong>10</> </td>     
                                <td><span class="label"><strong> 9,2 </>  </span><br></td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <br>
                        <div class="span11,1"> <span class="label">Parecer Descritivo Opcional</span>  <br>
                            <div class=""><textarea id="justificativa" name="justificativa" class="textarea" rows="5"></textarea><ul class="list-h inner-separated pull-right"><li>Restam 1024 caracteres</li><li>Caracteres: 0</li><li>Palavras: 0</li></ul></div>
                             <span id="contadorParecer"></span>  
                        </div>
                    
                        <div class="row">
                            <div class="span4">
                            <span class="label">Grau Final Atribuído:</span> <label for="data">APROVADO</label>  
                            </div>
                        </div>
                  
                                            
                <div class="form-actions">
                    
                    <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location='index.php'">
                        <i class="icon-ban-circle"></i> Cancelar</button>
                    <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                        <i class="icon-eraser"></i> Limpar</button>
                    <button class="btn primary saveBtn" id="Salvar" name="save" type="submit">
                        <i class="icon-save"></i> Salvar</button>
                    <button class="btn right primary" id="Enviar" name="enviar" type="button">
                        <i class="icon-mail-forward"></i> Enviar</button>
                </div> 
                    
               </form>                               
        
    </div>
          
                                    
<?php include("../rodape.php"); 