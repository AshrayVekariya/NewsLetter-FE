'use client';
import React, { useEffect } from "react";

// Next JS Hooks and Components
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login")
  }, []);
  return (
    <div>Vision Infotech</div>
  );
}

export default Home;
