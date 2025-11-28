
import React, { ElementType } from 'react';

interface HeadingProps {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4;
    style?: React.CSSProperties;
    className?: string;
}

export const Heading = ({ children, level = 2, style = {}, className = '' }: HeadingProps) => {
    const Tag = `h${level}` as ElementType;

    const baseStyles: React.CSSProperties = {
        textTransform: 'uppercase',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
        fontWeight: 900,
    };

    const sizeStyles = {
        1: { fontSize: '15vw' },
        2: { fontSize: '4rem' },
        3: { fontSize: '2.5rem' },
        4: { fontSize: '1.5rem' },
    };

    return (
        <Tag className={className} style={{ ...baseStyles, ...sizeStyles[level], ...style }}>
            {children}
        </Tag>
    );
};

interface TextProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export const Text = ({ children, style = {}, className = '' }: TextProps) => {
    return (
        <p className={className} style={{
            fontSize: '1.1rem',
            lineHeight: 1.6,
            color: '#888',
            ...style
        }}>
            {children}
        </p>
    );
};
