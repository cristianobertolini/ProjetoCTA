-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 12-Abr-2016 às 03:31
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `colabad`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `cat_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `cat_nome` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cat_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`cat_codigo`, `cat_nome`) VALUES
(1, 'Pessoas Publicas'),
(2, 'Bandeiras'),
(3, 'Lugares'),
(4, 'Institucionais'),
(5, 'Futebol'),
(6, 'Outros');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria_usuario`
--

CREATE TABLE IF NOT EXISTS `categoria_usuario` (
  `cat_usu_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `cat_usu_nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cat_usu_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `categoria_usuario`
--

INSERT INTO `categoria_usuario` (`cat_usu_codigo`, `cat_usu_nome`) VALUES
(1, 'usuario'),
(2, 'audiodescritor'),
(3, 'revisor');

-- --------------------------------------------------------

--
-- Estrutura da tabela `imagens`
--

CREATE TABLE IF NOT EXISTS `imagens` (
  `img_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `usu_codigo` int(11) NOT NULL,
  `img_data` date DEFAULT NULL,
  `img_hora` time DEFAULT NULL,
  `cat_codigo` int(11) DEFAULT NULL,
  `img_audiodescricao` text,
  `img_nome` varchar(50) DEFAULT NULL,
  `img_nome_original` varchar(150) DEFAULT NULL,
  `img_extensao` varchar(5) DEFAULT NULL,
  `img_situacao` int(11) NOT NULL,
  PRIMARY KEY (`img_codigo`),
  KEY `cat_codigo` (`cat_codigo`),
  KEY `usu_codigo` (`usu_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `imagens`
--

INSERT INTO `imagens` (`img_codigo`, `usu_codigo`, `img_data`, `img_hora`, `cat_codigo`, `img_audiodescricao`, `img_nome`, `img_nome_original`, `img_extensao`, `img_situacao`) VALUES
(2, 23, '2016-03-28', '11:19:00', 2, 'A bandeira do Brasil é formada por um retângulo verde, no qual está inserido bem no meio um grande um losango amarelo, cujo centro possui um círculo azul com vinte e sete estrelas brancas e uma faixa branca, que divide o círculo ao meio. Na faixa branca contém a frase: “Ordem e Progresso”. \r\nNota proêmia: Cada elemento da bandeira possui um significado, sendo o verde o símbolo da robustez das matas brasileiras; O amarelo representa as riquezas minerais do solo; A cor azul ilustra o céu; E o branco, a paz; Cada uma das 27 estrelas brancas representa um estado braspngileiro e o Distrito Federal;\r\n', 'Bandeira', 'Bandeira do Brasil.png', 'png', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `usu_codigo` int(100) NOT NULL AUTO_INCREMENT,
  `usu_nome` varchar(150) DEFAULT NULL,
  `usu_email` varchar(150) DEFAULT NULL,
  `usu_senha` varchar(150) DEFAULT NULL,
  `usu_escolaridade` int(11) DEFAULT NULL,
  `usu_estado` int(11) DEFAULT NULL,
  `usu_cidade` varchar(100) DEFAULT NULL,
  `usu_descricao` text NOT NULL,
  PRIMARY KEY (`usu_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`usu_codigo`, `usu_nome`, `usu_email`, `usu_senha`, `usu_escolaridade`, `usu_estado`, `usu_cidade`, `usu_descricao`) VALUES
(23, 'Juliana de Fatima da Silva', 'julianafatsil@hotmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 2, 3, 'Frederico Wetphalen', 'Pouco conhecimento em audio_descricao'),
(28, 'exemplo', 'julianafatsil@hotmail.com', 'ju', 2, 2, 'Frederico Westphalen', 'Pouco Conhecimento em audidescricao'),
(30, 'teste', 'julianafatsil@hotmail.com', '2e6f9b0d5885b6010f9167787445617f553a735f', 0, 0, 'Seberi', 'oioi');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_categoria_usuario`
--

CREATE TABLE IF NOT EXISTS `usuario_categoria_usuario` (
  `usu_codigo` int(11) NOT NULL,
  `cat_usu_codigo` int(11) NOT NULL,
  PRIMARY KEY (`usu_codigo`,`cat_usu_codigo`),
  KEY `cat_usu_codigo` (`cat_usu_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario_categoria_usuario`
--

INSERT INTO `usuario_categoria_usuario` (`usu_codigo`, `cat_usu_codigo`) VALUES
(23, 1);

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `imagens`
--
ALTER TABLE `imagens`
  ADD CONSTRAINT `imagens_ibfk_1` FOREIGN KEY (`cat_codigo`) REFERENCES `categoria` (`cat_codigo`),
  ADD CONSTRAINT `imagens_ibfk_2` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

--
-- Limitadores para a tabela `usuario_categoria_usuario`
--
ALTER TABLE `usuario_categoria_usuario`
  ADD CONSTRAINT `usuario_categoria_usuario_ibfk_1` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`),
  ADD CONSTRAINT `usuario_categoria_usuario_ibfk_2` FOREIGN KEY (`cat_usu_codigo`) REFERENCES `categoria_usuario` (`cat_usu_codigo`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
