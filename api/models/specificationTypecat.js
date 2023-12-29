const mongoose = require("mongoose");

const specificationTypecatSchema = new mongoose.Schema({
    specification_id: {
        type: mongoose.Schema.ObjectId,
        require: true,
    },
    values: [{
        type: String,
        required: true,
    }],
});

specificationTypecatSchema.set("specificationTypecatSchema", true);

const speccificationsubcatetable = mongoose.model("specificationOFtypesubcat", specificationTypecatSchema);

module.exports = speccificationsubcatetable;
