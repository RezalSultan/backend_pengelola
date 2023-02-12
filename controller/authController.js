require("dotenv").config();
const jwt = require("jsonwebtoken");
const {query} = require("../config/query");
const pengelolaModel = require("../model/pengelola")

const logoutPengelola = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId

   await pengelolaModel.tokenPengelola({
      token_pengelola : null
   }, pengelolaId)

   res.json({
      message : "anda telah logout"
   })
}


const switchToUser = async (req, res) =>{
   const userId = req.pengelola.userId
   const pengelolaId = req.pengelola.pengelolaId
   const dataUsers = await query(`SELECT email FROM users WHERE id_user='${userId}'`)
   const email = dataUsers[0].email
   try {
      const usersToken = jwt.sign({userId, email}, `${process.env.USERS_TOKEN}`)
      await pengelolaModel.tokenUsers({
         refresh_token : usersToken
         }, userId
      )
      await pengelolaModel.tokenPengelola({
         token_pengelola : null
      }, pengelolaId) 

      res.json({
         message : "Berhasil berganti ke user",
         Authorization: `Bearer ${usersToken}`
      })
   } catch (error) {
      res.status(400).json({
         message : "user tidak ditemukan",
      })
   }
}

module.exports = {
   logoutPengelola,
   switchToUser
}