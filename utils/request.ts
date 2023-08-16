// const BASE_URL = 'https://api.example.com'; // 替换为您的实际 API 基础 URL

interface ApiResponse<T> {
    data: T
}

interface RequestOptions {
    method: string
    path: string
    data?: any
    header?: any
}

export const request = async <T>(options: RequestOptions): Promise<T> => {
    const { method, path, data, header } = options

    const url = path
    const headers = {
        ...header,
        // 如果需要其他头部信息，可以在这里添加
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: data ? data : undefined,
        })

        if (!response.ok) {
            console.log('Network response was not ok')
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}

export const get = async <T>(path: string): Promise<T> => {
    return request<T>({
        method: 'GET',
        path,
        header: { 'Content-Type': 'application/json' },
    })
}

export const post = async <T>(
    path: string,
    data: any,
    header?: any
): Promise<T> => {
    return request<T>({ method: 'POST', path, data, header })
}

export const put = async <T>(path: string, data: any): Promise<T> => {
    return request<T>({ method: 'PUT', path, data })
}
