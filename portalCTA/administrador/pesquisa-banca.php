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
            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Pesquisa de Banca</h2>
            
              <form id="buscaDado" action="pesquisa-banca-ver.php" method="post">
               <div class="row"> 
                    <div class="span2"> 
                        <label class="label" for="ano">Ano<span class="required"></span></label>
                        <br>
                        <input id="ano" name="ano" class="textfield width-100 integer" type="number" value="" required=""/>  
                    </div> 
                    <div class="span2"> 
                        <span class="label">Período<span class="required"></span></span>
                        <br>
                        <select id="periodo" name="semestre" class="textfield width-100"> 
                            <option value='1'>1. Semestre</option>
                            <option value='2'>2. Semestre</option>                                      
                        </select>
                    </div>
                    <div class="span2"> 
                        <label class="label" for="aluno" requerid>Aluno</label>
                            <select class="textfield width-100" id="aluno" name="aluno" required>
                            <option value="Todos"></option>  
                           <?php
                               
                                $sqlAluno = "SELECT distinct u.`USU_CODIGO`, u.`USU_NOME`
                                             FROM `usuario` u
                                             INNER JOIN `usuario_categoria` uc
                                                     ON uc.`usu_codigo` = u.`USU_CODIGO`
                                                    AND uc.`cat_codigo` = 4
                                             WHERE u.`USU_SITUACAO` = 0
                                               AND u.`USU_CODIGO` in (SELECT td.`usu_aluno` FROM `turma_detalhe` as td)";
                                                              
                                /*retorna a quantidade registros encontrados na consulta acima */
                                $queryAluno = $mysqli->query($sqlAluno);
                                /*se quantidade de linhas maior que zero*/
                                if(mysqli_num_rows($queryAluno) > 0){
                                    while ($Aluno = $queryAluno->fetch_assoc()) {
                                        if ($Alu == $Aluno['USU_CODIGO']) {
                                            echo '<option selected="selected" value="'.$Aluno['USU_CODIGO'].'">'.$Aluno['USU_NOME'].'</option>';
                                        } else {
                                            echo '<option value="'.$Aluno['USU_CODIGO'].'">'.$Aluno['USU_NOME'].'</option>';
                                        }
                                    }    
                                }
                            ?>
                        </select> 
                    </div> 
                </div>
                  
                    <div class="form-actions bottom ">            
                          <button id="buscaDados" type="submit" class="btn primary small">
                            <i class="icon-search"></i> Buscar
                    </div>
                  <form/>
                  
                <br>
        </div> 
        
        
        
        
        
    </div>

    
<?php include("../rodape.php"); ?>
