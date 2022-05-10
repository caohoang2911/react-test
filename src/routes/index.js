// Layouts

// Pages
import Home from '~/pages/Home';
import ShareVideo from '~/pages/ShareVideo';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/share-video', component: ShareVideo },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
