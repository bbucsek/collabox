import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from './styles'
import { selectSongs } from '../../store/slices/playlists/selectors'
import Song from '../../types/Song'
import SongItem from '../SongItem'

const Songlist = () => {

    const songs: Song[] = useSelector(selectSongs)

    return (
        <Container>
            {songs?.map((song) => {
                return <SongItem key={song.id} song={song} />
            })}
        </Container>
    )
}

export default Songlist
