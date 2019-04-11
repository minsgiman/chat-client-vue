import login from './../page/login';
import chatList from './../page/chat-list';
import chatRoom from './../page/chat-room';

export default [
    {path: '*', component: login},
    {path: '/chat-list', component: chatList},
    {path: '/chat-room', component: chatRoom}
];