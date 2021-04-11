
var app = new Vue({
    el: "#app",
    data: {
        // 搜索的字符
        musicName: '邓紫棋',
        // 搜索结果的列表数组
        musicList: '',
        // 正在播放歌曲名
        playing:'',
        // 歌曲的评论列表
        musicMsg: '',
        // 评论者的头像url
        msgPhoto: '',
        // 歌曲的url
        musicUrl: '',
        // 写真图片的路径
        photoSrc: 'img/ad.jpg',
        //控制mv播放按钮是否显示
        mvShow: false,
        // 控制mv的遮罩层
        mvDiv: false,
        // mv的路径
        mvSrc: '',
        //控制碟片点击播放后转动
        photoRota: false,
        isShow:false
    },
    methods: {
        changeIsShow(){
            this.isShow=!this.isShow
        },
        getMusic: function (musicName) {
            var that = this
            axios.get('https://autumnfish.cn/search?keywords=' + musicName).then(function (ok) {
                that.musicList = ok.data.result.songs
            })
        },
        playMusic: function (itemid,playing) {
            var that = this
            axios.get('https://autumnfish.cn/song/url?id=' + itemid).then(function (ok) {
                that.musicUrl = ok.data.data[0].url
                console.log(ok);
                that.playing = playing
                that.photoRota = true
            })
            axios.get('https://api.mlwei.com/music/api/wy/?key=523077333&cache=1&type=song&id=' + itemid).then(function (ok) {
                that.photoSrc = ok.data.pic
            })
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + itemid).then(function (ok) {
                that.musicMsg = ok.data.hotComments
            })
        },
        playMv: function (mvid) {
            var that = this
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(function (ok) {
                that.mvDiv = true
                that.mvSrc = ok.data.data.url
            })
        },
        downmv: function () {
            this.mvDiv = false
        }

    }
})