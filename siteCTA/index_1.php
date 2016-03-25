<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
        ?>
        <title>colabAD | Sistema Colaboratido de Áudiodescrição</title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>  

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
    </div>
    <?php
        include("rodape.php");
    ?>    
</body>
</html> 