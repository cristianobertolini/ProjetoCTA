-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 08-Dez-2015 às 23:22
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gerenciador`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `arquivo`
--

CREATE TABLE IF NOT EXISTS `arquivo` (
  `arq_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `usu_aluno` int(11) DEFAULT NULL,
  `tur_codigo` int(11) DEFAULT NULL,
  `arq_data` date DEFAULT NULL,
  `arq_hora` time DEFAULT NULL,
  `arq_obs` varchar(5000) DEFAULT NULL,
  `arq_nome` varchar(100) DEFAULT NULL,
  `arq_situacao` char(1) DEFAULT NULL,
  `arq_tipo` char(1) DEFAULT NULL COMMENT 'pro_tipo = 1, 2, 3...Situacao = 1, 2, 3',
  `arq_nome_original` varchar(100) NOT NULL,
  PRIMARY KEY (`arq_codigo`),
  KEY `usu_aluno` (`usu_aluno`),
  KEY `tur_codigo` (`tur_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `banca`
--

CREATE TABLE IF NOT EXISTS `banca` (
  `ban_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `ban_tipo` int(11) NOT NULL,
  `ban_data` date NOT NULL,
  `ban_descricao` varchar(150) NOT NULL,
  `ban_local` varchar(1000) NOT NULL,
  `usu_codigo` int(11) NOT NULL,
  `tur_codigo` int(11) NOT NULL,
  `ban_hora` time NOT NULL,
  PRIMARY KEY (`ban_codigo`),
  KEY `usu_codigo_2` (`usu_codigo`),
  KEY `tur_codigo` (`tur_codigo`),
  KEY `usu_codigo` (`usu_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `banca_detalhe`
--

CREATE TABLE IF NOT EXISTS `banca_detalhe` (
  `band_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `ban_codigo` int(11) NOT NULL,
  `usu_codigo` int(11) NOT NULL,
  PRIMARY KEY (`band_codigo`),
  KEY `ban_codigo` (`ban_codigo`),
  KEY `usu_codigo` (`usu_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `banca_detalhe_avaliacao`
--

CREATE TABLE IF NOT EXISTS `banca_detalhe_avaliacao` (
  `bav_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `bav_nota1` decimal(18,2) NOT NULL,
  `bav_nota2` decimal(18,2) NOT NULL,
  `bav_nota3` decimal(18,2) NOT NULL,
  `bav_nota4` decimal(18,2) NOT NULL,
  `bav_nota5` decimal(18,2) NOT NULL,
  `bav_nota6` decimal(18,2) NOT NULL,
  `bav_nota7` decimal(18,2) NOT NULL,
  `bav_nota_soma` decimal(18,2) NOT NULL,
  `bav_obs` varchar(5000) NOT NULL,
  `band_codigo` int(11) NOT NULL,
  PRIMARY KEY (`bav_codigo`),
  KEY `band_codigo` (`band_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `CAT_CODIGO` int(11) NOT NULL AUTO_INCREMENT,
  `CAT_DESCRICAO` varchar(150) NOT NULL,
  PRIMARY KEY (`CAT_CODIGO`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`CAT_CODIGO`, `CAT_DESCRICAO`) VALUES
(1, 'Coordenador'),
(2, 'Professor (Orientador)'),
(3, 'Professor (Avaliador)'),
(4, 'Aluno');

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE IF NOT EXISTS `turma` (
  `tur_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `tur_ano` year(4) DEFAULT NULL,
  `tur_semestre` tinyint(1) DEFAULT NULL,
  `tur_descricao` varchar(150) DEFAULT NULL,
  `tur_data_proposta` date DEFAULT NULL,
  PRIMARY KEY (`tur_codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma_detalhe`
--

CREATE TABLE IF NOT EXISTS `turma_detalhe` (
  `tud_codigo` int(11) NOT NULL AUTO_INCREMENT,
  `tur_codigo` int(11) NOT NULL,
  `usu_aluno` int(11) NOT NULL,
  `usu_orientador` int(11) NOT NULL,
  `usu_coorientador` int(11) NOT NULL,
  `tud_titulo` varchar(500) NOT NULL,
  PRIMARY KEY (`tud_codigo`),
  KEY `tur_codigo` (`tur_codigo`),
  KEY `usu_aluno` (`usu_aluno`),
  KEY `usu_coorientador` (`usu_coorientador`),
  KEY `usu_orientador` (`usu_orientador`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `USU_CODIGO` int(11) NOT NULL AUTO_INCREMENT,
  `USU_LOGIN` varchar(100) NOT NULL,
  `USU_SENHA` varchar(150) NOT NULL,
  `USU_NOME` varchar(150) NOT NULL,
  `USU_EMAIL` varchar(150) NOT NULL,
  `USU_MATRICULA` varchar(100) NOT NULL,
  `USU_SITUACAO` tinyint(1) NOT NULL,
  PRIMARY KEY (`USU_CODIGO`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=51 ;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`USU_CODIGO`, `USU_LOGIN`, `USU_SENHA`, `USU_NOME`, `USU_EMAIL`, `USU_MATRICULA`, `USU_SITUACAO`) VALUES
(1, 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997', 'Administrador', 'tallinydn@gmail.com', '201221347', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_categoria`
--

CREATE TABLE IF NOT EXISTS `usuario_categoria` (
  `USU_CODIGO` int(11) NOT NULL DEFAULT '0',
  `CAT_CODIGO` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`USU_CODIGO`,`CAT_CODIGO`),
  KEY `CAT_CODIGO` (`CAT_CODIGO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario_categoria`
--

INSERT INTO `usuario_categoria` (`USU_CODIGO`, `CAT_CODIGO`) VALUES
(1, 1);

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `arquivo`
--
ALTER TABLE `arquivo`
  ADD CONSTRAINT `arq_tur_codigo` FOREIGN KEY (`tur_codigo`) REFERENCES `turma` (`tur_codigo`),
  ADD CONSTRAINT `usu_aluno` FOREIGN KEY (`usu_aluno`) REFERENCES `usuario` (`USU_CODIGO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `banca`
--
ALTER TABLE `banca`
  ADD CONSTRAINT `ban_tur_codigo` FOREIGN KEY (`tur_codigo`) REFERENCES `turma` (`tur_codigo`),
  ADD CONSTRAINT `ban_usu_codigo` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`USU_CODIGO`);

--
-- Limitadores para a tabela `banca_detalhe`
--
ALTER TABLE `banca_detalhe`
  ADD CONSTRAINT `band_ban_codigo` FOREIGN KEY (`ban_codigo`) REFERENCES `banca` (`ban_codigo`),
  ADD CONSTRAINT `band_usu_codigo` FOREIGN KEY (`usu_codigo`) REFERENCES `usuario` (`USU_CODIGO`);

--
-- Limitadores para a tabela `banca_detalhe_avaliacao`
--
ALTER TABLE `banca_detalhe_avaliacao`
  ADD CONSTRAINT `bav_band_codigo` FOREIGN KEY (`band_codigo`) REFERENCES `banca_detalhe` (`band_codigo`);

--
-- Limitadores para a tabela `turma_detalhe`
--
ALTER TABLE `turma_detalhe`
  ADD CONSTRAINT `tud_tur_codigo` FOREIGN KEY (`tur_codigo`) REFERENCES `turma` (`tur_codigo`),
  ADD CONSTRAINT `tud_usu_aluno` FOREIGN KEY (`usu_aluno`) REFERENCES `usuario` (`USU_CODIGO`),
  ADD CONSTRAINT `tud_usu_coorientador` FOREIGN KEY (`usu_coorientador`) REFERENCES `usuario` (`USU_CODIGO`),
  ADD CONSTRAINT `tud_usu_orientador` FOREIGN KEY (`usu_orientador`) REFERENCES `usuario` (`USU_CODIGO`);

--
-- Limitadores para a tabela `usuario_categoria`
--
ALTER TABLE `usuario_categoria`
  ADD CONSTRAINT `usuario_categoria_ibfk_1` FOREIGN KEY (`USU_CODIGO`) REFERENCES `usuario` (`USU_CODIGO`),
  ADD CONSTRAINT `usuario_categoria_ibfk_2` FOREIGN KEY (`CAT_CODIGO`) REFERENCES `categoria` (`CAT_CODIGO`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
