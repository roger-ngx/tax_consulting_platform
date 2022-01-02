import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Avatar, Button, Rating, TextField } from '@mui/material';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
})

const Column = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    flex: 1
})

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#0045D1',
    }
});

const Comment = styled('div')({
    marginTop: 24,
    marginBottom: 24
})

const Reply = styled('div')(

)

const ReplyInput = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
})

const Replied = styled('div')({
    backgroundColor: '#EAEDF2',
    borderRadius: 4,
    padding: 16
})

type RatingProps = {
    name: string;
    time: string;
    rate: number;
}

const ReplyButtons = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8
})

const TFRating: React.FC<RatingProps> = ({name, time, rate}) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column'
        }}
    >
        <span>{name}</span>
        <Horizontal>
            <StyledRating value={rate} readOnly />
            <span style={{marginLeft: 12, fontSize: 12, color: '#888'}}>{time}</span>
        </Horizontal>
    </div>
)

export const ExpertReview = () => {
    const [ showReplyInput, setShowReplyInput ] = useState(false);

    return (
        <Container>
            <Avatar src='/assets/images/profile.png' style={{marginRight: 12}}/>
            <Column>
                <TFRating
                    name='joker'
                    time='1 day ago'
                    rate={4}
                />
                <Comment>
                    Hi, I am very satisfied with his explanation. I recommend him to all.
                </Comment>
                <Reply>
                    {
                        !showReplyInput &&
                        <Button variant='outlined' onClick={() => setShowReplyInput(true)}>
                            Reply
                        </Button>
                    }
                    {
                        showReplyInput &&
                        <ReplyInput>
                            <TextField
                                placeholder='Reply'
                                rows={4}
                                multiline
                                fullWidth
                                InputProps={{style: {padding: 8}}}
                            />
                            <ReplyButtons>
                                <Button variant='outlined' style={{marginRight: 8}}>
                                    Discard
                                </Button>
                                <Button variant='contained'>
                                    Publish
                                </Button>
                            </ReplyButtons>
                        </ReplyInput>
                    }
                </Reply>
            </Column>
        </Container>
    )
}