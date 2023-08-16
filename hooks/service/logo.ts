import { post } from '@/utils/request'

export const uploadLogo = <T>(data: any): Promise<T> => {
    return post('/api/common/upload', data)
}
