import React from 'react'
import PlaylistData from '../../../types/PlaylistData'
import { Container } from './styles'
import { useHistory } from 'react-router-dom'

type IPlaylistProps = {
    playlist: PlaylistData,
}

const PlaylistItem = ({ playlist }: IPlaylistProps) => {

    const history = useHistory();


    const handleClick = () => {
        history.push(`/playlist/${playlist.id}`)
    }

    if (playlist.ownerName) return (
        <Container onClick={handleClick}>
            {playlist.playlistName} by {playlist.ownerName}
        </Container>
    )

    return (
        <Container onClick={handleClick}>
            {playlist.playlistName}
        </Container>
    )
}

export default PlaylistItem
