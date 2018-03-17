// Require mongoose orm
var mongoose = require("mongoose");
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var NoteSchema = new Schema ({
    
    name: {
        type: String,
        required: true
    },

    body: {
        type: String
    }

    //Mongoose will auto-create ObjectId's that are referenced in other models

});

// Creates the Note Model
var Note = mongoose.model("Note", NoteSchema);

// Export the model
module.exports = Note;