-- Criação do banco de dados
CREATE DATABASE controle_gastos;

-- Conectar ao banco de dados
\c controle_gastos;

-- Tabela de usuários
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    senha_salt VARCHAR(255) NOT NULL 
);

-- Tabela de categorias
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    id_usuario INT,
    nome VARCHAR(100) NOT NULL,
    CONSTRAINT unique_categoria_usuario UNIQUE (id_usuario, nome),  -- Garante que o nome da categoria é único por usuário
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

-- Tabela de gastos
CREATE TABLE gasto (
    id_gasto SERIAL PRIMARY KEY,
    id_usuario INT,
    id_categoria INT DEFAULT NULL,  -- NULL será o mesmo que "Sem categoria"
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL, 
    CONSTRAINT fk_usuario_gasto FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE SET NULL
);

