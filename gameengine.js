var player_status = {
    Message : "Hello Vue!",
    HP : 100,
    Money : 5,
    Debt : 50000,
    Selections : []
}
var engine_instance = null
var app = new Vue({
    el: '#app',
    data: player_status,
    created: function () {
        // Init
        engine_instance = game_logic()
        engine_instance.next()
      }
  })

function on_click_button(index){
    engine_instance.next(index)
}