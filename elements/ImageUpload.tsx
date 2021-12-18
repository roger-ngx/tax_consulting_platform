import React, { useState, useCallback } from 'react';
import { styled } from '@mui/system';
import FeedIcon from '@mui/icons-material/Feed';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import Image from 'next/image';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { CircularProgress } from '@mui/material';

const HorizontalContainer = styled('div')(props => ({
    display: 'flex',
    flexDirection: props.isMine ? 'row-reverse' : 'row',
    alignItems: 'flex-end'
}))

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    padding: 16,
    borderRadius: 4,
    marginRight: 16
})

const Time = styled('span')({
  alignSelf: 'flex-end',
  color: '#888',
  fontSize: 12
})

interface Props {
    src: string;
    progress?: number;
    size: number;
    time: string;
    isMine: boolean;
}

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const ImageUpload: React.FC<Props> = ({src, progress, size=80, time, isMine}) => {

  const [ isZoomed, setZoomed ] = useState(false);

  const handleZoomChange = useCallback(shouldZoom => {
    !shouldZoom && setZoomed(false)
  }, [])

    return (
        <HorizontalContainer isMine={isMine}>
            <div style={{borderRadius: 4}}>
              {
                !isZoomed &&
                <a onClick={() => setZoomed(true)}>
                  <Image
                      src={src}
                      width={size}
                      height={size}
                      objectFit="cover"
                      quality={50}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  />
                </a>
              }
              {
                isZoomed &&
                <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
                  <img
                    src={src}
                  />
                </ControlledZoom>
              }
            </div>
            <CircularProgress variant="determinate" value={progress} size={16}/>
            {
              time && <Time>{time}</Time>
            }
        </HorizontalContainer>
    )
}

export default ImageUpload;