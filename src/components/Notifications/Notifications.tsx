import React  from "react";
import { useSelector } from "react-redux";
import { selectNotifications } from "../../store/slices/notification/selectors";
import Notification from "../../types/Notification";
import NotificationItem from "../NotificationItem";
import {  Container } from "./styles";

const Notifications = () => {

const notifications: Notification[] = useSelector(selectNotifications)

    return (
        <>
        {notifications.length > 0 && <Container>
            {notifications.map((notification) => {
                return  <NotificationItem key={notification.id} notification={notification}/>
            })}
        </Container>}
        </>
    );
};

export default Notifications;
