function* walk_on_street(){
    var exit = false
    while(exit!=true){
        player_status["Message"] = [
            "你开始在深圳三和的街上晃荡，人来人往，没有任何人注意到你的存在",
        ]
        player_status["HP"] -= 2
        var p = Math.random()
    
        
        if(p<0.3){
            player_status["Message"].push("你发现了一堆空瓶子！这可是能够卖一块钱的！")
            player_status["Money"] += 1
            player_status["Selections"]=["继续晃悠","干点别的"]
            var player_selection = yield
            if(player_selection==0){
                continue
            }else if (player_selection == 1){
                return false
            }
        }else if (p<0.6){
            player_status["Message"].push("你看到了一家卷帘门半开着的洗头房，你要进去修车吗？")
            player_status["Selections"]=["修车","算了"]
            var player_selection = yield
            if(player_selection==0){
                //修车
            }else if (player_selection == 1){
                continue
            }
        }
    }
    
}
function* game_logic(){
    player_status["Message"] = [
        "欢迎游玩《三和浮尘录》，本游戏试图模拟一个三和大神的生活，从而展示另一个底层的世界",
        "这并不代表作者赞同三和大神的想法，甚至是带有批判的意味来制作的本游戏但是，将三和大神看作一种奇特的生物来满足猎奇的心理，同样也是不妥的",
        "为此，作者试图用一个游戏向玩家勾勒三和大神们所遇到的困境、痛苦和迷茫",
        "并警示任何一个人，避免走上这样的道路",
        "如今戒赌吧已经被封，这些人的故事如同浮尘一样，在三和的大街上飘散",
        "作者希望能够稍微记录一下，这些人的故事"
    ]
    player_status["Selections"] = [
        "开始游戏"
    ]
    var player_selection = yield;
    // start
    var start_message = [
        "当你开始网赌的时候，你听过无数人说，“不赌为赢”，但是你还是想去刺激一下，试一试",
        "当你输了这个月工资的时候，你一咬牙一跺脚，坚持要通过一把梭哈把整个月的工资赌回来",
        "当你把积蓄全部输光的时候，你已经无法收场了，你打开了各种小贷APP，开始拆东墙补西墙，寄希望于一把翻盘",
        "当你小贷APP的催收短信轰炸到你只能关闭手机的时候，你意识到，你和戒赌吧的老哥们就快要会和了",
        "当高利贷敲你家房门，群发侮辱你的短信给你所有联系人的时候，你借钱买了一张来三和的车票",
        "当你看到三和人才市场的大门，你终于意识到，你和那些你当笑话看的戒赌吧老哥，没有任何区别",
        "当你下车的时候，身上除了一张身份证，只剩下5块钱"
    ]

    for(var i =0; i < start_message.length; i++)
    {
        player_status["Message"] = [start_message[i]]
        player_status["Selections"] = ["继续"]
        player_selection = yield
    }
    var exit = false
    while(exit != true){
        player_status["Message"] = ["你在街上张望着，决定接下来要去的地方"]
        player_status["Selections"]=[
            "在街上转转",
            "做日结",
            "还债务",
            "去网吧",
            "找地方睡觉"
        ]
        player_selection = yield

        switch (player_selection) {
            case 0:
                //在街上转悠
                yield* walk_on_street()
                break;
            case 1:

        
            default:
                break;
        }
    }
    


}
