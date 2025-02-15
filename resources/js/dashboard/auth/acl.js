import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '../router'

Vue.use(AclInstaller)

export default new AclCreate({
    initial: 'public',
    notfound: '/pages/error-404',
    router,
    acceptLocalRules: true,
    globalRules: {
        admin: new AclRule('admin').generate(),
        editor: new AclRule('editor').or('admin').generate(),
        user: new AclRule('user').or('editor').or('admin').generate(),
        public: new AclRule('public').or('user').or('editor').or('admin').generate()
    },
    middleware: async acl => {

            await setTimeout(function () {}, 500);
            let role = localStorage.getItem('userRole');
            if(role !== null){

                acl.change(role);

            }

    }
})