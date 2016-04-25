<?php
	header( 'Cache-Control: no-cache' );
	header( 'Content-type: application/xml; charset="utf-8"', true );

        include("include/conexao.php");

        $cod_estados = $_GET['est_codigo'];

        $cidades = array();

        $sqlCidade = "SELECT `cid_codigo`, `cid_nome`
                      FROM cidades
                      WHERE `est_codigo` = $cod_estados
                      ORDER BY `cid_nome`";

        $resCidade = $mysqli->query($sqlCidade);
        while ($registroCidade = $resCidade->fetch_assoc()) {
            $cidades[] = array(
                'cid_codigo' => $registroCidade['cid_codigo'],
                'cid_nome'   => (utf8_encode($registroCidade['cid_nome'])) 
            );
        }

        echo(json_encode($cidades));
?>