import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth/auth'

export default NextAuth({
    ...authOptions,
    // 可选的，你可以在这里配置其他一些选项
})
