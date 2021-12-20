import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';

function TFButtonBase({children, containerStyle={}, onClick, disabled}) {

  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      style={containerStyle}
    >
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          userSelect: 'none',
          flex: 1
        }}
      >
        {children}
      </div>
    </ButtonBase>
  );
}

export default TFButtonBase;