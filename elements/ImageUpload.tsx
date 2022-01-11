import React, { useState, useCallback } from 'react';
import { styled } from '@mui/system';
import Image from 'next/image';
import { CircularProgress } from '@mui/material';
import { isEmpty } from 'lodash';

import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const HorizontalContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
})

type C = {
  isMine?: boolean
}
const Container = styled('div')<C>(props => ({
  display: 'flex',
  flexDirection: props.isMine ? 'row-reverse' : 'row',
  alignItems: 'flex-end'
}))

const Time = styled('span')({
  alignSelf: 'flex-end',
  color: '#888',
  fontSize: 12,
})

const Anchor = styled('a')({
  cursor: 'pointer',
  marginRight: 12,
  fontSize: 0,
  borderRadius: 4,
  overflow: 'hidden'
})

interface Props {
    src: string;
    progress?: number;
    size?: number;
    time?: string;
    isMine?: boolean;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#eee" offset="20%" />
      <stop stop-color="#fff" offset="50%" />
      <stop stop-color="#eee" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#eee" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const ImageUpload: React.FC<Props> = ({src, progress, size=80, time, isMine}) => {

  const [ isZoomed, setZoomed ] = useState(false);

  const handleZoomChange = useCallback(shouldZoom => {
    !shouldZoom && setZoomed(false)
  }, [])

    return (
        <Container isMine={isMine}>
            <HorizontalContainer>
              {
                !isZoomed &&
                <Anchor
                  onClick={() => setZoomed(true)}
                >
                  <Image
                      src={src}
                      width={size}
                      height={size}
                      objectFit="cover"
                      quality={50}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  />
                </Anchor>
              }
              {
                isEmpty(time) &&
                <CircularProgress variant="determinate" value={progress} size={16}/>
              }
            </HorizontalContainer>

            <div style={{display: isZoomed ? '' : 'none'}}>
              <figure>
                <ControlledZoom
                  isZoomed={isZoomed}
                  onZoomChange={handleZoomChange}
                  transitionDuration={0}
                >
                  <img
                    src={src}
                  />
                </ControlledZoom>
              </figure>
            </div>
            {
              time && <Time>{time}</Time>
            }
        </Container>
    )
}

export default ImageUpload;