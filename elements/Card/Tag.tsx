import React from 'react';

type Props = {
    colors: string[],
    text: string,
    containerStyle?: object
}

const Tag: React.FC<Props> = ({colors, text, containerStyle={}}) => {

    return (
        <div
            style={{
                padding: '4px 8px',
                display: 'inline-block',
                fontSize: 0,
                backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]})`,
                ...containerStyle
            }}
        >
            <span style={{fontSize: 12, color: 'white', lineHeight: '12px'}}>{text}</span>
        </div>
    )
}

export default Tag;