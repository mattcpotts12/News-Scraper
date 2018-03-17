// Require mongoose orm
var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
    title: {
        type: String,
        // trim: true,
        // required: "Title is Required",
        required: true,
        unique: true
    },

    link: {
        type: String,
        required: true,
        unique: true
    },

    // This saves an array of all the notes as a property of headline scheme.  Refers to the Notes model
    notes: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }

});

// Creates the Headline Model
var Headline = mongoose.model("Headline", HeadlineSchema);

// Export the model
module.exports = Headline;