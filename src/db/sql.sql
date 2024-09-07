CREATE TABLE roles (
    id SERIAL PRIMARY KEY,   
    name VARCHAR(255) NOT NULL UNIQUE  
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,   
    email VARCHAR(255) NOT NULL UNIQUE,   
    password VARCHAR(255) NOT NULL,  
    money INTEGER NOT NULL DEFAULT 5000 CHECK (money >= 0),   
    roleId INTEGER REFERENCES roles(id) 
);

CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,   
    description TEXT,   
    price INTEGER NOT NULL CHECK (price >= 0),   
    amount INTEGER NOT NULL CHECK (amount >= 0)   
);

CREATE TABLE ticketsToUsers (  
    userID INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,   
    ticketID INTEGER NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,  
    PRIMARY KEY (userID, ticketID)   
    )  