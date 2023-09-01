'use client'

import { Icon } from '@iconify/react'
import { CSSProperties, useState } from 'react'
import QRCode from 'qrcode.react'
import MenuAppBar from '@/app/components/MenuAppBar'
import { Button, Radio, TextField } from '@mui/material'
import { LogoList } from '@/app/components/LogoList'
import { enqueueSnackbar } from 'notistack'

const pxDict = [
    { value: 1024, label: '2048 ✖️ 2048' },
    { value: 512, label: '1024 ✖️ 1024' },
    { value: 256, label: '512 ✖️ 512' },
    { value: 128, label: '256 ✖️ 256' },
]

interface ImageSettings {
    src: string
    height: number
    width: number
    excavate: boolean
    crossOrigin?: string
    x?: number
    y?: number
}

interface QRProps {
    value: string
    size?: number
    level?: string
    bgColor?: string
    fgColor?: string
    style?: CSSProperties
    includeMargin?: boolean
    imageSettings?: ImageSettings
}

export default function Home() {
    const qrCodeDefaultProps: QRProps = {
        value: '',
        size: 512, // 二维码的大小
        fgColor: '#000000', // 二维码的颜色
        level: 'H',
        style: {
            margin: 'auto',
            height: '174px',
            width: '174px',
        },
        imageSettings: {
            // 二维码中间的logo图片
            height: 100,
            width: 100,
            src: '',
            excavate: false, // 中间图片所在的位置是否镂空
        },
    }

    // let url = ''

    const [chooseRadioValue, setChooseRadioValue] = useState(512)
    const [qrCodeProps, setQrCodeProps] = useState(qrCodeDefaultProps)
    const [url, setUrl] = useState('')

    const chooseLogo = (logoID: string) => {
        let imageUrl = ''
        if (logoID !== 'default') {
            imageUrl = logoID
        }
        setQrCodeProps({
            ...qrCodeProps,
            // @ts-ignore
            imageSettings: {
                ...qrCodeProps.imageSettings,
                src: imageUrl,
                crossOrigin: 'anonymous',
            },
        })
    }

    const handleInput = ({ target: { value } }: any) => {
        // url = value
        setUrl(value)
    }

    const handlePxChange = ({ target: { value } }: any) => {
        const qrPxSize = Number(value)
        setChooseRadioValue(qrPxSize)
        setQrCodeProps({
            ...qrCodeProps,
            size: qrPxSize,
            // @ts-ignore
            imageSettings: {
                ...qrCodeProps.imageSettings,
                height: Math.floor(qrPxSize / 4),
                width: Math.floor(qrPxSize / 4),
            },
        })
    }

    const createQrcode = () => {
        setQrCodeProps({
            ...qrCodeProps,
            value: url,
        })
    }

    const downLoadQrCode = () => {
        if (url === '') {
            enqueueSnackbar('url地址不能为空！', {
                variant: 'error',
                anchorOrigin: { horizontal: 'center', vertical: 'top' },
            })
            return
        }

        const fileName = `${new Date().getTime()}`
        const canvasImg: any = document.getElementById('qrCode') // 获取canvas类型的二维码
        const img = new Image()
        const link = document.createElement('a')
        // const evt = document.createEvent('MouseEvents')
        const evt = new Event('click', { bubbles: false, cancelable: false })
        img.src = canvasImg.toDataURL('image/png') // 将canvas对象转换为图片的data url
        link.style.display = 'none'
        link.href = img.src
        link.download = fileName
        document.body.appendChild(link) // 此写法兼容可火狐浏览器
        // evt.initEvent('click', false, false)
        link.dispatchEvent(evt)
        document.body.removeChild(link)
    }

    return (
        <>
            <MenuAppBar />
            <main className="h-calc mt-20 flex items-center box-border justify-center px-24">
                <div
                    style={{ height: '556px' }}
                    className="bg-white rounded-xl box-border shadow-2xl w-3/4 mr-4 px-14 flex flex-col justify-center"
                >
                    <div className="font-bold text-gray-600 text-xl mb-2 ml-2">
                        网站/网址
                    </div>
                    <TextField
                        type="url"
                        className="rounded-md border-2 focus:border-teal-600  focus:ring-2 focus:ring-teal-600 "
                        placeholder="https://www.XXXXXX.com"
                        onInput={(e) => handleInput(e)}
                    />
                    <div className="mt-10">
                        <Button
                            className="px-10 py-3 text-white transition flex items-center duration-700 ease-in-out  bg-teal-500 rounded-full hover:scale-110 hover:bg-teal-600"
                            onClick={() => createQrcode()}
                        >
                            <Icon
                                icon={'ic:twotone-refresh'}
                                fontSize={18}
                                className="mr-3"
                            />
                            创建二维码
                        </Button>
                    </div>
                </div>
                <div className="w-2/5 border-solid border-2 p-8 box-border border-gray-400 rounded-xl flex flex-col items-center">
                    <div
                        style={{ width: '174px', height: '174px' }}
                        className="bg-gray-300"
                    >
                        <QRCode id="qrCode" {...qrCodeProps} />
                    </div>
                    <LogoList genQrCenterLogo={chooseLogo} />
                    <div className="mt-4 bg-gray-100 pb-2 w-full">
                        <div className="flex justify-between items-center p-2 bg-gray-100 text-gray-500">
                            <div className="font-bold">尺寸</div>
                            <Icon
                                icon="ic:baseline-keyboard-arrow-down"
                                fontSize={24}
                                className="cursor-pointer"
                            />
                        </div>
                        <div className="px-2 grid grid-cols-2 gap-1 text-sm text-gray-800 font-semibold">
                            {pxDict.map((item) => (
                                <label
                                    className="flex items-center"
                                    key={item.value}
                                >
                                    <Radio
                                        name="ts"
                                        className="mr-2 focus:border-teal-600 text-teal-600 focus:ring-2 focus:ring-teal-600"
                                        value={item.value}
                                        checked={
                                            item.value === chooseRadioValue
                                        }
                                        onChange={(e) => handlePxChange(e)}
                                    />
                                    {item.label}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-start mt-5 w-full">
                        <Button
                            className="px-10 py-3 flex items-center text-white transition duration-700 ease-in-out  bg-teal-500 rounded-md hover:scale-110 hover:bg-teal-600"
                            onClick={() => downLoadQrCode()}
                        >
                            <Icon
                                icon={'material-symbols:download'}
                                fontSize={18}
                                className={'mr-2'}
                            />
                            下载二维码
                        </Button>
                    </div>
                </div>
            </main>
        </>
    )
}
