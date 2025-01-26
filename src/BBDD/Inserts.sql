-- Inserción de datos en la tabla activity_type
INSERT INTO activity_type (name, number_of_monitors) VALUES
('Yoga', 2),
('CrossFit', 3),
('Pilates', 1);

-- Inserción de datos en la tabla monitor
INSERT INTO monitor (name, email, phone, photo) VALUES
('Alice Smith', 'alice.smith@example.com', '123456789', 'photo1.jpg'),
('Bob Johnson', 'bob.johnson@example.com', '987654321', 'photo2.jpg'),
('Charlie Brown', 'charlie.brown@example.com', '567890123', 'photo3.jpg');

-- Inserción de datos en la tabla activity
INSERT INTO activity (type_id, start_date, end_date) VALUES
(1, '2025-01-01 10:00:00', '2025-01-01 11:30:00'),
(2, '2025-01-02 13:30:00', '2025-01-02 15:00:00'),
(3, '2025-01-03 17:30:00', '2025-01-03 19:00:00');

-- Inserción de datos en la tabla activity_monitor
INSERT INTO activity_monitor (activity_id, monitor_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 1),
(2, 2),
(3, 1);


