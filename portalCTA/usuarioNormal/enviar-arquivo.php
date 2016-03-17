<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 4;
    include("../restrito.php");    

    if (!isset($_POST['tipo'])) {
        header("Location: index.php");
        exit;
    } else {
        $tipo = $_POST['tipo'];
        
        switch ($tipo){
            case 1: $tipoNome = 'Proposta'; Break; 
            case 2: $tipoNome = 'TGSI1'; Break; 
            case 3: $tipoNome = 'TGSI2'; Break;
            case 4: $tipoNome = 'Proposta Inicial'; Break;
        }
    }
    
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar-aluno.php");     
?>

<script type="text/javascript">
function blocTexto(valor)
{
    quant = 1024;
    total = valor.length;
    if(total <= quant)
    {
        resto = quant - total;
        document.getElementById('cont').innerHTML = resto;
    }
    else
    {
        document.getElementById('texto').value = valor.substr(0,quant);
    }
}
</script>

<!-- main -->
<div class="band">
    <div class="container">
        
        <?php
            if(isset($_GET['mensagem'])){
                echo "<div class='row'><div class='span8'><div class='box ".$_GET['mensagem']."'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                echo $_GET['texto'];
                echo "</div></div></div>";
            }  
        ?>
        <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Envio de arquivo <?php echo $tipoNome; ?> para orientador</h2>
        <form id="formOcorrencia" action="arquivo-upload.php" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="tipo" value='<?php echo $tipo; ?>'>
            <div class="row"> 
                <div class="span12"> 
                    <span class="label">Observações</span><br>
                    <div class="">
                        <textarea onkeyup="blocTexto(this.value)" id="texto" name="texto" class="textarea" rows="5" maxlength="1024"></textarea>
                        <ul class="list-h inner-separated pull-right">
                            <li>Restam <span id="cont">1024</span> caracteres</li>
                        </ul>
                    </div>  
                </div>
            </div>
            <fieldset class="bordered rounded shadowed margin-bottom"> 
            <div class="row"> 
                <div>
                    É possível anexar documentos e enviar para seu orientador. <br> 
                    <strong>Tamanho arquivos:</strong> 2 Mb por arquivo. <br> 

                    <table id="tableAnexos" class="table bordered rounded shadowed striped stroked narrow">
                        <thead class="header"> 
                            <tr>                   
                                <th>
                                    <input type="file" name="arquivo" id="arquivo" class="padding-v"/>
                                </th> 
                            </tr> 
                        </thead>
                    </table>
                </div>
            </div>
            </fieldset> 
            <div class="form-actions bottom">
                <button id="cancel" type="button" class="btn left" onclick="parent.location='index.php'">
                    <i class="icon-ban-circle"></i> Cancelar
                </button>
                <button id="salvar" type="Submit" class="btn primary">
                    <i class="icon-save"></i> Enviar
                </button>
            </div>
        </form>
    </div>
</div>
<?php include("../rodape.php"); ?>  