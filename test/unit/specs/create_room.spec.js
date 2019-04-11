import socketClient from '@/service/socket-client';
import {eventBus, EVENT} from '@/service/gEventBus';

describe('Create Room', () => {
    const loginId = 'create_room_tester';
    const roomName = 'create_room';
    let loginResult, createRoomResult, getRoomsResult;

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
            })
        }

        function getRoomList () {
            return new Promise(resolve => {
                eventBus.$on(EVENT.GET_ROOM_LIST, res => resolve(res));
                socketClient.getRoomList();
            })
        }

        loginResult = await login(loginId);
        createRoomResult = await createRoom(roomName);
        getRoomsResult = await getRoomList();
        socketClient.logout();
        done();
    }, 5 * 1000);

    it('create new room', () => {
        expect(loginResult.code).toEqual(1);
        expect(createRoomResult.code).toEqual(1);
        expect(createRoomResult.room).toBeDefined();
        expect(createRoomResult.room.roomId).toBeDefined();
        expect(createRoomResult.room.name).toEqual(roomName); //create room success
    });

    it('find created room in room list', () => {
        expect(getRoomsResult.code).toEqual(1);
        expect(getRoomsResult.rooms.filter(item => item.name === roomName).length).toBeGreaterThan(0);
    });
});