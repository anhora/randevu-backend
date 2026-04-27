require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Bağlantısı Başarılı!"))
    .catch(err => console.error("❌ Bağlantı Hatası:", err));

// Veri Modeli
const Randevu = mongoose.model('Randevu', new mongoose.Schema({
    isim: String,
    tarih: String,
    saat: String
}));

// Randevu Alma Yolu
app.post('/randevu-al', async (req, res) => {
    try {
        const yeniRandevu = new Randevu(req.body);
        await yeniRandevu.save();
        res.status(201).send({ mesaj: "Başarıyla kaydedildi!" });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Randevuları Listeleme Yolu
app.get('/randevular', async (req, res) => {
    const liste = await Randevu.find();
    res.send(liste);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda hazır!`));