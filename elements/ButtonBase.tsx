import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';

type Props = {
  children: React.ReactChildren,
  containerStyle?: object
}

const TFButtonBase: React.FC<Props> = ({children, containerStyle={alignSelf: 'flex-start'}, ...props}) => {

  return (
    <ButtonBase
      style={containerStyle}
      {...props}
    >
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          userSelect: 'none',
          flex: 1,
        }}
      >
        {children}
      </div>
    </ButtonBase>
  );
}

export default TFButtonBase;