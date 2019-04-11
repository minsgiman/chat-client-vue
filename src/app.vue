<template>
    <div class="app">
        <router-view @alert="showAlertMessage"></router-view>
        <confirm_dlg @close="hideAlertMessage" v-show="showAlert" :title="alertTitle" :message="alertMessage"></confirm_dlg>
        <select_dlg v-show="showInvite" @select="onInviteSelect"
            :title="selectTitle" :message="selectMessage" firstvalue="ok" secondvalue="nok"></select_dlg>
    </div>
</template>

<script>
    import confirm_dlg from './component/confirm-dlg';
    import select_dlg from './component/select-dlg';
    import socketClient from './service/socket-client';
    import {eventBus, EVENT} from './service/gEventBus';

    export default {
        name: 'app',
        computed : {
        },
        data : function() {
            return {
                showAlert: false,
                alertTitle: '',
                alertMessage: '',
                showInvite: false,
                selectTitle: this.$i18n.t('STR_INVITE_MESSAGE'),
                selectMessage: '',
                inviteRoomId: null
            }
        },
        created : function() {
            eventBus.$on(EVENT.INVITE_PUSH, this.onInvite);
            eventBus.$on(EVENT.INVITE_RES, this.onInviteResult);
            eventBus.$on(EVENT.INVITE_ACCEPT, this.onInviteAccept);
        },
        beforeDestroy : function() {
            eventBus.$off(EVENT.INVITE_PUSH, this.onInvite);
            eventBus.$off(EVENT.INVITE_RES, this.onInviteResult);
            eventBus.$off(EVENT.INVITE_ACCEPT, this.onInviteAccept);
        },
        methods: {
            showAlertMessage: function(data) {
                this.showAlert = true;
                this.alertTitle = data.title;
                this.alertMessage = data.message;
            },
            hideAlertMessage: function() {
                this.showAlert = false;
                this.alertTitle = '';
                this.alertMessage = '';
            },
            onInvite: function(message) {
                this.selectMessage = message.from + this.$i18n.t('STR_FROM') + ' \'' + message.name + '\'' + this.$i18n.t('STR_INVITE_GET');
                this.inviteRoomId = message.roomId;
                this.showInvite = true;
            },
            onInviteResult: function(message) {
                let alertMsg;
                if (message.code === 1) {
                    alertMsg = message.to + this.$i18n.t('STR_SEND_INVITE');
                } else {
                    alertMsg = message.to + this.$i18n.t('STR_FAIL_INVITE');
                }
                this.showAlertMessage({title: this.$i18n.t('STR_ROOM_INVITE'), message: alertMsg});
            },
            onInviteAccept: function(message) {
                this.$router.push('chat-room');
            },
            onInviteSelect: function(value) {
                if (value === 'ok') {
                    socketClient.inviteAccept(this.inviteRoomId);
                }
                this.selectMessage = '';
                this.showInvite = false;
            }
        },
        components : {
            confirm_dlg, select_dlg
        }
    }
</script>

<style lang="less">
    body,div,input,textarea,select,button,table{font-family: 'Nanum Barun Gothic', sans-serif; margin:0; padding:0}
    * {
        margin:0;
        padding:0;
    }
    *:focus {
        outline: none;
    }
    section, footer, header, aside, nav{
        display: block;
    }
    ul,ol{list-style:none}
    a{color:#000;text-decoration:none;cursor:pointer;}
    a:hover,a:active,a:focus{text-decoration:none}
    button{overflow:visible;border:0;background:transparent;cursor:pointer;line-height:0;vertical-align: inherit; outline:none;}
    input{-webkit-appearance:none;appearance:none}
    input{outline-width: 0; cursor:pointer }
</style>