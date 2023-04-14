import express from "express";
const router = express.Router();
import {
  upload,
  getPhotoForm,
  addPhoto,
  deleteAllPhotos,
  getAllPhotos,
  getSinglePhoto,
  deleteSinglePhoto,
} from "../controller/photoController.js";

router.get("/", getPhotoForm);

router.post("/add", upload, addPhoto);

router.get("/delete", deleteAllPhotos);

router.get("/getAllPhotos", getAllPhotos);

router.get("/show/:id", getSinglePhoto);

router.get("/delete/:id", deleteSinglePhoto);

export default router;
