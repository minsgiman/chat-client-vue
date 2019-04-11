import socketClient from '@/service/socket-client';
import {eventBus, EVENT} from '@/service/gEventBus';

describe('Enter Leave Room', () => {
    const loginId = 'enter_leave_room_tester';
    const roomName = 'enter_leave_room';
    let loginResult, createRoomResult, enterRoomResult, leaveRoomResult;

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

        function leaveRoom () {
            return new Promise(resolve => {
                eventBus.$on(EVENT.LEAVE_ROOM, res => resolve(res));
                socketClient.leaveRoom();
            });
        }

        loginResult = await login(loginId);
        createRoomResult = await createRoom(roomName);
        enterRoomResult = await enterRoom(createRoomResult.room);
        leaveRoomResult = await leaveRoom();
        socketClient.logout();
        done();
    }, 5 * 1000);

    it('enter to created room', () => {
        expect(loginResult.code).toEqual(1);
        expect(createRoomResult.code).toEqual(1);
        expect(enterRoomResult.code).toEqual(1);
        expect(enterRoomResult.name).toEqual(roomName); //enter room success
    });

    it('leave room', () => {
        expect(leaveRoomResult.code).toEqual(1);
    });
});
