import express from "express";
const router = express.Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/story");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("file", (req, res) => {
    try {
      return res.status(200).send({ message: "file uploaded successfully from multer" });
    } catch (error) {
      console.log("multer error", error);
      return res.status(500).send({ message: "file upload Faild" });
    }
  }),

  (req,res) => {
      return res.status(200).send({ message: "file uploaded successfully" });
  }
);

const upload1 = multer({ storage: storage1 });
router.post(
  "/story",
  upload1.single("file", (req, res) => {
    try {
      return res.status(200).send({ message: "file uploaded successfully" });
    } catch (error) {
      console.log("multer error", error);
    }
  })
);
export default router;
