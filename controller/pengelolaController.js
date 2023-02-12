require("dotenv").config();
const {query} = require("../config/query");
const jwt = require("jsonwebtoken");
const pengelolaModel = require("../model/pengelola")
const alamatPengelolaModel = require("../model/alamatPengelola")

const getAllPengelola= async (req, res) => {
   try {
      const data = await query('SELECT id_pengelola, id_users, fullname_users, nama_pengelola, no_hp_pengelola, no_rekening, email_pengelola, foto_pengelola from pengelola');
      const alamat = await query(`SELECT * from alamat_pengelola`)

      res.status(200).json({
         message : "GET all pengelola succes",
         data : data,
         alamat : alamat
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror",
         serverMessage : error
   })
   }
}

const getPengelolaById = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   try {
      const data = await query(`SELECT id_pengelola, id_users, fullname_users, nama_pengelola, no_hp_pengelola, no_rekening, email_pengelola, foto_pengelola from pengelola WHERE id_pengelola=${pengelolaId}`);
      const alamat = await query(`SELECT * from alamat_pengelola WHERE id_pengelola=${pengelolaId}`)

      res.status(200).json({
         message : "GET pengelola succes",
         data : data,
         alamat : alamat
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror",
         serverMessage : error
   })
   }
}

const registerPengelola = async (req, res) => {
   const emailUser = req.user.email
   const userId = req.user.userId
   const dataUser = await query(`SELECT * FROM users WHERE email='${emailUser}'`)
   const fullname = dataUser[0].fullname
   const {body} = req
   const namaPengelola = body.nama_pengelola
   try {
      const dataPengelola = await pengelolaModel.addProfilePengelola(body, fullname, userId)
      const pengelolaId = dataPengelola.insertId
      await alamatPengelolaModel.addAlamatPengelola(body, pengelolaId)

      const pengelolaToken = jwt.sign({userId, pengelolaId, namaPengelola}, `${process.env.PENGELOLA_TOKEN}`)
      await pengelolaModel.tokenPengelola({
         token_pengelola : pengelolaToken
         }, pengelolaId
      )

      await pengelolaModel.tokenUsers({
         refresh_token : null
      }, userId)

      res.status(201).json({
         message : "Anda berhasil mendaftar sebagai pengelola",
         data : body,
         Authorization: `Bearer ${pengelolaToken}`
      })
   } catch (error) {
      console.log(error)
      res.status(500).json({
         message : "Data Anda Kurang"
      })
   }
}

const updateProfilePengelola = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const userId = req.pengelola.userId
   const {body} = req
   try {
      await pengelolaModel.updateProfilePengelola(body, pengelolaId)
      await query(`UPDATE users SET fullname='${body.fullname}' WHERE id_user=${userId}`)
      res.status(201).json({
         message : "UPDATE pengelola succes",
         data : {
            id_pengelola : pengelolaId,
            ...body
         }
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror"
      })
   }
}

const updateAlamatPengelola = async (req, res) => {
   const pengelolaId = req.pengelola.pengelolaId
   const {body} = req
   try {
      await alamatPengelolaModel.updateAlamatPengelola(body, pengelolaId)

      res.status(201).json({
         message : "UPDATE pengelola succes",
         data : {
            id_pengelola : pengelolaId,
            ...body
         }
      })
   } catch (error) {
      res.status(500).json({
         message : "Server eror"
      })
   }
}

module.exports = {
   getAllPengelola,
   getPengelolaById,
   registerPengelola,
   updateProfilePengelola,
   updateAlamatPengelola
}