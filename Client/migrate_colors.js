import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else if (dirPath.endsWith('.jsx')) {
            callback(dirPath);
        }
    });
}

const replacements = [
    { regex: /\b(bg|text|border|ring|divide)-purple-[0-9]+(\/[0-9]+)?\b/g, replacement: (match, p1) => {
        if (match.includes('/')) return `${p1}-accent/${match.split('/')[1]}`;
        return `${p1}-accent`;
    }},
    { regex: /\b(bg|text|border|ring|divide)-blue-[0-9]+(\/[0-9]+)?\b/g, replacement: (match, p1) => {
        if (match.includes('/')) return `${p1}-accent/${match.split('/')[1]}`;
        return `${p1}-accent`;
    }},
    { regex: /\b(bg|text|border|ring|divide)-orange-[0-9]+(\/[0-9]+)?\b/g, replacement: (match, p1) => {
        if (match.includes('/')) return `${p1}-warning/${match.split('/')[1]}`;
        return `${p1}-warning`;
    }},
    { regex: /\bfrom-purple-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
    { regex: /\bvia-purple-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
    { regex: /\bfrom-green-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
    { regex: /\bvia-green-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
    { regex: /\bfrom-amber-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
    { regex: /\bfrom-blue-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
    { regex: /\bfrom-purple-[0-9]+(\/[0-9]+)?\b/g, replacement: '' },
];

walkDir(srcDir, (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    for (const rule of replacements) {
        content = content.replace(rule.regex, rule.replacement);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated secondary colors: ${filePath}`);
    }
});

console.log('Secondary migration complete.');
