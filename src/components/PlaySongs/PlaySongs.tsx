import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Options as PlayerOptions } from "react-youtube";
import { useSelector } from "react-redux";
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

const PlaySongs = () => {
    const songs = useSelector(selectSongs);
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const [playbackStarted, setPlaybackStarted] = useState<boolean>(false);
    const [player, setPlayer] = useState<any | undefined>();
    const [currentSong, setCurrentSong] = useState<Song | undefined>();
    const [currentSongForwardIndex, setCurrentSongForwardIndex] = useState<number>(0);
    const [currentSongBackwardIndex, setCurrentSongBackwardIndex] = useState<number>(0);
    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [canSkipForward, setCanSkipForward] = useState<boolean>(true);
    const [canSkipBackWard, setCanSkipBackward] = useState<boolean>(false);
    const [playedSongs, setPlayedSongs] = useState<Song[]>([]);
    const [canChangeSong, setCanChangeSong] = useState<boolean>(true);
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

    const onReady = (event: any) => {
        setPlayer(event.target);
        setCanChangeSong(true);
    };

    const onEnd = () => {
        if (currentSong) {
            setPlayedSongs([...playedSongs, currentSong]);
        }
        setCurrentSongForwardIndex(currentSongForwardIndex + 1);
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
        if (!songs) {
            return;
        }
        if (!canChangeSong) {
            return;
        }

        if (currentSongBackwardIndex > 0) {
            setCurrentSong(playedSongs[playedSongs.length - currentSongBackwardIndex]);
        } else {
            const playedSongsYoutubeIds = playedSongs.map((playedSong: Song) => playedSong.youtubeId);
            const notPlayedSongs = songs.filter((song: Song) => !playedSongsYoutubeIds.includes(song.youtubeId));
            setCurrentSong(notPlayedSongs[0]);
        }

        setCanChangeSong(false);
    }, [songs, currentSongForwardIndex, currentSongBackwardIndex, canChangeSong, playedSongs]);

    useEffect(() => {
        setPlaybackStarted(false)
    }, [currentPlaylist.id])

    if (!playbackStarted) {
        return (

                <PlaybackButton onClick={startPlayback} data-testid="playback-button">Listen to the playlist</PlaybackButton>

        );
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
