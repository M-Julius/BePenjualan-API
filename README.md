# BePenjualan

Penjualan is backend for this app [FePenjualan-Mobile](https://github.com/M-Julius/FePenjualan-Mobile)

Collection this API on [this](https://drive.google.com/file/d/1aEXdvvIwMixrzhDH-RX96737ahxiSt2C/view?usp=drive_link)
Berikut adalah struktur koleksi Postman dalam format list tanpa response:

**Barang**
- Barang
  - GET `/api/barang`
- Barang Detail
  - GET `/api/barang/{id}`
- Barang Terjual `type: terendah | terbanyak`
  - GET `/api/barang/terjual/{type}`
- Create Barang
  - POST `/api/barang`
- Edit Barang
  - PUT `/api/barang/{id}`
- Delete Barang
  - DELETE `/api/barang/{id}`

**JenisBarang**
- Get Jenis Barang
  - GET `/api/jenis-barang`
- Create Jenis Barang
  - POST `/api/jenis-barang`
- Edit Jenis Barang
  - PUT `/api/jenis-barang/{id}`
- Delete Jenis Barang
  - DELETE `/api/jenis-barang/{id}`

### Instalation
you must setup .env file for configuration with db and export ```dbbarang.sql``` to database mysql

set your environment copy ```.env.example``` to ```.env``` and set the

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=db_name
```

```$ git clone https://github.com/M-Julius/BePenjualan-API.git```

```$ cd BePenjualan-API```

```$ yarn install```


```$ node index.js```


and now you can access on localhost:3000
