#!/usr/bin/env node

/**
 * Setup script for Health Day Server
 * This script helps initialize the server with default data and configurations
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../src/models/User.js';
import { Event } from '../src/models/Event.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/health-day-db';

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

async function createDefaultAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@healthday.com' });
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      return existingAdmin;
    }

    // Create default admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@healthday.com',
      password: 'admin123',
      role: 'admin',
      isEmailVerified: true,
      organization: 'Health Day Organization',
      position: 'System Administrator',
    });

    console.log('✅ Default admin user created');
    console.log('   Email: admin@healthday.com');
    console.log('   Password: admin123');
    console.log('   ⚠️  Please change the password after first login!');
    
    return adminUser;
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  }
}

async function createSampleEvents(adminId) {
  try {
    // Check if sample events already exist
    const existingEvents = await Event.countDocuments();
    if (existingEvents > 0) {
      console.log('ℹ️  Sample events already exist');
      return;
    }

    const sampleEvents = [
      {
        title: 'World Patient Safety Day Conference',
        description: 'Join us for the annual World Patient Safety Day conference featuring keynote speakers, workshops, and networking opportunities focused on improving patient safety worldwide.',
        date: new Date('2024-09-17'),
        startTime: '09:00',
        endTime: '17:00',
        location: {
          venue: 'Grand Conference Center',
          address: '123 Health Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        organizer: adminId,
        category: 'conference',
        maxParticipants: 500,
        currentParticipants: 0,
        isActive: true,
        isVirtual: false,
        tags: ['patient safety', 'healthcare', 'conference'],
        requirements: 'Healthcare professionals, students, and anyone interested in patient safety',
        agenda: '9:00 AM - Opening Ceremony\n10:00 AM - Keynote Speech\n11:30 AM - Panel Discussion\n1:00 PM - Lunch Break\n2:00 PM - Workshops\n4:00 PM - Networking\n5:00 PM - Closing Remarks',
        speakers: [
          {
            name: 'Dr. Sarah Johnson',
            title: 'Chief Medical Officer',
            organization: 'Global Health Institute',
            bio: 'Leading expert in patient safety with over 20 years of experience',
          },
          {
            name: 'Prof. Michael Chen',
            title: 'Professor of Healthcare Management',
            organization: 'University of Health Sciences',
            bio: 'Researcher specializing in healthcare quality improvement',
          },
        ],
        sponsors: [
          {
            name: 'World Health Organization',
            logo: '/sponsors/who-logo.png',
            website: 'https://www.who.int',
          },
          {
            name: 'UNICEF',
            logo: '/sponsors/unicef-logo.png',
            website: 'https://www.unicef.org',
          },
        ],
      },
      {
        title: 'Patient Safety Workshop',
        description: 'Interactive workshop on implementing patient safety protocols in healthcare facilities.',
        date: new Date('2024-09-15'),
        startTime: '14:00',
        endTime: '16:00',
        location: {
          venue: 'Community Health Center',
          address: '456 Medical Plaza',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA',
        },
        organizer: adminId,
        category: 'workshop',
        maxParticipants: 50,
        currentParticipants: 0,
        isActive: true,
        isVirtual: true,
        virtualMeetingLink: 'https://meet.google.com/sample-link',
        tags: ['workshop', 'patient safety', 'healthcare'],
        requirements: 'Healthcare workers and administrators',
        agenda: '2:00 PM - Introduction\n2:15 PM - Safety Protocols\n3:00 PM - Case Studies\n3:45 PM - Q&A\n4:00 PM - Conclusion',
        speakers: [
          {
            name: 'Dr. Emily Rodriguez',
            title: 'Patient Safety Specialist',
            organization: 'Safety First Healthcare',
            bio: 'Certified patient safety professional with expertise in protocol development',
          },
        ],
      },
      {
        title: 'Healthcare Innovation Exhibition',
        description: 'Explore the latest innovations in healthcare technology and patient safety solutions.',
        date: new Date('2024-09-16'),
        startTime: '10:00',
        endTime: '18:00',
        location: {
          venue: 'Innovation Center',
          address: '789 Tech Avenue',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94105',
          country: 'USA',
        },
        organizer: adminId,
        category: 'exhibition',
        maxParticipants: 200,
        currentParticipants: 0,
        isActive: true,
        isVirtual: false,
        tags: ['innovation', 'technology', 'healthcare'],
        requirements: 'Open to all healthcare professionals and technology enthusiasts',
        agenda: '10:00 AM - Exhibition Opens\n12:00 PM - Technology Demonstrations\n2:00 PM - Innovation Talks\n4:00 PM - Networking\n6:00 PM - Exhibition Closes',
        sponsors: [
          {
            name: 'TechHealth Solutions',
            logo: '/sponsors/techhealth-logo.png',
            website: 'https://www.techhealth.com',
          },
        ],
      },
    ];

    await Event.insertMany(sampleEvents);
    console.log('✅ Sample events created');
  } catch (error) {
    console.error('❌ Failed to create sample events:', error);
  }
}

async function setup() {
  console.log('🚀 Setting up Health Day Server...\n');

  try {
    // Connect to database
    await connectDB();

    // Create default admin user
    const adminUser = await createDefaultAdmin();

    // Create sample events
    if (adminUser) {
      await createSampleEvents(adminUser._id);
    }

    console.log('\n✅ Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Test the API: http://localhost:3001/api/health');
    console.log('3. Login with admin credentials to manage events');
    console.log('4. Update environment variables for production');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setup();
} 