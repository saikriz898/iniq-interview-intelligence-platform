require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Company = require('../models/Company');
const Role = require('../models/Role');
const Experience = require('../models/Experience');

const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iniq';

const seedData = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Role.deleteMany({});
        await Experience.deleteMany({});
        console.log('🧹 Cleared existing data');

        // 2. Seed Users
        const admin = await User.create({
            name: 'INIQ Admin',
            email: 'admin@iniq.com',
            password: 'admin123',
            role: 'admin'
        });

        const user = await User.create({
            name: 'Raghuram G',
            email: 'user@iniq.com',
            password: 'user123',
            role: 'user'
        });
        console.log('👤 Seeded Users');

        // 3. Seed Companies
        const companiesData = [
            { name: 'Google', slug: 'google', industry: 'Technology', website: 'https://google.com', logo: 'https://www.vectorlogo.zone/logos/google/google-icon.svg' },
            { name: 'Microsoft', slug: 'microsoft', industry: 'Technology', website: 'https://microsoft.com', logo: 'https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg' },
            { name: 'Amazon', slug: 'amazon', industry: 'E-commerce', website: 'https://amazon.com', logo: 'https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg' },
            { name: 'Meta', slug: 'meta', industry: 'Social Media', website: 'https://meta.com', logo: 'https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg' },
            { name: 'Netflix', slug: 'netflix', industry: 'Entertainment', website: 'https://netflix.com', logo: 'https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg' }
        ];
        const companies = await Company.insertMany(companiesData);
        console.log('🏢 Seeded Companies');

        // 4. Seed Roles
        const rolesData = [
            { name: 'Software Development Engineer', slug: 'sde' },
            { name: 'Frontend Engineer', slug: 'frontend-engineer' },
            { name: 'Backend Engineer', slug: 'backend-engineer' },
            { name: 'Full Stack Developer', slug: 'full-stack-developer' },
            { name: 'Data Scientist', slug: 'data-scientist' }
        ];
        const roles = await Role.insertMany(rolesData);
        console.log('💼 Seeded Roles');

        // 5. Seed Experiences
        const experiencesData = [
            {
                user: user._id,
                companyId: companies[0]._id,
                companyName: 'Google',
                companyLogo: companies[0].logo,
                role: 'Software Development Engineer',
                experienceLevel: 'Entry Level',
                candidateExperience: 0,
                location: 'Mountain View, CA',
                verdict: 'Selected',
                summary: 'A challenging 5-round interview process focusing heavily on DSA and Googley-ness.',
                processOverview: 'Applied through referral. Had 1 screening round followed by 4 on-site rounds.',
                difficulty: 'Hard',
                status: 'Approved',
                isVerified: true,
                isFeatured: true,
                topics: [
                    { name: 'Graphs', importance: 5 },
                    { name: 'Dynamic Programming', importance: 4 }
                ],
                rounds: [
                    { number: 1, title: 'Phone Screening', desc: 'Discussed resume and a medium-level Array problem.', details: 'Merge intervals variation.' },
                    { number: 2, title: 'Coding Round 1', desc: 'Graph traversal problem related to network latency.', details: 'Dijkstra algorithm variation.' },
                    { number: 3, title: 'Googley-ness Round', desc: 'Behavioral interview focusing on leadership and conflict resolution.', details: 'Standard STAR method questions.' }
                ]
            },
            {
                user: user._id,
                companyId: companies[1]._id,
                companyName: 'Microsoft',
                companyLogo: companies[1].logo,
                role: 'Full Stack Developer',
                experienceLevel: 'Mid Level',
                candidateExperience: 3,
                location: 'Redmond, WA',
                verdict: 'Selected',
                summary: 'Very structured interview rounds focusing on both system design and coding.',
                processOverview: 'Recruiter reached out via LinkedIn. 1 Technical screening + 3 rounds of interviews.',
                difficulty: 'Medium',
                status: 'Approved',
                rounds: [
                    { number: 1, title: 'Technical Screening', desc: 'JavaScript and React core concepts.', details: 'Closures, Event Loop, and Hooks.' },
                    { number: 2, title: 'System Design', desc: 'Design a scalable notification system.', details: 'Focused on message queues and push notifications.' }
                ]
            },
            {
                user: user._id,
                companyId: companies[2]._id,
                companyName: 'Amazon',
                companyLogo: companies[2].logo,
                role: 'Backend Engineer',
                experienceLevel: 'Senior Level',
                candidateExperience: 5,
                location: 'Seattle, WA',
                verdict: 'Rejected',
                summary: 'Heavy focus on Leadership Principles and LLD.',
                processOverview: 'Online Assessment followed by 4 virtual on-site rounds.',
                difficulty: 'Hard',
                status: 'Approved',
                rounds: [
                    { number: 1, title: 'Online Assessment', desc: 'Two coding problems and a work simulation.', details: 'Heap and Hashmap problems.' },
                    { number: 2, title: 'Bar Raiser Round', desc: 'Focus on deep technical knowledge and cultural fit.', details: 'Detailed discussion on previous projects.' }
                ]
            }
        ];
        await Experience.insertMany(experiencesData);
        console.log('📝 Seeded Experiences');

        console.log('✨ All data seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
