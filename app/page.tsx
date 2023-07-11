'use client'

import { Icon } from '@iconify/react'
import { useState } from 'react'
import QRCode from 'qrcode.react'
import NextImage from 'next/image'

export default function Home() {
    const defaultLogoStyle: string =
        'w-12 h-12 border-gray-400 border-2 box-border cursor-pointer flex justify-center items-center'
    const activeLogoStyle: string =
        'w-12 h-12 border-teal-500 border-2 box-border cursor-pointer flex justify-center items-center '

    const imageList = ['/2221.png', '/2223.png']

    const qrCenterImageInfo = {
        // 二维码中间的logo图片
        height: 50,
        width: 50,
        src: '',
        excavate: false, // 中间图片所在的位置是否镂空
    }

    const [logoId, setLogoId] = useState('default')
    const [imageInfo, setImageInfo] = useState(qrCenterImageInfo)
    const chooseLogo = (logoID: string) => {
        setLogoId(logoID)
        let imageUrl = ''
        if (logoID !== 'default') {
            imageUrl = logoID
        }

        setImageInfo({ ...qrCenterImageInfo, src: imageUrl })
    }

    const downLoadQrCode = () => {
        const fileName = `${new Date().getTime()}`
        const canvasImg: any = document.getElementById('qrCode') // 获取canvas类型的二维码
        const img = new Image()
        const link = document.createElement('a')
        const evt = document.createEvent('MouseEvents')
        img.src = canvasImg.toDataURL('image/png') // 将canvas对象转换为图片的data url
        link.style.display = 'none'
        link.href = img.src
        link.download = fileName
        document.body.appendChild(link) // 此写法兼容可火狐浏览器
        evt.initEvent('click', false, false)
        link.dispatchEvent(evt)
        document.body.removeChild(link)
    }

    return (
        <main className="min-h-screen flex items-center box-border justify-center px-24">
            <div
                style={{ height: '556px' }}
                className="bg-white rounded-xl box-border shadow-2xl w-3/4 mr-4 px-14 flex flex-col justify-center"
            >
                <div className="font-bold text-gray-600 text-xl mb-2 ml-2">
                    网站/网址
                </div>
                <input
                    type="url"
                    className="rounded-md border-2 focus:border-teal-600  focus:ring-2 focus:ring-teal-600 "
                    placeholder="https://qr.mumi666.com"
                />
                <div className="mt-10">
                    <button className="px-10 py-3 text-white transition flex items-center duration-700 ease-in-out  bg-teal-500 rounded-full hover:scale-110 hover:bg-teal-600">
                        <Icon
                            icon={
                                'material-symbols:add-reaction-outline-rounded'
                            }
                            fontSize={18}
                            className="mr-3"
                        />
                        创建二维码
                    </button>
                </div>
            </div>
            <div
                style={{ height: '556px' }}
                className="w-2/5 border-solid border-2 py-16 box-border border-gray-400 rounded-xl bg-white flex flex-col items-center"
            >
                <div
                    style={{ width: '174px', height: '174px' }}
                    className="bg-gray-300"
                >
                    <QRCode
                        id="qrCode"
                        value="https://www.mumi666.com"
                        size={174} // 二维码的大小
                        fgColor="#000000" // 二维码的颜色
                        style={{
                            margin: 'auto',
                            height: '174px',
                            width: '174px',
                        }}
                        imageSettings={imageInfo}
                    />
                </div>
                <div className="mt-4 bg-gray-100 p-2 w-2/3">
                    <div className="text-gray-600 font-bold">LOGO</div>
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
                        {imageList.map((item) => (
                            <div
                                key={item}
                                className={
                                    logoId === item
                                        ? activeLogoStyle
                                        : defaultLogoStyle
                                }
                                onClick={() => chooseLogo(item)}
                            >
                                <NextImage
                                    src={item}
                                    alt={''}
                                    width={48}
                                    height={48}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="underline decoration-teal-500 text-xs text-teal-500 cursor-pointer">
                        上传你的LOGO
                    </div>
                </div>
                <div className="flex justify-start mt-5 w-full px-16">
                    <button
                        className="px-10 py-3 flex items-center text-white transition duration-700 ease-in-out  bg-teal-500 rounded-md hover:scale-110 hover:bg-teal-600"
                        onClick={() => downLoadQrCode()}
                    >
                        <Icon
                            icon={'material-symbols:download'}
                            fontSize={18}
                            className={'mr-2'}
                        />
                        下载二维码
                    </button>
                </div>
            </div>
        </main>
    )
}
