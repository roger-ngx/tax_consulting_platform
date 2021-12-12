import React from 'react';

const Banner = () => {

    return (
        <div
            style={{
                width: '100%',
                textAlign: 'center',
                height: 200,
                backgroundImage: 'linear-gradient(to bottom right, #002B87, #0045D1)'
            }}
        >
            <img style={{height: 72, marginTop: 50}} src='/assets/images/header_text.png' />
        </div>
    )
}

export default Banner;