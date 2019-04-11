import chatMsgComp from '@/component/chat-message.vue';
import Vue from 'vue';
import i18n from '@/i18n/i18n';

describe('Chat Message Component', () => {
    const sender = 'me';
    const txtContent = 'new message';
    const notiContent = 'me님이 입장하였습니다.'
    const imgContent = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAHhJREFUSA1jYBgFBEKAEVn+fyXDfxCfsZ0BLr70BMNMoGAaUCA92oJhFkj+w3UG4///Gc4wMjKcFdBkMAGJgYDk1poz/xn+GzOyMJk8d28+CxJjAhG0BKMWEAzd0SAaDSKCIUBQwWgqGg0igiFAUAHNUxFBF4wqAAAwuhUkda8BNgAAAABJRU5ErkJggg==';

    const Constructor = Vue.extend(chatMsgComp);
    const txtMsgComponent = new Constructor({
        propsData: {
            type: 'text',
            content: txtContent,
            sender
        }
    }).$mount();

    const notiMsgComponent = new Constructor({
        i18n,
        propsData: {
            type: 'noti',
            content: notiContent,
            sender
        }
    }).$mount();

    const imgMsgComponent = new Constructor({
        propsData: {
            type: 'img',
            content: imgContent,
            sender
        }
    }).$mount();

    it('displays text and sender', () => {
        expect(txtMsgComponent.$el.querySelector('.img_wrap')).toBeNull();
        expect(txtMsgComponent.$el.querySelector('.noti_wrap')).toBeNull();
        expect(txtMsgComponent.$el.textContent).toContain(txtContent);
        expect(txtMsgComponent.$el.textContent).toContain(sender);
    });

    it('displays img and sender', () => {
        expect(imgMsgComponent.$el.querySelector('.text_wrap')).toBeNull();
        expect(imgMsgComponent.$el.querySelector('.noti_wrap')).toBeNull();
        expect(imgMsgComponent.$el.querySelector('img')).not.toBeNull();
        expect(imgMsgComponent.$el.textContent).toContain(sender);
    });

    it('displays noti and sender', () => {
        expect(notiMsgComponent.$el.querySelector('.text_wrap')).toBeNull();
        expect(notiMsgComponent.$el.querySelector('.img_wrap')).toBeNull();
        expect(notiMsgComponent.$el.textContent).toContain(notiContent);
        expect(notiMsgComponent.$el.textContent).toContain(sender);
    });
});