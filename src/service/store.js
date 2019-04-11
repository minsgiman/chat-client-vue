import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ACTION = {
    USER_ID_CHANGE: 'userIdChange',
    CURRENT_ROOM_CHANGE: 'currentRoomChange'
};

const MUTATION = {
    UPDATE_USER_ID: 'updateUserId',
    UPDATE_CURRENT_ROOM: 'updateCurrentRoom'
};

const store = new Vuex.Store({
    state: {
        userId: null,
        currentRoom: null
    },
    actions: {
        [ACTION.USER_ID_CHANGE]: (context, state) => {
            context.commit(MUTATION.UPDATE_USER_ID, state);
        },
        [ACTION.CURRENT_ROOM_CHANGE]: (context, state) => {
            context.commit(MUTATION.UPDATE_CURRENT_ROOM, state);
        }
    },
    mutations: {
        [MUTATION.UPDATE_USER_ID]: (state, value) => {
            state.userId = value;
        },
        [MUTATION.UPDATE_CURRENT_ROOM]: (state, value) => {
            state.currentRoom = value;
        }
    }
});

export {store, ACTION}