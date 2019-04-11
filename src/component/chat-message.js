<template>
    <div class="message_wrap">
        <div v-if="type == 'img'" class="img_wrap">
            <span class="sender">{{sender}} : </span>
            <img :src="content"/>
        </div>
        <div v-if="type == 'text'" class="text_wrap">
            <p>
                <span class="sender">{{sender}} : </span>
                <span>{{content}}</span>
            </p>
        </div>
        <div v-if="type == 'noti'" class="noti_wrap">
            <p>
                <span class="content">{{content}}</span>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'app',
        props: ['type', 'content', 'sender'],
        computed : {
        },
        data : function() {
            return {
            }
        },
        created : function() {
        },
        beforeDestroy : function() {
        }
    }
</script>

<style lang="less">
    .message_wrap {
        text-align: left;
        margin-left: 16px;
        .sender {
            color: darkblue;
            float: left;
            margin-right: 5px;
        }
        .img_wrap {
            img {
                max-width: 300px;
            }
        }
        .noti_wrap {
            text-align:center;
            color:gray;
        }
    }
</style>