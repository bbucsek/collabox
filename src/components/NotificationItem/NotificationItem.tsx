import React, { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { notificationActions } from "../../store/slices/notification/slice";
import Notification from "../../types/Notification";
import SEVERITY from "../../types/Severity";
import { notificationMessages } from "../../utils/notificationMessages";
import {  Close, Container, Message } from "./styles";

type NotificationItemProps ={
    notification: Notification
}

const NotificationItem = ({notification}: NotificationItemProps) => {
    const dispatch = useDispatch();

    const close = () => {
        dispatch(notificationActions.DELETE_NOTIFICATION(notification.id))
    }

    useEffect(() => {
        if (notification.severity === SEVERITY.Info || notification.severity === SEVERITY.Warning) {
            setTimeout(()=> dispatch(notificationActions.DELETE_NOTIFICATION(notification.id)), 3000)
        }
    })

    return (
        <Container severity={notification.severity}>
            <Message >
                {notificationMessages[notification.message as keyof typeof notificationMessages]}
            </Message>
            <Close onClick={close} data-testid="close-icon"/>
        </Container>
    );
};

export default NotificationItem;
