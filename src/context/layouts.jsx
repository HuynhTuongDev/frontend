import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../shared/Header';
import CopyRight from '../shared/CopyRight';

export const AdminLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet /> {/* Nested admin routes will render here */}
    </main>
    <CopyRight />
  </div>
);

export const UserLayout = () => (
  <div>
    <Header />
    <main>
      <Outlet /> {/* Nested user routes will render here */}
    </main>
    <CopyRight />
  </div>
);
