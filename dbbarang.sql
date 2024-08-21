SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `dbbarang`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `Barang`
--

CREATE TABLE `Barang` (
  `ID` int(11) NOT NULL,
  `NamaBarang` varchar(255) DEFAULT NULL,
  `Stok` int(11) DEFAULT NULL,
  `JumlahTerjual` int(11) DEFAULT NULL,
  `TanggalTransaksi` date DEFAULT NULL,
  `JenisBarangID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `Barang`
--

INSERT INTO `Barang` (`ID`, `NamaBarang`, `Stok`, `JumlahTerjual`, `TanggalTransaksi`, `JenisBarangID`) VALUES
(1, 'Kopi ABC', 100, 10, '2021-09-02', 1),
(2, 'Teh', 100, 19, '2021-05-05', 1),
(3, 'Kopi', 90, 15, '2021-05-09', 2),
(4, 'Pasta Gigi', 100, 20, '2021-05-11', 2),
(5, 'Sabun Mandi', 100, 30, '2021-05-11', 2),
(6, 'Sampo', 100, 25, '2021-05-12', 2),
(15, 'Kunci ABC', 100, 11, '2024-02-20', 1),
(16, 'Sari Roti', 90, 20, '2024-02-22', 1),
(17, 'Soklin Lantai', 900, 50, '2024-02-21', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `JenisBarang`
--

CREATE TABLE `JenisBarang` (
  `JenisBarangID` int(11) NOT NULL,
  `JenisBarang` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `JenisBarang`
--

INSERT INTO `JenisBarang` (`JenisBarangID`, `JenisBarang`) VALUES
(1, 'Konsumsi'),
(2, 'Pembersih'),
(7, 'Pakaian');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `Barang`
--
ALTER TABLE `Barang`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_Barang_JenisBarang` (`JenisBarangID`);

--
-- Indeks untuk tabel `JenisBarang`
--
ALTER TABLE `JenisBarang`
  ADD PRIMARY KEY (`JenisBarangID`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `Barang`
--
ALTER TABLE `Barang`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `JenisBarang`
--
ALTER TABLE `JenisBarang`
  MODIFY `JenisBarangID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `Barang`
--
ALTER TABLE `Barang`
  ADD CONSTRAINT `FK_Barang_JenisBarang` FOREIGN KEY (`JenisBarangID`) REFERENCES `JenisBarang` (`JenisBarangID`);
COMMIT;
