<template>
    <div class="modal_dialog">
        <div class="dlg_wrap">
            <div class="content" :style="dlgStyle">
                <slot name="content"></slot>
                <a class="btn_close" @click="closeDialog"></a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['dlgStyle'],
        name: 'modalDlg',
        created : function() {
            document.body.className = 'blockScroll';
        },
        beforeDestroy : function() {
            document.body.className = '';
        },
        methods: {
            closeDialog: function() {
                this.$emit('close');
            }
        },
        components : {
        }
    }
</script>
<style lang="less">
    body.blockScroll {overflow:hidden;}
    .modal_dialog {
        position: fixed;
        display: table;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.2);
        z-index: 999;
        .dlg_wrap {
            display:table-cell;
            text-align:center;
            vertical-align:middle;
            width:100%;
            height:100%;
            .content {
                position:relative;
                background-color:#fff;
                padding:0px;
                margin: 0 auto;
            }
            .btn_close {
                position:absolute;
                right:24px;
                top:23px;
                background:url(/resources/img/btn-close-alert.png) no-repeat;
                width:20px; height:20px
            }
        }
    }
</style>