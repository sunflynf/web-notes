import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => any;
  disabled?: boolean;
  top?: number;
  left?: number;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  top = 0,
  left = 0,
}: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="zoom-btn"
      style={{ top, left }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
