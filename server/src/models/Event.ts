import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: {
    venue: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  organizer: mongoose.Types.ObjectId;
  category: 'workshop' | 'seminar' | 'conference' | 'exhibition' | 'other';
  maxParticipants: number;
  currentParticipants: number;
  isActive: boolean;
  isVirtual: boolean;
  virtualMeetingLink?: string;
  tags: string[];
  image?: string;
  requirements?: string;
  agenda?: string;
  speakers?: Array<{
    name: string;
    title: string;
    organization: string;
    bio?: string;
    image?: string;
  }>;
  sponsors?: Array<{
    name: string;
    logo?: string;
    website?: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time'],
  },
  endTime: {
    type: String,
    required: [true, 'Please add an end time'],
  },
  location: {
    venue: {
      type: String,
      required: [true, 'Please add a venue'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
    },
    state: {
      type: String,
      required: [true, 'Please add a state'],
    },
    zipCode: {
      type: String,
      required: [true, 'Please add a zip code'],
    },
    country: {
      type: String,
      required: [true, 'Please add a country'],
    },
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add an organizer'],
  },
  category: {
    type: String,
    enum: ['workshop', 'seminar', 'conference', 'exhibition', 'other'],
    required: [true, 'Please add a category'],
  },
  maxParticipants: {
    type: Number,
    required: [true, 'Please add maximum participants'],
    min: [1, 'Maximum participants must be at least 1'],
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: [0, 'Current participants cannot be negative'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isVirtual: {
    type: Boolean,
    default: false,
  },
  virtualMeetingLink: String,
  tags: [{
    type: String,
    trim: true,
  }],
  image: String,
  requirements: {
    type: String,
    maxlength: [500, 'Requirements cannot be more than 500 characters'],
  },
  agenda: {
    type: String,
    maxlength: [2000, 'Agenda cannot be more than 2000 characters'],
  },
  speakers: [{
    name: {
      type: String,
      required: [true, 'Please add speaker name'],
    },
    title: {
      type: String,
      required: [true, 'Please add speaker title'],
    },
    organization: {
      type: String,
      required: [true, 'Please add speaker organization'],
    },
    bio: String,
    image: String,
  }],
  sponsors: [{
    name: {
      type: String,
      required: [true, 'Please add sponsor name'],
    },
    logo: String,
    website: String,
  }],
}, {
  timestamps: true,
});

// Index for better query performance
eventSchema.index({ date: 1, isActive: 1 });
eventSchema.index({ category: 1, isActive: 1 });
eventSchema.index({ organizer: 1 });

export const Event = mongoose.model<IEvent>('Event', eventSchema); 