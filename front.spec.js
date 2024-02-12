const fs = require('fs');
const path = require('path');



// Read HTML and CSS files
const htmlFilePath = path.resolve(__dirname, 'index.html');
const cssFilePath = path.resolve(__dirname, 'styles.css');
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
const cssContent = fs.readFileSync(cssFilePath, 'utf8');
let htmlDoc;
// Jest test suite
describe('Rubric Evaluation', () => {
    beforeAll(() => {
        const parser = new DOMParser();
        htmlDoc = parser.parseFromString(htmlContent, 'text/html');
        
    })
    test('1. it should be linked to CSS stylesheet', () => {
        expect(htmlContent).toContain('<link rel="stylesheet" href="styles.css">');
    });
    test('2. it should have a welcome section', () => {
        const welcomeSection = htmlDoc.getElementById('welcome-section');
        expect(welcomeSection).toBeTruthy();
    });
    test('3. it should have a h1 element containing text inside welcome section', () => {
        const welcomeSection = htmlDoc.getElementById('welcome-section');
        const h1Element = welcomeSection.querySelector('h1');
        expect(h1Element).toBeTruthy();
        expect(h1Element.textContent.trim()).not.toBe('');
    });
    test('4. it should have a Projects section with id of projects', () => {
        const projectsSection = htmlDoc.getElementById('projects');
        expect(projectsSection).toBeTruthy();
    });

    test('5. Projects section should contain at least one project title', () => {
        const projectsSection = htmlDoc.getElementById('projects');
        const projectTitles = projectsSection.querySelectorAll('.project-title');
        expect(projectTitles.length).toBeGreaterThan(0);
    });
    test('6. Projects section should contain at least one link', () => {
        const projectsSection = htmlDoc.getElementById('projects');
        const projectLinks = projectsSection.querySelectorAll('a');
        expect(projectLinks.length).toBeGreaterThan(0);
    });
    test('7. Navbar exists with id of navbar', () => {
        const navbar = htmlDoc.getElementById('navbar');
        expect(navbar).toBeTruthy();
    });
    test('8. Navbar shoul contain at least one clickable link', () => {
        const navbar = htmlDoc.getElementById('navbar');
        const navbarLinks = navbar.querySelectorAll('a');
        expect(navbar).toBeTruthy();
        expect(navbarLinks.length).toBeGreaterThan(0);
    });

    test('Profile link exists and opens in a new tab', () => {
        const profileLink = htmlDoc.getElementById('profile-link');
        const src = profileLink.getAttribute('href');
        expect(profileLink).toBeTruthy();
        expect(profileLink.getAttribute('target')).toBe('_blank');
        // expect src to link to github or linkedin
        const alternatives = ["github", "freecodecamp"]
        console.log(alternatives.some(word =>console.log(word)))
        expect(alternatives.some(word =>src.includes(word))).toBe(true)
    });

    test('10. CSS file contains at least one media query', () => {
        expect(cssContent).toMatch(/@media/);
    });


    test('11. Welcome section height is equal to viewport height', () => {
 ;
        // Get height of viewport
        const viewportHeight = window.innerHeight;
        //  const profileLink = htmlDoc.getElementById('profile-link');
        // Get height of welcome section
        const welcomeSection = document.querySelector('#welcome-section');
        if (welcomeSection) {
            // Assert heights are equal
            expect(welcomeSection).toHaveStyle(`height: ${viewportHeight}px`);
        }



    });


    test('12. Navbar is always fixed at the top of the viewport', () => {
        const navbar = htmlDoc.getElementById('navbar');
        const navbarOffsetTop = navbar.getBoundingClientRect().top;
        expect(navbarOffsetTop).toBe(0);
    });
    
 
       
});