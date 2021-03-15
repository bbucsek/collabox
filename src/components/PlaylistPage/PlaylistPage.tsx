import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import { selectCurrentPlaylist } from "../../store/slices/playlists/selectors";
import { playlistsAsyncActions } from "../../store/slices/playlists/slice";
import ActionType from "../../types/ActionType";
import AddSong from "../AddSong";
import PlaySongs from "../PlaySongs";
import { 
    IconWrapper,
    Container,
    Subtitle,
    Title,
    AddIcon,
    InviteIcon,
    PlayIcon,
    UnsubscribeIcon,
    DeleteIcon,
    Tooltip,
    TooltipWrapper,
    PartyIcon,
 } from "./styles";
import Songlist from "../Songlist";
import Confirmation from "../Confirmation";

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentPlaylist = useSelector(selectCurrentPlaylist);
    const currentUser = useSelector(selectCurrentUser);
    const [addSongActive, setAddSongActive] = useState(false);
    const [inviteActive, setInviteActive] = useState(false);
    const [playerActive, setPlayerActive] = useState(false);
    const [isParty, setIsParty] = useState(false);
    const [actionType, setActionType] = useState<ActionType | null>()
    const [confirmationIsVisible, setConfirmationIsVisible] = useState(false)
    const [confirmationText, setConfirmationText] = useState<string>("")
    const isOwner = currentUser?.name === currentPlaylist?.ownerName;
    const dispatch = useDispatch();
    const history = useHistory();

    const startPlayback = () => {
        setPlayerActive(true)
    }

    const startParty = () => {
        setPlayerActive(true)
        setIsParty(true)
    }

    const joinParty = () => {
        setPlayerActive(true)
        setIsParty(true)
    }

    const closePlayer = () => {
        setPlayerActive(false)
    }

    const unFollowOnClick = () => {
        setConfirmationIsVisible(true)
        setConfirmationText("unfollow the playlist")
        setActionType(ActionType.Unfollow)
    }

    const deleteOnClick = () => {
        setConfirmationIsVisible(true)
        setConfirmationText("delete the playlist")
        setActionType(ActionType.Delete)
    }

    const confirmAction = (isConfirmed: boolean) => {
        if (isConfirmed && actionType === ActionType.Unfollow){
            unFollow();
        }
        else if (isConfirmed && actionType === ActionType.Delete){
            deletePlaylist()
        }
        setConfirmationIsVisible(false)
        setConfirmationText("")
        setActionType(null)
    }

    const unFollow = async () => {
        await dispatch(playlistsAsyncActions.unfollowPlaylist(id))
        history.push('/')
    }

    const deletePlaylist = async () => {
        await dispatch(playlistsAsyncActions.deletePlaylist(id))
        history.push('/')
    }

    useEffect(() => {
        dispatch(playlistsAsyncActions.subscribeToPlaylist(id));
        dispatch(playlistsAsyncActions.subscribeToSongsCollection(id));

        return () => {
            dispatch(playlistsAsyncActions.unsubscribeFromPlaylist(id));
            dispatch(playlistsAsyncActions.unsubscribeFromSongsCollection(id));
        };
    }, [dispatch, id]);


if (isOwner) {

    return (
        <Container>
                <Title data-testid="title" isOwner={isOwner}> {currentPlaylist?.playlistName} </Title>
                <IconWrapper>
                    <TooltipWrapper> 
                        <AddIcon onClick={() => setAddSongActive(!addSongActive)} data-testid="addsong-icon"/>
                        <Tooltip length="140" left="-105">Add new song</Tooltip>
                    </TooltipWrapper> 
                    {currentPlaylist?.songs?.length > 0 && 
                        <>
                            <TooltipWrapper>
                                <PlayIcon onClick={startPlayback} data-testid="playback-icon"/>
                                <Tooltip length="160" left="-170">Play the playlist</Tooltip>
                            </TooltipWrapper>
                            <TooltipWrapper>
                                <PartyIcon onClick={startParty} data-testid="playback-icon"/>
                                <Tooltip length="140" left="-100">Start a party</Tooltip>
                            </TooltipWrapper>
                        </>}
                    <TooltipWrapper> 
                        <InviteIcon onClick={() => setInviteActive(!inviteActive)} data-testid="invite-icon"/>
                        <Tooltip length="200" left="-150">Invite others to follow</Tooltip>
                    </TooltipWrapper> 
                    {inviteActive && <Subtitle> invite with this id: {currentPlaylist?.id} </Subtitle>}
                    <TooltipWrapper> 
                        <DeleteIcon onClick={deleteOnClick} data-testid="delete-icon"/>
                        <Tooltip length="140" left="-96">Delete playlist</Tooltip>
                    </TooltipWrapper>
                </IconWrapper>
                {playerActive && currentPlaylist?.songs?.length > 0 && <PlaySongs isParty={isParty} closePlayer={closePlayer}/>}
                {addSongActive && <AddSong />}
                <Songlist />
                {confirmationIsVisible && <Confirmation message={confirmationText} confirm={confirmAction}/>}
            </Container>
        );
    }
 else {
    return(<Container>
        <Title data-testid="title" isOwner={isOwner}> {currentPlaylist?.playlistName} </Title>
        <Subtitle>by {currentPlaylist?.ownerName}</Subtitle>
        <IconWrapper>
            <TooltipWrapper> 
                <AddIcon onClick={() => setAddSongActive(!addSongActive)} data-testid="addsong-icon"/>
                <Tooltip length="140" left="-105">Add new song</Tooltip>
            </TooltipWrapper> 
            {currentPlaylist?.songs?.length > 0 && 
                    <TooltipWrapper>
                        <PlayIcon onClick={startPlayback} data-testid="playback-icon"/>
                        <Tooltip length="160" left="-170">Play the playlist</Tooltip>
                    </TooltipWrapper>}
            {currentPlaylist?.partySong && 
                <TooltipWrapper>
                    <PartyIcon onClick={joinParty} data-testid="playback-icon"/>
                    <Tooltip length="140" left="-100">Join the party</Tooltip>
                </TooltipWrapper>}
            <TooltipWrapper> 
                <InviteIcon onClick={() => setInviteActive(!inviteActive)} data-testid="invite-icon"/>
                <Tooltip length="200" left="-150">Invite others to follow</Tooltip>
            </TooltipWrapper> 
            <TooltipWrapper> 
                <UnsubscribeIcon onClick={unFollowOnClick} data-testid="unfollow-icon"/>
                <Tooltip length="160" left="-100">Unfollow playlist</Tooltip>
            </TooltipWrapper>
            {inviteActive && <Subtitle> invite with this id: {currentPlaylist?.id} </Subtitle>}
        </IconWrapper>
        {playerActive && currentPlaylist?.songs?.length > 0 && <PlaySongs isParty={isParty} closePlayer={closePlayer}/>}
        {addSongActive && <AddSong />}
        <Songlist />
        {confirmationIsVisible && <Confirmation message={confirmationText} confirm={confirmAction}/>}
    </Container>)
    }

};

export default PlaylistPage;
