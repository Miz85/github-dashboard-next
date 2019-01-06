import * as React from 'react';

interface ButtonProps {
  children: JSX.Element[];
  onClick: React.MouseEventHandler;
}
export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  onClick
}) => {
  return (
    <button onClick={onClick} style={{ backgroundColor: 'transparent' }}>
      {children}
    </button>
  );
};
