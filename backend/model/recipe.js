const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
  name: { type: String },
  meal: { type: String },
  ingredients: { type: String },
  instructions: { type: String },
  user_id: { type: String },
});

module.exports = model("recipe", recipeSchema);
