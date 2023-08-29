export interface ApiSuccessResponse<T> {
    result: T
    statusCode: number
    message: string
}

export interface ApiErrorResponse {
    message: string
    statusCode: number
}
