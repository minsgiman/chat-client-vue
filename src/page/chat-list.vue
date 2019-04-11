<template>
    <div class="chat_list_wrap">
        <header>
            <h2>{{$t('STR_CHAT')}}</h2>
            <p class="userId">{{userId}}</p>
            <div class="control_wrap">
                <button class="create" @click="showCreateDlg">{{$t('STR_CREATE_ROOM')}}</button>
                <button class="logout" @click="logout">{{$t('STR_LOGOUT')}}</button>
            </div>
        </header>
        <section>
            <ul class="room_list" v-show="roomList.length">
                <li class="room" @click="enterRoom(room)" v-for="(room, index) in roomList">
                    <p>{{room.name}}</p>
                </li>
            </ul>
            <p class="noroom_noti" v-show="!roomList.length">{{$t('STR_NO_ROOM')}}</p>
        </section>
        <button class="refresh" @click="getRoomList"></button>
        <room_create_dlg v-show="isShowCreateDlg"
            @nonamealert="needNameAlert" @close="hideCreateDlg" @createroom="createRoom"></room_create_dlg>
    </div>
</template>

<script>
    import socketClient from './../service/socket-client';
    import {eventBus, EVENT} from '../service/gEventBus';
    import room_create_dlg from '../component/room-create-dlg';

    export default {
        name: 'app',
        computed : {
            userId : function () {
                return this.$store.state.userId;
            }
        },
        data : function() {
            return {
                roomList: [],
                isShowCreateDlg: false
            }
        },
        created : function() {
            eventBus.$on(EVENT.GET_ROOM_LIST, this.onGetRoomList);
            eventBus.$on(EVENT.CREATE_ROOM, this.onCreateRoom);
            eventBus.$on(EVENT.ENTER_ROOM, this.onEnterRoom);
            this.getRoomList();
        },
        beforeDestroy : function() {
            eventBus.$off(EVENT.GET_ROOM_LIST, this.onGetRoomList);
            eventBus.$off(EVENT.CREATE_ROOM, this.onCreateRoom);
            eventBus.$off(EVENT.ENTER_ROOM, this.onEnterRoom);
        },
        methods: {
            showCreateDlg: function() {
                this.isShowCreateDlg = true;
            },
            hideCreateDlg: function() {
                this.isShowCreateDlg = false;
            },
            logout: function() {
                socketClient.logout();
                this.$router.push('login');
            },
            createRoom: function(roomName) {
                socketClient.createRoom(roomName);
            },
            enterRoom: function(room) {
                socketClient.enterRoom(room);
            },
            getRoomList: function() {
                socketClient.getRoomList();
            },
            needNameAlert: function(data) {
                this.$emit('alert', {title: this.$i18n.t('STR_MAKE_ROOM'), message: this.$i18n.t('STR_INPUT_CHAT_ROOM')});
            },

            onGetRoomList: function(data) {
                if (data.code === 1 && data.rooms) {
                    this.roomList = data.rooms;
                }
            },
            onCreateRoom: function(data) {
                if (data.code === 1 && data.room) {
                    socketClient.enterRoom(data.room);
                    //socketClient.getRoomList();
                } else {
                    this.$emit('alert', {title: this.$i18n.t('STR_MAKE_ROOM'), message: this.$i18n.t('STR_FAIL_CREATE')});
                }
                this.hideCreateDlg();
            },
            onEnterRoom: function(data) {
                if (data.code === 1) {
                    this.$router.push('chat-room');
                } else {
                    this.$emit('alert', {title: this.$i18n.t('STR_ENTER'), message: this.$i18n.t('STR_FAIL_ENTER')});
                }
            }
        },
        components : {
            room_create_dlg
        }
    }
</script>

<style lang="less">
    .chat_list_wrap {
        width: 400px;
        height: 500px;
        margin: 10px auto;
        border: 1px solid black;
        text-align: center;
        position: relative;
        header {
            height: 64px;
            padding: 16px 34px;
            background-color:#fafafa;
            box-sizing: border-box;
            h2 {
                display: inline-block;
                float: left;
            }
            .userId {
                float: left;
                font-size: 18px;
                width: 120px;
                margin: 5px 0 0 15px;
                color: blue;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .control_wrap {
                display:inline-block;
                float: right;
                button {
                    width: 65px;
                    height: 30px;
                    text-align: center;
                    border: 1px solid black;
                    margin-right:10px;
                    &:last-child {
                        margin-right:0px;
                    }
                }
            }
        }

        section {
            height:436px;
            position: relative;
            overflow: auto;
            .room_list {
                width: 250px;
                margin: 0 auto;
                padding-top: 20px;
                .room {
                    text-align: center;
                    width: 100%;
                    height: 40px;
                    margin-bottom: 10px;
                    border: 1px solid black;
                    cursor: pointer;
                    p {
                        padding-top: 10px;
                    }
                }
            }
            .noroom_noti {
                padding-top: 180px;
            }
        }

        .refresh {
            position:absolute;
            background:url(/resources/img/btn-refresh-default.png) no-repeat;
            background-size:contain;
            width:50px;
            height:50px;
            right: 20px;
            bottom: 20px;
        }
    }
</style>