<template>
    <div class="chat_room">
        <header>
            <button class="leave_btn" @click="leaveRoom"></button>
            <h2>{{room.name}}</h2>
            <div class="invite_wrap">
                <input v-model="inviteUser">
                <span @click="invite">{{$t('STR_INVITE')}}</span>
            </div>
        </header>

        <section>
            <div class="chat_wrap">
                <message v-for="(item, index) in messages"
                         :type="item.type"
                         :content="item.content"
                         :sender="item.sender"
                         :key="index">
                </message>
            </div>
            <div class="input_wrap">
                <label class="img_add" for="inputFileToLoad"></label>
                <input style="display:none;" id="inputFileToLoad" type="file" @change="sendImage()" />
                <input class="text_input" type="text" v-model="inputMsg" @keyup.enter="sendMessage">
            </div>
        </section>
    </div>
</template>

<script>
    import {eventBus, EVENT} from './../service/gEventBus';
    import socketClient from './../service/socket-client';
    import message from './../component/chat-message';

    export default {
        name: 'app',
        computed : {
            room : function () {
                return this.$store.state.currentRoom;
            },
        },
        data : function() {
            return {
                messages: [],
                inputMsg: '',
                inviteUser: ''
            }
        },
        created : function() {
            eventBus.$on(EVENT.CHAT_MESSAGE_PUSH, this.onChatMessage);
            eventBus.$on(EVENT.LEAVE_ROOM, this.onLeaveRoom);
        },
        beforeDestroy : function() {
            eventBus.$off(EVENT.CHAT_MESSAGE_PUSH, this.onChatMessage);
            eventBus.$off(EVENT.LEAVE_ROOM, this.onLeaveRoom);
        },
        methods: {
            sendMessage: function() {
                socketClient.sendMessage({
                   type: 'text',
                   data: this.inputMsg
                });
                this.inputMsg = '';
            },
            invite: function() {
                socketClient.invite(this.inviteUser, this.room.roomId);
            },
            leaveRoom: function() {
                socketClient.leaveRoom();
            },
            sendImage: function() {
                const filesSelected = document.getElementById("inputFileToLoad").files;
                if (filesSelected.length > 0) {
                    const fileToLoad = filesSelected[0];
                    const regImagePattern = /^.*(jpg|jpeg|gif|png)$/;
                    if (!regImagePattern.test(fileToLoad.type)) {
                        this.$emit('alert', {title: this.$i18n.t('STR_IMAGE_SEND'), message: this.$i18n.t('STR_UPLOAD_IMAGE')});
                        return;
                    }

                    const fileReader = new FileReader();
                    fileReader.onload = fileLoadedEvent => {
                        const srcData = fileLoadedEvent.target.result; // <--- data: base64
                        socketClient.sendMessage({
                            type: 'img',
                            data: srcData
                        });
                    }
                    fileReader.readAsDataURL(fileToLoad);
                }
            },
            onChatMessage: function(data) {
                if (data.contentType && data.content) {
                    this.messages.push({
                        type: data.contentType,
                        sender: data.sender,
                        content: data.content
                    });
                    setTimeout(() => {
                        const element = document.getElementsByClassName("chat_wrap")[0];
                        element.scrollTop = element.scrollHeight;
                    }, 0);
                }
            },
            onLeaveRoom: function(data) {
                if (data.code === 1) {
                    this.$router.push('chat-list');
                } else {
                    this.$emit('alert', {title: this.$i18n.t('STR_LEAVE'), message: this.$i18n.t('STR_FAIL_LEAVE')});
                }
            }
        },
        components : {
            message
        }
    }
</script>

<style lang="less">
    .chat_room {
        width: 400px;
        height: 520px;
        margin: 10px auto;
        border: 1px solid black;
        text-align: center;
        header {
            height: 25px;
            padding: 14px;
            h2 {
                display:inline-block;
                width: 120px;
                margin-top: -2px;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .invite_wrap {
                display: inline-block;
                float: right;
                input {
                    height: 20px;
                    font-size: 14px;
                }
                span {
                    cursor: pointer;
                }
            }
            .leave_btn {
                display:inline-block;
                background:url(/resources/img/btn-date-pre-normal.png) no-repeat;
                cursor:pointer;
                border:none;
                margin-right: 6px;
                width: 24px; height: 24px;
                float: left;
            }
        }

        section {
            .chat_wrap {
                width:100%;
                height:400px;
                padding: 10px 0;
                background-color:#D4E6F1;
                overflow:scroll;
            }
            .input_wrap {
                width:100%;
                height:49px;
                padding: 11px;
                box-sizing:border-box;
                .img_add {
                    display:inline-block;
                    background:url(/resources/img/ic-create-motion-area-normal.png) no-repeat;
                    width:16px; height:16px;
                    margin: 3px 6px 0 10px;
                    cursor:pointer;
                    float:left;
                }
                .text_input {
                    width: 300px;
                    height: 25px;
                    font-size: 13px;
                    padding: 3px;
                    box-sizing: border-box;
                    border: 1px solid #cccccc;
                }
            }
        }
    }
</style>