'use client';
import React, { useEffect } from "react";

// Next JS Hooks and Components
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const menu = JSON.parse(getCookie('accessRoute'));

    if (menu) {
      router.push(`/${menu[0]}`);
    }
  }, []);
  return (
    <></>
  );
}

export default Home;
