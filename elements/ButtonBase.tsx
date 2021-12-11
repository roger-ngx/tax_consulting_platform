import React from 'react';
import Button from '@mui/material/Button';
import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

function ButtonBase({children, containerStyle={}}) {
  const rippleRef = React.useRef(null);

  const onRippleStart = (e) => {
    rippleRef.current.start(e);
  };
  const onRippleStop = (e) => {
    rippleRef.current.stop(e);
  };

  return (
      <div
        onMouseDown={onRippleStart}
        onMouseUp={onRippleStop}
        style={{
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          userSelect: 'none',
          ...containerStyle
        }}
      >
        {children}
        <TouchRipple ref={rippleRef} center={false} />
      </div>
  );
}

export default ButtonBase;