const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        // Find user document with matching email
        const user = await User.findOne({ email: req.body.email });
        
        // If no matching email, render page with error message
        if (!user) {
            res.render('login', { errors: { message: 'Email not registered' } })
            return;
        }

        // Check encrypted inputted password is the same as encrypted password on document
        const match = await bcrypt.compare(req.body.password, user.password);

        // If the same, start a user session
        if (match) {
            req.session.userID = user._id;
            console.log(req.session.userID);
            res.redirect('/');
            return;
        }

        // If not, render page with error message
        res.render('login', { errors:{ message: 'Incorrect password' } })

    } catch (e) {
        console.log(e);
        res.status(500).render("error", { error: { message: `could not find user `} });
      }
}

exports.register = async (req, res) => {
    try {
        // Check email is not already registered
        const checkEmail = await User.findOne({ email: req.body.email });
        // If it is, render page with error message
        if (checkEmail) {
            res.render('register', { errors: { message: 'Email address already registered' } })
            return;
        }

        // Else, create a new user document
        const user = new User({ 
            name: {
                first: req.body.firstName, 
                last: req.body.lastName
            }, 
            email: req.body.email, 
            password: req.body.password, 
        });

        await user.save();
        req.session.userID = user._id;
        console.log(req.session.userID);
        res.redirect('/');

    } catch (e) {
        console.log(e);
        res.status(500).render("error", { error: { message: `could not add user`} });
      }
}

exports.account = (req, res) => {
    const message = req.query.message
    res.render("account", { errors: {}, message: message })
  }

exports.updatePassword = async (req, res) => {
    try {
        // Find user document with matching ID
        const user = await User.findById(req.session.userID);
        // Check encrypted inputted password is the same as encrypted password on document
        const match = await bcrypt.compare(req.body.oldPassword, user.password);

        // If passwords match
        if (match) {
            // Hash new password
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            // Update user document with new password
            await User.updateOne({ _id: req.session.userID }, { password: hashedPassword });
            res.redirect('/account/?message=Password has been updated');
        // Else, render page with error message           
        } else {
            res.render('account', { errors: { password: {  message: "Current password is incorrect" } } , message:null })  
        }
    } catch (e) {
        console.log(e);
        res.status(500).render("error", { error: { message: `could not update password`} });
      }
  };