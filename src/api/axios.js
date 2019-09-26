import request from '@/api/request';

//获取轮播图的数据
export const getBanner = () => {
    return request({
        url:'mobile/home'
    })
}

//获取热门搜索商品
export const getHotShop = () => {
    return request({
        url:'store/index.php?r=NewUserGift/Detail'
    })
}

//获取index页面列表数据
export const getIndexList = (page) => {
    return request({
        url:`mobile/skulist?page=${page}`
    })
}

//获取详情页商品信息
export const getDetail = (id) => {
    return request({
        url :`product/spus?ids=${id}`
    })
}

//获取详情页商品图片
export const getDetailShopimg = (id) => {
    return request({
        url : `product/skus?ids=${id}&with_stock=true&with_spu=true`
    })
}


//获取分类页商品
export const getListShop = () =>{
    return request({
        url : 'product/skus?ids=100051704,100046411,100023501,100042203,100042801,100052803,100026701,100053001,100057709,100039743,100057915,100058401,100053313,100058801,100040501,100033802,100036401,100036501&with_stock=true&with_spu=true'
    })
}
