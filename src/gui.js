var AppSettings = function(){
    this.interval = 12.0
    this.user_id = 'zero_likes'
    this.window_size = 650
}

var params = new AppSettings()

window.gui = new dat.GUI()
window.gui.useLocalStorage = true
window.gui.params = params

gui.remember( params )
gui.add(params, 'window_size').min(0).max(window.screen.height)
gui.add(params, 'interval').min(0).max( 120 )

