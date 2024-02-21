const connection = require('../db');

const jenisBarangController = {
    getAllJenisBarang: (req, res) => {
        connection.query('SELECT * FROM JenisBarang', (error, results) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: 'Gagal mendapatkan jenis barang'
                });

            };
            res.json({
                status: true,
                message: 'Berhasil mendapatkan jenis barang',
                data: results
            });
        });
    },

    getJenisBarangById: (req, res) => {
        const {
            id
        } = req.params;
        connection.query('SELECT * FROM JenisBarang WHERE JenisBarangID = ?', [id], (error, results) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: 'Gagal mendapatkan jenis barang'
                });
            };
            if (results.length === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Jenis barang not found'
                });
            }
            res.json({
                status: true,
                message: 'Berhasil mendapatkan jenis barang',
                data: results[0]
            });
        });
    },

    createJenisBarang: (req, res) => {
        const {
            JenisBarang
        } = req.body;
        connection.query('INSERT INTO JenisBarang (JenisBarang) VALUES (?)', [JenisBarang], (error, results) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: 'Gagal menambahkan jenis barang'
                });
            };
            res.json({
                status: true,
                message: 'Jenis barang berhasil ditambahkan'
            });
        });
    },

    updateJenisBarang: (req, res) => {
        const {
            id
        } = req.params;
        const {
            JenisBarang
        } = req.body;
        connection.query('UPDATE JenisBarang SET JenisBarang = ? WHERE JenisBarangID = ?', [JenisBarang, id], (error, results) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: 'Gagal memperbarui jenis barang'
                });

            };
            res.status(200).json({
                status: true,
                message: 'Jenis barang berhasil diperbarui'
            });
        });
    },

    deleteJenisBarang: (req, res) => {
        const {
            id
        } = req.params;
        connection.query('DELETE FROM JenisBarang WHERE JenisBarangID = ?', [id], (error, results) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    message: 'Gagal menghapus jenis barang'

                })
            };
            res.status(200).json({
                status: true,
                message: 'Jenis barang berhasil dihapus'
            });
        });
    }
};

module.exports = jenisBarangController;