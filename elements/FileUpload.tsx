import React from 'react';
import { styled } from '@mui/system';
import FeedIcon from '@mui/icons-material/Feed';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import CircularProgress from '@mui/material/CircularProgress';
import { IconButton } from '@mui/material';
import { saveAs } from 'file-saver';

const HorizontalContainer = styled('div')(props => ({
    display: 'flex',
    flexDirection: props.isMine ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginRight: props.isMine ? 0 : '20%',
    marginLeft: props.isMine ? '20%' : 0,
    // maxWidth: '80%'
}))

const Container = styled('div')(props => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    // alignSelf: 'flex-start',
    padding: 16,
    borderRadius: 4,
    marginRight: props.isMine ? 0 : 16,
    marginLeft: props.isMine ? 16 : 0,
}))

const Time = styled('span')({
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 12,
    whiteSpace: 'nowrap'
})

interface Props {
    name: string;
    size: string;
    progress?: number;
    downloadUrl?: string|undefined;
    time: string;
    isMine: boolean
}

const FileUpload: React.FC<Props> = ({name, size, progress, time, downloadUrl, isMine}) => {

    const downloadFile = () => {
        saveAs(downloadUrl);
    }

    const dl = (url, filename) => {
        var a = document.createElement('a');
        a.setAttribute('href',url);
        a.setAttribute('download', filename||'');
        document.body.appendChild(a);
        a.onclick = function(){setTimeout(function(){document.body.removeChild(a)},100)}
        a.click();
    }

    return (
        <HorizontalContainer isMine={isMine}>
            <Container isMine={isMine}>
                <span style={{padding: 8, height: 40, borderRadius: '50%', backgroundColor: '#666', marginRight: 4, fontSize: 0}}>
                    <FeedIcon style={{color: 'white'}}/>
                </span>
                <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <span>{name}</span>
                    <span style={{color: '#999'}}>{size}</span>
                </div>

                <IconButton
                    style={{padding: 4, borderRadius: 12, height: 24, backgroundColor: 'white', marginLeft: 8, fontSize: 0}}
                    disabled={!downloadUrl}
                    onClick={downloadFile}
                >
                    <VerticalAlignBottomIcon sx={{width: 16, height: 16}}/>
                </IconButton>
            </Container>
            {
                (progress!=undefined && progress>=0) &&
                <CircularProgress variant="determinate" value={progress} size={16}/>
            }
            {
                time && <Time>{time}</Time>
            }
        </HorizontalContainer>
    )
}

export default FileUpload;