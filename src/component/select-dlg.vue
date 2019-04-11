<template>
    <div class="select_dialog">
        <modal_dlg @close="select('nok')" :dlgStyle="dlgStyle">
            <template slot="content">
                <div class="content_wrap">
                    <h2>{{title}}</h2>
                    <p class="md_con" v-html="message"></p>
                    <div class="btn_wrap">
                        <button class="first_btn" @click="select(firstvalue)">{{$t('STR_YES')}}</button>
                        <button class="second_btn" @click="select(secondvalue)">{{$t('STR_NO')}}</button>
                    </div>
                </div>
            </template>
        </modal_dlg>
    </div>
</template>
<script>
    import modal_dlg from './modal-dlg';

    export default {
        props: ['title', 'message', 'firstvalue', 'secondvalue'],
        name: 'selectDlg',
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
            select: function(value) {
                this.$emit('select', value);
            }
        },
        components : {
            modal_dlg
        }
    }
</script>
<style lang="less">
    .select_dialog {
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
                    &.second_btn {
                        background: #777777;
                    }
                }
            }
        }
    }
</style>