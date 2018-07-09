/**
 * Get a random integer between `min` and `max`.
 * 
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function* multi_message(messages){
    for(var i =0; i < messages.length; i++)
    {
        player_status["Message"] = [messages[i]]
        player_status["Selections"] = ["继续"]
        player_selection = yield
    }
}
function* fix_car(){
    p = Math.random()
    player_status["Money"] -= 150
    if (p < 0.1){
        player_status["Message"] = [
            "当你刚刚搂着怀里的失足少女躺下，随即门外传来了一阵脚步声",
            "一段急促的敲门声响了起来。“开门！警察，查房！”",
            "过了一会儿，你就双手抱头，蹲在了地上。",
            "交出了300块钱罚款之后，你终于被放了出来"
        ]
        player_status["Money"] -= 300
        return
    }else{
        var messages=[
            "你静静地望着她，希望从她那里感受到一点点爱情的温度",
            "而她连衣服也没脱，只是把裤子往下一褪，不耐烦地说，大哥赶紧着，赶时间",
            "你想想这价格也就别要求太多了，于是也就顺其自然地努力了起来",
            "经过一阵子的努力，当那一刻来临的时候，你感觉浑身舒适，仿佛终于找到了属于男性的力量",
            "你回头看了看身边背对着你的失足少女，点了一根烟，然后拍了她的背影",
            "你甚至有一种迷幻的感觉，想要和她在一起，你赶紧甩了甩头，打消了这种想法",
            "你把照片发到戒赌吧，配上几句“今天这车怎么样”之类的话，然后刷了刷网友回帖",
            "随后翻过身睡着了"
        ]
        yield* multi_message(messages)
        player_status["HP"] +=50
        return
    }
}
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
                yield* fix_car()
            }else if (player_selection == 1){
                continue
            }
        }
    }
    
}
function* do_one_day_job(){
    var messages= [
        "你来到了著名的三和人力资源市场，眼前挤满了熙熙攘攘的人群，汗臭味，脚臭味，叫卖东西的声音，骂人的声音汇聚成一团",
        "你努力向前方挤过去，试图找到一个好一点的日结"
    ]
    yield* multi_message(messages)
    p = Math.random()
    //if (p < 0.2)
    {
        player_status["Message"] = [
            "有人询问你，愿不愿意去电子厂做日结"
        ]
        player_status["Selections"]=[
            "啥日结都成，做",
            "决不当厂狗，算了"
        ]
        var player_selection = yield
        if (player_selection==1){
            return
        }
        //焊电路板小游戏
        var work_number = getRandomInt(10,25)
        player_status["Message"] = [
            "等你回过神来，你已经站在了一个生产线前面",
            "你的任务就是焊流水线上传过来的电路板，非常无聊",
            "周围的老哥们都面无表情,只有一个老哥正在高谈阔论关于中日钓鱼岛问题的伟大构想"
        ]
        while(work_number>0){
            work_number -= 1
            player_status["Selections"]=[
                "你的面前堆着"+work_number+"块电路板，你拿起焊枪",
                "摸鱼，和其他老哥吹牛逼搭话"
            ]
            var player_selection = yield
            if (player_selection == 0){
                player_status["HP"] -= 3
                continue
            }else if(player_selection == 1){
                if (Math.random()<0.3){
                    player_status["Message"] = [
                        "你的主管转头看到你在摸鱼，对你破口大骂，然后让你赶紧滚蛋不要来了",
                    ]
                    player_status["selection"] = [
                        "灰溜溜地离开"
                    ]
                    var player_selection = yield
                    return
                }else{
                    player_status["Message"] = [
                        "你开始有一句没一句地和老哥吹牛逼，主管看了看你们，也没有说什么",
                    ]
                }
            }
        }
        player_status["Message"] = [
            "总算是收工了，坐在大巴车上，你感觉全身都累瘫了",
            "窗外的灯光不断闪过，你意识到你已经从电子厂回到了三和",
            "找点别的事情做吧"
        ]
        player_status["Selections"]=["继续"]
        player_status["Money"]+= 30
        yield
        return
    }

}
function* pay_or_get_debt(){
    player_status["Message"] = [
        "你打开了熟悉的小贷APP文件夹",
        "每个APP的右上角都显示着一大堆的未读消息，不用看，肯定是催款的"
    ]
    player_status["Selections"]=[
        "看看有没有新的口子",
        "算了"      
    ]

    if(player_status["Money"]>100){
        player_status["Selections"].push("还100块小贷")
    }
    if(player_status["Money"]>1000){
        player_status["Selections"].push("还1000块小贷")
    }

    var player_selection = yield
    if (player_selection==0){
        var p = Math.random()
        player_status["Message"] = [
            "你输入了一个刚从别的老哥那你听说的APP名字"
        ]
        if(p<0.2){
            player_status["Message"].push(
                "审核居然通过了！你要借一笔2000的小贷吗？"
            )
            player_status["Selections"]=[
                "借！撸小贷就像发工资！",
                "算了，以后要还的更多"
            ]
            var player_selection = yield
            if (player_selection == 0){
                player_status["Debt"] += 2000
                player_status["Money"] += 2000
            }else{
                return
            }
        }else{
            player_status["Message"].push(
                "APP提示你的征信记录已经完全黑了，不会给你下款的"
            )
            player_status["Selections"] = ["继续"]
            yield
            return
        }
    }
}
function* gambling(){
    player_status["Message"] = [
        "你打开了熟悉的在线赌博平台",
        "你可以开始以100为单位下注了"
    ]
    while(true)
    {
        player_status["Selections"]=[
            "2倍赔率",
            "5倍赔率",
            "10倍赔率",
            "50倍赔率",
            "算了"
        ]
        var player_selection = yield
        switch (player_selection) {
            case 0:
                if(Math.random()<0.4){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "很遗憾，你没有赢"
                    ]
                }else{
                    player_status["Money"] += 200
                    player_status["Message"] = [
                        "你赢了！"
                    ]
                }
                break;
            case 1:
                if(Math.random()<0.15){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "很遗憾，你没有赢"
                    ]
                }else{
                    player_status["Money"] += 500
                    player_status["Message"] = [
                        "你赢了！"
                    ]
                }
                break;
            case 2:
                if(Math.random()<0.05){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "很遗憾，你没有赢"
                    ]
                }else{
                    player_status["Money"] += 1000
                    player_status["Message"] = [
                        "你赢了！"
                    ]
                }
                break;
            case 3:
                if(Math.random()<0.015){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "很遗憾，你没有赢"
                    ]
                }else{
                    player_status["Money"] += 5000
                    player_status["Message"] = [
                        "你赢了！"
                    ]
                }
                break;
            case 4:
                return;
            default:
                break;
        }
    }


}
function* play_tieba(){
    player_status["Message"] = [
        "你熟练地打开戒赌吧，登录了自己的账号",
        "你把自己的支付宝账号贴了出去",
        "然后开始拍照加卖惨，试图让吧友捐助自己一点钱"
    ]
    while(true){
        player_status["Selections"] = [
            "怀念自己的父母",
            "讲述自己是怎么开始赌博的",
            "赌咒发誓自己再也不赌了",
            "算了拉倒把"
        ]
        var player_selection = yield
        if (player_selection == 3){
            player_status["Message"] = [
                "你从戒赌吧退了出来"
            ]
            return
        }else{
            var p = Math.random()
            if(p<0.1){
                player_status["Message"] = [
                    "有人直接举报了你的支付宝账号",
                    "里面仅有的几块钱也没了"
                ]
                player_status["Selections"]=["继续"]
                yield
                return
            }else if (p<0.8){
                player_status["Message"] = [
                    "没有几个人理你",
                    "仅有的两个进来看帖的也对你冷嘲热讽"
                ]
                continue
            }else{
                money = getRandomInt(2,5)
                player_status["Message"] = [
                    "随着你的手机一抖，居然有人真的给你打钱了",
                    "你看着支付宝到账的"+money+"块钱笑开了花",
                ]
                player_status["Money"] += money
                player_status["Selections"] = ["赶紧收手，你把帖子删了"]
                yield
                return
            }
        }
    }
}
function* go_to_netbar(){
    player_status["Message"] = [
        "你在街上四处寻找便宜的网吧",
        "直到你发现了一个居民楼里的",
        "你走了进去，烟味混合着汗臭味扑鼻而来",
        "你走上二楼，楼上贴着歪歪扭扭的字“严禁看黄片”",
        "你开了一台3块钱一小时的机子"
    ]
    while(true)
    {
        player_status["HP"]-=10
        player_status["Selections"] =[
            "打一局撸啊撸",
            "开一局网赌",
            "去戒赌吧要饭",
            "要一份红烧牛肉面",
            "结账下机"
        ]
        var player_selection = yield
        
        switch (player_selection) {
            case 0:
                if (Math.random()<0.5){
                    player_status["Message"] = [
                        "你这局的队友坑的一批，让你气的直砸键盘。"
                    ]  
                }else{
                    player_status["Message"] = [
                        "你赢了！你禁不住打字嘲讽了一番对面的水平"
                    ]
                }
                break;
            case 1:
                yield* gambling()
                break;
            case 2:
                yield* play_tieba()
                break;
            case 3:
                player_status["Message"] = [
                    "你点了一份3块钱的康师傅红烧牛肉面，",
                    "吸溜吸溜吃完之后，打了个饱嗝"
                ]  
                player_status["HP"] += 13
                player_status["Money"] -= 3
                break;
            case 4:
                player_status["Money"] -= 3
                return;
            default:
                break;
        }
    }

}
function* sleep(){
    player_status["Message"] = [
        "你看到了一家30块钱一晚的小旅馆",
        "你也听老哥们说过，海信人力市场门口可是大酒店，大家都睡哪儿",
        "又或者，也许桥洞下面没有那么冷？"
    ]
    player_status["Selections"] = [
        "睡小旅馆",
        "睡海信人力市场门口",
        "睡桥洞"
    ]
    var player_selection = yield
    if(player_selection == 0){
        player_status["Message"] = [
            "你在大床上睡了一晚上",
            "完全不顾及床单上的黄色斑点和烟头的痕迹",
            "等你醒过来的时候，感觉身体舒服了不少"
        ]
        player_status["HP"]+=30
        player_status["Money"] -= 30
        player_status["Selections"] = ["继续"]
        yield
        return
    }else if(player_selection == 1){
        player_status["Message"] = [
            "海信人力市场门口躺满了老哥，你找了个空地睡下了",
        ]
        player_status["Selections"] = ["继续"]
        yield
        if (Math.random()<0.5){
            player_status["Message"] = [
                "等你醒过来的时候，你感觉腰都直不起来",
            ]
            player_status["Selections"] = ["继续"]
            player_status["HP"] -= 5
            yield
        }else{
            player_status["Message"] = [
                "等你醒过来的时候，阳光洒在你的身上，你感觉恢复了一些体力",
            ]
            player_status["Selections"] = ["继续"]
            player_status["HP"] += 15
            yield
        }        
        return        
    }else if(player_selection == 2){
        var messages = [
            "你寻找到了一个桥洞",
            "然后在附近找到了一些编织袋",
            "你把这些编织袋收拢起来，做成床垫，让自己暖和一些，然后就睡了下去"
        ]
        multi_message(messages)
        if (Math.random()<0.3){
            player_status["Message"] = [
                "等你醒过来的时候，你感觉自己有一点发烧",
            ]
            player_status["Selections"] = ["继续"]
            player_status["HP"] -= 15
            yield
        }else{
            player_status["Message"] = [
                "等你醒过来的时候，阳光洒在你的身上，你感觉恢复了一些体力",
            ]
            player_status["Selections"] = ["继续"]
            player_status["HP"] += 10
            yield
        }        
        return        
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
            "打开小贷APP",
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
                yield* do_one_day_job()
                break;
            case 2:
                yield* pay_or_get_debt()
                break;
            case 3:
                yield* go_to_netbar()
            case 4:
                yield* sleep()
            default:
                break;
        }
    }

}
function game_over(reason){
    if(reason == "HP"){
        player_status["DialogMessage"] = "很遗憾，由于你的健康状况已经低到不可忍受，你也没有能力寻找到治疗。当人们发现你的时候，你已经在三和的街边凉透了。你的遗体被送回老家，但是没有任何亲戚愿意出面帮一个借钱不还的废物举办葬礼。最后你的老父亲出面，把你火化了，成为了你们家空空如也的房间里唯一的一样家具——你的骨灰盒"
        return;
    }
    if(reason == "Money"){
        player_status["DialogMessage"] ="即使在三和，也需要一点点的流动资金才能够活下去。如今你真的走到了身无分文的境地，怎么说呢，你也许距离饿死也不太远了。放弃吧，当你兴致勃勃地梭哈的时候，就该想到这一天"
        return;
    }
}
