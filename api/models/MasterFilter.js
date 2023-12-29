const mongoose = require("mongoose");

const masterTable = new mongoose.Schema({
  typesubcategoryid: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

masterTable.set("Masterfilter", true);

const MasterFilerTable = mongoose.model("masterTable", masterTable);
module.exports = MasterFilerTable;
