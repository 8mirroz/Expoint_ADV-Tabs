const fs = require('fs');
const file = 'src/components/sections/MapSection.tsx';
let data = fs.readFileSync(file, 'utf8');

const search = `    window.ymaps.ready(() => {
      const ymaps = window.ymaps;
      const mapContainer = mapContainerRef.current;
      if (!ymaps || !mapContainer) return;`;

const replace = `    window.ymaps.ready(() => {
      const ymaps = window.ymaps;
      const mapContainer = mapContainerRef.current;
      if (!ymaps || !mapContainer || mapInstance.current) return;`;

if (data.includes(search)) {
  data = data.replace(search, replace);
  fs.writeFileSync(file, data);
  console.log('Fixed async race condition in initMap');
} else {
  console.log('Could not find search string for initMap fix');
}
