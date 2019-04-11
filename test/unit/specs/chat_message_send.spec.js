import socketClient from '@/service/socket-client';
import {eventBus, EVENT} from '@/service/gEventBus';

describe('Chat Message Send', () => {
    const loginId = 'chat_message_send_tester';
    const roomName = 'chat_message_send_room';
    const contentToSend = {
        type : 'text',
        data : 'hellow'
    };
    let loginResult, createRoomResult, enterRoomResult, receivedMsgResult, chatMsgSendResult;

    beforeAll(async function (done) {
        function login (id) {
            return new Promise(resolve => {
                eventBus.$on(EVENT.LOGIN_RESULT, res => resolve(res));
                socketClient.login(id);
            });
        }

        function createRoom (name) {
            return new Promise(resolve => {
                eventBus.$on(EVENT.CREATE_ROOM, res => resolve(res));
                socketClient.createRoom(name);
            });
        }

        function enterRoom (room) {
            return new Promise(resolve => {
                eventBus.$on(EVENT.ENTER_ROOM, res => resolve(res));
                socketClient.enterRoom(room);
            });
        }

        function chatMessageSend (content) {
            return new Promise(resolve => {
                eventBus.$on(EVENT.CHAT_MESSAGE_PUSH, res => receivedMsgResult = res);
                eventBus.$on(EVENT.CHAT_MESSAGE_RES, res => resolve(res));
                socketClient.sendMessage(content);
            });
        }

        loginResult = await login(loginId);
        createRoomResult = await createRoom(roomName);
        enterRoomResult = await enterRoom(createRoomResult.room);
        chatMsgSendResult = await chatMessageSend(contentToSend);
        socketClient.logout();
        done();
    }, 5 * 1000);

    it('enter to created room', () => {
        expect(loginResult.code).toEqual(1);
        expect(createRoomResult.code).toEqual(1);
        expect(enterRoomResult.code).toEqual(1);
        expect(enterRoomResult.name).toEqual(roomName); //enter room success
    });

    it('send message to users in the room', () => {
        expect(receivedMsgResult.sender).toEqual(loginId);
        expect(receivedMsgResult.contentType).toEqual(contentToSend.type);
        expect(receivedMsgResult.content).toEqual(contentToSend.data); //receive correct message data
        expect(chatMsgSendResult.code).toEqual(1);
    });
});