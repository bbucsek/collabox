import React, { useEffect, useState } from "react";
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
import { Container, ControlWrapper, Title, ButtonCanBeDisabled, YoutubeWrapper, Button, PlaybackButton } from "./styles";
import Song from "../../types/Song";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import Playlist from "../../types/Playlist";
import User from "../../types/User";

const PlaySongs = () => {
    const songs = useSelector(selectSongs);
    const currentPlaylist: Playlist = useSelector(selectCurrentPlaylist);
    const currentUser: User = useSelector(selectCurrentUser);
    const [owner, setOwner] = useState<boolean | null>();
    const [partyOngoing, setPartyOngoing] = useState<boolean>(false);
    const [partyJoined, setPartyJoined] = useState<boolean>(false);
    const [startSecond, setStartSecond] = useState<number>(0);
    const [playbackStarted, setPlaybackStarted] = useState<boolean>(false);
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

    const playerOptions: PlayerOptions = {
        height: "390",
        width: "640",
        playerVars: {
            autoplay: 1,
        },
    };

    const startPlayback = () => {
        setPlaybackStarted(true);
        if (songs.length === 1) {
            setCanSkipForward(false)
        }
    };

    const startParty = async () => {
        if (!currentSong) {
            setCurrentSong(songs[0]);
        }
        await dispatch(playlistsAsyncActions.startParty(
            {playlistId: currentPlaylist.id, currentSong: {youtubeId: songs[0].youtubeId, title: songs[0].title }}))
        console.log("will set party joined to true")
        setPartyJoined(true);
    };

    const joinParty = () => {
        if (!currentSong || !currentPlaylist.partySong) {
            return
        }
        setStartSecond((Date.now()-Number(currentPlaylist.partySong.startTime))/1000)
        setPlaybackStarted(true);
        setPartyJoined(true);
        // await dispatch(playlistsAsyncActions.joinParty({playlistId: currentPlaylist.id, currentSong}))
    };

    const onReady = (event: any) => {
        setPlayer(event.target);
        setCanChangeSong(true);
    };

    const onEnd = () => {
        console.log("song ended")
        if (currentSong) {
            setPlayedSongs([...playedSongs, {youtubeId: currentSong.youtubeId, title: currentSong.title}]);
        }
        if (!partyJoined) {
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

    const mute = () => {
        player.mute();
        setIsMuted(true);
    };

    const unmute = () => {
        player.unMute();
        setIsMuted(false);
    };

    useEffect(() => {
        if (currentUser.id === currentPlaylist.owner) {
            setOwner(true)
        } else {
            setOwner(false)
        }
    }, [currentUser, currentPlaylist])

    useEffect(() => {
        if (currentPlaylist.partySong) {
            setPartyOngoing(true)
        } else {
            setPartyOngoing(false)
        }

    }, [currentPlaylist])

    useEffect(() => {
        if (!songs) {
            return;
        }
        if (!canChangeSong) {
            console.log("cannot change song")
            return;
        }

        if (partyJoined && !owner) {
            return
        }

        const endParty =  async() => {
            await dispatch(playlistsAsyncActions.endParty(currentPlaylist.id))
        }

        if (currentSongBackwardIndex > 0) {
            setCurrentSong(playedSongs[playedSongs.length - currentSongBackwardIndex]);
        } else {
            const playedSongsYoutubeIds = playedSongs.map((playedSong: Pick<Song, 'youtubeId' | 'title'>) => playedSong.youtubeId);
            const notPlayedSongs = songs.filter((song: Song) => !playedSongsYoutubeIds.includes(song.youtubeId));
            console.log("will set canchangesong to false and set currentsong to: ")
            console.log(notPlayedSongs[0])
            setCurrentSong(notPlayedSongs[0]);
            setCanChangeSong(false);
            if (notPlayedSongs.length === 0) {
                console.log("no more songs")
                endParty();
                setPartyJoined(false)
                setPlaybackStarted(false)
                setPlayedSongs([])
                setCanChangeSong(true)
                setIsMuted(false)
                setIsPlaying(false)
            }
        }
    }, [songs, currentSongBackwardIndex, canChangeSong, playedSongs, owner, partyJoined, currentPlaylist.id, dispatch, playbackStarted]);

    useEffect(() => {
        const startParty = async () => {
            if(partyJoined && owner && currentSong) {
            console.log("dispatch partysong")
            await dispatch(playlistsAsyncActions.startParty({playlistId: currentPlaylist.id, currentSong}))
            }
        }
            startParty();
    }, [partyJoined, owner, dispatch, currentSong, currentPlaylist.id])

    useEffect(() => {
        if (!owner && partyJoined && player && currentPlaylist.partySong) {
            console.log('will join')
            player.loadVideoById(currentPlaylist.partySong.youtubeId, startSecond)
        } else if (!owner && partyJoined && player && !currentPlaylist.partySong) {
            setPartyJoined(false)
            setPlaybackStarted(false)
            setIsMuted(false)
            setIsPlaying(false)
            setPlayer(null)
        }

    }, [currentPlaylist.partySong, partyJoined, player, startSecond, owner])

    useEffect(() => {
        setPlaybackStarted(false)
        setPartyJoined(false)
    }, [currentPlaylist.id])

    if (!playbackStarted && !partyJoined) {
        return (
            <>
                <PlaybackButton onClick={startPlayback} data-testid="playback-button">Listen to the playlist</PlaybackButton>
                {owner && <PlaybackButton onClick={startParty} data-testid="start-party-button">Start a party</PlaybackButton>}
                {!owner && partyOngoing && <PlaybackButton onClick={joinParty} data-testid="join-party-button">Join the party</PlaybackButton>}
            </>
        );
    }

    if (partyJoined) {
        return (
            <Container data-testid="playback-container">
            <Title>{ currentPlaylist?.partySong?.title}</Title>
            <YoutubeWrapper>
                <YouTube videoId={currentSong?.youtubeId} opts={playerOptions} onReady={onReady} onEnd={onEnd} />
            </YoutubeWrapper>
            <ControlWrapper>
                <ButtonCanBeDisabled onClick={mute} disabled={isMuted} data-testid="volume-off">
                    <VolumeOffIcon />
                </ButtonCanBeDisabled>
                <ButtonCanBeDisabled onClick={unmute} disabled={!isMuted} data-testid="volume-up">
                    <VolumeUpIcon />
                </ButtonCanBeDisabled>
            </ControlWrapper>
        </Container>
        )
    }

    return (
        <Container data-testid="playback-container">
            <Title>{currentSong?.title}</Title>
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
                <ButtonCanBeDisabled onClick={mute} disabled={isMuted} data-testid="volume-off">
                    <VolumeOffIcon />
                </ButtonCanBeDisabled>
                <ButtonCanBeDisabled onClick={unmute} disabled={!isMuted} data-testid="volume-up">
                    <VolumeUpIcon />
                </ButtonCanBeDisabled>
            </ControlWrapper>
        </Container>
    );
};

export default PlaySongs;
