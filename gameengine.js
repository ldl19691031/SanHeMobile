var player_status = {
    Message : "Hello Vue!",
    HP : 100,
    Money : 5,
    Debt : 50000,
    Selections : [],
    DialogMessage:""
}
var engine_instance = null
var app = new Vue({
    el: '#app',
    data: player_status,
    created: function () {
        // Init
        engine_instance = game_logic()
        engine_instance.next()
      },
    watch:{
        HP: function(val){
            if(val > 100){
                this.val = 100
            }
            if(val < 0){
                document.getElementById("GameOverDialog").style["display"] = "block"
                game_over("HP")

            }
        },
        Money:function(val){
            if(val<0){
                document.getElementById("GameOverDialog").style["display"] = "block"
                game_over("Money")
            }
        }
    }
  })

function on_click_button(index){
    engine_instance.next(index)
}