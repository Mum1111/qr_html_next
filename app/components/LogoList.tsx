'use client'

import { Icon } from '@iconify/react'
import NextImage from 'next/image'
import { Button } from '@mui/material'
import React, { useRef, useState } from 'react'
import { uploadLogo } from '@/hooks/service/logo'
import { enqueueSnackbar } from 'notistack'
import { useLogo } from '@/hooks/swrHooks/logo'
import { mutate } from 'swr'

// type RenderFunctionType = (data: string) => void // 根据实际情况定义类型

interface LogoListProps {
    genQrCenterLogo: any
}

const defaultLogoStyle: string =
    'h-12 w-12 border-gray-400 border-2 border-solid box-border cursor-pointer flex justify-center items-center'
const activeLogoStyle: string =
    'h-12 w-12 border-teal-500 border-2 box-border border-solid cursor-pointer flex justify-center items-center'

export const LogoList: React.FC<LogoListProps> = ({ genQrCenterLogo }) => {
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const [logoId, setLogoId] = useState('default')

    const { logoList } = useLogo()

    const urlToBase64 = (url: string) => {
        return new Promise<string>((resolve, reject) => {
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = url
            // img.setAttribute('crossOrigin', 'Anonymous')
            img.onload = function () {
                const canvas = document.createElement('canvas')
                const width = img.width
                const height = img.height
                canvas.height = height
                canvas.width = width
                canvas.getContext('2d')?.drawImage(img, 0, 0, width, height)
                const baseUrl = canvas.toDataURL('image/jpeg')
                resolve(baseUrl)
            }
            img.onerror = function (error) {
                reject(error)
            }
        })
    }

    const chooseLogo = async (logoId: string) => {
        setLogoId(logoId)
        let logoUrl = 'default'
        if (logoId !== 'default') {
            logoUrl = await urlToBase64(logoId)
        }
        genQrCenterLogo(logoUrl)
    }

    const handleHiddenFileInputShow = () => {
        hiddenFileInput.current && hiddenFileInput.current.click()
    }

    const handleFileInputChange = async (event: any) => {
        const file = event.target.files[0]

        const data = new FormData()
        data.append('image', file)

        try {
            const { success }: any = await uploadLogo(data)
            await mutate('/api/common/logo')
            enqueueSnackbar(success, {
                variant: 'success',
                anchorOrigin: { horizontal: 'center', vertical: 'top' },
            })
        } catch (e) {
            // @ts-ignore
            enqueueSnackbar(e, {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'top' },
            })
        }
    }

    return (
        <div className="mt-4 bg-gray-100 pb-2 w-full">
            <div className="flex justify-between items-center p-2 bg-teal-500 text-white">
                <div className="font-bold">LOGO</div>
                <Icon
                    icon="ic:baseline-keyboard-arrow-up"
                    fontSize={24}
                    className="cursor-pointer"
                />
            </div>
            <div className="p-2 my-3 grid grid-cols-4 gap-2">
                <div
                    className={
                        logoId === 'default'
                            ? activeLogoStyle
                            : defaultLogoStyle
                    }
                    onClick={() => chooseLogo('default')}
                >
                    <Icon
                        icon="ic:outline-close"
                        fontSize={28}
                        className="text-gray-400"
                    />
                </div>
                {logoList &&
                    logoList.map((item) => (
                        <div
                            key={item.id}
                            className={
                                logoId === item.imageUrl
                                    ? activeLogoStyle
                                    : defaultLogoStyle
                            }
                            onClick={() => chooseLogo(item.imageUrl)}
                        >
                            <NextImage
                                src={item.imageUrl}
                                alt={''}
                                width={40}
                                height={40}
                            />
                        </div>
                    ))}
            </div>
            <Button
                className="underline px-2 decoration-teal-500 text-xs text-teal-500 cursor-pointer"
                onClick={handleHiddenFileInputShow}
            >
                上传你的LOGO
            </Button>
            <input
                type="file"
                hidden
                ref={hiddenFileInput}
                onChange={handleFileInputChange}
            />
        </div>
    )
}
