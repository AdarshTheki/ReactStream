import React, { useEffect, useState } from 'react'
import lazy from "../assets/lazy.jpg";

const Images = ({imgUrl}) => {
  const lazyUrl = `https://image.tmdb.org/t/p/w200/${imgUrl}`; // w500/original
  const originalUrl = `https://image.tmdb.org/t/p/w500/${imgUrl}`; 

  const [imgSrc, setSrc] = useState(lazyUrl || lazy || originalUrl);

  useEffect(() => {
    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      setSrc(originalUrl);
    };
  }, [originalUrl]);

  return (
    <>
      <img src={imgSrc} alt="img" loading='lazy' />
    </>
  )
}

export default Images
