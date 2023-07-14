const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema ({
    name: String
});

const listSchema = new mongoose.Schema ({
    name: {
        type: String,
        unique: true
    },
    items: [itemsSchema]
});

module.exports = { 
    Item: mongoose.model("Item", itemsSchema),
    List: mongoose.model("List", listSchema)
};