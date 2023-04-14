import Photo from "../model/Photo.js";
import fs from "fs";
import multer from "multer";

// image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now());
  },
});

let upload = multer({
  storage: storage,
}).single("image");

const getPhotoForm = async (req, res) => {
  res.render("addForm", { title: "Add Photo" });
};

const addPhoto = async (req, res) => {
  const photo = new Photo({
    name: req.body.name,
    city: req.body.city,
    image: req.file.filename,
  });
  photo
    .save()
    .then((users) => {
      console.log("Data add successfully");
      res.render("get_photo", { users: users });
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { title: "Error" });
    });
};

const deleteAllPhotos = async (req, res) => {
  const deletePhotos = await Photo.deleteMany();
  console.log("Delete All Data");
  res.send("Delete All Data");
};

const getAllPhotos = async (req, res) => {
  await Photo.find()
    .then((users) => {
      res.render("allPhotos", {
        title: "Home Page",
        users: users,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "something went wrong" });
    });
};

const getSinglePhoto = async (req, res) => {
  let id = req.params.id;
  Photo.findById(id)
    .then((users) => {
      res.render("get_photo", { users: users });
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Something went wrong" });
    });
};

const deleteSinglePhoto = async (req, res) => {
  let id = req.params.id;
  Photo.findByIdAndRemove(id)
    .then(() => {
      console.log(`${id} deleted successfully`);
      res.redirect("/getAllPhotos");
    })
    .catch((err) => {
      console.log(err);
      res.json({ msg: "Something went wrong" });
    });
};

export {
  upload,
  getPhotoForm,
  addPhoto,
  deleteAllPhotos,
  getAllPhotos,
  getSinglePhoto,
  deleteSinglePhoto,
};
