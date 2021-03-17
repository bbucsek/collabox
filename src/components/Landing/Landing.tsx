import React from "react";
import { 
    Container, 
    SongItemWrapper, 
    SongItem, 
    ContentWrapper,
    ContentList,
    ContentItem,
} from "./styles";

const Landing = () => {

    return (
        <Container>
            <ContentWrapper>
                The social playlist experience
                <ContentList>
                    <ContentItem>blah</ContentItem>
                    <ContentItem>blah</ContentItem>
                    <ContentItem>blah</ContentItem>
                    <ContentItem>blah</ContentItem>
                    <ContentItem>blah</ContentItem>
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
        </Container>
    )}

export default Landing;
