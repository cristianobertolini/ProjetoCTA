<!DOCTYPE html>
<html class="no-js" lang="en">
     
    <head>
        <?php
            include("cabecalho.php");
        ?>
            <title>CTA | Sistema Colaborativo de Audio Descrição</title>           
    </head>
    
    <body>
        
        <header>
            <!-- MENU -->
            <div class="w3-row">
              <div class="w3-col m8">
                <div class="w3-light-grey w3-container w3-padding-48 w3-center">
                  <a href="#"><img src="img/Logo.png" alt="logotipo"></a>
                  <p>Comunicação, tecnologia e acessibilidade UFSM</p>
                  <h2>Sistema Colaborativo de Audio Descrição</h2>
                </div>
              </div>
              <div class="w3-col m4">
                <div class="w3-light-grey w3-container w3-padding-64 w3-center">
                    <div class="w3-row w3-margin-bottom">
                    <button type="button" class="w3-btn w3-round w3-orange w3-hover-blue w3-large">Entrar</button>
                    </div>
                    <div class="w3-row w3-margin-bottom">
                    <button type="button" class="w3-btn w3-round w3-pink w3-hover-blue w3-large">Cadastre-se</button>
                    </div>
                </div>
              </div>
            </div>  
            <div class="w3-topnav w3-large w3-orange w3-center">
                <a href="index.php">INÍCIO</a>
                <a href="quemsomos.php">QUEM SOMOS</a>
                <a href="ajuda.php">AJUDA</a>
                <a href="contato.php">CONTATO</a>
            </div>            

        <!-- CORPO -->   
        <section id="categorias">    
            <div class="w3-row w3-center w3-padding-16">
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 1</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 2</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 3</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 4</button> 
                </div>
            </div>
            
            <div class="w3-row  w3-center w3-padding-16">
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 5</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 6</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 7</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 8</button> 
                </div>
            </div>            
            
            <div class="w3-row  w3-center w3-padding-32">
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 9</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 10</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 11</button> 
                </div>
                <div class="w3-container w3-quarter">
                    <button class="w3-btn w3-round w3-xxlarge">Categoria 12</button> 
                </div>
            </div>  
          
            <div class="w3-center">
            <ul class="w3-pagination w3-xlarge">
                  <li><a href="#" class="w3-hover-blue">&laquo;</a></li>
                  <li><a href="#" class="w3-hover-pink">1</a></li>
                  <li><a href="#" class="w3-hover-pink">2</a></li>
                  <li><a href="#" class="w3-hover-pink">3</a></li>
                  <li><a href="#" class="w3-hover-pink">4</a></li>
                  <li><a href="#" class="w3-hover-blue">&raquo;</a></li>
            </ul>
            </div>
        </section>
        </header>
        
        <!-- RODAPE -->
            <?php 
                include("rodape.php"); 
            ?>       
    </body>
</html>
