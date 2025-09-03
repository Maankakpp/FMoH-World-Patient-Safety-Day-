import mongoose, { Document, Schema } from 'mongoose';

export interface IRegistration extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlist';
  registrationDate: Date;
  attended: boolean;
  feedback?: {
    rating: number;
    comment: string;
    submittedAt: Date;
  };
  dietaryRestrictions?: string;
  specialRequirements?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const registrationSchema = new Schema<IRegistration>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a user'],
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Please add an event'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'waitlist'],
    default: 'pending',
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  attended: {
    type: Boolean,
    default: false,
  },
  feedback: {
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      maxlength: [500, 'Comment cannot be more than 500 characters'],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  dietaryRestrictions: {
    type: String,
    maxlength: [200, 'Dietary restrictions cannot be more than 200 characters'],
  },
  specialRequirements: {
    type: String,
    maxlength: [500, 'Special requirements cannot be more than 500 characters'],
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Please add emergency contact name'],
    },
    phone: {
      type: String,
      required: [true, 'Please add emergency contact phone'],
    },
    relationship: {
      type: String,
      required: [true, 'Please add emergency contact relationship'],
    },
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate registrations
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

// Index for better query performance
registrationSchema.index({ event: 1, status: 1 });
registrationSchema.index({ user: 1, status: 1 });
registrationSchema.index({ registrationDate: 1 });

export const Registration = mongoose.model<IRegistration>('Registration', registrationSchema); 