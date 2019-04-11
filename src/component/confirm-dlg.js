<template>
    <div class="confirm_dialog">
        <modal_dlg @close="closeDialog" :dlgStyle="dlgStyle">
            <template slot="content">
                <div class="content_wrap">
                    <h2>{{title}}</h2>
                    <p v-html="message"></p>
                    <div class="btn_wrap">
                        <button @click="closeDialog()">{{$t('STR_CONFIRM')}}</button>
                    </div>
                </div>
            </template>
        </modal_dlg>
    </div>
</template>
<script>
    import modal_dlg from './modal-dlg';

    export default {
        props: ['title', 'message'],
        name: 'confirmDlg',
        data: function() {
            return {
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
    .confirm_dialog {
        .content_wrap {
            text-align:left;
            p {
                margin-top:40px;
            }
            .btn_wrap {
                text-align:center;
                margin-top:44px;
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