DROP TABLE IF EXISTS game;
DROP TABLE IF EXISTS shop;

CREATE TABLE shop(
    id serial PRIMARY KEY,
    name varchar,
    city varchar
);

CREATE TABLE game(
    id serial PRIMARY KEY,
    name varchar(255),
    developer varchar(255),
    gameShop_id int,
    FOREIGN KEY (gameShop_id) REFERENCES shop(id)
);
-- ALTER SEQUENCE game_id_seq RESTART WITH 1;

-- Sample data for the "shop" table
INSERT INTO shop (name, city) VALUES
  ('Game World', 'New York'),
  ('Gamer Haven', 'Los Angeles'),
  ('PlayZone', 'Chicago'),
  ('Digital Arcade', 'San Francisco'),
  ('Console Corner', 'Seattle'),
  ('Pixel Paradise', 'Miami'),
  ('Virtual Vault', 'Austin'),
  ('Joystick Junction', 'Denver'),
  ('Tech Toyland', 'Boston'),
  ('Byte Bazaar', 'Dallas');

-- Sample data for the "game" table
INSERT INTO game (name, developer, gameShop_id) VALUES
  ('Super Adventure', 'GameCo', 1),
  ('Galactic Quest', 'Space Games Ltd', 2),
  ('Epic Battle', 'Gamer Studios', 3),
  ('Virtual Reality Racer', 'Tech Innovations', 4),
  ('Console Wars', 'Gaming Systems Inc', 5),
  ('Pixel Quest', 'Digital Fun', 6),
  ('Cyber Challenge', 'Future Games', 7),
  ('Joystick Jamboree', 'Interactive Entertainment', 8),
  ('Tech Tycoon', 'Byte Creations', 9),
  ('Digital Dynasty', 'Gaming Giants', 10),
  ('Space Explorer', 'Galactic Studios', 1),
  ('Mystic Quest', 'Enchanted Games', 2),
  ('Future Fighter', 'Tech Innovations', 5),
  ('City Builder', 'Urban Games', 6),
  ('Wild West Adventure', 'Frontier Studios', 3),
  ('Underwater Odyssey', 'Deep Sea Games', 6),
  ('Fantasy Quest', 'Imaginary Games', 2),
  ('Cyberpunk Chronicles', 'Future Realms', 4),
  ('Ancient Civilization', 'History Games', 9),
  ('Future City Sim', 'Tech Innovations', 10);


