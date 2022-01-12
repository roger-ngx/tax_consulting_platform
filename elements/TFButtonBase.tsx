import React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/material';

type Props = ButtonProps & {
  children: JSX.Element,
  containerStyle?: object,
  component?: string
}

const TFButtonBase : React.FC<Props> = ({children, containerStyle, ...props}) => {

  return (
    <Button
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
    </Button>
  );
}

export default TFButtonBase;