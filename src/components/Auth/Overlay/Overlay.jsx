import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SlideCard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ $slideDirection }) => 
    $slideDirection === 'right' ? '100%' : 
    $slideDirection === 'left' ? '-100%' : '0'});
  will-change: transform;
`;

const Overlay = ({ children }) => {
  const location = useLocation();
  const [slideDirection, setSlideDirection] = useState('none');
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    // Reset slide direction after animation completes
    const timer = setTimeout(() => {
      setSlideDirection('none');
    }, 500);

    return () => clearTimeout(timer);
  }, [slideDirection]);

  useEffect(() => {
    // Determine slide direction based on route change
    if (location.pathname !== prevPath) {
      if (location.pathname.includes('signup')) {
        setSlideDirection('right');
      } else if (location.pathname.includes('signin')) {
        setSlideDirection('left');
      }
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  return (
    <OverlayContainer>
      <SlideCard $slideDirection={slideDirection}>
        {children}
      </SlideCard>
    </OverlayContainer>
  );
};

export default Overlay;