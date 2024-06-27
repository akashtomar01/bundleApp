import { createRoot } from 'react-dom/client';

import App from "./App";
import "swiper/css"
import "swiper/css/navigation";

const root = createRoot(document.getElementById('app'));

root.render(<App />);



// // Clear the existing HTML content
// document.body.innerHTML = '<div id="app"></div>';

// // Render your React component instead

// root.render(<h1>Hello, world</h1>);
