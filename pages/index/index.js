Page({
    // 页面的初始数据
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'page/component/pages/index/imgs'
        }
    },
    data: {
        inputShowed: false,  //初始文本框不显示内容
        background: ['01.jpg', '02.jpg', '03.jpg','04.jpg'],
        goods: [
            {   //仅用于主页活动展示
                gname:'儿童套餐',
                gprice:40,
                gdetail:'六一快乐！免费吃甜筒！',
                gimg:'https://officialwebsitestorage.blob.core.chinacloudapi.cn/public/upload/photo_db/2022/06/01/202206011530343217/202206011530343217_640_398.jpg'
        },
            {   //仅用于主页活动展示
            gname:'安格斯牛堡',
            gprice:35.60,
            gdetail:'一个顶饱',
            gimg:'https://img-blog.csdnimg.cn/e265e705369c4ca797e1435dd404e166.jpeg'
        }, {
            gname:'巨无霸汉堡',
            gprice:25.70,
            gdetail:'霸气就10元！',
            gimg:'https://img-blog.csdnimg.cn/0b167c87a7c246a29ebc492109b21de7.jpeg'
        }, {
            gname:'板烧鸡腿堡',
            gprice:66.60,
            gdetail:'好吃，经典',
            gimg:'https://img-blog.csdnimg.cn/93dc07e2fa8b4de0ba306e844d6b5536.jpeg'
        }, {
            gname:'麦辣鸡腿堡',
            gprice:54.30,
            gdetail:'好吃',
            gimg:'https://img-blog.csdnimg.cn/bf48b78d979748a4ac288c85f73199e5.png'
        }],
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        modalHidden: false,
    },
    buttonTap: function() {
        this.setData({
          modalHidden: false
        })
      },
    
      /**
       * 点击取消
       */
      modalCandel: function() {
        // do something
        this.setData({
          modalHidden: true
        })
      },
    
      /**
       *  点击确认
       */
      modalConfirm: function() {
        // do something
        this.setData({
          modalHidden: true
        })
      },
    // 使文本框进入可编辑状态
    showInput: function () {
        this.setData({
            inputShowed: true   //设置文本框可以输入内容
        });
    },
    // 取消搜索
    hideInput: function () {
        this.setData({
            inputShowed: false
        });
    },
    go2buydiliver: function (params) {
        wx.navigateTo({
            url: '/pages/buydiliver/buydiliver',
        }) 
    },
    go2buyself(){
        wx.navigateTo({
            url: '/pages/buyself/buyself',
        }) 
    },
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