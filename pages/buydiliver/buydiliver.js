// var app = getApp();
// var server = require('../../utils/server');
Page({
	data: {
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
		goodsList: [
			{
				id: 'hot',
				classifyName: '热销',
				goods: [1, 2, 3, 4, 5]
			},
			{
				id: 'new',
				classifyName: '新品',
				goods: [1, 2 , 4 , 3]
			},
			{
				id: 'classic',
				classifyName: '经典',
				goods: [7, 8, 9,10]
			},
			{
				id: 'hugesmall',
				classifyName: '极大极小',
				goods: [5,6]
			},
			{
				id: 'double',
				classifyName: '双层',
				goods: [3, 4]
			}
		],
		cart: {
			count: 0,
			total: 0,
            list: {},
            orderid: ""
		},
		showCartDetail: false,
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        background: ['01.jpg', '02.jpg', '03.jpg','04.jpg'],
	},
	onLoad: function (options) {
		// var shopId = options.id;
		// for (var i = 0; i < app.globalData.shops.length; ++i) {
		// 	if (app.globalData.shops[i].id == shopId) {
		// 		this.setData({
		// 			shop: app.globalData.shops[i]
		// 		});
		// 		break;
		// 	}
        // }
        // wx.request({
        //     method: 'POST',
        //     url: 'http://127.0.0.1:3000/getGoods',
        //     data: {
        //       //"openid": "aaaaaa"
        //     },
        //     header: { "Content-Type": "application/x-www-form-urlencoded" },
        //     success: function (res) {
        //       console.log(res.data);
        //       this.setData({
        //           goods: res.data
        //       })
        //     },
        //     fail: function () {
        //       console.log("获取失败");
        //     }
        //   })
          
          
	},
	onShow: function () {
		this.setData({
			classifySeleted: this.data.goodsList[0].id
		});
	},
	tapAddCart: function (e) {
		this.addCart(e.target.dataset.id);
	},
	tapReduceCart: function (e) {
		this.reduceCart(e.target.dataset.id);
	},
	addCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		this.data.cart.list[id] = num + 1;
		this.countCart();
	},
	reduceCart: function (id) {
		var num = this.data.cart.list[id] || 0;
		if (num <= 1) {
			delete this.data.cart.list[id];
		} else {
			this.data.cart.list[id] = num - 1;
		}
		this.countCart();
	},
	countCart: function () {
		var count = 0,
			total = 0;
		for (var id in this.data.cart.list) {
			var goods = this.data.goods[id];
			count += this.data.cart.list[id];
			total += goods.price * this.data.cart.list[id];
		}
		this.data.cart.count = count;
		this.data.cart.total = total;
		this.setData({
			cart: this.data.cart
		});
	},
	follow: function () {
		this.setData({
			followed: !this.data.followed
		});
	},
	onGoodsScroll: function (e) {
		if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
			this.setData({
				scrollDown: true
			});
		} else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
			this.setData({
				scrollDown: false
			});
		}

		var scale = e.detail.scrollWidth / 570,
			scrollTop = e.detail.scrollTop / scale,
			h = 0,
			classifySeleted,
			len = this.data.goodsList.length;
		this.data.goodsList.forEach(function (classify, i) {
			var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
			if (scrollTop >= h - 100 / scale) {
				classifySeleted = classify.id;
			}
			h += _h;
		});
		this.setData({
			classifySeleted: classifySeleted
		});
    },
    //跳到相关分类去
	tapClassify: function (e) {
		var id = e.target.dataset.id;
		this.setData({
			classifyViewed: id
		});
		var self = this;
		setTimeout(function () {
			self.setData({
				classifySeleted: id
			});
		}, 100);
	},
	showCartDetail: function () {
		this.setData({
			showCartDetail: !this.data.showCartDetail
		});
	},
	hideCartDetail: function () {
		this.setData({
			showCartDetail: false
		});
	},
	// submit: function (e) {
	// 	server.sendTemplate(e.detail.formId, null, function (res) {
	// 		if (res.data.errorcode == 0) {
	// 			wx.showModal({
	// 				showCancel: false,
	// 				title: '恭喜',
	// 				content: '订单发送成功！下订单过程顺利完成，本例不再进行后续订单相关的功能。',
	// 				success: function(res) {
	// 					if (res.confirm) {
	// 						wx.navigateBack();
	// 					}
	// 				}
	// 			})
	// 		}
	// 	}, function (res) {
	// 		console.log(res)
	// 	});
    // },

    //去结算
    go2statement: function (params) {
        var userInfo = wx.getStorageSync("userInfoData");
        
        if(userInfo){
            // 1获取当前时间
            var timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000; 
                
            // 2创建订单号
            let orderNumber = timestamp;
            this.data.cart.orderid=orderNumber;
            //wx.setStorageSync('cartInfo'+orderNumber, this.data.cart);
            var queryBean = JSON.stringify(this.data.cart)
            wx.navigateTo({
            url: '/pages/buydiliver/statement?queryBean='+queryBean,
        }) 
        }else{
            wx.showToast({
                title: '请先登录！',
                icon: 'error',
                duration: 2000//持续的时间
            })
            setTimeout(() => {
                wx.redirectTo({
                    url: '/pages/myaccount/myaccount',
                });
            }, 2000);
        }

        
    },



    //轮播图
    changeIndicatorDots() {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },

    changeAutoplay() {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },

    intervalChange(e) {
        this.setData({
            interval: e.detail.value
        })
    },

    durationChange(e) {
        this.setData({
            duration: e.detail.value
        })
    }
});

