<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");
?>

  <!-- inicio codigo do cadastro (modal) -->
  <div id="id02" class="w3-modal">
  <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:900px" style="max-height:700px">
       <span onclick="document.getElementById('id02').style.display='none'" class="w3-closebtn w3-hover-red w3-container w3-padding-16 w3-display-topright">X</span>
  <div class="scroll">
  <div class="w3-container">
    <div class="w3-center"><br>
             <h1>Cadastro de Usuário</h1>
    </div>
      <form id="cadastro_usuario" action="cadastro_usuario.php" method="POST">         
      <div class="w3-section">
        <label class="w3-label"><strong>Nome</strong></label>
        <input class="w3-input w3-border w3-margin-bottom" id="nome" name="nome" type="text" placeholder="Insira seu nome completo" required>
        
        <label class="w3-label"><strong>Login</strong></label>
        <input class="w3-input w3-border" id="email" name="email" type="text" placeholder="Insira seu email" required>
        
         <label class="w3-label"><strong>Senha</strong></label>
        <input class="w3-input w3-border w3-margin-bottom" id="senha" name="senha" type="password" placeholder="Insira sua senha" required>
        
        <label class="w3-label" for="escolaridade"><strong>Escolaridade</strong>
            <select name="escolaridade" id="escolaridade" required>
                                <option value=""> --- selecione ---</option>
                                <option value="Primeiro Grau Incompleto">1&deg; Grau - Prim&aacute;rio Incompleto</option>
                                <option value="Primeiro Grau Completo">1&deg; Grau - Prim&aacute;rio Completo</option>
                                <option value="Ginasial Incompleto">1&deg; Grau - Ginasial Incompleto</option>
                                <option value="Ginasial Completo">1&deg; Grau - Ginasial Completo</option>
                                <option value="Segundo Grau Incompleto">2&deg; Grau - Colegial Incompleto</option>
                                <option value="Segundo Grau Completo">2&deg; Grau - Colegial Completo</option>
                                <option value="Terceiro Grau Incompleto">3&deg; Grau - Superior Incompleto</option>
                                <option value="Terceiro Grau Completo">3&deg; Grau - Superior Completo</option>
                                <option value="Especializa&ccedil;&atilde;o">Especializa&ccedil;&atilde;o</option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutorado">Doutorado</option>
                </select>  <br />
        </label>    
         
        <label class="w3-label" for="estado"><strong>Estado</strong>
                            <select  name="estado" id="estado"required>
                                <option value="">---Selecione---</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espirito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </select>
        </label> <br> 
         <label class="w3-label"><strong>Cidade</strong></label>
        <input class="w3-input w3-border w3-margin-bottom"  id="cidade" name="cidade" type="text" placeholder="Insira o nome de sua cidade" required>
        </div>
          <label class="w3-label"><strong>Conte-nos qual é o seu conhecimento sobre audiodescrição:</strong></label> 
          <textarea class="w3-input w3-border" name="descricao" id="descricao"required></textarea></br>
                <label class="w3-label"required><strong>Marque seu tipo de usuário</strong> (Para ser aceito seu usuário será avaliado pelo administrador)<br>
               
                    <input id="categoria" class="w3-check w3-margin-top" name='categoria[]' type="checkbox" value='1'><strong>Usuario Normal</strong> (O usuário tem permissão de fazer upload de imagens para audiodescriçao)<br>
                    <input id="categoria" class="w3-check w3-margin-top" name='categoria[]' type="checkbox" value='2'><strong>Audiodescritor</strong> (O usuário tem permissão de fazer audio descricao nas imagens)<br>
                    <input id="categoria" class="w3-check w3-margin-top" name='categoria[]' type="checkbox" value='3'><strong>Revisor</strong> (O usuário tem permissão de fazer revisões das imagens com audiodescrição)
                </label>
 
      </div>
      
    <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
      <button class="w3-btn w3-btn-block w3-green">Enviar</button>
      
    </div>
</form>
  </div>
      </div>
</div>
  <!--  fim codigo do login (modal) -->
  
     <!-- inicio codigo do login (modal) -->
