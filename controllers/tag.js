const Tag = require('../models/Tag');

exports.create = async (req, res) => {
    try {
        // Check tag doesn't already exist for that user
        const checkTag = await Tag.findOne({ name: req.body.name, $or: [{user_id: null}, {user_id: req.session.userID}]});
        // If it does, render page with error
        if (checkTag) {
            res.render('account', { errors: {tag: { message: 'Tag already exists' } }, message: null })
            return;
        }
        
        // Else, create a new tag document
        const tag = new Tag({ name: req.body.name, user_id: req.session.userID });
        await tag.save();
        res.redirect('account/?message=Tag has been saved')
    } catch (e) {
        console.log(e);
        res.status(500).render("error", { error: { message: `could not add tag`} });
    }
}