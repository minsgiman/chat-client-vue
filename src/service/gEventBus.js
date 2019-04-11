import Vue from 'vue'

const eventBus = new Vue(),
    EVENT = {
        LOGIN_RESULT : 'login-result',
        GET_ROOM_LIST : 'get-room-list',
        CREATE_ROOM : 'create-rooom',
        ENTER_ROOM : 'enter-room',
        LEAVE_ROOM : 'leave-room',
        CHAT_MESSAGE_PUSH : 'chat-message-push',
        CHAT_MESSAGE_RES : 'chat-message-res',
        INVITE_PUSH : 'invite-push',
        INVITE_RES : 'invite-res',
        INVITE_ACCEPT : 'invite-accept'
    };

export { eventBus, EVENT };