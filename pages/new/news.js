Page({
  data:{
    current:0,
    navScroll:0,
    swiper:{
      duration:300
    },
    loading:false,
    refrechHidden:false,
    moreHidden:false,
    refrechHidden2:false,
    moreHidden2:false,
    moreTodayNewsBtn:true,
    toast:{
      num:0,
      hidden:true,
      duration:1500
    },
    timeMD:"",
    todayTime:"",
    swiperChild:{
      dots:true,
      autoplay:false,
      interval:2000,
      duration:1000
    },
    swiperImg:[
      "/images/wentixiaofei.png",
      "/images/qiyefuwu.png",
      "/images/xiaofeishengji.png",
      "/images/zhinengyingjian.png",
    ],
    news:[],
    todayNews:[],
    otherNews:[]
  },
  onLoad:function(options){
    var that = this;
    setDate(that);
    // switch (this.data.current) {
    //   case 0:
        //加载首页的快讯
        wx.request({
          url: 'http://localhost/mock/kuaixun.json',
          header: {
              'Content-Type': 'application/json'
          },
          success: function(res) {
            //模拟网络延迟
            setTimeout(function(){
              that.setData({
                loading:true,
                news:res.data
              });
            },500)
          }
        });
      //   break;
      // case 1:
        //加载今日资讯
        getRequest('http://localhost/mock/todayNews.json',that);
        // break;
    //}

    //加载其他资讯
    wx.request({
      url: 'http://localhost/mock/otherNews.json',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        var data = res.data;
        //处理时间差
        for(var i =0;i<data.length;i++){
          var d = GetDateDiff(that.data.todayTime,data[i].time);
          data[i].time = d == "0" ?"今天":d +"天前";
        }
        that.setData({
          otherNews:data
        });
      }
    });
  },
  onShow:function(){
    wx.hideNavigationBarLoading();
  },
  tapSwiper:function(event){
    this.setData({
      current: event.target.dataset.index
    });
  },
  changeSwiper:function(event){
    this.setData({
      current:event.detail.current
    });
  },
  changeSwiperChild:function(event){
    console.log("changeSwiperChild");
  },
  actionToupper:function(e){
    var that = this;
    this.setData({
      refrechHidden:true
    });
    wx.request({
      url: 'http://localhost/mock/refrech.json',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        //模拟网络延迟
        setTimeout(function(){
          that.setData({
            refrechHidden:false,
            news:res.data.concat(that.data.news)
          });
        },500)
      }
    });
  },
  actionTolower:function(e){
    var that = this;
    this.setData({
      moreHidden:true
    });
    wx.request({
      url: 'http://localhost/mock/more.json',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        //模拟网络延迟
        setTimeout(function(){
          that.setData({
            moreHidden:false,
            news:that.data.news.concat(res.data)
          });
        },500)
      }
    });
  },
  moreTodayNews:function(e){
    var that = this;
    wx.request({
      url: 'http://localhost/mock/todayNewsNext.json',
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          moreTodayNewsBtn:false,
          todayNews:that.data.todayNews.concat(res.data)
        });
      }
    });
  },
  liTab:function(e){
    var id = e.target.dataset.item;
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  bindBap:function(){
    this.data.toast.num++;
    if(this.data.toast.num ==2){
      this.setData({
        toast:{
          num:0,
          hidden: false,
          duration:1500
        }
      })
    }
  },
  toastChange:function(){
    setTimeout(function(){
      this.setData({
        'toast.hidden':true,
      })
    }.bind(this),1500);
  }
})

function getRequest(url,that){
  wx.request({
      url: url,
      header: {
          'Content-Type': 'application/json'
      },
      success: function(res) {
        //模拟网络延迟
        setTimeout(function(){
          that.setData({
            todayNews:res.data
          });
        },500)
      }
    });
}

function setDate(that){
  var dd = new Date();
  var y = dd.getFullYear();
 	var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);
 	var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();
  that.setData({
    timeMD: m + "-"+ d,
    todayTime: m + "/"+ d + "/"+ y
  });
}

function GetDateDiff(startDate,endDate){
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
    var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return  dates;
}
