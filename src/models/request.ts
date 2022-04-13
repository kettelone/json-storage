import mongoose from "mongoose"
const Schema = mongoose.Schema

const fileSchema = new Schema(
  {
    body: {
      type: Object,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const File = mongoose.model('Files', fileSchema)
export {File}
