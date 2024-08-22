const connection = require("../db");

const barangController = {
  createBarang: (req, res) => {
    const { NamaBarang, Stok, JumlahTerjual, TanggalTransaksi, JenisBarangID } =
      req.body;

    connection.query(
      "SELECT * FROM JenisBarang WHERE JenisBarangID = ?",
      [JenisBarangID],
      (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
          return res.status(400).json({
            status: false,
            message: "Jenis barang tidak valid",
          });
        } else {
          connection.query(
            "INSERT INTO Barang (NamaBarang, Stok, JumlahTerjual, TanggalTransaksi, JenisBarangID) VALUES (?, ?, ?, ?, ?)",
            [NamaBarang, Stok, JumlahTerjual, TanggalTransaksi, JenisBarangID],
            (error, results) => {
              if (error) {
                return res.status(400).json({
                  status: false,
                  message: "Gagal menambahkan barang",
                });
              }
              res.json({
                status: true,
                message: "Barang berhasil ditambahkan",
              });
            }
          );
        }
      }
    );
  },
  getAllBarang: (req, res) => {
    let query =
      "SELECT b.*, j.JenisBarang FROM Barang b JOIN JenisBarang j ON b.JenisBarangID = j.JenisBarangID";

    // search
    const searchKeyword = req.query.keyword;
    if (searchKeyword) {
      query += ` WHERE NamaBarang LIKE '%${searchKeyword}%'`;
    }

    // sorting
    const sortBy = req.query.sortBy;
    if (sortBy === "nama") {
      query += " ORDER BY NamaBarang";
    } else if (sortBy === "tanggal") {
      query += " ORDER BY TanggalTransaksi";
    }

    connection.query(query, (error, results) => {
      if (error) {
        return res.status(400).json({
          status: false,
          message: "Gagal mendapatkan barang.",
        });
      }
      res.json({
        status: true,
        message: "Berhasil mendapatkan barang.",
        data: results,
      });
    });
  },
  getBarangDetail: (req, res) => {
    const id = req.params.id;
    connection.query(
      "SELECT b.*, j.JenisBarang FROM Barang b JOIN JenisBarang j ON b.JenisBarangID = j.JenisBarangID WHERE b.ID = ?",
      [id],
      (error, results) => {
        if (error) {
          return res.status(400).json({
            status: false,
            message: "Gagal mendapatkan barang.",
          });
        }
        if (results.length > 0) {
          res.status(200).json({
            status: true,
            message: "Berhasil mendapatkan barang.",
            data: results[0],
          });
        } else {
          res.json({
            status: false,
            message: "Barang tidak ditemukan.",
          });
        }
      }
    );
  },
  updateBarang: (req, res) => {
    const { id } = req.params;
    const { NamaBarang, Stok, JumlahTerjual, TanggalTransaksi, JenisBarangID } =
      req.body;

    connection.query(
      "SELECT * FROM Barang WHERE ID = ?",
      [id],
      (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
          return res.status(400).json({
            status: false,
            message: "Barang tidak ditemukan",
          });
        } else {
          connection.query(
            "SELECT * FROM JenisBarang WHERE JenisBarangID = ?",
            [JenisBarangID],
            (error, results) => {
              if (error) {
                return res.status(400).json({
                  status: false,
                  message: "Gagal memperbarui barang",
                });
              }

              if (results.length === 0) {
                return res.status(400).json({
                  status: false,
                  message: "Jenis barang tidak valid",
                });
              } else {
                connection.query(
                  "UPDATE Barang SET NamaBarang = ?, Stok = ?, JumlahTerjual = ?, TanggalTransaksi = ?, JenisBarangID = ? WHERE ID = ?",
                  [
                    NamaBarang,
                    Stok,
                    JumlahTerjual,
                    TanggalTransaksi,
                    JenisBarangID,
                    id,
                  ],
                  (error, results) => {
                    if (error) throw error;
                    res.status(200).json({
                      status: true,
                      message: "Barang berhasil diperbarui",
                    });
                  }
                );
              }
            }
          );
        }
      }
    );
  },
  deleteBarang: (req, res) => {
    const id = req.params.id;
    connection.query(
      "DELETE FROM Barang WHERE ID = ?",
      [id],
      (error, results) => {
        if (error) {
          return res.status(400).json({
            status: false,
            message: "Gagal menghapus barang.",
          });
        }
        res.json({
          status: true,
          message: "Barang berhasil dihapus.",
        });
      }
    );
  },
  barangChart: (req, res) => {
    const { type } = req.params;
    const { startDate, endDate } = req.query;

    let order = "ASC";
    if (type === "terbanyak") {
      order = "DESC";
    }
    let query = `SELECT b.JenisBarangID, j.JenisBarang, SUM(JumlahTerjual) AS TotalTerjual FROM Barang b JOIN JenisBarang j ON b.JenisBarangID = j.JenisBarangID`

    if (startDate && endDate) {
      query += ` WHERE TanggalTransaksi BETWEEN '${startDate}' AND '${endDate}'`;
    }

    query += ` GROUP BY b.JenisBarangID, j.JenisBarang ORDER BY TotalTerjual ${order} LIMIT 1`;

    connection.query(query, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          status: false,
          message: "Gagal mendapatkan data",
        });
      }
      res.json({
        status: true,
        message: "Berhasil mendapatkan data",
        data: results,
      });
    });
  },

};

module.exports = barangController;
