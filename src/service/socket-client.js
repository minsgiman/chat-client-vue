import socketIO from 'socket.io-client';
import clientConfig from './../config/client';
import {eventBus, EVENT} from "./gEventBus";
import {store, ACTION} from './store';

const _loginRequiredHandler = Symbol('loginRequiredHandler'),
    _loginHandler = Symbol('loginHandler'),
    _createRoomHandler = Symbol('createRoomHandler'),
    _getRoomListHandler = Symbol('getRoomListHandler'),
    _enterRoomHandler = Symbol('enterRoomHandler'),
    _leaveRoomHandler = Symbol('leaveRoomHandler'),
    _chatMessageHandler = Symbol('chatMessageHandler'),
    _inviteHandler = Symbol('inviteHandler'),
    _inviteAcceptHandler = Symbol('inviteAcceptHandler');

class socketClient {
    constructor() {
        this._socket = null;
    }

    /******** public **********/
    login(userId) {
        store.dispatch(ACTION.USER_ID_CHANGE, userId);
        this._socket = socketIO.connect(clientConfig.serverUrl,{transports: ['xhr-polling', 'websocket'], forceNew:true});
        this._socket.on('loginRequired', this[_loginRequiredHandler].bind(this));
        this._socket.on('login', this[_loginHandler].bind(this));
        this._socket.on('getRoomList', this[_getRoomListHandler].bind(this));
        this._socket.on('createRoom', this[_createRoomHandler].bind(this));
        this._socket.on('enterRoom', this[_enterRoomHandler].bind(this));
        this._socket.on('leaveRoom', this[_leaveRoomHandler].bind(this));
        this._socket.on('chatMessage', this[_chatMessageHandler].bind(this));
        this._socket.on('invite', this[_inviteHandler].bind(this));
        this._socket.on('inviteAccept', this[_inviteAcceptHandler].bind(this));
    }

    logout() {
        if (this._socket) {
            this._socket.disconnect();
            this._socket = null;
        }
        store.dispatch(ACTION.USER_ID_CHANGE, null);
    }

    getRoomList() {
        this._socket.emit('getRoomList', {
            type : "req"
        });
    }

    createRoom(name) {
        this._socket.emit('createRoom', {
            type : "req",
            name
        });
    }

    enterRoom(room) {
        this._socket.emit('enterRoom', {
            type : "req",
            roomId : room.roomId
        });
    }

    leaveRoom() {
        this._socket.emit('leaveRoom', {
            type : "req"
        });
    }

    invite(to, roomId) {
        this._socket.emit('invite', {
           type: 'req',
           from: store.state.userId,
           to,
           roomId
        });
    }

    inviteAccept(roomId) {
        this._socket.emit('inviteAccept', {
            type : "req",
            roomId
        });
    }

    sendMessage(content) {
        this._socket.emit('chatMessage', {
            type : 'req',
            content
        });
    }

    /******** private **********/
    [_loginRequiredHandler](message) {
        this._socket.emit('login', {
            type : "req",
            userId : store.state.userId
        });
    }

    [_loginHandler](message) {
        if (message.code !== 1) {
            store.dispatch(ACTION.USER_ID_CHANGE, null);
        }
        eventBus.$emit(EVENT.LOGIN_RESULT, message);
    }

    [_createRoomHandler](message) {
        eventBus.$emit(EVENT.CREATE_ROOM, message);
    }

    [_getRoomListHandler](message) {
        eventBus.$emit(EVENT.GET_ROOM_LIST, message);
    }

    [_enterRoomHandler](message) {
        if (message.code === 1) {
            store.dispatch(ACTION.CURRENT_ROOM_CHANGE, {
                name : message.name,
                roomId : message.roomId
            });
        }
        eventBus.$emit(EVENT.ENTER_ROOM, message);
    }

    [_leaveRoomHandler](message) {
        eventBus.$emit(EVENT.LEAVE_ROOM, message);
    }

    [_chatMessageHandler](message) {
        if (message.type === 'push') {
            eventBus.$emit(EVENT.CHAT_MESSAGE_PUSH, message);
        } else if (message.type === 'res') {
            eventBus.$emit(EVENT.CHAT_MESSAGE_RES, message);
        }
    }

    [_inviteHandler](message) {
        if (message.type === 'push') {
            if (store.state.userId) {
                eventBus.$emit(EVENT.INVITE_PUSH, message);
            }
        } else if (message.type === 'res') {
            eventBus.$emit(EVENT.INVITE_RES, message);
        }
    }

    [_inviteAcceptHandler](message) {
        if (message.code === 1) {
            store.dispatch(ACTION.CURRENT_ROOM_CHANGE, {
                name : message.name,
                roomId : message.roomId
            });
            eventBus.$emit(EVENT.INVITE_ACCEPT, message);
        }
    }
}

export default new socketClient();