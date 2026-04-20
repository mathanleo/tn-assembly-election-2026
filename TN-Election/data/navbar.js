// ============================================
// data/navbar.js
// All navbar content lives here.
// Freshers: Only edit this file to change
// navbar text, links or image paths.
// ============================================
var prefixPath = (location.href.search("pages") != -1) ? "" : "pages/";
const navbarData = {

    // --- Logo (Top Left) ---
    logo: {
        image: "../assets/images/navbar/tn-election-logo.svg",
        title: "TN Election 2026",
        subtitle: "Tamilnadu Legislative Assembly"
    },

    // --- Navigation Links ---
    // "active" means which page is currently highlighted.
    // Each page sets its own active link (see navbar.js)
    links: [
        { label: "Home", href: "index.html" },
        { label: "Candidates", href: `${prefixPath}candidates.html` },
        { label: "Big Fights", href: `${prefixPath}bigfights.html` },
        { label: "2021 Results", href: `${prefixPath}results.html` }
    ],

    // --- Brand (Top Right) ---
    brand: {
        image: "../assets/images/navbar/gradious-logo.svg",
        title: "Gradious",
        subtitle: "An Educational Initiative"
    }

};
