import React from 'react';

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
}

export const Section = ({ children, className = "", id = "", style = {} }: SectionProps) => {
    return (
        <section
            id={id}
            className={`section-padding ${className}`}
            style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                ...style
            }}
        >
            {children}
        </section>
    );
};
