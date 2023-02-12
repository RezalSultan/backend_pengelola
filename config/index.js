const {pengelolaTbl} = require("../model/pengelola")
const {alamatPengelolaTbl} = require("../model/alamatPengelola")
const { productPencarianTbl } = require("../model/productPencarian")
const { photoProductPencarianTbl } = require("../model/photoProductPencarian")
const { productPenjualanTbl } = require("../model/productPenjualan")
const { photoProductPenjualanTbl } = require("../model/photoProductPenjualan")

module.exports = {
   executeTbl:async () => {
      try {
         await pengelolaTbl() ;
         await alamatPengelolaTbl();
         await productPencarianTbl();
         await photoProductPencarianTbl();
         await productPenjualanTbl();
         await photoProductPenjualanTbl();
      } catch (error) {
         console.log(error);
      }
   }
}