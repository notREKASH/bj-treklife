const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const verifyToken = require("../middlewares/verifyToken");
const fs = require("fs");

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

// Check File Type

function checkFileType(file, cb) {
  const filetypes = /avif|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype =
    file.mimetype === "image/avif" || file.mimetype === "image/png";

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Erreur: Seulement les images AVIF et PNG sont autorisées !");
  }
}

// @route POST api/upload

router.post("/", upload, (req, res) => {
  if (req.file) {
    const filePath = `https://bj-treklife.vercel.app/uploads/${req.file.filename}`;
    res.json({
      success: true,
      message: "Fichier téléchargé avec succès !",
      fileUrl: filePath,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Erreur: Aucun fichier sélectionné !",
    });
  }
});

// get all fileUrl from database

router.get("/files", (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).json({
        message: "Impossible de lire le répertoire !",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: `https://bj-treklife.vercel.app/uploads/${file}`,
      });
    });

    res.status(200).json(fileInfos);
  });
});

// delete fileUrl from database

router.delete("/files/:name", verifyToken, (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return res.status(500).json({
        message: "Impossible de lire le répertoire !",
      });
    }

    files.forEach((file) => {
      if (file === req.params.name) {
        fs.unlinkSync(`${directoryPath}/${file}`);
        console.log(`${directoryPath}/${file}`);
      }
    });

    res.status(200).json({
      message: "Fichier supprimé avec succès !",
    });
  });
});

module.exports = router;
