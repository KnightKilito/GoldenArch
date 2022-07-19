// pages/myaccount/myorders.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noOrdersUnvisiable: false,
        goods: {
            1: {
                id: 1,
                name: '安格斯MAX厚牛培根堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2021/11/202111031418104692.png',
                sold: 1014,
                price: 2
            },
            2: {
                id: 2,
                name: '安格斯MAX厚牛芝士堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2021/11/202111031419528347.png',
                sold: 1029,
                price: 3
            },
            3: {
                id: 3,
                name: '双层安格斯MAX厚牛培根堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2021/11/202111031421224354.png',
                sold: 1030,
                price: 2
            },
            4: {
                id: 4,
                name: '双层安格斯MAX厚牛芝士堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2021/11/202111031421407016.png',
                sold: 1059,
                price: 1
            },
            5: {
                id: 5,
                name: '巨无霸',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/05/202005270940031690.png',
                sold: 1029,
                price: 2
            },
            6: {
                id: 6,
                name: '汉堡包',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191444328139.png',
                sold: 1064,
                price: 2
            },
            7: {
                id: 7,
                name: '麦辣鸡腿汉堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191431284513.png',
                sold: 814,
                price: 3
            },
            8: {
                id: 8,
                name: '原味板烧鸡腿堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191441213571.png',
                sold: 124,
                price: 3
            },
            9: {
                id: 9,
                name: '麦香鸡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191446258631.png',
                sold: 102,
                price: 5
            },
            10: {
                id: 10,
                name: '吉士汉堡包',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191445238413.png',
                sold: 102,
                price: 5
            },
            11: {
                id: 11,
                name: '双层吉士汉堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/03/202003191445351148.png',
                sold: 102,
                price: 5
            },
            12: {
                id: 12,
                name: '双层脆鸡堡',
                pic: 'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/attachment/2020/10/202010121523342804.png',
                sold: 102,
                price: 5
            }
        },
        orderInfo: [],
        getAddressUnvisiable: true,
        cart: {
            count: 0,
            total: 0,
            list: {},
            orderid: ""
        },
        allCart: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.startPullDownRefresh()
        this.setData({
            orderInfo: wx.getStorageSync('orderInfo')
        })
        if (this.data.orderInfo.length != 0) {
            this.setData({
                noOrdersUnvisiable: true
            })
        }
        this.getAllCart()
    },
    getAllCart(){
        //根据存在本地的索引找信息存进allCart用于信息展示
        for (let i = 0; i < this.data.orderInfo.length; i++) {
            var orderid = this.data.orderInfo[i];
            var ordername = "cartInfo" + orderid;
            console.log("onLoad:"+ordername)
            //this.setData({
            //ordername: wx.getStorageSync(ordername)
            this.data.allCart[i + 1] = wx.getStorageSync(ordername)
            //})
            //console.log(this.data)
        }
        this.setData({
            allCart: this.data.allCart
        })
    },
    checkDelete(e) {
        var orderid = e.currentTarget.dataset.orderid;
        //var choose = 0;
        wx.showModal({
            title: '警告',
            content: '你确定要删除该订单Σ( ° △ °|||)︴？',
            success: (res) => {
                if (res.confirm) {//这里是点击了确定以后
                    console.log('用户点击确定')

                    //choose=1
                    this.deleteOrder(orderid)
                } else {//这里是点击了取消以后
                    console.log('用户点击取消')
                }
            }
        })
        //   if(choose == 1){
        //     this.deleteOrder(orderid)
        //   }
    },
    deleteOrder(e) {

        var orderid = Number(e);
        var ordername = "cartInfo" + orderid;
        for (let i = 0; i < this.data.orderInfo.length; i++) {
            var tmp = this.data.orderInfo[i]
            // console.log(typeof (tmp))
            // console.log(tmp)
            // console.log(typeof (orderid))
            // console.log(orderid)
            if (orderid == tmp) {
                console.log("i:"+i)
                this.data.orderInfo.splice(i, 1)
                //splice方法会自动减掉length
                //this.data.orderInfo.length--;
                console.log(this.data.orderInfo)
                this.setData({
                    orderInfo: this.data.orderInfo
                })
                wx.setStorageSync('orderInfo', this.data.orderInfo)
                console.log("remove orderInfo["+orderid+"] success")
                // console.log(this.data.allCart)
                // this.getAllCart()
                // console.log(this.data.allCart)
            } else {
                console.log("none")
            }
        }
        
        wx.removeStorage({
            key: ordername,
            success: (res) => {
                console.log("removeStorage "+ordername+" success")
                //为什么全局不刷新？？？？为什么？？？？因为allCart值没改？
                // this.onLoad()
                // this.onShow()
                //还是直接重新加载整个界面靠谱……
                wx.redirectTo({
                    url: '/pages/myaccount/myorders'
                })
            },
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.onLoad()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})