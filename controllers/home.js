const Photo = require('../models/Photo');
const User = require('../models/User');

exports.list = async (req, res) => {
    try {
        const sessionID = req.session.userID

        // If session ID
        if (sessionID) {
            // Find user document
            const user = await User.findById(sessionID);

            // Count photo documents of user (excluding profile picture)
            const photoCount = await Photo.find({user_id: user._id, profilePicture: false}).count();
            
            // Count how many times each tag has been used for user
            const tagCountSummaryRef = await Photo
                .aggregate([
                    {
                        $match: { user_id: user._id }
                    },
                    {
                        $lookup: {
                            from: 'tags',  
                            localField: 'tags',  
                            foreignField: '_id',  
                            as: 'tag'
                        }
                    },
                    {
                        $unwind: "$tag"
                    },
                    {
                        $group: {
                            _id: '$tag._id',
                            name: { $first: '$tag.name' },                        
                            total: { $sum: 1 }
                        }
                    }
                ]);
            
            const tagCountSummary = tagCountSummaryRef.map(t => ({ name: t.name, total: t.total }));

            // Find newest photo document for user
            const newestPhoto = await Photo.findOne({user_id: user._id, profilePicture: false}).sort({createdAt: -1}).populate("tags"); 
            
            res.render("index", {member: { 
                user: user, 
                photoCount: photoCount, 
                tagCountSummary: tagCountSummary, 
                newestPhoto: newestPhoto } 
            });
        } else {
            // If not session ID, render page with no member info
            res.render("index", {member: null});
        }
    } catch (e) {
        console.log(e);
        res.status(500).render("error", { error: { message: `could not render page`} });
    }
}