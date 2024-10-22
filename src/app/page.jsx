'use client';
import React, { useEffect } from "react";

// Next JS Hooks and Components
import { useRouter } from 'next/navigation';
import ProtectedRoute from "./components/ProtectedRoutes";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const menu = JSON.parse(localStorage.getItem('accessRoute'))

    if (menu) {
      if (menu[0] === "company") {
        router.push('/companies');
      } else {
        router.push('/news-letter');
      }
    }
  }, []);
  return (
    <ProtectedRoute>
      <></>
    </ProtectedRoute>
  );
}

export default Home;
