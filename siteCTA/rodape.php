<!-- RODAPE -->
        <footer class="w3-container w3-center w3-blue w3-padding-medium">
            <a href="https://www.facebook.com"><i class="fi-social-facebook" style="font-size:22px;"></i></a>
            &nbsp;
            <a href="https://plus.google.com"><i class="fi-social-google-plus" style="font-size:22px;"></i></a>
            &nbsp;
            <a href="https://twitter.com"><i class="fi-social-twitter" style="font-size:22px;"></i></a>
            <p>&copy; Copyright 2016 Comunicação, tecnologia e acessibilidade UFSM.</p>
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