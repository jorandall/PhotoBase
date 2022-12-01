const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is required'] },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);