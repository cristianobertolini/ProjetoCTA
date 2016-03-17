<?php
	/*Estou usando o servidor WAMPSERVER */
	error_reporting(0);
    $conexao = mysql_connect('127.0.0.1', 'root', '');
    if (!$conexao) {
        die('Nao foi possivel conectar devido ao erro a seguir: ' . mysql_error());
    }
    mysql_select_db('tgsi');
?>