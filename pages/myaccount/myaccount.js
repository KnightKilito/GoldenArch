// pages/myaccount.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      authUrl: '/pages/index/imgs/01.jpg',
      nickName: '未登录',
    },
    userInfoData: {}
  },
  go2getUserInfo: function (params) {
    wx.navigateTo({
      url: '/pages/myaccount/getUserInfo',
    })
  },handleChooseAddress(){
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
  shareWxxcx(){
    
        wx.downloadFile({
            //url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
            
            url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
            success: (res) => {
                console.log("res:", res)
                wx.showShareImageMenu({
                    path: res.tempFilePath
                })
            },
            fail: (res)=> {
                console.log(res)
                if( res.errMsg.indexOf('deny')!=-1||res.errMsg.indexOf('denied')!=-1 ){
                    wx.showToast({
                        title: '保存相册失败，请设置权限！',
                        icon: 'none',
                        duration: 2000,
                    })
                }else{
                    wx.showToast({
                        title: '保存相册失败，请重试！',
                        icon: 'none',
                        duration: 2000,
                    });
                }
            }
        })
   
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let a = wx.getStorageSync("userInfoData");
    console.log('===========>>>>>>>>>>', Boolean(a))
    if (!a) {
      wx.navigateTo({
        //这个页面就是授权登录的页面
        url: "./getUserInfo"
      });
    }
    //这一步就是把本地存储拿到的值，赋值给当前个人中心的页面
    this.data.userInfoData = wx.getStorageSync("userInfoData");
    //console.log(this.data.userInfoData);
    var msg = this.data.userInfoData;
    //console.log(msg);
    //console.log(this.data.userInfoData.nickName);
    //this.data.userInfo.authUrl = msg['avatarUrl'];
    //this.data.userInfo.nickName = msg.nickName;
    this.setData({
      userInfo: {
        authUrl: msg['avatarUrl'] ,
        nickName: msg.nickName
      }
    })
    //console.log(this.data.userInfo.authUrl);
    //console.log(this.data.userInfo.nickName);
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