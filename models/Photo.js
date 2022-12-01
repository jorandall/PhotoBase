const mongoose = require("mongoose");
const { Schema } = mongoose;

const photoSchema = new Schema(
    {   
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
        image_url: {type: String, required:[true, 'the photo is required']},
        image_id: {type: String, required: true},
        tags: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Tag" 
        }],
        where: {type: String, required: false},
        when: { type: String, required: false},
        who: { type: String, required: false},
        profilePicture: {type: Boolean, default: false}
    },
    { timestamps: true }
);

photoSchema.index({'$**': 'text'});

module.exports = mongoose.model("Photo", photoSchema);
