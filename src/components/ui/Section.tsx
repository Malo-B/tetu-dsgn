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
            className={className}
            style={{
                padding: "8rem 4rem",
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
