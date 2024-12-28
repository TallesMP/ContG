CREATE DATABASE controle_gastos;

\c controle_gastos

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    id_usuario INT,
    nome VARCHAR(100) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    CONSTRAINT unique_categoria_usuario UNIQUE (id_usuario, nome),  -- Garante que o nome da categoria é único por usuário
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE gasto (
    id_gasto SERIAL PRIMARY KEY,
    id_usuario INT,
    id_categoria INT DEFAULT NULL,  -- NULL será o mesmo que "Sem categoria"
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    CONSTRAINT fk_usuario_gasto FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE SET NULL
);

-- garantir que a soma das categorias não ultrapasse o valor total de um usuário (trigger provisorio para testes)
CREATE OR REPLACE FUNCTION check_categoria_total() 
RETURNS TRIGGER AS $$
DECLARE
    total_alocado DECIMAL(10, 2);
BEGIN
    -- Soma os valores das categorias do usuário (coleta a soma já alocada)
    SELECT COALESCE(SUM(valor), 0) INTO total_alocado
    FROM categoria
    WHERE id_usuario = NEW.id_usuario;
    -- Verifica se o valor total das categorias ultrapassa o valor disponível
    IF total_alocado + NEW.valor > (SELECT valor_total FROM usuario WHERE id_usuario = NEW.id_usuario) THEN
        RAISE EXCEPTION 'O valor total das categorias não pode ultrapassar o valor disponível. Valor disponível: %, Total alocado: %, Novo valor: %', 
                         (SELECT valor_total FROM usuario WHERE id_usuario = NEW.id_usuario), total_alocado, NEW.valor;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_categoria_insert
BEFORE INSERT ON categoria
FOR EACH ROW
EXECUTE FUNCTION check_categoria_total();
