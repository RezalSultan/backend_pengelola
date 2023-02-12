const {query} = require("../config/query");

const productPencarianTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'produk_pencarian'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE produk_pencarian (
            id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
            id_pengelola INT NOT NULL,
            CONSTRAINT fk_id_pengelola_pc FOREIGN KEY (id_pengelola) REFERENCES pengelola (id),
            jenis_produk ENUM("Daur Ulang", "Mentahan") DEFAULT NULL,
            nama_produk VARCHAR(100) DEFAULT NULL,
            harga DECIMAL(20,2) DEFAULT NULL,
            satuan ENUM("Kg", "Pcs") DEFAULT NULL,
            kategori ENUM("Organik", "Anorganik") DEFAULT NULL,
            sub_kategori VARCHAR(100) DEFAULT NULL,
            stok_barang VARCHAR(20) DEFAULT NULL,
            menabung ENUM("tersedia", "tidak tersedia") DEFAULT NULL,
            distribusi SET("Kami Jemput", "Antar Sendiri", "Kurir" ) DEFAULT NULL,
            created_by BIGINT DEFAULT NULL,
            update_by BIGINT DEFAULT NULL,
            update_at DATETIME DEFAULT NULL,
            created_at DATETIME DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("produk_pencarian tabel " + error);
   };
};

module.exports = {
   productPencarianTbl
}