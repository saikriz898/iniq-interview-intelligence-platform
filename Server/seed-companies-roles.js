require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const Company = require('./models/Company');
const Role = require('./models/Role');

const DB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/iniq';

const companies = [
  'Google', 'Microsoft', 'Amazon', 'Atlassian', 'Adobe', 'Zoho', 'Oracle', 'IBM', 'PayPal', 'Postman', 'Razorpay', 'Flipkart', 'Freshworks', 'OpenAI', 'Anthropic', 'Google DeepMind', 'Perplexity', 'Cohere', 'LangChain', 'CrewAI', 'NVIDIA', 'Meta', 'Apple', 'Hugging Face', 'Netflix', 'Uber', 'Airbnb', 'Swiggy', 'Databricks', 'Snowflake', 'LinkedIn', 'AWS', 'Microsoft Azure', 'Google Cloud', 'GitHub', 'GitLab', 'HashiCorp', 'Palo Alto Networks', 'CrowdStrike', 'Cisco', 'Samsung', 'PhonePe', 'Figma', 'Canva', 'Accenture', 'Cognizant', 'Capgemini', 'Salesforce', 'Groww', 'TCS', 'Infosys', 'Wipro', 'HCLTech'
];

const roles = [
  'Frontend Developer', 'React Developer', 'Next.js Developer', 'Angular Developer', 'Vue.js Developer', 'UI Engineer', 'Web Engineer', 'Backend Developer', 'Java Developer', 'Python Developer', 'Node.js Developer', 'Golang Developer', 'API Engineer', 'Microservices Engineer', 'Full Stack Developer', 'Software Engineer', 'Product Engineer', 'Application Engineer', 'SDE-1', 'SDE-2', 'AI Engineer', 'Generative AI Engineer', 'AI Product Engineer', 'Applied AI Engineer', 'AI Systems Engineer', 'AI Agent Developer', 'Agentic AI Engineer', 'Autonomous Systems Engineer', 'AI Workflow Engineer', 'AI Automation Engineer', 'Machine Learning Engineer', 'Deep Learning Engineer', 'NLP Engineer', 'Computer Vision Engineer', 'Research Engineer', 'Data Scientist', 'Data Analyst', 'Business Analyst', 'Analytics Engineer', 'BI Engineer', 'Data Engineer', 'Big Data Engineer', 'ETL Developer', 'Data Platform Engineer', 'Cloud Engineer', 'Cloud Architect', 'Platform Engineer', 'Infrastructure Engineer', 'DevOps Engineer', 'Site Reliability Engineer', 'Release Engineer', 'Infrastructure Automation Engineer', 'Security Engineer', 'SOC Analyst', 'Ethical Hacker', 'Penetration Tester', 'Security Architect', 'Android Developer', 'iOS Developer', 'Flutter Developer', 'React Native Developer', 'Associate Product Manager', 'Product Manager', 'Technical Product Manager', 'UI Designer', 'UX Designer', 'Product Designer', 'Design Researcher', 'QA Engineer', 'Automation Test Engineer', 'SDET', 'Performance Tester', 'MLOps Engineer', 'Technical Product Engineer'
];

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

const seedDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('✅ Connected to MongoDB');

        console.log('Clearing existing Companies and Roles...');
        await Company.deleteMany({});
        await Role.deleteMany({});
        
        console.log(`Seeding ${companies.length} Companies...`);
        const companyDocs = companies.map(name => ({
            name,
            slug: slugify(name),
            status: 'Active'
        }));
        await Company.insertMany(companyDocs);

        console.log(`Seeding ${roles.length} Roles...`);
        const roleDocs = roles.map(name => ({
            name,
            slug: slugify(name),
            status: 'Active'
        }));
        await Role.insertMany(roleDocs);

        console.log('✅ Seed complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
