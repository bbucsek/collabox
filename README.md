# Collabox - Create a shared playlist with your friends!

This is a playlist editor application created by a team of two. It is built with React - Typescript, Redux toolkit, react-youtube library and styled components, using Firebase Firestore.

## Project status

The most important features (creating, playing, following, unfollowing playlists) have been implemented in the application, together with starting a party, where the users listen to the same playlist synchronously. Voting and deleting songs are being implemented in the current iteration.

## How to use the application

### Create and follow playlists

Create a playlist and add songs that are shorter than 10 minutes by submitting a youtube url. Invite your friends to follow your playlist. Your followers will be also able to add songs. The playlist owner can delete songs and the playlist itself.

![Playlist](/../Readme/src/prtscr.jpg?raw=true "Collabox")

### Listen to the playlist and start a party

Play your playlists, and those that you follow as many times as you want. You will not see the youtube video, but you can control the playback (skipping among songs, (un)muting, pausing, stopping). 

The playlist owner can also start a party, to which all followers can join. All party guests are listening to the same song synchronously on their own device (suitable for quarantine house parties). Party guests and the host can only (un)mute the playback on their own device.

### Voting on songs

You can upvote/downvote each song in your own and the followed playlists. The order of the songs in the playlist is determined by their popularity.

### Installation and Setup Instructions

`yarn start` Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. Firebase related environment variables are needed to run the app locally. 

`yarn test` Launches the test runner in the interactive watch mode.