const {query} = require("../config/query");

const photoProductPencarianTbl = async () => {
   try {
      const checkTable = await query(`SHOW TABLES LIKE 'foto_produk_pencarian'`);
      if (checkTable.length === 0) {
         await query(`
         CREATE TABLE foto_produk_pencarian (
            id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
            id_pengelola INT NOT NULL,
            CONSTRAINT fk_id_pengelola_pencarian FOREIGN KEY (id_pengelola) REFERENCES pengelola (id),
            id_produk_pencarian INT NOT NULL,
            CONSTRAINT fk_id_produk_pencarian FOREIGN KEY (id_produk_pencarian) REFERENCES produk_pencarian (id) ON DELETE CASCADE ON UPDATE CASCADE,
            foto_produk VARCHAR(255) DEFAULT NULL,
            created_by BIGINT DEFAULT NULL,
            update_by BIGINT DEFAULT NULL,
            update_at DATETIME DEFAULT NULL,
            created_at DATETIME DEFAULT NULL
         );
         `);
      }
   } catch (error) {
      console.log("foto_produk_pencarian tabel " + error);
   };
};

module.exports = {
   photoProductPencarianTbl
}