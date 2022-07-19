// pages/buydiliver/statement.js
Page({

    /**
     * 页面的初始数据
     */
    data:{
        userAddressInfo:{
        },
        orderInfo: [],
        getAddressUnvisiable: false,
        cart: {
			count: 0,
			total: 0,
            list: {},
            orderid: ""
        },
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
      },
     
      //点击 收获地址
      handleChooseAddress(){
        // 获取用户收货地址   （有小bug，点击后点取消，然后不能再次点击）
        // wx.chooseAddress({
        //   success:(result)=>{
        //     console.log(result)
        //   }
        // })
     
        // 正确流程：
        // 1.获取 权限状态
        wx.getSetting({
          success: (result) => {
            console.log(result)
            // 2. 获取权限状态 
            // 主要发现一些 属性名很怪异的时候 都要使用 [] 形式来获取属性
            const scopeAddres=result.authSetting["scope.address"];
            // 判断用户的权限状态
            if(scopeAddres===true||scopeAddres===undefined){
              wx.chooseAddress({
                success: (result1) => {
                  console.log(result1)
                  //获取数据
                  wx.setStorageSync('userAddressInfo', result1)
                  this.setData({
                    userAddressInfo: result1
                  })
                }
              });
            }else{
              // 3. 用户 以前拒绝过授予权限  先引导用户打开权限页面
              wx.openSetting({
                success: (result2) => {
                  // 4.可以调用  获取收获地址代码
                  wx.chooseAddress({
                    success: (result3) => {
                      console.log(result3)
                      wx.setStorageSync('userAddressInfo', result3)
                      // 获取数据
                      this.setData({
                        userAddressInfo: result3
                      })
                    }
                  });
                }
              });
            }
          }
        });
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //console.log(options.no)
        //var cartInfoNo = "cartInfo"+options.no
        //获取上一个页面传来的对象
        var queryBean = JSON.parse(options.queryBean)
        // this.data.userAddressInfo = wx.getStorageSync("userAddressInfo")
        // this.data.cart = wx.getStorageSync("cartInfo")
        // console.log(this.data.cart)
        // this.data.cart.orderid=this.data.cart.orderid + this.data.userAddressInfo.telNum;
        // console.log(this.data.cart.orderid)
        // var newCart = this.data.cart;
        this.setData({
            userAddressInfo: wx.getStorageSync("userAddressInfo"),
            //cart: wx.getStorageSync(cartInfoNo),
            cart: queryBean
        })
        console.log(this.data.cart)

    },
    onSubmit(){
        if(this.data.userAddressInfo){
            var cartInfoNo = "cartInfo"+this.data.cart.orderid
            wx.setStorageSync(cartInfoNo, this.data.cart)
            var tmp = wx.getStorageSync('orderInfo')
            if(tmp){
                this.data.orderInfo = tmp
            }
            
            console.log(this.data.orderInfo)
            this.data.orderInfo.push(this.data.cart.orderid)
    
            wx.setStorageSync('orderInfo', this.data.orderInfo)
            wx.showToast({
                title: '成功下单o(*≧▽≦)ツ！',
                icon: 'none',
                duration: 2000//持续的时间
            })
            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/myaccount/myaccount',
                });
            }, 2000);
        }else{
            wx.showToast({
                title: '请选择地址！',
                icon: 'error',
                duration: 2000//持续的时间
              })
        }
        
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
        
        // if(this.data.userAddressInfo==""){
        //     this.setData({
        //         getAddressUnvisiable: false
        //     })
        // }else{
        //     this.setData({
        //         getAddressUnvisiable: true
        //     })
        // }
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