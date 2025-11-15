import mongoose from 'mongoose'

const ImageHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
      // Allow long strings for base64 encoded images
    },
    imageType: {
      type: String,
      enum: ['upload', 'url'],
      required: true,
    },
    aiProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    realProbability: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    finalResult: {
      type: String,
      enum: ['AI', 'REAL'],
      required: true,
    },
    processingTime: {
      type: Number,
      default: 0,
    },
    imageMetadata: {
      filename: String,
      format: String,
      width: Number,
      height: Number,
    },
  },
  {
    timestamps: true,
  }
)

// Index for faster queries
ImageHistorySchema.index({ userId: 1, createdAt: -1 })
ImageHistorySchema.index({ userEmail: 1, createdAt: -1 })

export default mongoose.models.ImageHistory || mongoose.model('ImageHistory', ImageHistorySchema)

