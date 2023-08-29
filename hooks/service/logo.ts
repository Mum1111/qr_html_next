import { get, post } from '@/utils/request'
import { ApiSuccessResponse } from '@/types/request'

export const uploadLogo = <T>(data: any): Promise<T> => {
    return post('/api/common/upload', data)
}

export const listLogo = (): Promise<ApiSuccessResponse<any[]>> => {
    return get('/api/common/logo')
}
