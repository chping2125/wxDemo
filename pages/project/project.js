Page({
  data:{
    progress:{
      percent:0,
      hidden:true,
      width:6,
      color:'#09BB07'
    },
    videoSrc: '',
    poster: '/media/xuwei.webp',
    name: '每时每刻',
    author: '许巍',
    src: '/media/now.mp3',
    action: null
  },
  videoErrorCallback: function(e) {
     console.log('视频错误信息:')
     console.log(e.detail.errMsg)
  },
  onLoad:function(options){
    var that = this;
    var timer = setInterval(function(){
      console.log(1);
      that.setData({
        'progress.percent': ++that.data.progress.percent
      })
      if(that.data.progress.percent === 100){
        clearInterval(timer);
        that.setData({
            videoSrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
            'progress.hidden':false
          });
      }
    },50);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
