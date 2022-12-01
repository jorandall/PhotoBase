const Photo = require('../../models/Photo');
const Tag = require('../../models/Tag');

exports.get = async (req, res) => {
    try {
        // Find all tags without a user ID, or where user ID is the session user ID
        const tags = await Tag.find({ $or: [{user_id: null}, {user_id: req.session.userID}]})
        res.render("search-photos", { tags: tags })
    } catch (e) {
        console.log(e);
        res.status(500).render("error", { error: { message: `could not render page`} });
      }
  }

exports.list =  async (req,res) => {
    
    // Read in parameters
    const searchQuery = req.query.search;
    const searchType = req.query.type;

    // Check not empty query
    if (!searchQuery) {
        res.json([]);
    }

    let Result;

    // If searching by keyword
    if (searchType == "keyword"){
        try {
            // Find photo documents that match the param text value
            Result =  await Photo.find({   
                    user_id: req.session.userID,
                    $text: { $search: searchQuery}
                }, { score: { $meta: "textScore" } })
            .populate("tags")
            .sort( { score: { $meta: "textScore" } } )
            .limit(50)
            
        } catch (e) {
            console.log(e);
            res.status(500).render("error", { error: { message: `could not perform ${searchType} search`} });
        }
    }

    // If searching by tag
    if (searchType == "tag"){
        try {
            // Find photo documents that match the param tag ID
            Result =  await Photo.find({   
                        tags: {
                        $in: [searchQuery]} })
            .populate("tags")
            .limit(50)
            
        } catch (error) {
            console.log(e);
            res.status(500).render("error", { error: { message: `could not perform ${searchType} search`} });
        }
    }

    res.json(Result);
}