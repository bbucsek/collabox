import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../store/slices/authentication/selectors";
import { 
    selectCurrentPlaylistId,
    selectCurrentPlaylistName, 
    selectCurrentPlaylistOwnerId, 
    selectCurrentPlaylistOwnerName, 
    selectCurrentPlaylistPartyOngoing, 
    selectCurrentPlaylistSongsExist } from "../../store/slices/playlists/selectors";
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
    JoinPartyContainer,
 } from "./styles";
import Songlist from "../Songlist";
import Confirmation from "../Confirmation";

const PlaylistPage = () => {
    const { id } = useParams<{ id: string }>();
    const currentPlaylistName = useSelector(selectCurrentPlaylistName);
    const currentPlaylistId = useSelector(selectCurrentPlaylistId);
    const currentPlaylistOwnerId = useSelector(selectCurrentPlaylistOwnerId);
    const currentPlaylistOwnerName = useSelector(selectCurrentPlaylistOwnerName);
    const currentPlaylistSongsExist = useSelector(selectCurrentPlaylistSongsExist); 
    const currentPlaylistPartyOngoing = useSelector(selectCurrentPlaylistPartyOngoing); 
    const currentUser = useSelector(selectCurrentUser);
    const [addSongActive, setAddSongActive] = useState(false);
    const [inviteActive, setInviteActive] = useState(false);
    const [playerActive, setPlayerActive] = useState(false);
    const [isParty, setIsParty] = useState(false);
    const [actionType, setActionType] = useState<ActionType | null>()
    const [confirmationIsVisible, setConfirmationIsVisible] = useState(false)
    const [confirmationText, setConfirmationText] = useState<string>("")
    const isOwner = currentUser?.id === currentPlaylistOwnerId;
    const dispatch = useDispatch();
    const history = useHistory();

    const startPlayback = () => {
        setIsParty(false)
        setPlayerActive(true)
    }

    const startParty = () => {
        setIsParty(true)
        setPlayerActive(true)
    }

    const joinParty = () => {
        setIsParty(true)
        setPlayerActive(true)
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
        setPlayerActive(false)

        return () => {
            dispatch(playlistsAsyncActions.unsubscribeFromPlaylist(id));
            dispatch(playlistsAsyncActions.unsubscribeFromSongsCollection(id));
        };
    }, [dispatch, id]);
    
    
    useEffect(() => {
        return () => {
            if (isParty && isOwner) {
                dispatch(playlistsAsyncActions.endParty(id))
            }
        }
    }, [isParty, isOwner, dispatch, id])


if (isOwner) {

    return (
        <Container>
                <Title data-testid="title" isOwner={isOwner}> {currentPlaylistName} </Title>
                <IconWrapper>
                    <TooltipWrapper> 
                        <AddIcon onClick={() => setAddSongActive(!addSongActive)} data-testid="addsong-icon"/>
                        <Tooltip length="140" left="-105" data-testid="addsong-tooltip">Add new song</Tooltip>
                    </TooltipWrapper> 
                    {currentPlaylistSongsExist && 
                        <>
                            <TooltipWrapper>
                                <PlayIcon onClick={startPlayback} data-testid="playback-icon"/>
                                <Tooltip length="160" left="-170" data-testid="playback-tooltip">Play the playlist</Tooltip>
                            </TooltipWrapper>
                            <TooltipWrapper>
                                <PartyIcon onClick={startParty} data-testid="start-party-icon"/>
                                <Tooltip length="140" left="-100" data-testid="start-party-tooltip">Start a party</Tooltip>
                            </TooltipWrapper>
                        </>}
                    <TooltipWrapper> 
                        <InviteIcon onClick={() => setInviteActive(!inviteActive)} data-testid="invite-icon"/>
                        <Tooltip length="200" left="-150" data-testid="invite-tooltip">Invite others to follow</Tooltip>
                    </TooltipWrapper> 
                    {inviteActive && <Subtitle data-testid="invite-id"> invite with this id: {currentPlaylistId} </Subtitle>}
                    <TooltipWrapper> 
                        <DeleteIcon onClick={deleteOnClick} data-testid="delete-playlist-icon"/>
                        <Tooltip length="140" left="-96" data-testid="delete-tooltip">Delete playlist</Tooltip>
                    </TooltipWrapper>
                </IconWrapper>
                {playerActive && currentPlaylistSongsExist && <PlaySongs isParty={isParty} closePlayer={closePlayer} data-testid="player"/>}
                {addSongActive && <AddSong />}
                <Songlist />
                {confirmationIsVisible && <Confirmation message={confirmationText} confirm={confirmAction}/>}
            </Container>
        );
    }
    
    return(<Container>
        <Title data-testid="title" isOwner={isOwner}> {currentPlaylistName} </Title>
        <Subtitle data-testid="owner-name" >by {currentPlaylistOwnerName}</Subtitle>
        <IconWrapper>
            <TooltipWrapper> 
                <AddIcon onClick={() => setAddSongActive(!addSongActive)} data-testid="addsong-icon"/>
                <Tooltip length="140" left="-105" data-testid="addsong-tooltip">Add new song</Tooltip>
            </TooltipWrapper> 
            {currentPlaylistSongsExist && 
                    <TooltipWrapper>
                        <PlayIcon onClick={startPlayback} data-testid="playback-icon"/>
                        <Tooltip length="160" left="-170" data-testid="playback-tooltip">Play the playlist</Tooltip>
                    </TooltipWrapper>}
            <TooltipWrapper> 
                <InviteIcon onClick={() => setInviteActive(!inviteActive)} data-testid="invite-icon"/>
                <Tooltip length="200" left="-150" data-testid="invite-tooltip">Invite others to follow</Tooltip>
            </TooltipWrapper> 
            {inviteActive && <Subtitle data-testid="invite-id"> invite with this id: {currentPlaylistId} </Subtitle>}
            <TooltipWrapper> 
                <UnsubscribeIcon onClick={unFollowOnClick} data-testid="unfollow-icon"/>
                <Tooltip length="160" left="-100" data-testid="unfollow-tooltip">Unfollow playlist</Tooltip>
            </TooltipWrapper>
            {currentPlaylistPartyOngoing && 
                    <TooltipWrapper> 
                        <JoinPartyContainer onClick={joinParty} data-testid="join-party">
                            Live party!
                        </JoinPartyContainer>
                    <Tooltip length="140" left="-5" data-testid="join-party-tooltip">Join the party</Tooltip>
                    </TooltipWrapper> }
        </IconWrapper>
        {playerActive && currentPlaylistSongsExist && <PlaySongs isParty={isParty} closePlayer={closePlayer} data-testid="player"/>}
        {addSongActive && <AddSong />}
        <Songlist />
        {confirmationIsVisible && <Confirmation message={confirmationText} confirm={confirmAction}/>}
    </Container>)

};

export default PlaylistPage;
