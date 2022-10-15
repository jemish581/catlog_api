import mongoose from "mongoose";

const productCatlog = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("productCatlog", productCatlog);
