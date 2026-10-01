import React from 'react';
import { Outlet } from 'react-router-dom';
import StorefrontNavbar from './StorefrontNavbar';
import StorefrontFooter from './StorefrontFooter';

const StorefrontLayout = () => (
  <div className="storefront-shell">
    <StorefrontNavbar />
    <main className="storefront-main">
      <Outlet />
    </main>
    <StorefrontFooter />
  </div>
);

export default StorefrontLayout;