<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
        ?>
        <title>colabAD | Sistema Colaboratido de Áudiodescrição</title>           
    </head>    

    <body>

    <div class="w3-top">
        <div class="w3-row w3-white w3-padding">
            <div class="w3-half" style="margin:4px 0 6px 0"><a href='colabad.ufsm.com'><img src='./img/logotipoColabAD.png' alt='colabad.ufsm.com'></a></div>
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
  
  <div id="menuCategoria" class="myMenu">
  <div class="w3-container"><h3>CATEGORIAS</h3></div>
    <a href="/html/default.asp">Institucional</a>
    <a href="/css/default.asp">Pessoas</a>
    <a href="/w3css/default.asp">Bandeiras</a>
    <a href="/colors/default.asp">Lugares</a>
  </div>
 
  <div id="menuQuemSomos" class="myMenu" style="display:none"> 
  <div class="w3-container"><h3>QUEM SOMOS</h3></div>
    <a href="/html/default.asp">O ColabAD</a>
    <a href="/css/default.asp">Equipe</a>
  </div>  
  
  <div id="menuAjuda" class="myMenu" style="display:none">
  <div class="w3-container"><h3>AJUDA</h3></div>
    <a href="/html/default.asp">Dúvidas gerais</a>
  </div>
  
  <div id="menuContato" class="myMenu" style="display:none">
  <div class="w3-container"><h3>CONTATO</h3></div>
    <a href="/html/default.asp">Formulário de contato</a>
    <a href="/css/default.asp">Telefones</a>
    <a href="/w3css/default.asp">Localização</a>
  </div>  
</div>

<div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">

<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
  <h1 class="w3-jumbo">HTML</h1>
  <p class="w3-xlarge">The Language for Building Web Pages</p>
  <a href="/html/default.asp" class="w3-btn w3-hover-white">LEARN HTML</a>
  <a href="/tags/default.asp" class="w3-btn w3-hover-white">HTML REFERENCE</a>
  <p><div class="w3-code htmlHigh notranslate">
  <!DOCTYPE html><br>
  <html><br>
  <title>HTML Tutorial</title><br>
  <body><br><br>
  <h1>This is a heading</h1><br>
  <p>This is a paragraph.</p><br><br>
  </body><br>
  </html>
  </div>
  <a href="/html/tryit.asp?filename=tryhtml_default" target="_blank" class="w3-btn w3-hover-white">Try it Yourself</a>
</div>

<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
  <h1 class="w3-jumbo">CSS</h1>
  <p class="w3-xlarge">The Language for Styling Web Pages</p>
  <a class="w3-btn w3-hover-white" href="/css/default.asp">LEARN CSS</a>
  <a class="w3-btn w3-hover-white" href="/ccsref/default.asp">CSS REFERENCE</a>
  <p class="w3-large">
  <p><div class="w3-code cssHigh notranslate">
  body {<br>
      background-color: #d0e4fe;<br>}<br>h1 {<br>
      color: orange;<br>
      text-align: center;<br>}<br>p {<br>
      font-family: "Times New Roman";<br>
      font-size: 20px;<br>}
  </div>
  <a class="w3-btn w3-hover-white" href="/css/tryit.asp?filename=trycss_default" target="_blank">Try it Yourself</a>
</div>

<footer class="w3-container w3-section w3-padding-jumbo w3-card-4 w3-light-grey w3-center w3-opacity">
  <p>
    <a href="/about/about_copyright.asp">Copyright 2016</a> por CTA - Comunicação, tecnologia e acessibilidade UFSM.<br><br>
  </p>
</footer>

</div>

<script>
function w3_open() {
    document.getElementsByClassName("w3-sidenav")[0].style.width = "300px";
    document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
    document.getElementById("main").style.marginLeft = "300px";
}
function w3_close() {
    document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
    document.getElementById("main").style.marginLeft = 0;
}
function w3_show_nav(name) {
    document.getElementById("menuCategoria").style.display = "none";
    document.getElementById("menuQuemSomos").style.display = "none";
    document.getElementById("menuAjuda").style.display = "none";
    document.getElementById("menuContato").style.display = "none";    
    document.getElementById(name).style.display = "block";
    w3-open();
}
</script>
     
<script src="http://www.w3schools.com/lib/w3codecolors.js"></script>
</body>
</html> 