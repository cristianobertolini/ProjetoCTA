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
        
<br><br><br>
        <section id="mapa"> 
            <div class="row">
                <div class="small-12 large-12 columns">
                    <h3>Onde Estamos</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2107.0287503994064!2d-53.39517242489381!3d-27.357413520142533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0xe37837c864ca172d!2sDallcon+Sistemas!5e0!3m2!1spt-BR!2sbr!4v1449426689723" width="100%" height="250" frameborder="0" style="border:0" allowfullscreen></iframe>
                </div>
            </div>
        </section>        
        <section id="paragrafo">    
            <div class="row">
                <div class="small-5 large-5 columns">
                    <div class="text-left">
                        <h3>Informações de Contato</h3>
                        <ol>
                            <li>
                                <strong><i class="fi-home"></i> Endereço:</strong>
                                <br>Rua do Comércio, n° 575 – sala 003
                                <br>Frederico Westphalen/RS
                                <br>CEP: 98400-000
                                <hr>
                            </li>
                            <li>
                                <strong><i class="fi-telephone"></i> Telefones:</strong>
                                <br>(55) 3744-1376
                                <br>(55) 3199-1376
                                <hr>
                            </li>
                            <li>
                                <strong><i class="fi-mail"></i> Email:</strong>
                                <br>contato@dallconsistemas.com.br
                                <hr>
                            </li>
                            <li>
                                <strong><i class="fi-heart"></i> Redes Sociais:</strong>
                                <br><a href="https://www.facebook.com/DallconSistemas"><i class="fi-social-facebook" style="font-size:22px;"></i></a>
                                &nbsp;
                                <a href="https://plus.google.com/+DallconsistemasBr/"><i class="fi-social-google-plus" style="font-size:22px;"></i></a>
                                &nbsp;
                                <a href="https://twitter.com/dallconsistemas"><i class="fi-social-twitter" style="font-size:22px;"></i></a>
                            </li>
                        </ol>
                    </div>
                </div>
                <div class="small-6 large-6 columns">
                    <h3>Fale Conosco</h3>
                    <form name="contato" action="#" method="POST" onSubmit="return validaForm();">
                        <label for="nome">Nome *
                            <input type="text" id="nome" name="nome" placeholder="John Doe">
                        </label>
                        <label for="sexo">Sexo <br>
                            <input type="radio" id="sexo" name="sexo" value="masculino" checked>Masculino
                            <input type="radio" id="sexo" name="sexo" value="feminino">Feminino
                        </label>  
                        <label for="idade">Idade
                            <input type="text" id="idade" name="idade" placeholder="25">
                        </label> 
                        <label for="email">Email *
                            <input type="email" id="email" name="email" placeholder="johndoe@minhaempresa.com">
                        </label>
                        <label for="telefone">Telefone
                            <input type="text" id="telefone" name="telefone" placeholder="Assunto da mensagem">
                        </label>  
                        <label for="cidade">Cidade *
                            <input type="text" id="cidade" name="cidade" placeholder="Frederico Westphalen">
                        </label>  
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
                        </label>  
                        <label for="assunto">Assunto
                            <input type="text" id="assunto" name="assunto" placeholder="Assunto da mensagem">
                        </label>    
                        <label for="mensagem">Mensagem *
                            <textarea rows="4" id="mensagem" name="mensagem" placeholder="Sua mensagem"></textarea>
                        </label>
                        <button id="reset" type="reset" class="warning radius button">
                            <i class="fi-x-circle"></i> Cancelar
                        </button>
                        <button id="enviar" type="submit" class="success radius button">
                            <i class="fi-mail"></i> Enviar Mensagem
                        </button>
                    </form>
                </div>
            </div>
        </section>        
        
        <?php
            include("rodape.php");
        ?>    
    </body>
</html> 

