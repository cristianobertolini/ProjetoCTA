<?php    
    $servidor_mysql = "127.0.0.1";
    $login_mysql = "root";
    $senha_mysql = "";
    $base_mysql = "gerenciador";
 
    $conexao = mysqli_connect($servidor_mysql, $login_mysql, $senha_mysql,$base_mysql);

    $mysqli = new mysqli($servidor_mysql, $login_mysql, $senha_mysql,$base_mysql);
    if ($mysqli->connect_error) {
        die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
    } 