<div id="id01" class="w3-modal">
  <div class="w3-modal-content w3-card-8 w3-animate-top" style="max-width:400px">
    <span onclick="document.getElementById('id01').style.display='none'" class="w3-closebtn w3-hover-red w3-container w3-padding-16 w3-display-topright">x</span>

    <div class="w3-container">
    <div class="w3-center"><br>
             <h1>Entrar</h1>
    </div>
        <form id="cadastro_usuario" action="login.php" method="POST">
      <div class="w3-section">
        <label><strong>Email</strong></label>
        <input class="w3-input w3-border w3-margin-bottom" id="email" name="email" type="text" placeholder="Insira seu email" required>

        <label><strong>Senha</strong></label>
        <input class="w3-input w3-border" id="senha" name="senha" type="password" placeholder="Insira sua senha" required>

       <button class="w3-btn w3-btn-block w3-green">Entrar</button>
      </div>
        </form>
    </div>

    <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
      
      <button onclick="document.getElementById('id01').style.display='none'" type="button" class="w3-btn w3-red">Cancel</button>
      <span class="w3-right w3-padding w3-hide-small"><a href="#">Esqueceu Senha 
              <br>
      <span class="w3-right w3-padding w3-hide-small"><a href="#">Cadastre-se      
    </div>
  </div>
</div>
 <!--  fim codigo do login (modal) -->

<div class="w3-top">
    <div class="w3-row w3-white w3-padding">
        <div class="w3-half" style="margin:4px 0 6px 0"><a href='<?php echo $URL_PADRAO; ?>'><img src='./img/logotipoColabAD.png' alt='colabad.ufsm.com'></a></div>
        <div class="w3-half w3-margin-top w3-wide w3-hide-medium w3-hide-small"><div class="w3-right">SISTEMA COLABORATIVO DE AUDIODESCRIÇÃO</div></div>
    </div>
    <ul class="w3-navbar w3-theme w3-large w3-card-4">
        <li><a class="w3-hover-black w3-padding-16 w3-opennav" href="javascript:void(0)" onclick="w3_open()">☰</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuCategoria')">CATEGORIAS</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuQuemSomos')">QUEM SOMOS</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuAjuda')">AJUDA</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuContato')">CONTATO</a></li>            
        <li class="w3-right"><a class="w3-btn w3-green w3-hover-black w3-large w3-padding-16" onclick="document.getElementById('id01').style.display='block'" href="#">Entrar</a></li>
        <li class="w3-right"><a class="w3-btn w3-blue-grey w3-hover-black w3-large w3-padding-16" onclick="document.getElementById('id02').style.display='block'" href="#">Cadastre-se</a></li>
    </ul>
</div>

<div class="w3-sidenav w3-card-4" style="width:300px">
    <a href="javascript:void(0)" onclick="w3_close()" class="w3-closenav w3-xxlarge">×</a>
  
    <div id="menuCategoria" class="myMenu" <?php if ($pagina != 'IN') {echo " style='display:none'";} ?>>
    <div class="w3-container"><h3>CATEGORIAS</h3></div>
    <?php
        //Carrega as categorias do banco de dados
        $sqlCat = "SELECT `cat_codigo`, `cat_nome` FROM `categoria` ORDER BY `cat_nome`"; 

        $queryCat = $mysqli->query($sqlCat);       

        $rowsCat = mysqli_num_rows($queryCat);       
        if ($rowsCat > 0) {
            //Mostra as categorias
            while ($registroCat = $queryCat->fetch_assoc()) {    
                echo '<a href="./categoria.php?id='.$registroCat['cat_codigo'].'">'.$registroCat['cat_nome'].' (';
                echo contaCategoria($registroCat['cat_codigo']);
                echo ')</a>';
            }   
        } else {
            echo "<a>Nenhuma categoria encontrada</a>";
        }    
    ?>
        <div class="w3-container"><h3>SUBMETER</h3></div>
        <a href="./upload_imagem.php">Submeter imagem</a>    
    </div>
 
    <div id="menuQuemSomos" class="myMenu"  <?php if ($pagina != 'QS') {echo " style='display:none'";} ?>> 
        <div class="w3-container"><h3>QUEM SOMOS</h3></div>
        <a href="./QSdescricao.php">O ColabAD</a>
        <a href="./QSequipe.php">Equipe</a>
    </div>  
  
    <div id="menuAjuda" class="myMenu"  <?php if ($pagina != 'AJ') {echo " style='display:none'";} ?>>
        <div class="w3-container"><h3>AJUDA</h3></div>
        <a href="./AJduvidas.php">Dúvidas gerais</a>
    </div>
  
    <div id="menuContato" class="myMenu"  <?php if ($pagina != 'CT') {echo " style='display:none'";} ?>>
        <div class="w3-container"><h3>CONTATO</h3></div>
        <a href="./CTcontato.php">Formulário de contato</a>
        <a href="./CTlocalizacao.php">Localização</a>
    </div>  
</div>