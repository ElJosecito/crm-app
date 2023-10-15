const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const colegioSchema = new Schema(
  {
    name: { type: String },
    mesa: { type: String },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Colegio", colegioSchema);