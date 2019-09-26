import Axios from 'axios';
import { Indicator } from 'mint-ui'
import { MessageBox } from 'mint-ui';

const service = Axios.create({
    baseURL:'https://shopapi.smartisan.com/',
    timeout:5000
})
service.interceptors.request.use(
    config => {
        Indicator.open()
        return config
    },
    //请求错误的代码
    error => {
        console.log('请求发生错误')
        return Promise.reject(error)
    }
)

service.interceptors.response.use(

    response => {
        Indicator.close();
        const res = response.data
        if(res.status ===200) {
            MessageBox({
                title: '提示',
                message: '请求超时',
                showCancelButton: true
              });
              return Promise.reject(new Error(res.message || 'Error'))
        }else{
            return res
        }
    },
    error => {
        Message({
            message:error.message,
            type:'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service