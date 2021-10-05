USE PIN;

INSERT INTO rol VALUES
    (1, "Shop"),
    (2, "User");

INSERT INTO tags VALUES
    (1, "Aire libre"),
    (2, "Deportes"),
    (3, "Gastronomía"),
    (4, "Hacer Deporte"),
    (5, "Playa"),
    (6, "Senderismo"),
    (7, "Salir de fiesta"),
    (8, "Pasear"),
    (9, "Ir de compras");

INSERT INTO entity VALUES
    (1, 2, "Dracarys", "Daenerys", "Targaryen","Lorem ipsum dolor sit amet,... ", "ddt@got.com", 999555111, "Braavos", "1234", "urlFoto"),
    (2, 2, "Bastardo", "Jon", "Snow","Lorem ipsum dolor sit amet,... ", "bjs@got.com", 999555222, "Invernalia", "1234", "urlFoto"),
    (3, 1, "Tasquilla", "100 Montaditos", null,"Lorem ipsum dolor sit amet,... ", "100@got.com", 999555333, "Desembarco del rey", "1234", "urlFoto");

INSERT INTO activity VALUES
    (1, 2, "Party de Halloween", "Nos vamos de botellona por el centro...", 152, 12.50, "Valencia", "2021-12-31", 15),
    (2, 1, "Acampada", "Visita guiada al muro de hielo...", 45, 0, "Murcia", "2021-11-30", 90),
    (3, 3, "Come y bebe", "Come y bebe todo lo que puedas...", 30, 10, "Asturias", "2021-10-31", 45);

INSERT INTO review VALUES
    (1, 1, "Estupendo", "Me lo pasé estupendamente", 10),
    (2, 1, "Puta mierda", "Para nada aconsejable", 0),
    (3, 1, "OK", null, 9),
    (4, 1, "KO", null, 1),
    (5, 2, "ni bien ni mal", null, 5),
    (6, 2, "bueno", null, 6),
    (7, 3, "Guay", null, 7),
    (8, 3, "Me lo esperaba mejor", null, 4);
    
INSERT INTO entityToActivity VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 2),
    (3, 2),
    (3, 3);

INSERT INTO taste_ent VALUES
    (1, 1),
    (1, 2),
    (2, 6),
    (2, 9),
    (2, 2),
    (3, 8),
    (3, 3);

INSERT INTO taste_act VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (1, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (2, 2),
    (2, 3),
    (3, 5),
    (3, 4),
    (3, 8),
    (3, 3);