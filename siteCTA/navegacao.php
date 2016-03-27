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
        <label><b>Nome</b></label>
        <input class="w3-input w3-border w3-margin-bottom" id="nome" name="nome" type="text" placeholder="Insira seu nome completo" required>
        
        <label><b>Login</b></label>
        <input class="w3-input w3-border" id="email" name="email" type="text" placeholder="Insira seu email" required>
        
         <label><b>Senha</b></label>
        <input class="w3-input w3-border w3-margin-bottom" id="senha" name="senha" type="password" placeholder="Insira sua senha" required>
        
        <label><b>Escolaridade</b></label>
        <input class="w3-input w3-border w3-margin-bottom" id="escolaridade" name="escolaridade" type="text" placeholder="Insira sua escolaridade" required>
         
         <label for="estado">Estado
                            <select id="estado" name="estado">
                                <option value="">Selecione</option>
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
         <label><b>Cidade</b></label>
        <input class="w3-input w3-border w3-margin-bottom"  id="endereco" name="endereco" type="text" placeholder="Insira o nome de sua cidade" required>
        </div>
        <label><b>Marque seu tipo de usuário</b> (Para ser aceito seu usuário será avaliado pelo administrador)</label>
        <input class="w3-check w3-margin-top" type="checkbox" > Usuario Normal
        <input class="w3-check w3-margin-top" type="checkbox" > Audiodescritor
        <input class="w3-check w3-margin-top" type="checkbox" > Revisor
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
    
      <div class="w3-section">
        <label><b>Email</b></label>
        <input class="w3-input w3-border w3-margin-bottom" type="text" placeholder="Insira seu email" required>

        <label><b>Senha</b></label>
        <input class="w3-input w3-border" type="password" placeholder="Insira sua senha" required>

       <button class="w3-btn w3-btn-block w3-green">Entrar</button>
      </div>
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