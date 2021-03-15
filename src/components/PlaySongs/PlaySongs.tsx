import React, { useCallback, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Options as PlayerOptions } from "react-youtube";
import { useSelector,useDispatch  } from "react-redux";
import SkipPreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextIcon from "@material-ui/icons/SkipNextRounded";
import PlayArrowIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import StopIcon from "@material-ui/icons/StopRounded";
import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeOffIcon from "@material-ui/icons/VolumeOffRounded";
import { selectCurrentPlaylist, selectSongs } from "../../store/slices/playlists/selectors";
import { Container,
    ControlWrapper, 
    Title, 
    ButtonCanBeDisabled,
    YoutubeWrapper, 
    Button, 
    Option, 
    Close,
    OptionContainer,
 } from "./styles";
import Song from "../../types/Song";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import Playlist from "../../types/Playlist";
import User from "../../types/User";

type playSongsProps = {
    isParty: boolean,
    closePlayer: () => void,
}

const PlaySongs = (props: playSongsProps) => {
    const {isParty} = props
    const playbackStarted = true;
    const songs = useSelector(selectSongs);
    const currentPlaylist: Playlist = useSelector(selectCurrentPlaylist);
    const currentUser: User = useSelector(selectCurrentUser);
    const isOwner = currentUser.id === currentPlaylist.owner;
    // const [partyOngoing, setPartyOngoing] = useState<boolean>(false);
    // const [partyJoined, setPartyJoined] = useState<boolean>(false);
    // const [playbackStarted, setPlaybackStarted] = useState<boolean>(false);
    const [player, setPlayer] = useState<any | undefined>();
    const [currentSong, setCurrentSong] = useState<Pick<Song, 'youtubeId'| 'title'> | undefined>();
    const [currentSongForwardIndex, setCurrentSongForwardIndex] = useState<number>(0);
    const [currentSongBackwardIndex, setCurrentSongBackwardIndex] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [canSkipForward, setCanSkipForward] = useState<boolean>(true);
    const [canSkipBackWard, setCanSkipBackward] = useState<boolean>(false);
    const [playedSongs, setPlayedSongs] = useState<Pick<Song, 'youtubeId'| 'title'>[]>([]);
    const [canChangeSong, setCanChangeSong] = useState<boolean>(true);
    const dispatch = useDispatch()
    console.log('rerendered/mounted')
    const playerOptions: PlayerOptions = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };

    // const startPlayback = () => {
    //     setPlaybackStarted(true);
    //     if (songs.length === 1) {
    //         setCanSkipForward(false)
    //     }
    // };

    // const startParty = async () => {
    //     if (!currentSong) {
    //         setCurrentSong(songs[0]);
    //     }
    //     dispatch(playlistsAsyncActions.updatePartySong(
    //         {playlistId: currentPlaylist.id, currentSong: {youtubeId: songs[0].youtubeId, title: songs[0].title }}))
    //     // setisParty(true);
    // };

    const endParty =  useCallback( async() => {
        await dispatch(playlistsAsyncActions.endParty(currentPlaylist.id))
    }, [currentPlaylist.id, dispatch])

    // const joinParty = () => {
    //     if (!currentPlaylist.partySong) {
    //         return
    //     }
    //     setPlaybackStarted(true);
    //     // setisParty(true);
    // };

    const onReady = (event: any) => {
        setPlayer(event.target);
        setCanChangeSong(true);
    };

    const onEnd = () => {
        if (currentSong) {
            setPlayedSongs([...playedSongs, {youtubeId: currentSong.youtubeId, title: currentSong.title}]);
        }
        if (!isParty) {
            setCurrentSongForwardIndex(currentSongForwardIndex + 1);
        } 
        setCanChangeSong(true);
    };

    const startPlay = () => {
        player.playVideo();
        setIsPlaying(true);
    };

    const stopPlay = () => {
        player.stopVideo();
        setIsPlaying(false);
    };

    const pausePlay = () => {
        player.pauseVideo();
        setIsPlaying(false);
    };

    const skipToNext = () => {
        if (!currentSong) {
            return;
        }
        setCanSkipBackward(true);

        if (currentSongBackwardIndex === 0 && currentSongForwardIndex < songs.length - 1) {
            setPlayedSongs([...playedSongs, currentSong]);
            setCurrentSongForwardIndex(currentSongForwardIndex + 1);
        } else if (currentSongBackwardIndex > 0) {
            setCurrentSongBackwardIndex(currentSongBackwardIndex - 1);
        }

        if (currentSongBackwardIndex === 0 && currentSongForwardIndex === songs.length - 2) {
            setCanSkipForward(false);
        }

        if (currentSongBackwardIndex === 1 && currentSongForwardIndex === songs.length - 1) {
            setCanSkipForward(false);
        }
        setCanChangeSong(true);
    };

    const skipToPrevious = () => {
        setCanSkipForward(true);
        if (currentSongBackwardIndex < playedSongs.length) {
            setCurrentSongBackwardIndex(currentSongBackwardIndex + 1);
        }
        if (currentSongBackwardIndex === playedSongs.length - 1) {
            setCanSkipBackward(false);
        }
        setCanChangeSong(true);
    };

    const toggleMute = () => {
        if (!isMuted) {
            player.mute()
          }
          if (isMuted) {
            player.unMute()
          }
          setIsMuted(!isMuted)
    };

    const closePlayer = useCallback(() => {
        // setisParty(false)
        // setPlaybackStarted(false)
        // setPlayer(null)
        // setCurrentSongForwardIndex(0)
        // setCurrentSongBackwardIndex(0)
        // setIsMuted(false)
        // setIsPlaying(false)
        // setCanSkipForward(true)
        // setCanSkipBackward(false)
        // setPlayedSongs([])
        // setCanChangeSong(true)
        if (isOwner && isParty) {
            endParty();
        }
        props.closePlayer();
    }, [endParty, isParty, isOwner, props])

    // useEffect(() => {
    //     if (currentPlaylist.partySong) {
    //         setPartyOngoing(true)
    //     } else {
    //         setPartyOngoing(false)
    //     }

    // }, [currentPlaylist])

    // change currentSong during playback and party by owner
    useEffect(() => {
        console.log('I am the culprit')
        if (!songs || !canChangeSong || (isParty && !isOwner)) {
            return;
        }

        if (currentSongBackwardIndex > 0) {
            setCurrentSong(playedSongs[playedSongs.length - currentSongBackwardIndex]);
        } else {
            const playedSongsYoutubeIds = playedSongs.map((playedSong: Pick<Song, 'youtubeId' | 'title'>) => playedSong.youtubeId);
            const notPlayedSongs = songs.filter((song: Song) => !playedSongsYoutubeIds.includes(song.youtubeId));
            setCurrentSong(notPlayedSongs[0]);
            setCanChangeSong(false);
            if (notPlayedSongs.length === 0) {
                closePlayer();
            }
        }
    }, [songs, currentSongBackwardIndex, canChangeSong, playedSongs, isOwner, isParty, 
        currentPlaylist.id, dispatch, playbackStarted, closePlayer]);

    useEffect(() => {
        console.log('I am the culprit in startparty usee')
        const startParty = async () => {
            if(isParty && isOwner && currentSong) {
            await dispatch(playlistsAsyncActions.updatePartySong({playlistId: currentPlaylist.id, currentSong}))
            }
        }
            startParty();
    }, [isParty, isOwner, dispatch, currentSong, currentPlaylist.id])

    useEffect(() => {
        if (!isOwner && isParty && player && currentPlaylist.partySong) {
            const startSecond = (Date.now()-Number(currentPlaylist.partySong.startTime))/1000
            player.loadVideoById(currentPlaylist.partySong.youtubeId, startSecond)
        } else if (!isOwner && isParty && player && !currentPlaylist.partySong) {
            closePlayer();
        }
    }, [currentPlaylist.partySong, isParty, player, isOwner, closePlayer])

    // anybody starts a playback
    useEffect(() => {
        if (!isParty && songs.length === 1) {
            setCanSkipForward(false)
        }
    }, [isParty, songs.length])

    // // owner starts a party
    // useEffect(() => {
    //     console.log('I am the culprit in owner starts a party usee')
    //     if (!isOwner) {
    //         return
    //     }
    //     // if (!currentSong) {
    //     //     setCurrentSong(songs[0]);
    //     // }
    //     if (isParty) {
    //         dispatch(playlistsAsyncActions.updatePartySong(
    //             {playlistId: currentPlaylist.id, currentSong: {youtubeId: songs[0].youtubeId, title: songs[0].title }})) 
    //         }
    // }, [currentPlaylist.id, dispatch, isOwner, isParty, songs])


    // useEffect(() => {
    //     setPlaybackStarted(false)
    //     setisParty(false)
    // }, [currentPlaylist.id])

    // if (!playbackStarted && !isParty) {
    //     return (
    //         <OptionContainer>
    //             <Option onClick={startPlayback} data-testid="playback-button">Listen to the playlist</Option>
    //             {isOwner && <Option onClick={startParty} data-testid="start-party-button">Start a party</Option>}
    //             {!isOwner && partyOngoing && <Option onClick={joinParty} data-testid="join-party-button">Join the party</Option>}
    //         </OptionContainer>
    //     );
    // }

    if (isParty) {
        return (
            <Container data-testid="playback-container-party">
                <Close onClick={closePlayer}/>
            <Title data-testid="party-title">{ currentPlaylist?.partySong?.title}</Title>
            <YoutubeWrapper>
                <YouTube videoId={currentSong?.youtubeId} opts={playerOptions} onReady={onReady} onEnd={onEnd} />
            </YoutubeWrapper>
            <ControlWrapper>
                <Button onClick={toggleMute} data-testid="mute-button">
                    {isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </Button>
            </ControlWrapper>
        </Container>
        )
    }

    return (
        <Container data-testid="playback-container">
            <Close onClick={closePlayer}/>
            <Title data-testid="playback-title">{currentSong?.title}</Title>
            <YoutubeWrapper>
                <YouTube videoId={currentSong?.youtubeId} opts={playerOptions} onReady={onReady} onEnd={onEnd} />
            </YoutubeWrapper>
            <ControlWrapper>
                <ButtonCanBeDisabled onClick={startPlay} disabled={isPlaying}>
                    <PlayArrowIcon />
                </ButtonCanBeDisabled>
                <Button onClick={stopPlay}>
                    <StopIcon />
                </Button>
                <Button>
                    <PauseIcon onClick={pausePlay} />
                </Button>
                <ButtonCanBeDisabled disabled={!canSkipBackWard} data-testid="skip-back">
                    <SkipPreviousIcon onClick={skipToPrevious} />
                </ButtonCanBeDisabled>
                <ButtonCanBeDisabled disabled={!canSkipForward}>
                    <SkipNextIcon onClick={skipToNext} />
                </ButtonCanBeDisabled>
                <Button onClick={toggleMute}>
                    {isMuted ? <VolumeUpIcon  data-testid="unmute-icon"/> : <VolumeOffIcon  data-testid="mute-icon"/>}
                </Button>
            </ControlWrapper>
        </Container>
    );
};

export default PlaySongs;
