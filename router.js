import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Analytics from './components/Analytics.vue';
import SEOSettings from './components/SEOSettings.vue';
import Customization from './components/Customization.vue';
import Subscribers from './components/Subscribers.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/analytics', component: Analytics },
  { path: '/seo-settings', component: SEOSettings },
  { path: '/customization', component: Customization },
  { path: '/subscribers', component: Subscribers },
  // Add other routes here
];

const router = new VueRouter({
  routes,
  mode: 'history', // Use 'history' mode for clean URLs (requires server configuration)
});

export default router;

