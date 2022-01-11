import React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import { ButtonProps } from '@mui/material';

type Props = ButtonProps & {
  children: JSX.Element,
  containerStyle?: object
}

const TFButtonBase : React.FC<Props> = ({children, containerStyle, ...props}) => {

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