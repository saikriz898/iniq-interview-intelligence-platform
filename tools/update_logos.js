const fs = require('fs');
const path = require('path');

const files = [
    'frontend/src/components/admin/AdminNavbar.jsx',
    'frontend/src/components/common/InternalPreloader.jsx',
    'frontend/src/components/mobile/MobileDrawer.jsx',
    'frontend/src/components/mobile/MobileFooter.jsx',
    'frontend/src/components/mobile/MobileHeader.jsx',
    'frontend/src/components/mobile/MobilePreloader.jsx',
    'frontend/src/components/public/PublicFooter.jsx',
    'frontend/src/components/public/PublicNavbar.jsx',
    'frontend/src/components/public/PublicPreloader.jsx',
    'frontend/src/components/user/UserNavbar.jsx',
    'frontend/src/layouts/InternalAppShell.jsx',
    'frontend/src/layouts/SupportAppShell.jsx',
    'frontend/src/pages/auth/LoginPage.jsx',
    'frontend/src/pages/auth/RegisterPage.jsx',
    'frontend/src/pages/public/ExperienceOverviewPage.jsx',
    'frontend/src/pages/public/RoundDetailsPage.jsx'
];

files.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/\/assets\/logos\/logo-dark\.svg/g, '/assets/logos/logo-dark.png');
        content = content.replace(/\/assets\/logos\/logo\.svg/g, '/assets/logos/logo.png');
        content = content.replace(/\/assets\/logos\/logo-monochrome\.svg/g, '/assets/logos/logo-monochrome.png');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`File not found: ${file}`);
    }
});
