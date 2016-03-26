-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 26-Mar-2016 às 01:22
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

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
  PRIMARY KEY (`img_codigo`),
  KEY `cat_codigo` (`cat_codigo`),
  KEY `usu_codigo` (`usu_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `usu_codigo` int(100) NOT NULL AUTO_INCREMENT,
  `usu_login` varchar(150) DEFAULT NULL,
  `usu_senha` varchar(150) DEFAULT NULL,
  `usu_nome` varchar(150) DEFAULT NULL,
  `usu_email` varchar(150) DEFAULT NULL,
  `usu_escolaridade` varchar(150) DEFAULT NULL,
  `usu_endereco` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`usu_codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `imagens`
--
ALTER TABLE `imagens`
  ADD CONSTRAINT `imagens_ibfk_1` FOREIGN KEY (`cat_codigo`) REFERENCES `categoria` (`cat_codigo`),
  ADD CONSTRAINT `imagens_ibfk_2` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`usu_codigo`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
