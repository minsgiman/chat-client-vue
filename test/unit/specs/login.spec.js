import socketClient from '@/service/socket-client';
import {eventBus, EVENT} from '@/service/gEventBus';

describe('Login', () => {
    const loginId = 'login_tester';
    let firstLoginResult, secondLoginResult;

    beforeAll(async function (done) {
        function login (id) {
            return new Promise(resolve => {
                eventBus.$on(EVENT.LOGIN_RESULT, res => resolve(res));
                socketClient.login(id);
            });
        }

        firstLoginResult = await login(loginId);
        secondLoginResult = await login(loginId);
        socketClient.logout();
        done();
    }, 5 * 1000);

    it('login try twice', () => {
        expect(firstLoginResult.code).toEqual(1);
        expect(secondLoginResult.code).toEqual(-1);
    });
});