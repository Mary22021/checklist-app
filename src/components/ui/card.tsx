import React from "react";
import classNames from "classnames";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("rounded-2xl shadow-md border border-gray-200 bg-white", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("p-4", className)}>
      {children}
    </div>
  );
}
