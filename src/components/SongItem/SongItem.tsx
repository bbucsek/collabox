import React from 'react'
import Song from '../../types/Song'
import { Container, SongTitle, AddedBy, VoteCount, VoteButtons, } from './styles'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

type SongProps = {
    song: Song
}

const SongItem = ({ song }: SongProps) => {
    return (
        <Container>
            <SongTitle>
                {song.title}
            </SongTitle>
            <AddedBy>
                {`added by: ${song.userName}`}
            </AddedBy>
            <VoteCount>
                {`votes: ${song.votes}`}
            </VoteCount>
            <VoteButtons>
                <AddIcon />
                <RemoveIcon />
            </VoteButtons>
        </Container>
    )
}

export default SongItem
