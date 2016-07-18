<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'CT';
        ?>    
            
        <title>colabAD | Formulário de contato </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Formulário de contato</h1>
        </div>
                  
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <form name="contato" action="#" method="POST">
                <label for="nome" class="w3-label">Nome *
                    <input type="text" id="nome" name="nome" placeholder="John Doe" required class="w3-input w3-border">
                </label>
                <label for="sexo" class="w3-label">Sexo <br></label> 
                    <input class="w3-radio" type="radio" name="sexo" id="sexo" value="Não Informar" checked>
                    <span class="w3-validate">Não Informar</span>                 
                    <input class="w3-radio" type="radio" name="sexo" value="masculino">
                    <span class="w3-validate">Masculino</span>
                    <input class="w3-radio" type="radio" name="sexo" value="feminino">
                    <span class="w3-validate">Feminino</span>

                <label for="email" class="w3-label">Email *
                    <input type="email" id="email" name="email" placeholder="johndoe@minhaempresa.com" required class="w3-input w3-border">
                </label>
                <label for="telefone" class="w3-label">Telefone
                    <input type="text" id="telefone" name="telefone" placeholder="(00)9999.9999" class="w3-input w3-border">
                </label>  
                <label for="cidade" class="w3-label">Cidade *
                    <input type="text" id="cidade" name="cidade" placeholder="Frederico Westphalen" required class="w3-input w3-border">
                </label>  
                <label for="estado" class="w3-label">Estado
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
                <label for="assunto" class="w3-label">Assunto
                    <input type="text" id="assunto" name="assunto" placeholder="Assunto da mensagem">
                </label>    
                <label for="mensagem" class="w3-label">Mensagem *
                    <textarea rows="4" id="mensagem" name="mensagem" placeholder="Sua mensagem" required></textarea>
                </label>
                <br>
                <div class="w3-row">
                    <input class="w3-input w3-green w3-half" type="submit" value="Enviar Mensagem" />
                    <input class="w3-input w3-blue-grey w3-half" type="reset" value="Limpar" />
                </div>                        
            </form>
        </div>    
        
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

