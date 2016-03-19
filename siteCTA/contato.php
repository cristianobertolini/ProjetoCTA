<!DOCTYPE html>
<html class="no-js" lang="en">
    <head>
        <title>Dallcon Sistemas | Investimento inteligente, resultado garantido!</title>
        
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                
        <link rel="stylesheet" href="css/foundation.css">
        <link rel="stylesheet" href="css/foundation.min.css">
        <link rel="stylesheet" href="css/csspersonalizado.css">
        <link rel="stylesheet" href="foundation-icons/foundation-icons.css">
        
        <script src="js/vendor/modernizr.js"></script>
        <script src="js/meujs.js"></script>
    </head>
    <body>
        <header>
            <div class="contain-to-grid sticky">
                <nav class="top-bar">
                    <ul class="title-area">
                        <li class="name">
                            <h1>
                                <a href="#"><img src="img/Logo.png" alt="logotipo"></a>
                            </h1>
                        </li>
                        <li class="toggle-topbar menu-icon">
                            <a href="#">
                                <span>Menu</span>
                            </a>
                        </li>
                    </ul>
                    <section class="top-bar-section">
                        <ul id="nav" class="right">
                            <li>
                                <a href="index.html">
                                    <i class="fi-home"></i> Início
                                </a>
                            </li>
                            <li>
                                <a href="empresa.html">
                                    <i class="fi-info"></i> Empresa
                                </a>
                            </li>
                            <li>
                                <a href="produtos.html">
                                    <i class="fi-shopping-cart"></i> Produtos
                                </a>
                            </li>                           
                            <li>
                                <a href="portfolio.html">
                                    <i class="fi-plus"></i> Portfólio
                                </a>
                            </li>
                            <li class="active">
                                <a href="contato.html">
                                    <i class="fi-mail"></i> Contato
                                </a>
                            </li>
                        </ul>
                    </section>
                </nav>
            </div>
        </header>
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
        <footer>
            <div class="copy">
                <div class="row">
                    <div class="large-12 columns">
                        <div class="large-4 pull-1 columns text-center">
                            <p>&copy; Copyright 2016 Dallcon Sistemas.</p>
                        </div>
                        <div class="large-4 columns text-center">
                            <a href="https://www.facebook.com/DallconSistemas"><i class="fi-social-facebook" style="font-size:22px;"></i></a>
                            &nbsp;
                            <a href="https://plus.google.com/+DallconsistemasBr/"><i class="fi-social-google-plus" style="font-size:22px;"></i></a>
                            &nbsp;
                            <a href="https://twitter.com/dallconsistemas"><i class="fi-social-twitter" style="font-size:22px;"></i></a>
                        </div>                       
                        <div class="large-4 push-1 columns text-center">
                            <p>Investimento inteligente, resultado garantido!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        
        <script src="js/vendor/jquery.js"></script>
        <script src="js/foundation.min.js"></script>
        <script>
            $(document).ready(function() {
                $(document).foundation();
            }
        </script>  
        <script>
            $(function() {
                $('a[href*=#]:not([href=#])').click(function() {
                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 1000);
                            return false;
                        }
                    }
                });
            });
        </script>        
    </body>
</html>
