"use client"

import { useEffect } from 'react'

const ScrollToTopReload = () => {
  useEffect(() => {
    console.log("scrolled to top")
    window.scrollTo(0, 0);
  }, []);

  return null; // no UI needed
}

export default ScrollToTopReload