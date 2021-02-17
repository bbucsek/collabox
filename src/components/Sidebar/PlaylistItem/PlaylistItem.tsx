import React from 'react'
import { Container } from './styles'

type IPlaylistProps = {
    name: string,
}

const PlaylistItem = ({ name }: IPlaylistProps) => {
    return (
        <Container>
            {name}
        </Container>
    )
}

export default PlaylistItem
