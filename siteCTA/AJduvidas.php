<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'AJ';
        ?>    
            
        <title>colabAD | Dúvidas gerais </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
        <style type="text/css">
        ul.square {
	list-style-type: square;
	}
    </style>
    
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Dúvidas gerais</h1>
       
        
        <h2>Como cada usuário contribui para o Sistema ColabAD:</h2>
        <ul class="none"
            <p style="text-align: justify;">
          
                <li> <strong>Usuário comum </strong>: gera demanda de imagens, ao cadastrar-se automaticamente
                    é aceito como usuário normal, podendo gerar demandas de imagens para áudio-descrição.</li>
                </br>
                 <li> <strong>Áudio-descritor</strong>: Pode ser usuário normal, mas para fazer áudio-descrição
                     nas imagens é preciso aceitação do Administrador do sistema que irá avaliar, seu conhecimento
                     em áudio-descrição.</li>
                 </br>
                 <li> <strong>Revisor</strong>: Pode ser usuário normal, a forma de cadastro funciona como para o 
                     áudio-descritor, contribui fazendo revisões nas imagens áudio-descritas, podendo inclusive
                     enviar novamente para o áudio-descritor com observações.</li>
                 </br> 
            </p>
        </ul>
        
        <h2>Usuários com todas as permissões para teste:</h2>
       </div>
    </div>
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

