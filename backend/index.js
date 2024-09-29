const express = require("express");
const cors = require("cors");
const sql = require("mssql");
require("dotenv").config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

sql
    .connect(dbConfig)
    .then(() => {
        console.log("Connected to SQL Server");
    })
    .catch((err) => {
        console.error("Database Connection Failed!", err);
    });


app.get("/api/home-data", async (req, res) => {
    const { search } = req.query;
    try {
        let query = `
            SELECT 
                klaim.pp_id, 
                klaim.pp_name, 
                klaim.hk_name, 
                klaim.mf_name, 
                klaim.pp_no_sp, 
                klaim.Status,
                produk.pp_is_deleted
            FROM 
                asabri_peserta..Vw_Riwayat_Klaim klaim
            LEFT JOIN 
                asabri_peserta..peserta_produk produk
            ON 
                klaim.pp_id = produk.pp_id
            WHERE 
                klaim.bp_ktpa = 'BE320104'
        `;

        if (search) {
            query += ` AND (klaim.bp_id LIKE '%${search}%' OR klaim.pp_name LIKE '%${search}%')`;
        }

        const result = await sql.query(query);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


app.put("/api/home-data/:id/hide", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await sql.query`
            SELECT pp_is_deleted 
            FROM asabri_peserta..peserta_produk 
            WHERE pp_id = ${id}
        `;
        
        const isHidden = result.recordset[0].pp_is_deleted;

        if (isHidden) {
            await sql.query`
                UPDATE asabri_peserta..peserta_produk 
                SET pp_is_deleted = null 
                WHERE pp_id = ${id}
            `;
            res.send("Data unhidden successfully");
        } else {
            await sql.query`
                UPDATE asabri_peserta..peserta_produk 
                SET pp_is_deleted = 1 
                WHERE pp_id = ${id}
            `;
            res.send("Data hidden successfully");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});