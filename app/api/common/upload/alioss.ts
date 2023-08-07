// 注册阿里云oss
import oss from 'ali-oss'

export const upLoadToOss = async (file: ArrayBuffer) => {
    const client = new oss({
        region: process.env.ALI_OSS_REGION,
        // @ts-ignore
        accessKeyId: process.env.ALI_OSS_ACCESSKEYID,
        // @ts-ignore
        accessKeySecret: process.env.ALI_OSS_ACCESSKEYSECRET,
        secure: true,
        bucket: process.env.ALI_OSS_BUCKET,
        timeout: 60000,
    })

    let url = ''
    let err: string | null = null

    if (client) {
        try {
            const result = await client.put(
                new Date().getTime() + '.png',
                Buffer.from(file)
            )
            url = result.url
        } catch (error: any) {
            console.log(error)
            err = '上传失败'
        }
    }

    return {
        err,
        url,
    }
}
