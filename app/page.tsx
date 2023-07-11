export default function Home() {
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
                    <button className="px-10 py-3 text-white transition duration-700 ease-in-out  bg-teal-500 rounded-full hover:scale-110 hover:bg-teal-600">
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
                    className="bg-amber-200"
                ></div>
                <div className="mt-4 bg-gray-100 p-2 w-2/3">
                    <div className="text-gray-600 font-bold">LOGO</div>
                    <div className="p-2 my-3 grid grid-cols-4 gap-2">
                        <div className="w-12 h-12 border-gray-400 border-2 box-border cursor-pointer">
                            1
                        </div>
                    </div>
                    <div className="underline decoration-teal-500 text-xs text-teal-500">
                        上传你的LOGO
                    </div>
                </div>
                <div className="flex justify-start mt-5 w-full px-16">
                    <button className="px-10 py-3 text-white transition duration-700 ease-in-out  bg-teal-500 rounded-md hover:scale-110 hover:bg-teal-600">
                        下载二维码
                    </button>
                </div>
            </div>
        </main>
    )
}
