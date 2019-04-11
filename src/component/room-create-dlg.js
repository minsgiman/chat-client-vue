<template>
    <div class="room_create_dialog">
        <modal_dlg @close="closeDialog" :dlgStyle="dlgStyle">
            <template slot="content">
                <div class="content_wrap">
                    <h2>{{$t('STR_INPUT_ROOM_NAME')}}</h2>
                    <div class="input_wrap">
                        <input type="text" v-model="roomName">
                    </div>
                    <div class="btn_wrap">
                        <button @click="createRoom()">{{$t('STR_CREATE')}}</button>
                    </div>
                </div>
            </template>
        </modal_dlg>
    </div>
</template>
<script>
    import modal_dlg from './modal-dlg';

    export default {
        name: 'roomCreateDlg',
        data: function () {
            return {
                roomName: '',
                dlgStyle: {
                    width: '484px', height: '229px', padding: '20px', boxSizing: 'border-box'
                }
            }
        },
        created : function() {
        },
        beforeDestroy : function() {
        },
        methods: {
            createRoom: function() {
                if (!this.roomName) {
                    this.$emit('nonamealert');
                    return;
                }
                this.$emit('createroom', this.roomName);
            },
            closeDialog: function() {
                this.$emit('close');
            }
        },
        components : {
            modal_dlg
        }
    }
</script>
<style lang="less">
    .room_create_dialog {
        .content_wrap {
            text-align:left;
            p {
                margin-top:40px;
            }
            .input_wrap {
                text-align:center;
                margin-top:30px;
                input {
                    width:300px;
                    height:30px;
                    font-size:16px;
                }
            }
            .btn_wrap {
                text-align:center;
                margin-top:34px;
                button {
                    height: 50px;
                    width: 150px;
                    font-size: 16px;
                    color: #fff;
                    background: #4b96e6;
                    border-radius: 25px;
                    margin: 0 5px;
                }
            }
        }
    }
</style>