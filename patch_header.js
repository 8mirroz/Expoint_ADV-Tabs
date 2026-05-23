const fs = require('fs');
const file = './src/components/sections/Header.tsx';
let source = fs.readFileSync(file, 'utf8');

// The goal is to move the Mobile Menu code outside of the `<header>` element
// so it returns a root Fragment: `<> <header> ... </header> <AnimatePresence> ... </AnimatePresence> </>`

// 1. Find the start of `<header` and add `<>` before it.
source = source.replace(/<header\n/g, '<>\n    <header\n');

// 2. We need to find `</header>` at the very end of the component return, and move `<AnimatePresence>` *after* it.
// The easiest way is to match from `<AnimatePresence>` to the end of the file.

const parts = source.split('{/* Luxury Mobile Menu Overlay */}');
if (parts.length === 2) {
    let headerEnd = parts[1].indexOf('</header>');
    // The problem is `</header>` is after the AnimatePresence.
    // Let's just do a manual replacement.
}
