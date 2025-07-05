import React from "react";
import "./Button.css";

interface ButtonProps {
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

export default function Button({ disabled, onClick, children }: ButtonProps) {
    const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            onClick={disabled ? undefined : onClick}
            onKeyDown={handleKey}
            className={`custom-btn${disabled ? " disabled" : ""}`}
        >
            {children}
        </div>
    );
}
