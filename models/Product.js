const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide product name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpeg",
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
    enum: ["pomdade", "other"],
  },
  company: {
    type: String,
    required: [true, "Please provide product company"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  hold: {
    type: String,
    required: [true, "Please provide pomade hold"],
    enum: ["light, medium, strong"],
  },
  type: {
    type: String,
    required: [true, "Please provide pomade type"],
    enum: ["oil, water, clay, wax, other"],
  },
  scent: {
    type: String,
    required: [true, "Please provide pomade scent"],
    maxlength: [100, "Name cannot be more than 1000 characters"],
  },
});
