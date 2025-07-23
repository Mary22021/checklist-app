import React from "react";
import classNames from "classnames";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "bg-blue-600 text-white py-2 px-4 rounded-2xl hover:bg-blue-700 transition duration-200",
        className
      )}
    >
      {children}
    </button>
  );
}
