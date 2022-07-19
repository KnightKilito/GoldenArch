// pages/myaccount/getUserInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfoData: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
//这个方法是点击立即授权的按钮触发的；
loginWepy() {
    wx.getUserProfile({
      lang: "zh_CN",
      desc: "获取你的昵称、头像、地区及性别",
      success: res => {
        wx.setStorageSync('userInfoData', res.userInfo)
      //res.userInfo就是一些信息，在这里进行渲染
      //在这里进行你需要的操作，比如拿昵称、头像、性别
        wx.showToast({
          title: "授权成功",
          icon: "success"
        });
        setTimeout(() => {
          wx.navigateBack({
            //登陆完返回
            delta: 1
          });
        }, 1000);
        
      },
      // 失败回调
      fail: err => {
        reject(err);
      }
    });

},
back(){
    wx.redirectTo({
        url: '/pages/index/index',
    });
},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        
      },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})