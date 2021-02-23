import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from './styles'
import { selectCurrentPlaylistSongs } from '../../store/slices/playlists/selectors'
import Song from '../../types/Song'
import SongItem from '../SongItem'

const Songlist = () => {

    const songs: Song[] = useSelector(selectCurrentPlaylistSongs)

    return (
        <Container>
            {songs?.map((song) => {
                return <SongItem song={song} />
            })}
        </Container>
    )
}

export default Songlist
