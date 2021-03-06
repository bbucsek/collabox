import React from "react";
import { Button, ButtonWrapper, Container, MessageWrapper } from "./styles";

type ConfirmationProps = {
message: string,
confirm: (isConfirmed: boolean) => void,
}

const Confirmation = (props: ConfirmationProps) => {

    const confirm = () => {
        props.confirm(true)
    }

    const cancel = () => {
        props.confirm(false)
    }

    return (
            <Container data-testid="confirmation-container">
                <MessageWrapper data-testid="message">
                    Are you sure you want to {props.message}?
                </MessageWrapper>
                <ButtonWrapper>
                    <Button onClick={confirm} data-testid="confirm-button">Yes</Button>
                    <Button onClick={cancel} data-testid="cancel-button">Cancel</Button>
                </ ButtonWrapper>
            </Container>
        );
};

export default Confirmation;
