import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import PalestineAnim from "./PalestineAnimLottie.json";

const LoaderAnim2 = () => {
  const lottieRef = useRef();

  useEffect(() => {
    lottieRef.current.pause();
    setTimeout(() => {
      lottieRef.current.play();
    }, 600);
  }, []);

  return (
    <div className='loader-palestine-lottie'>
      <Lottie
        className='pal-anim'
        animationData={PalestineAnim}
        autoPlay={false}
        loop={false}
        lottieRef={lottieRef}
        // onMouseEnter={() => setReplay(true)}
      />
    </div>
  );
};

export default LoaderAnim2;
