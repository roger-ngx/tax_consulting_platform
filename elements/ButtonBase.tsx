import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
// import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

function TFButtonBase({children, containerStyle={}, onClick}) {
  const rippleRef = React.useRef(null);

  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };

  return (
    <ButtonBase
      onClick={onClick}    
    >
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          userSelect: 'none',
          ...containerStyle
        }}
      >
        {children}
        {/* <TouchRipple ref={rippleRef} center={false} /> */}
      </div>
    </ButtonBase>
  );
}

export default TFButtonBase;