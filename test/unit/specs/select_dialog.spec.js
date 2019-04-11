import selectDlg from '@/component/select-dlg.vue';
import Vue from 'vue';
import i18n from '@/i18n/i18n';

describe('Select Dialog', () => {
    const title = 'TestTitle';
    const message = 'TestMessage';
    const okValue = 'ok';
    const nokValue = 'nok';
    const Constructor = Vue.extend(selectDlg);
    const dlgComponent = new Constructor({
        i18n,
        propsData: {
            title: title,
            message: message,
            firstvalue: okValue,
            secondvalue: nokValue
        }
    }).$mount();

    it('displays title and message', () => {
        expect(dlgComponent.$el.textContent).toContain(title);
        expect(dlgComponent.$el.textContent).toContain(message);
    });

    it ('click ok button', (done) => {
        dlgComponent.$on('select', function(value) {
            expect(value).toEqual(okValue);
            done();
        });

        const button = dlgComponent.$el.querySelector('.first_btn');
        const clickEvent = new window.Event('click');
        button.dispatchEvent(clickEvent);
    });
});