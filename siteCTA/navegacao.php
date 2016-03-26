<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");
?>
<div class="w3-top">
    <div class="w3-row w3-white w3-padding">
        <div class="w3-half" style="margin:4px 0 6px 0"><a href='<?php echo $URL_PADRAO; ?>'><img src='./img/logotipoColabAD.png' alt='colabad.ufsm.com'></a></div>
        <div class="w3-half w3-margin-top w3-wide w3-hide-medium w3-hide-small"><div class="w3-right">SISTEMA COLABORATIVO DE ÁUDIODESCRIÇÃO</div></div>
    </div>

    <ul class="w3-navbar w3-theme w3-large w3-card-4">
        <li><a class="w3-hover-black w3-padding-16 w3-opennav" href="javascript:void(0)" onclick="w3_open()">☰</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuCategoria')">CATEGORIAS</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuQuemSomos')">QUEM SOMOS</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuAjuda')">AJUDA</a></li>
        <li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav('menuContato')">CONTATO</a></li>            
        <li class="w3-right"><a class="w3-btn w3-green w3-hover-black w3-large w3-padding-16" href="#">Entrar</a></li>
        <li class="w3-right"><a class="w3-btn w3-blue-grey w3-hover-black w3-large w3-padding-16" href="#">Cadastre-se</a></li>
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
        <a href="./CTtelefone.php">Telefones</a>
        <a href="./CTlocalizacao.php">Localização</a>
    </div>  
</div>