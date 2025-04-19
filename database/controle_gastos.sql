CREATE DATABASE contg;

\c contg;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    user_id INT,
    name VARCHAR(100) NOT NULL,
    total_value DECIMAL(10,2) DEFAULT 0,
    CONSTRAINT unique_category_user UNIQUE (user_id, name),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE expenses (
    expense_id SERIAL PRIMARY KEY,
    user_id INT,
    category_id INT DEFAULT NULL,
    name VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    CONSTRAINT fk_user_expense FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

CREATE TABLE awaiting_verification (
    verification_id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    verification_code VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '24 hours' NOT NULL
);

CREATE OR REPLACE FUNCTION update_total_value()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.category_id IS NOT NULL THEN
        UPDATE categories
        SET total_value = total_value + NEW.amount
        WHERE category_id = NEW.category_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_total_value
AFTER INSERT ON expenses
FOR EACH ROW
EXECUTE FUNCTION update_total_value();

