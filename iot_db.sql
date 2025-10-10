-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2025 at 12:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iot_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `device_control`
--

CREATE TABLE `device_control` (
  `id` int(11) NOT NULL,
  `device_name` varchar(50) NOT NULL,
  `action` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `device_control`
--

INSERT INTO `device_control` (`id`, `device_name`, `action`, `created_at`) VALUES
(1, 'LED2', 'ON', '2025-09-21 14:36:31'),
(2, 'LED3', 'ON', '2025-09-21 14:36:41'),
(3, 'LED1', 'ON', '2025-09-26 06:45:15'),
(4, 'LED1', 'OFF', '2025-09-26 06:45:16'),
(5, 'LED2', 'OFF', '2025-09-26 06:45:18'),
(6, 'LED2', 'ON', '2025-09-26 06:45:19');

-- --------------------------------------------------------

--
-- Table structure for table `sensor_data`
--

CREATE TABLE `sensor_data` (
  `id` int(11) NOT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `humidity` decimal(5,2) DEFAULT NULL,
  `light` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sensor_data`
--

INSERT INTO `sensor_data` (`id`, `temperature`, `humidity`, `light`, `created_at`) VALUES
(1, 21.69, 74.78, 749, '2025-09-21 02:15:21'),
(2, 23.79, 60.44, 390, '2025-09-21 02:15:26'),
(3, 29.94, 48.41, 726, '2025-09-21 02:15:31'),
(4, 30.18, 40.97, 699, '2025-09-21 02:15:36'),
(5, 27.21, 61.17, 357, '2025-09-21 02:15:41'),
(6, 26.86, 69.36, 630, '2025-09-21 02:15:46'),
(7, 31.73, 46.75, 145, '2025-09-21 02:15:51'),
(8, 25.27, 42.02, 515, '2025-09-21 02:15:56'),
(9, 28.12, 47.80, 401, '2025-09-21 02:16:01'),
(10, 26.30, 61.42, 163, '2025-09-21 02:16:06'),
(11, 31.87, 79.63, 731, '2025-09-21 02:16:11'),
(12, 22.13, 58.64, 749, '2025-09-21 02:16:16'),
(13, 26.24, 78.27, 693, '2025-09-21 02:16:21'),
(14, 34.94, 54.58, 239, '2025-09-21 02:16:26'),
(15, 21.77, 67.21, 161, '2025-09-21 02:16:31'),
(16, 29.69, 57.63, 417, '2025-09-21 02:16:36'),
(17, 29.70, 73.43, 501, '2025-09-21 02:16:41'),
(18, 28.25, 79.30, 741, '2025-09-21 02:16:46'),
(19, 26.69, 46.53, 130, '2025-09-21 02:16:51'),
(20, 24.28, 71.33, 185, '2025-09-21 02:16:56'),
(21, 23.89, 72.22, 302, '2025-09-21 02:17:01'),
(22, 34.58, 63.15, 710, '2025-09-21 02:17:06'),
(23, 28.77, 64.92, 283, '2025-09-21 02:17:11'),
(24, 22.94, 75.68, 210, '2025-09-21 02:17:16'),
(25, 31.15, 42.55, 764, '2025-09-21 02:17:21'),
(26, 32.64, 70.44, 483, '2025-09-21 02:17:26'),
(27, 24.83, 78.12, 690, '2025-09-21 02:17:31'),
(28, 20.96, 55.20, 304, '2025-09-21 02:17:36'),
(29, 25.63, 49.72, 584, '2025-09-21 02:17:41'),
(30, 33.72, 65.38, 742, '2025-09-21 02:17:46'),
(31, 200.00, 20.00, 10, '2025-09-21 13:43:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'maimeo', '$2b$10$.rlaImVxdgohQzLhgyLS4OA5W/sGViXnCi1j4FStoOgQtE1E.2g.m', '2025-09-21 09:13:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `device_control`
--
ALTER TABLE `device_control`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sensor_data`
--
ALTER TABLE `sensor_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `device_control`
--
ALTER TABLE `device_control`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sensor_data`
--
ALTER TABLE `sensor_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
