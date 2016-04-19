<footer class="w3-container w3-section w3-padding-jumbo w3-card-4 w3-light-grey w3-center w3-opacity">
  <br><nav><p>
  <a href="http://site.ufsm.br" target="_blank">UFSM</a> |
  <a href="./QSdescricao.php" target="_top">QUEM SOMOS</a>
  </p></nav>
  <p>
  SISTEMA COLABORATIVO DE ÁUDIO-DESCRIÇÃO<br>
  Copyright 2016 por CTA - Comunicação, tecnologia e acessibilidade UFSM.<br><br>
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
    document.getElementById("cat1").style.display = "none";
    document.getElementById("cat2").style.display = "none";
    document.getElementById("cat3").style.display = "none";
    document.getElementById(name).style.display = "block";
    w3-open();
}
</script>
     
<script src="http://www.w3schools.com/lib/w3codecolors.js"></script>