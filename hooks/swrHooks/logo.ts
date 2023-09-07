import useSWR from 'swr'
import { listLogo } from '@/hooks/service/logo'
import { ApiSuccessResponse } from '@/types/request'
// import {PrismaClient} from '@prisma/client'
//
// const prisma = new PrismaClient()

export function useLogo() {
    const { data, error, isLoading } = useSWR<ApiSuccessResponse<any[]>>(
        '/api/common/logo',
        listLogo
    )

    return {
        logoList: data?.result ?? [],
        isLoading,
        isError: error,
    }
}
