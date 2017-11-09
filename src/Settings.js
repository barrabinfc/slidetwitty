var AppSettings = function(){
    this.interval = 5
    this.user_id = 'zero_likes'
    this.page_size = 650.0,
    this.offset = 0,

    this.restart = () => {
        destroy()
        setup()
    }
}

var params = new AppSettings();
export default params;