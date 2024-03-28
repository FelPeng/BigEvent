import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia().use(persist)

export default pinia

export * from './modules/user' //接收user模块下的所有按需导出,并将其暴露出去
