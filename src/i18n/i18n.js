import Vue from 'vue';
import VueI18n from 'vue-i18n';
import localeKR from './locale-ko';

Vue.use(VueI18n);

const messages = {
    ko: localeKR
};
export default new VueI18n({locale: 'ko', messages});