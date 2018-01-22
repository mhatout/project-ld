var mongoose = require("mongoose"),
passportLocalMongoose = require("passport-local-mongoose");

var vesselSchema = new mongoose.Schema({
    name : String,
    operation : String,
    status : {type:String, default: "In Progress"},
    supervisor : String,
    purchaser : String,
    reciever : '',
    deliverDate : String,
    eta : String,
    createdBy : String,
    created : {type:Date, default: new Date()}
});

vesselSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Vessel" , vesselSchema);