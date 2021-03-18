import React from "react";
import { 
    Container, 
    SongItemWrapper, 
    SongItem, 
    ContentWrapper,
    ContentList,
    ContentItem,
    Title,
    Wrapper,
} from "./styles";

const Landing = () => {

    return (
        <Container>
            <Title>
                    The social playlist experience
            </Title>
            <Wrapper>    
            <ContentWrapper>
                <ContentList>
                Are you planning a party?
                    <ContentItem>
                        Compile a playlist with your friends, vote on the songs and make sure that all your guests enjoy the music on the dance floor!
                    </ContentItem>
                    Your need to celebrate your birthday in quarantine?
                    <ContentItem>
                        Do not let it ruin your special day! Throw a quarantine party, where you can enjoy the same songs in your own home while meeting online. 
                    </ContentItem>
                    You want to connect with your friends through music as well?
                    <ContentItem>
                        Let them follow your playlists with your favourite songs. It might be the best way to convince them to go to that concert with you next time. 
                    </ContentItem>
                </ContentList>
            </ContentWrapper>
            <SongItemWrapper>
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
                <SongItem />
            </SongItemWrapper>
            </Wrapper>
        </Container>
    )}

export default Landing;
