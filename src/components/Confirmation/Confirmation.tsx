import React from "react";
import { Button, ButtonWrapper, Container, MessageWrapper } from "./styles";

type ConfirmationProps = {
message: string,
confirm: (isConfirmed: boolean) => void,
}

const Confirmation = ({message, confirm}: ConfirmationProps) => {

    const confirmAction = () => {
        confirm(true)
    }

    const cancel = () => {
        confirm(false)
    }

    return (
            <Container data-testid="confirmation-container">
                <MessageWrapper data-testid="message">
                    Are you sure you want to {message}?
                </MessageWrapper>
                <ButtonWrapper>
                    <Button onClick={confirmAction} data-testid="confirm-button">Yes</Button>
                    <Button onClick={cancel} data-testid="cancel-button">Cancel</Button>
                </ ButtonWrapper>
            </Container>
        );
};

export default Confirmation;
