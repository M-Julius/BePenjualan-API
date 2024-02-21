const express = require("express");
const bodyParser = require("body-parser");

const barangRoutes = require('./src/routes/barangRoutes');
const jenisBarangRoutes = require('./src/routes/jenisBarangRoutes'); 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/barang', barangRoutes);
app.use('/api/jenis-barang', jenisBarangRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});