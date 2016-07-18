<?php 
    
    include("include/config.php"); 
    include("include/conexao.php");
    include("include/funcoes.php");
    
    if (!isset($_SESSION)){ session_start();}
    
    if (isset($_SESSION['Categorias'])){
        $categoriaSessao = $_SESSION['Categorias'];
    } else {
        $categoriaSessao = 0;
    }
?>
<header>
    <div class="w3-top">
        <p class="skip"><a href="#main" tabindex="1">Pular navegação e ir direto para o conteúdo</a></p>
        <div class="w3-row w3-white w3-padding">
            <div class="w3-half" style="margin:4px 0 6px 0"><a href='<?php echo $URL_PADRAO; ?>'><img src='./img/logotipoColabAD.png' alt='Imagem com link para o site do colabAD'></a></div>
            <div class="w3-half w3-margin-top w3-wide w3-hide-medium w3-hide-small"><div class="w3-right">SISTEMA COLABORATIVO DE ÁUDIO-DESCRIÇÃO</div></div>
        </div>
        <ul class="w3-navbar w3-theme w3-large w3-card-4">
            <!--<li><a class="w3-hover-black w3-padding-16 w3-opennav" href="javascript:void(0)" onclick="w3_open()">☰</a></li>-->
            <li><a class="w3-hover-black w3-padding-16" href="index.php" onclick="w3_show_nav('menuCategoria')">CATEGORIAS</a></li>
            <li><a class="w3-hover-black w3-padding-16" href="QSdescricao.php" onclick="w3_show_nav('menuQuemSomos')">QUEM SOMOS</a></li>
            <li><a class="w3-hover-black w3-padding-16" href="AJduvidas.php" onclick="w3_show_nav('menuAjuda')">AJUDA</a></li>
            <li><a class="w3-hover-black w3-padding-16" href="CTcontato.php" onclick="w3_show_nav('menuContato')">CONTATO</a></li> 

            <?php
                if (empty($categoriaSessao)) {
                    echo '<li class="w3-right"><a class="w3-btn w3-green w3-hover-black w3-large w3-padding-16" href="./entrar.php">Entrar</a></li>';
                    echo '<li class="w3-right"><a class="w3-btn w3-blue-grey w3-hover-black w3-large w3-padding-16" href="./usuario_cadastrar.php">Cadastre-se</a></li>';                
                } else {
                    for($i = 0; $i < count($categoriaSessao); $i++){
                      echo '<li><a class="w3-hover-black w3-padding-16" href="javascript:void(0)" onclick="w3_show_nav(\'cat'.$categoriaSessao[$i].'\')">'.utf8_encode(strtoupper(nomeCatUsu($categoriaSessao[$i]))).'</a></li>';
                    }                 
                    echo '<li class="w3-right"><a class="w3-btn w3-green w3-hover-black w3-large w3-padding-16" href="./logout.php">SAIR</a></li>';
                }
            ?> 
        </ul>
    </div>
</header>

<nav>
    <div class="w3-sidenav w3-card-4" style="width:300px">
        <br>
        <!--<a href="javascript:void(0)" onclick="w3_close()" class="w3-closenav w3-xxlarge">×</a>-->

        <div id="menuCategoria" class="myMenu" <?php if ($pagina != 'IN') {echo " style='display:none'";} ?>>
        <div class="w3-container"><span class="w3-large">CATEGORIAS</span></div>
        <?php
            //Carrega as categorias do banco de dados
            $sqlCat = "SELECT `cat_codigo`, `cat_nome` FROM `categoria` ORDER BY `cat_nome`"; 

            $queryCat = $mysqli->query($sqlCat);       

            $rowsCat = mysqli_num_rows($queryCat);       
            if ($rowsCat > 0) {
                //Mostra as categorias
                while ($registroCat = $queryCat->fetch_assoc()) {    
                    echo '<a href="./categoria.php?id='.$registroCat['cat_codigo'].'">'.(utf8_encode($registroCat['cat_nome'])).' <span class="w3-badge w3-green">';
                    echo contaCategoria($registroCat['cat_codigo']);
                    echo '</span></a>';
                }   
            } else {
                echo "<a>Nenhuma categoria encontrada</a>";
            }    
        ?>   
        </div>

        <div id="menuQuemSomos" class="myMenu"  <?php if ($pagina != 'QS') {echo " style='display:none'";} ?>> 
            <div class="w3-container"><span class="w3-large">QUEM SOMOS</span></div>
            <a href="./QSdescricao.php">O ColabAD</a>
            <a href="./qsequipe.php">Equipe</a>
        </div>  

        <div id="menuAjuda" class="myMenu"  <?php if ($pagina != 'AJ') {echo " style='display:none'";} ?>>
            <div class="w3-container"><span class="w3-large">AJUDA</span></div>
            <a href="./AJduvidas.php">Dúvidas gerais</a>
        </div>

        <div id="menuContato" class="myMenu"  <?php if ($pagina != 'CT') {echo " style='display:none'";} ?>>
            <div class="w3-container"><span class="w3-large">CONTATO</span></div>
            <a href="./CTcontato.php">Formulário de contato</a>
            <a href="./CTlocalizacao.php">Localização</a>
        </div>  

        <div id="cat1" class="myMenu"  <?php if ($pagina != 'US') {echo " style='display:none'";} ?>>
            <div class="w3-container"><span class="w3-large">USUÁRIO</span></div>
            <a href="./upload_imagem.php">Submeter imagem</a>
            <a href="./usuario_editar.php">Editar perfil</a>
        </div>  

        <div id="cat2" class="myMenu"  <?php if ($pagina != 'AU') {echo " style='display:none'";} ?>>
            <div class="w3-container"><span class="w3-large">ÁUDIO-DESCRITOR</span></div>
            <a href="audio_descrever.php">Descrever</a>
        </div> 

        <div id="cat3" class="myMenu"  <?php if ($pagina != 'RE') {echo " style='display:none'";} ?>>
            <div class="w3-container"><span class="w3-large">REVISOR</span></div>
            <a href="./revisar.php">Revisar imagens</a>
            <a href="./categoria_nova.php">Categoria - Adicionar</a>
            <a href="./categoria_altera.php">Categoria - Listar</a>  
        </div>      

    </div>
</nav>
<main>