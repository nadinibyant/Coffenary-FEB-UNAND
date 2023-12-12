-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 12 Des 2023 pada 04.22
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_coffeenary`
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
(1, 1, 4, 1, '2023-12-10 16:26:22', '2023-12-10 16:26:22', 0),
(2, 1, 2, 1, '2023-12-10 16:26:38', '2023-12-10 16:26:38', 0),
(3, 1, 2, 1, '2023-12-10 16:26:57', '2023-12-10 16:26:57', 10000),
(32, 19, 2, 2, '2023-12-11 16:08:24', '2023-12-11 16:08:24', 40000),
(33, 19, 4, 1, '2023-12-11 16:08:24', '2023-12-11 16:08:24', 2000),
(34, 20, 2, 2, '2023-12-11 16:13:55', '2023-12-11 16:13:55', 40000),
(35, 20, 4, 1, '2023-12-11 16:13:55', '2023-12-11 16:13:55', 2000),
(36, 21, 2, 2, '2023-12-11 16:14:12', '2023-12-11 16:14:12', 40000),
(37, 21, 4, 1, '2023-12-11 16:14:12', '2023-12-11 16:14:12', 2000),
(38, 22, 2, 2, '2023-12-11 16:43:45', '2023-12-11 16:43:45', 40000),
(39, 22, 4, 1, '2023-12-11 16:43:45', '2023-12-11 16:43:45', 2000),
(42, 24, 2, 2, '2023-12-12 02:55:33', '2023-12-12 02:55:33', 40000),
(43, 24, 4, 1, '2023-12-12 02:55:33', '2023-12-12 02:55:33', 2000),
(44, 25, 2, 2, '2023-12-12 02:58:36', '2023-12-12 02:58:36', 40000),
(45, 25, 4, 1, '2023-12-12 02:58:36', '2023-12-12 02:58:36', 2000);

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
(7, 2, 'WhatsApp Image 2023-10-22 at 14.18.50_d1a36222.jpg', 3, '2023-10-26 03:31:27', '2023-10-26 03:31:38');

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
(2, 'foto2.jpg', 'ayam geprek', 20000, 'unavailable', '2023-12-09 16:40:12', '2023-12-09 16:40:12'),
(4, 'eror ssl.png', 'ayam geprek part2', 2000, 'Available', '2023-12-09 17:06:22', '2023-12-09 17:06:22');

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
(1, 13, 8, 10000, '2023-12-10 16:26:06', '2023-12-10 16:26:06'),
(2, 13, NULL, 0, '2023-12-11 15:27:46', '2023-12-11 15:27:46'),
(3, 13, NULL, 0, '2023-12-11 15:28:21', '2023-12-11 15:28:21'),
(19, 13, NULL, 42000, '2023-12-11 16:08:24', '2023-12-11 16:08:24'),
(20, 13, NULL, 42000, '2023-12-11 16:13:55', '2023-12-11 16:13:55'),
(21, 13, NULL, 42000, '2023-12-11 16:14:12', '2023-12-11 16:14:12'),
(22, 13, 27, 42000, '2023-12-11 16:43:44', '2023-12-11 16:43:45'),
(24, 13, 29, 42000, '2023-12-12 02:55:33', '2023-12-12 02:55:33'),
(25, 13, NULL, 42000, '2023-12-12 02:58:35', '2023-12-12 02:58:36');

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
(6, 13, 7, '2023-10-26', '00:00:00', '00:00:00', 1, 'Canceled', 'The Reservation has been cancelled', '2023-10-26 03:35:53', '2023-10-26 03:36:14'),
(7, 13, 7, '2023-10-26', '09:45:00', '10:15:00', 1, 'Completed', NULL, '2023-10-26 03:36:26', '2023-10-26 03:37:08'),
(8, 13, 7, '2023-12-10', '00:00:00', '00:00:00', 3, 'Canceled', 'Reservation was canceled due to priority guests from coffeenary', '2023-10-26 03:37:36', '2023-12-10 16:11:13'),
(9, 13, 7, '2023-10-27', '00:00:00', '00:00:00', 1, 'Reserved', 'Reservation was canceled due to priority guests from coffeenary', '2023-10-27 10:25:08', '2023-12-10 15:06:10'),
(10, 13, 7, '2023-10-27', '00:00:00', '00:00:00', 1, 'Canceled', 'The Reservation has been cancelled', '2023-10-27 12:56:15', '2023-10-27 12:56:24'),
(11, 13, 7, '2023-10-27', '07:45:00', '08:15:00', 2, 'Completed', NULL, '2023-10-27 13:12:40', '2023-12-10 15:04:17'),
(12, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:30:07', '2023-12-11 16:30:07'),
(13, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:30:35', '2023-12-11 16:30:35'),
(14, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:34:51', '2023-12-11 16:34:51'),
(15, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:34:52', '2023-12-11 16:34:52'),
(16, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:35:11', '2023-12-11 16:35:11'),
(17, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:35:12', '2023-12-11 16:35:12'),
(18, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:14', '2023-12-11 16:37:14'),
(19, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:16', '2023-12-11 16:37:16'),
(20, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:16', '2023-12-11 16:37:16'),
(21, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:24', '2023-12-11 16:37:24'),
(22, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:25', '2023-12-11 16:37:25'),
(23, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:26', '2023-12-11 16:37:26'),
(24, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:37:53', '2023-12-11 16:37:53'),
(25, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:40:20', '2023-12-11 16:40:20'),
(26, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 1, 'Reserved', NULL, '2023-12-11 16:40:21', '2023-12-11 16:40:21'),
(27, 13, 7, '2023-12-11', '00:00:00', '00:00:00', 1, 'Reserved', '', '2023-12-11 16:43:44', '2023-12-12 02:32:14'),
(29, 13, 7, '2023-12-12', '00:00:00', '00:00:00', 2, 'Reserved', NULL, '2023-12-12 02:55:33', '2023-12-12 02:55:33');

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
(1, 'admin coffeenary', 'admin coffeenary', '$2b$10$wzx/KNG1hHKpX149BXtKyu8/ThQeJo2Y8JrFzj1jODEusb3FV5oxG', 'admin@gmail.com', '0751897567', 'Desain tanpa judul.png', 0, '2023-10-09 16:58:31', '2023-10-26 03:32:19'),
(3, 'diniiiiiiii ajaaaa', 'nadini dinii 12', '$2b$10$Cq5esctGbdgE72ASDxv0GOwpag1OOz8e8dBoTtaoi96xrHCLma3Zy', 'nadini12@gmail.com', '08228342656', 'download.png', 1, '2023-10-12 10:54:48', '2023-10-15 09:17:49'),
(4, 'nadini byant banget', 'dini byant 26', '$2b$10$EyOqlm.Lf8bv4pLE02c2kOlY/8fSPakWE3Ofs8sD9zu9khkDONhdm', 'nadini@gmail.com', '081166543', NULL, 1, '2023-10-14 13:46:55', '2023-10-14 13:46:55'),
(10, 'nadila', 'dila byant 26', '$2b$10$C2Hj.amg3.p75Rirxd568u4jAlMcB8AL/nrHK6CvNI0IzGxFclTHm', 'nadila@gmail.com', '0801', 'artikel 2.jpg', 1, '2023-10-22 04:33:37', '2023-10-22 04:47:53'),
(11, 'nadini annisa', 'nadiniannisabyant26', '$2b$10$oDMKyYkNzpxLe4pcvlm7D.03BCRN3f4pwn8j.JW0H8LiYeUbLhP2y', 'dini@gmail.com', '082283426568', NULL, 1, '2023-10-22 07:00:52', '2023-10-22 07:00:52'),
(12, 'dini aja', 'diniaja', '$2b$10$QDif2JP2NC1clJRUpjB4lexgB39VCnzsTaZ23nV6Qw/Em3A7bB2t2', 'diniaja@gmail.com', '0822342374', 'Instagram post - 6.jpg', 1, '2023-10-22 07:22:38', '2023-10-22 07:25:45'),
(13, 'nadini annisa', 'nadini annisa byant ', '$2b$10$AWadGKxLpapVh7Q0jeUF6.LzItVVOxAehb9oZacbysyTsx192Lo.u', 'dini1234@gmail.com', '082283468', NULL, 1, '2023-10-26 03:33:11', '2023-10-26 03:33:11');

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
  MODIFY `id_detail_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `meja`
--
ALTER TABLE `meja`
  MODIFY `id_meja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `reservasi`
--
ALTER TABLE `reservasi`
  MODIFY `id_reservasi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
