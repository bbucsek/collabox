import React from 'react'
import Song from '../../types/Song'
import { Container } from './styles'

type SongProps = {
    song: Song
}

const SongItem = ({ song }: SongProps) => {
    return (
        <Container>
            {song.title}
        </Container>
    )
}

export default SongItem
