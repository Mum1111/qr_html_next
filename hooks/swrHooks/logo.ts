import useSWR from 'swr'
import { listLogo } from '@/hooks/service/logo'
import { ApiSuccessResponse } from '@/types/request'
import { Logo } from '@prisma/client'

export function useLogo() {
    const { data, error, isLoading } = useSWR<ApiSuccessResponse<Logo[]>>(
        '/api/common/logo',
        listLogo
    )

    return {
        logoList: data?.result ?? [],
        isLoading,
        isError: error,
    }
}
