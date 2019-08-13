import * as React from 'react';

interface ButtonProps {
  children: JSX.Element[];
  style?: { [cssProp: string]: string };
  onClick: React.MouseEventHandler;
}
export const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  style,
  onClick
}) => {
  return (
    <button onClick={onClick} style={style}>
      {children}
    </button>
  );
};
