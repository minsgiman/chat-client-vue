<template>
    <div class="login">
        <h2>Chatting App</h2>
        <input type="text" v-model="userId" placeholder="ID" @keyup.enter="connect">
        <button @click="connect">connect</button>
    </div>
</template>

<script>
    import socketClient from './../service/socket-client';
    import {eventBus, EVENT} from './../service/gEventBus';

    export default {
        name: 'login',
        computed : {
        },
        data : function() {
            return {
                userId: ''
            }
        },
        created : function() {
            eventBus.$on(EVENT.LOGIN_RESULT, this.onLoginResult);
        },
        beforeDestroy : function() {
            eventBus.$off(EVENT.LOGIN_RESULT, this.onLoginResult);
        },
        methods: {
            connect: function() {
                if (!this.userId) {
                    this.$emit('alert', {title: this.$i18n.t('STR_FAIL_LOGIN'), message: this.$i18n.t('STR_INPUT_ID')});
                    return;
                }
                socketClient.login(this.userId);
            },
            onLoginResult: function(res) {
                if (res.code === 1) {
                    this.$router.push('chat-list');
                } else {
                    this.$emit('alert', {title: this.$i18n.t('STR_FAIL_LOGIN'), message: this.$i18n.t('STR_LOGIN_FAIL')});
                }
            }
        },
        components : {
        }
    }
</script>

<style lang="less">
    .login {
        width: 400px;
        height: 500px;
        margin: 10px auto;
        border: 1px solid black;
        text-align: center;
        h2 {
            margin: 120px 0;
            font-size:31px;
        }
        input {
            display: block;
            margin: 0 auto;
            width: 200px;
            height: 23px;
            padding: 5px;
            font-size: 14px;
            border: 1px solid #e0e0e0;
        }
        button {
            width: 212px;
            height: 34px;
            margin-top: 20px;
            color: #fff;
            background-color: #4a96e6;
            font-size: 16px;
        }
    }
</style>