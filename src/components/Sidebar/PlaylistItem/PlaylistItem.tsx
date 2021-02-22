import React from 'react'
import PlaylistData from '../../../types/PlaylistData'
import { Container } from './styles'

type IPlaylistProps = {
    playlist: PlaylistData,
}

const PlaylistItem = ({ playlist }: IPlaylistProps) => {
    return (
        <Container>
            {playlist.playlistName}
        </Container>
    )
}

export default PlaylistItem
