const Photo = require('../models/Photo');
const User = require('../models/User');
const Tag = require('../models/Tag')
const cloudinary = require("../utils/cloudinary")


exports.get = async (req, res) => {
  try {
    // Find all tags without a user ID, or where user ID is the session user ID
    const tags = await Tag.find({ $or: [{user_id: null}, {user_id: req.session.userID}]});
    const message = req.query.message;
    res.render("add-photo", { tags: tags, errors: {}, message: message });
  } catch (e) {
      console.log(e);
      res.status(500).render("error", { error: { message: `could not render page`} });
  }
}

exports.create = async (req, res) => {
  var uploadResult;

  // Upload photo to cloudinary
  try {
      uploadResult = await cloudinary.uploader.upload(req.file.path); 
  } catch (e) {
      console.log(e);
      res.status(503).render("error", { error: { message: `could upload photo to photo storage`} });
  }

  // If successfully uploaded, create new photo document
  try {
    await Photo.create({
      user_id: req.session.userID,
      image_url: uploadResult.secure_url,
      image_id: uploadResult.public_id,
      tags: req.body.tags,
      where: req.body.where,
      when: req.body.when,
      who: req.body.who,
    });

    res.redirect('/add-photo/?message=Photo successfully added');

  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not add photo`} });
  }
}

exports.list = async (req, res) => {
  const perPage = 5;
  const limit = parseInt(req.query.limit) || 5;
  const page = parseInt(req.query.page) || 1;
  const message = req.query.message;

  try {
    // Find all photos that has the session user ID and are not the profile picture
    const photos = await Photo
      .find({user_id: req.session.userID, profilePicture: false})
      .populate("tags")
      .skip((perPage * page) - perPage)
      .limit(limit);

    // If photos have been found, work out pages for pagination before rendering
    if(photos.length > 0){
      const count = await Photo.find({user_id: req.session.userID, profilePicture: false}).count();
      const numberOfPages = Math.ceil(count / perPage);

      res.render("gallery", {
        photos: photos,
        numberOfPages: numberOfPages,
        currentPage: page,
        message: message,
        errors: {}
      });
    } else {
      // If 0 photos found, render page with error message
      res.render("gallery", { 
        photos: null,
        numberOfPages: null,
        currentPage: null,
        message: message,
        errors: {message: "You do not have any photos"} });
    }
  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not list photos`} });
  }
};

exports.display = async(req, res) => {
  const id = req.params.id;
  try {
    // Find photo document with matching ID
    const photo = await Photo.findById(id);
    res.render("photo-popout", {photo: photo});
  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not display photo`} });
  }
};
  

exports.delete = async (req, res) => {
  const id = req.params.id;
  var photo;

  try {
    // Find photo document with matching ID
    photo = await Photo.findById(id);
  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not find photo`} });
  }

  try {
    // Delete from cloudinary
    await cloudinary.uploader.destroy(photo.image_id)
  } catch (e) {
    console.log(e);
    res.status(503).render("error", { error: { message: `could delete photo from photo storage`} });
  }

  try{
    // Delete photo document
    await photo.remove()
    res.redirect("/gallery?message=Photo deleted");
  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not delete photo`} });
  }
};

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    // Find photo document with matching ID
    const photo = await Photo.findById(id);
    // Find all tags without a user ID, or where user ID is the session user ID
    const tags = await Tag.find({ $or: [{user_id: null}, {user_id: req.session.userID}]});
    res.render("edit-photo", { errors:{}, photo: photo, id: id, tags: tags });
  } catch (e) {
    if (e.errors) console.log(e);
    res.status(500).render("error", { error: { message: `could not find photo`} });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    // Update photo document with matching ID
    await Photo.updateOne({ _id: id }, req.body);
    res.redirect("/gallery?message=Photo updated");
  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not update photo`} });
  }
};

  
exports.profilePicture = async (req, res) => {
  try {
      // Find user by session ID
    const user = await User.findById(req.session.userID);

    // Check to see if user already has a profile picture
    if (user.profilePicture){
      // If they do, find the photo document
      let currentPhoto = await Photo.findOne({ user_id: user._id, profilePicture: true });
      // Delete photo from cloudinary
      await cloudinary.uploader.destroy(currentPhoto.image_id);
      // Delete photo from document
      await currentPhoto.remove();
    } 
    
    // Upload new photo to cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path); 

    if (uploadResult){
      // Create new photo document
      const photo = await Photo.create({
        user_id: user._id,
        image_url: uploadResult.secure_url,
        image_id: uploadResult.public_id,
        profilePicture: true
      });

      // Update user document with new photo image url
      await user.updateOne({ profilePicture: photo.image_url });
      res.redirect('/account/?message=Profile picture added');
    }
    else {
        res.render('account', { errors: {message: "Could not upload image" }, message:null });
    }
    
  } catch (e) {
    console.log(e);
    res.status(500).render("error", { error: { message: `could not add profile picture`} });
  }
};