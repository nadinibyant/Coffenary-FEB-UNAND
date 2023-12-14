-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Des 2023 pada 18.35
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_coffeenaryy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_pemesanan`
--

CREATE TABLE `detail_pemesanan` (
  `id_detail_pesanan` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `jumlah` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_harga_menu` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `detail_pemesanan`
--

INSERT INTO `detail_pemesanan` (`id_detail_pesanan`, `id_pesanan`, `id_menu`, `jumlah`, `created_at`, `updated_at`, `total_harga_menu`) VALUES
(33, 19, 4, 1, '2023-12-11 16:08:24', '2023-12-11 16:08:24', 2000),
(35, 20, 4, 1, '2023-12-11 16:13:55', '2023-12-11 16:13:55', 2000),
(37, 21, 4, 1, '2023-12-11 16:14:12', '2023-12-11 16:14:12', 2000),
(45, 25, 4, 1, '2023-12-12 02:58:36', '2023-12-12 02:58:36', 2000),
(70, 34, 1, 0, '2023-12-13 01:22:11', '2023-12-13 01:22:11', 0),
(72, 34, 4, 0, '2023-12-13 01:22:11', '2023-12-13 01:22:11', 0),
(73, 35, 1, 0, '2023-12-13 01:24:28', '2023-12-13 01:24:28', 0),
(75, 35, 4, 0, '2023-12-13 01:24:28', '2023-12-13 01:24:28', 0),
(76, 36, 1, 0, '2023-12-13 01:27:15', '2023-12-13 01:27:15', 0),
(78, 36, 4, 0, '2023-12-13 01:27:15', '2023-12-13 01:27:15', 0),
(79, 37, 1, 0, '2023-12-13 01:28:02', '2023-12-13 01:28:02', 0),
(81, 37, 4, 0, '2023-12-13 01:28:02', '2023-12-13 01:28:02', 0),
(82, 38, 1, 0, '2023-12-13 01:28:53', '2023-12-13 01:28:53', 0),
(84, 38, 4, 0, '2023-12-13 01:28:53', '2023-12-13 01:28:53', 0),
(85, 43, 4, 3, '2023-12-13 02:18:38', '2023-12-13 02:18:38', 6000),
(86, 44, 1, 4, '2023-12-13 02:19:07', '2023-12-13 02:19:07', 80000),
(87, 45, 1, 4, '2023-12-13 02:19:22', '2023-12-13 02:19:22', 80000),
(88, 45, 4, 4, '2023-12-13 02:19:22', '2023-12-13 02:19:22', 8000),
(89, 46, 1, 4, '2023-12-13 06:05:28', '2023-12-13 06:05:28', 80000),
(91, 46, 4, 0, '2023-12-13 06:05:28', '2023-12-13 06:05:28', 0),
(92, 47, 1, 2, '2023-12-14 01:10:37', '2023-12-14 01:10:37', 40000),
(94, 47, 4, 2, '2023-12-14 01:10:37', '2023-12-14 01:10:37', 4000),
(95, 48, 1, 2, '2023-12-14 05:22:16', '2023-12-14 05:22:16', 40000),
(96, 49, 1, 0, '2023-12-14 16:40:22', '2023-12-14 16:40:22', 0),
(97, 49, 4, 0, '2023-12-14 16:40:22', '2023-12-14 16:40:22', 0),
(98, 49, 7, 2, '2023-12-14 16:40:22', '2023-12-14 16:40:22', 50000),
(99, 49, 8, 1, '2023-12-14 16:40:22', '2023-12-14 16:40:22', 18000),
(100, 49, 9, 0, '2023-12-14 16:40:22', '2023-12-14 16:40:22', 0),
(101, 50, 1, 0, '2023-12-14 17:14:49', '2023-12-14 17:14:49', 0),
(102, 50, 4, 0, '2023-12-14 17:14:49', '2023-12-14 17:14:49', 0),
(103, 50, 7, 3, '2023-12-14 17:14:49', '2023-12-14 17:14:49', 75000),
(104, 50, 8, 2, '2023-12-14 17:14:49', '2023-12-14 17:14:49', 36000),
(105, 50, 9, 2, '2023-12-14 17:14:49', '2023-12-14 17:14:49', 50000),
(106, 51, 1, 0, '2023-12-14 17:28:50', '2023-12-14 17:28:50', 0),
(107, 51, 4, 0, '2023-12-14 17:28:50', '2023-12-14 17:28:50', 0),
(108, 51, 7, 0, '2023-12-14 17:28:50', '2023-12-14 17:28:50', 0),
(109, 51, 8, 2, '2023-12-14 17:28:50', '2023-12-14 17:28:50', 36000),
(110, 51, 9, 2, '2023-12-14 17:28:50', '2023-12-14 17:28:50', 50000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `meja`
--

CREATE TABLE `meja` (
  `id_meja` int(11) NOT NULL,
  `nomor_meja` int(11) NOT NULL,
  `foto_meja` varchar(255) NOT NULL,
  `jumlah_kursi` int(3) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `meja`
--

INSERT INTO `meja` (`id_meja`, `nomor_meja`, `foto_meja`, `jumlah_kursi`, `created_at`, `updated_at`) VALUES
(9, 1, 'kursi_jumlah_1.jpg', 1, '2023-12-12 10:44:29', '2023-12-12 10:44:29'),
(10, 5, 'kursi_jumlah_2.jpg', 2, '2023-12-12 10:44:42', '2023-12-12 10:44:42'),
(11, 6, 'kursi_jumlah_3.jpg', 3, '2023-12-12 10:44:50', '2023-12-12 10:44:50'),
(12, 7, 'kursi_jumlah_3_depan.jpg', 3, '2023-12-12 10:44:59', '2023-12-12 10:44:59'),
(13, 8, 'kursi_jumlah_3_samping.jpg', 3, '2023-12-12 10:45:07', '2023-12-12 10:45:07'),
(14, 9, 'kursi_jumlah_4.jpg', 4, '2023-12-12 10:45:16', '2023-12-12 10:45:16'),
(15, 2, 'kursi_jumlah_4_dalam.jpg', 4, '2023-12-12 10:45:25', '2023-12-12 10:45:25'),
(16, 3, 'kursi_jumlah_6.jpg', 6, '2023-12-12 10:45:34', '2023-12-12 10:45:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `foto_menu` varchar(255) NOT NULL,
  `nama_menu` varchar(50) NOT NULL,
  `harga_menu` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `menu`
--

INSERT INTO `menu` (`id_menu`, `foto_menu`, `nama_menu`, `harga_menu`, `status`, `created_at`, `updated_at`) VALUES
(1, 'kopi susu.jpg', 'Kopi Susu Coffeenary', 20000, 'Unavailable', '2023-12-12 17:17:22', '2023-12-14 08:01:45'),
(4, 'Screenshot 2023-12-14 212742.png', 'Ayam Geprek', 23000, 'Available', '2023-12-09 17:06:22', '2023-12-14 14:27:59'),
(7, 'matcha.png', 'Matcha Latte', 25000, 'Available', '2023-12-14 14:26:24', '2023-12-14 14:26:24'),
(8, 'kentang goreng.png', 'French Fries', 18000, 'Available', '2023-12-14 14:26:39', '2023-12-14 14:26:39'),
(9, 'vanila latte.jpeg', 'Vanila Latte', 25000, 'Available', '2023-12-14 14:26:56', '2023-12-14 14:26:56');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_reservasi` int(11) DEFAULT NULL,
  `total_harga` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `id_user`, `id_reservasi`, `total_harga`, `created_at`, `updated_at`) VALUES
(19, 13, NULL, 42000, '2023-12-11 16:08:24', '2023-12-11 16:08:24'),
(20, 13, NULL, 42000, '2023-12-11 16:13:55', '2023-12-11 16:13:55'),
(21, 13, NULL, 42000, '2023-12-11 16:14:12', '2023-12-11 16:14:12'),
(25, 13, NULL, 42000, '2023-12-12 02:58:35', '2023-12-12 02:58:36'),
(34, 14, 75, 0, '2023-12-13 01:22:11', '2023-12-13 01:22:11'),
(35, 14, 76, 0, '2023-12-13 01:24:28', '2023-12-13 01:24:28'),
(36, 14, 77, 0, '2023-12-13 01:27:15', '2023-12-13 01:27:15'),
(37, 14, 78, 0, '2023-12-13 01:28:02', '2023-12-13 01:28:02'),
(38, 14, 79, 0, '2023-12-13 01:28:53', '2023-12-13 01:28:53'),
(43, 14, NULL, 6000, '2023-12-13 02:18:38', '2023-12-13 02:18:38'),
(44, 14, NULL, 80000, '2023-12-13 02:19:07', '2023-12-13 02:19:07'),
(45, 14, NULL, 88000, '2023-12-13 02:19:21', '2023-12-13 02:19:22'),
(46, 14, 80, 80000, '2023-12-13 06:05:28', '2023-12-13 06:05:28'),
(47, 14, 81, 44000, '2023-12-14 01:10:37', '2023-12-14 01:10:37'),
(48, 14, NULL, 40000, '2023-12-14 05:22:16', '2023-12-14 05:22:16'),
(49, 14, 82, 68000, '2023-12-14 16:40:22', '2023-12-14 16:40:22'),
(50, 14, 83, 161000, '2023-12-14 17:14:49', '2023-12-14 17:14:49'),
(51, 14, 84, 86000, '2023-12-14 17:28:50', '2023-12-14 17:28:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `reservasi`
--

CREATE TABLE `reservasi` (
  `id_reservasi` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_meja` int(11) NOT NULL,
  `tanggal_reservasi` date DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `jumlah_orang` int(3) NOT NULL,
  `status` varchar(30) NOT NULL,
  `keterangan` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `reservasi`
--

INSERT INTO `reservasi` (`id_reservasi`, `id_user`, `id_meja`, `tanggal_reservasi`, `jam_mulai`, `jam_selesai`, `jumlah_orang`, `status`, `keterangan`, `created_at`, `updated_at`) VALUES
(30, 14, 14, '2023-12-12', '07:00:00', '07:30:00', 1, 'Completed', 'Your reservation table has been moved to number 9', '2023-12-12 11:05:39', '2023-12-14 14:43:24'),
(31, 14, 9, '2023-12-12', '07:00:00', '07:30:00', 1, 'Reserved', NULL, '2023-12-12 11:05:45', '2023-12-12 11:05:45'),
(32, 14, 10, '2023-12-12', '07:00:00', '07:30:00', 2, 'Reserved', NULL, '2023-12-12 11:08:00', '2023-12-12 11:08:00'),
(33, 14, 10, '2023-12-12', '07:45:00', '08:15:00', 2, 'Reserved', NULL, '2023-12-12 11:09:21', '2023-12-12 11:09:21'),
(34, 14, 11, '2023-12-12', '07:00:00', '07:30:00', 3, 'Reserved', NULL, '2023-12-12 11:10:11', '2023-12-12 11:10:11'),
(55, 14, 10, '2023-12-12', '11:45:00', '12:15:00', 2, 'Reserved', NULL, '2023-12-12 11:54:09', '2023-12-12 11:54:09'),
(56, 14, 9, '2023-12-12', '13:45:00', '14:15:00', 1, 'Reserved', NULL, '2023-12-12 11:57:24', '2023-12-12 11:57:24'),
(57, 14, 9, '2023-12-12', '14:30:00', '15:00:00', 1, 'Reserved', NULL, '2023-12-12 12:29:31', '2023-12-12 12:29:31'),
(58, 14, 9, '2023-12-12', '15:45:00', '16:15:00', 1, 'Reserved', NULL, '2023-12-12 12:30:13', '2023-12-12 12:30:13'),
(59, 14, 9, '2023-12-12', '07:45:00', '08:15:00', 1, 'Reserved', NULL, '2023-12-12 12:30:52', '2023-12-12 12:30:52'),
(60, 14, 9, '2023-12-12', '08:30:00', '09:00:00', 1, 'Reserved', NULL, '2023-12-12 12:37:15', '2023-12-12 12:37:15'),
(61, 14, 9, '2023-12-12', '09:45:00', '10:15:00', 1, 'Reserved', NULL, '2023-12-12 12:40:06', '2023-12-12 12:40:06'),
(75, 14, 9, '2023-12-13', '07:00:00', '07:30:00', 1, 'Reserved', NULL, '2023-12-13 01:22:11', '2023-12-13 01:22:11'),
(76, 14, 9, '2023-12-13', '07:45:00', '08:15:00', 1, 'Reserved', NULL, '2023-12-13 01:24:28', '2023-12-13 01:24:28'),
(77, 14, 13, '2023-12-13', '07:00:00', '07:30:00', 3, 'Reserved', NULL, '2023-12-13 01:27:15', '2023-12-13 01:27:15'),
(78, 14, 16, '2023-12-13', '07:00:00', '07:30:00', 5, 'Reserved', NULL, '2023-12-13 01:28:02', '2023-12-13 01:28:02'),
(79, 14, 15, '2023-12-13', '08:30:00', '09:00:00', 4, 'Completed', NULL, '2023-12-13 01:28:53', '2023-12-14 17:12:53'),
(80, 14, 16, '2023-12-14', '07:00:00', '07:30:00', 5, 'Reserved', NULL, '2023-12-13 06:05:28', '2023-12-13 06:05:28'),
(81, 14, 15, '2023-12-15', '00:00:00', '00:00:00', 3, 'Canceled', 'Reservation was canceled due to priority guests from coffeenary', '2023-12-14 01:10:37', '2023-12-14 17:13:11'),
(82, 14, 15, '2023-12-15', '00:00:00', '00:00:00', 4, 'Canceled', 'Reservation was canceled due to priority guests from coffeenary', '2023-12-14 16:40:22', '2023-12-14 17:10:48'),
(83, 14, 16, '2023-12-16', '00:00:00', '00:00:00', 6, 'Canceled', 'Reservation was canceled due to priority guests from coffeenary', '2023-12-14 17:14:49', '2023-12-14 17:15:19'),
(84, 14, 13, '2023-12-15', '12:30:00', '13:00:00', 2, 'Reserved', NULL, '2023-12-14 17:28:50', '2023-12-14 17:28:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(50) NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `full_name`, `username`, `password`, `email`, `no_telp`, `foto`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin coffeenary', 'admin coffeenary', '$2b$10$wzx/KNG1hHKpX149BXtKyu8/ThQeJo2Y8JrFzj1jODEusb3FV5oxG', 'admin@gmail.com', '0751897567', 'profileCoffeenary.png', 0, '2023-10-09 16:58:31', '2023-12-14 05:34:53'),
(3, 'diniiiiiiii ajaaaa', 'nadini dinii 12', '$2b$10$Cq5esctGbdgE72ASDxv0GOwpag1OOz8e8dBoTtaoi96xrHCLma3Zy', 'nadini12@gmail.com', '08228342656', 'download.png', 1, '2023-10-12 10:54:48', '2023-10-15 09:17:49'),
(4, 'nadini byant banget', 'dini byant 26', '$2b$10$EyOqlm.Lf8bv4pLE02c2kOlY/8fSPakWE3Ofs8sD9zu9khkDONhdm', 'nadini@gmail.com', '081166543', NULL, 1, '2023-10-14 13:46:55', '2023-10-14 13:46:55'),
(10, 'nadila', 'dila byant 26', '$2b$10$C2Hj.amg3.p75Rirxd568u4jAlMcB8AL/nrHK6CvNI0IzGxFclTHm', 'nadila@gmail.com', '0801', 'artikel 2.jpg', 1, '2023-10-22 04:33:37', '2023-10-22 04:47:53'),
(11, 'nadini annisa', 'nadiniannisabyant26', '$2b$10$oDMKyYkNzpxLe4pcvlm7D.03BCRN3f4pwn8j.JW0H8LiYeUbLhP2y', 'dini@gmail.com', '082283426568', NULL, 1, '2023-10-22 07:00:52', '2023-10-22 07:00:52'),
(12, 'dini aja', 'diniaja', '$2b$10$QDif2JP2NC1clJRUpjB4lexgB39VCnzsTaZ23nV6Qw/Em3A7bB2t2', 'diniaja@gmail.com', '0822342374', 'Instagram post - 6.jpg', 1, '2023-10-22 07:22:38', '2023-10-22 07:25:45'),
(13, 'nadini annisa', 'nadini annisa byant ', '$2b$10$AWadGKxLpapVh7Q0jeUF6.LzItVVOxAehb9oZacbysyTsx192Lo.u', 'dini1234@gmail.com', '082283468', NULL, 1, '2023-10-26 03:33:11', '2023-10-26 03:33:11'),
(14, 'Nadia Nur Saida', 'nadia', '$2b$10$rzB2ljfHw.kwSDpYK6m7me5jcQ1Lgin4JymfAkAeyWEhhEujq1k0e', 'nadianrs88@gmail.com', '087899144407', '1652118469141.jpg', 1, '2023-12-12 10:42:53', '2023-12-14 05:26:47');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  ADD PRIMARY KEY (`id_detail_pesanan`),
  ADD KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indeks untuk tabel `meja`
--
ALTER TABLE `meja`
  ADD PRIMARY KEY (`id_meja`);

--
-- Indeks untuk tabel `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`);

--
-- Indeks untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_reservasi` (`id_reservasi`);

--
-- Indeks untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  ADD PRIMARY KEY (`id_reservasi`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_meja` (`id_meja`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  MODIFY `id_detail_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT untuk tabel `meja`
--
ALTER TABLE `meja`
  MODIFY `id_meja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `id_reservasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_pemesanan`
--
ALTER TABLE `detail_pemesanan`
  ADD CONSTRAINT `detail_pemesanan_ibfk_1` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detail_pemesanan_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `pesanan_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pesanan_ibfk_2` FOREIGN KEY (`id_reservasi`) REFERENCES `reservasi` (`id_reservasi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  ADD CONSTRAINT `reservasi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservasi_ibfk_2` FOREIGN KEY (`id_meja`) REFERENCES `meja` (`id_meja`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
