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
        player_status["Selections"] = ["続ける"]
        player_selection = yield
    }
}
function* fix_car(){
    p = Math.random()
    player_status["Special"] = '<img src="statics/fixcar.jpg">';
    player_status["Money"] -= 150
    if (p < 0.1){
        player_status["Message"] = [
            "ちょうど横になっているときに女の子が横になっていると、ドアの外側に足跡があります。",
            "ドアをすばやくたたくと鳴った。 「ドアを開けなさい！警察、切り上げる！」",
            "しばらくして、あなたは両手で頭を抱えて地面にしゃがみました。",
            "300ドルの罰金を渡した後、あなたはついに解放されます。"
        ]
        player_status["Money"] -= 300
        return
    }else{
        var messages=[
            "あなたは彼女からほんの少しの愛を感じることを望みながら、静かに彼女を見ます。",
            "そして彼女は自分の服を脱ぐことさえせず、ただズボンを摘んであなたをイライラさせた。",
            "あなたが価格について考えるならば、あなたは何も言いません。",
            "その瞬間が来ると、あなたはついに人の力を見つけたかのように心地よく感じます。",
            "あなたはサイケデリックな気持ちさえ持っていて、彼女と一緒にいたい、あなたはすぐにこの考えを却下した",
            "それから眠りに落ちた"
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
            "あなたは深センの三和の街を歩き始めました。",
        ]
        player_status["HP"] -= 2
        var p = Math.random()
    
        
        if(p<0.3){
            player_status["Message"].push("あなたは空の瓶の束を見つけました！ これはドルを売ることができます！")
            player_status["Money"] += 1
            player_status["Selections"]=["続ける","何か他のことをする"]
            var player_selection = yield
            if(player_selection==0){
                continue
            }else if (player_selection == 1){
                return false
            }
        }else if (p<0.5){
            player_status["Message"].push("あなたは転がり戸が半分開いている無料案内所を見ました。")
            player_status["Selections"]=["入る","いいえ"]
            var player_selection = yield
            if(player_selection==0){
                //修车
                yield* fix_car()
            }else if (player_selection == 1){
                continue
            }
        }else if(p<0.8){
            player_status["Message"].push("ラーメン屋さんを見ました。 2ドルの水と4ドルのラーメンを売る。")
            player_status["Selections"]=["ラーメンを食べる","いいえ"]
            var player_selection = yield
            if(player_selection==0){
                player_status["Message"] = [
                    "あなたはラーメンを注文しました。",
                    "もう一杯の水を飲む。"
                ]
                player_status["Selections"]=["続ける"]
                player_status["HP"] += 6
                player_status["Money"] -= 6
                yield
                continue
            }else if (player_selection == 1){
                continue
            }
        }
    }
    
}
function* do_one_day_job(){
    player_status["Special"] = '<img src="statics/work.jpg">';
    var messages= [
        "あなたは、にぎやかな群衆、汗臭い、足の臭い、物を売る音があふれた、有名な三和人力市场にやって来ました。",
        "あなたは前進し、より良い仕事を見つけようとします。"
    ]
    yield* multi_message(messages)
    p = Math.random()
    //if (p < 0.2)
    {
        player_status["Message"] = [
            "「あなたは電子機器工場に行きたいですか？」"
        ]
        player_status["Selections"]=[
            "はい",
            "いいえ"
        ]
        var player_selection = yield
        if (player_selection==1){
            return
        }
        //焊电路板小游戏
        var work_number = getRandomInt(10,25)
        player_status["Message"] = [
            "あなたは生産ラインの前に立っています。",
            "あなたの仕事は、ボードの上にアップロードされたパイプラインを溶接に非常に退屈です。",
            "周りの同僚は無表情で、そして中国と日本の間の紛争について話している同僚は1人だけです。"
        ]
        while(work_number>0){
            work_number -= 1
            player_status["Selections"]=[
                "あなたの目の前には"+work_number+"枚のボードがあります。働き始めます。",
                "あなたは怠惰になり始めています。 他の労働者とチャットします。"
            ]
            var player_selection = yield
            if (player_selection == 0){
                player_status["HP"] -= 3
                continue
            }else if(player_selection == 1){
                if (Math.random()<0.3){
                    player_status["Message"] = [
                        "あなたの上司は振り向いて、あなたが怠惰であなたに向かって怒鳴っているのを見ました。 それから彼はあなたがすぐに離れることができます。",
                    ]
                    player_status["selection"] = [
                        "あなたはとても不幸です。 しかしまだ行った。"
                    ]
                    var player_selection = yield
                    return
                }else{
                    player_status["Message"] = [
                        "あなたは言葉なしで同僚とチャットを始めます。 監督はあなたを見て何も言わなかった。",
                    ]
                }
            }
        }
        var money = 150 + getRandomInt(-30,30)
        player_status["Message"] = [
            "ついに仕事は終わりました。 バスに座っていると、体のいたるところに疲れているように感じます。",
            "窓の外のライトが点滅している、そしてあなたはあなたが電子機器工場から三和に戻ったことを理解する。",
            "あなたがバスを降りたとき、あなたは上司からあなたの"+money+"元の給料を受け取りました。"
        ]
        player_status["Selections"]=["続ける"]
        player_status["Money"]+= money
        yield
        return
    }

}
function* pay_or_get_debt(){
    player_status["Message"] = [
        "おなじみの借りたお金のアプリフォルダを開きました。",
        "各アプリの右上隅には、未読のメッセージがたくさんあります。"
    ]
    player_status["Selections"]=[
        "あなたがお金を借りることができるかどうかを確認します。",
        "いいえ"      
    ]

    if(player_status["Money"]>100){
        player_status["Selections"].push("100ローンを返却します。")
    }
    if(player_status["Money"]>1000){
        player_status["Selections"].push("1000ローンを返却します。")
    }

    var player_selection = yield
    if (player_selection==0){
        var p = Math.random()
        player_status["Message"] = [
            "他の友達から聞いたばかりのAPP名を入力しました。"
        ]
        if(p<0.2){
            player_status["Message"].push(
                "監査は実際に合格しました！ 2,000元を借りたいですか？"
            )
            player_status["Selections"]=[
                "はい！",
                "いいえ"
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
                "APPはあなたの信用履歴が完全に黒であることをあなたに思い出させます。 あなたにお金を貸しません。"
            )
            player_status["Selections"] = ["続ける"]
            yield
            return
        }
    }else if(player_selection==1){
        return
    }else if(player_selection==2){
        player_status["Message"] = [
            "あなたは100のお金を返しました。"
        ]
        player_status["Selections"]=["続ける"]
        player_status["Money"] -= 100
        player_status["Debt"] -= 100
        yield
        return
    }else if(player_selection==3){
        player_status["Message"] = [
            "あなたは1000のお金を返しました。"
        ]
        player_status["Selections"]=["続ける"]
        player_status["Money"] -= 1000
        player_status["Debt"] -= 1000
        yield
        return
    }
}
function* gambling(){
    player_status["Message"] = [
        "おなじみのオンラインギャンブルプラットフォームをオープンしました",
        "100に賭けることができます"
    ]
    while(true)
    {
        player_status["Selections"]=[
            "2倍の確率",
            "5倍の確率",
            "10倍の確率",
            "50倍の確率",
            "ダメだ"
        ]
        var player_selection = yield
        switch (player_selection) {
            case 0:
                if(Math.random()>0.4){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "残念ながら、あなたは勝ちませんでした"
                    ]
                }else{
                    player_status["Money"] += 200
                    player_status["Message"] = [
                        "あなたは勝ちました！"
                    ]
                }
                break;
            case 1:
                if(Math.random()>0.15){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "残念ながら、あなたは勝ちませんでした"
                    ]
                }else{
                    player_status["Money"] += 500
                    player_status["Message"] = [
                        "あなたは勝ちました！"
                    ]
                }
                break;
            case 2:
                if(Math.random()>0.05){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "残念ながら、あなたは勝ちませんでした"
                    ]
                }else{
                    player_status["Money"] += 1000
                    player_status["Message"] = [
                        "あなたは勝ちました！"
                    ]
                }
                break;
            case 3:
                if(Math.random()>0.015){
                    player_status["Money"] -= 100
                    player_status["Message"] = [
                        "残念ながら、あなたは勝ちませんでした"
                    ]
                }else{
                    player_status["Money"] += 5000
                    player_status["Message"] = [
                        "あなたは勝ちました！"
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
        "あなたは巧みに掲示板を開き、あなたのアカウントにログインします。",
        "あなたはあなたのAlipayアカウントを投稿しました",
        "それから写真を撮って売って、友達に少しのお金を寄付させようとします。"
    ]
    while(true){
        player_status["Selections"] = [
            "両親への愛を表現しましょう。",
            "あなたがどのようにギャンブルを始めたかを自分自身に言いなさい。",
            "二度とギャンブルをしないことを誓います。",
            "忘れなさい"
        ]
        var player_selection = yield
        if (player_selection == 3){
            player_status["Message"] = [
                "あなたは掲示板から引退しました"
            ]
            return
        }else{
            var p = Math.random()
            if(p<0.1){
                player_status["Message"] = [
                    "あなたのAlipayアカウントが違法行為をしていると誰かが直接報告しました。",
                    "その中にはわずか数ドルしかありません。"
                ]
                player_status["Selections"]=["続ける"]
                yield
                return
            }else if (p<0.8){
                player_status["Message"] = [
                    "あなたの世話をする気がある人はほとんどいません。",
                    "記事を見るためにやって来た二人だけがあなたを笑わせています。"
                ]
                continue
            }else{
                money = getRandomInt(2,5)
                player_status["Message"] = [
                    "あなたの携帯電話が揺れると、誰かが実際にあなたにお金を渡します。",
                    "あなたはアリペイの"+money+"ドルを見て笑った。",
                ]
                player_status["Money"] += money
                player_status["Selections"] = ["急いで閉じ、投稿を削除しました。"]
                yield
                return
            }
        }
    }
}
function* go_to_netbar(){
    player_status["Special"] = '<img src="statics/netbar.jpg">';
    player_status["Message"] = [
        "あなたは路上で安いインターネットカフェを探しています。",
        "あなたが居住用の建物の中にインターネットカフェを見つけるまでは。",
        "あなたが中に入った、煙の臭いが汗とにおいを混ぜた。",
        "あなたは2階まで歩いた、そして2階は「ポルノがない」という言葉でツイートされた。",
        "あなたは1時間3元の費用がかかるPCを開けました。"
    ]
    while(true)
    {
        player_status["HP"]-=10
        player_status["Selections"] =[
            "PUBGのゲームをしなさい。",
            "オンラインギャンブルでゲームをしましょう。",
            "BBSは物乞いに行きます。",
            "インスタントラーメンを買う。",
            "チェックアウト"
        ]
        var player_selection = yield
        
        switch (player_selection) {
            case 0:
                if (Math.random()<0.5){
                    player_status["Message"] = [
                        "あなたのチームメイトは非常に弱いので、あなたは非常に怒っています。"
                    ]  
                }else{
                    player_status["Message"] = [
                        "あなたは勝ちました！"
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
                    "あなたは3元のインスタントラーメンを注文しました。",
                    "飲食の後、あなたはいっぱいでした。"
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
        "あなたは一晩30元の小さなホテルを見ました。",
        "また、“海信人力市场”は、みんなが眠る大きなホテルであることを友人から聞きました。",
        "多分あなたは橋の穴の下で眠ることができますか？"
    ]
    player_status["Selections"] = [
        "小さなホテルで寝ています。",
        "“海信人力市场”で寝ています。",
        "橋の穴で寝ています。"
    ]
    var player_selection = yield
    if(player_selection == 0){
        player_status["Special"] = '<img src="statics/smallhotel.jpg">';
        player_status["Message"] = [
            "あなたは大きなベッドで一晩眠りました。",
            "シートの汚れやタバコの跡を完全に無視しました。",
            "あなたが目を覚ますと，ずっと快適になります。"
        ]
        player_status["HP"]+=30
        player_status["Money"] -= 30
        player_status["Selections"] = ["続ける"]
        yield
        return
    }else if(player_selection == 1){
        player_status["Special"] = '<img src="statics/guabi.jpg">';
        player_status["Message"] = [
            "ハイセンスのマンパワー市場は人でいっぱいです、あなたは眠る場所を見つけました。",
        ]
        player_status["Selections"] = ["続ける"]
        yield
        if (Math.random()<0.5){
            player_status["Message"] = [
                "あなたが目を覚ますと、あなたは非常に不快に感じます。",
            ]
            player_status["Selections"] = ["続ける"]
            player_status["HP"] -= 5
            yield
        }else{
            player_status["Message"] = [
                "目を覚ますと、太陽があなたを照らします、そしていくらかの体力を回復したと感じます。",
            ]
            player_status["Selections"] = ["続ける"]
            player_status["HP"] += 15
            yield
        }        
        return        
    }else if(player_selection == 2){
        player_status["Special"] = '<img src="statics/qiaodong.jpg">';
        var messages = [
            "あなたは橋の穴を見つけました。",
            "それから私は近くにいくつかのビニール袋を見つけました。",
            "あなたはこれらのビニール袋をまとめて、マットレスを作り、自分自身を温めて、そして次に寝た。"
        ]
        multi_message(messages)
        if (Math.random()<0.3){
            player_status["Message"] = [
                "あなたが目を覚ますと、あなたが病気であるように感じます。",
            ]
            player_status["Selections"] = ["続ける"]
            player_status["HP"] -= 15
            yield
        }else{
            player_status["Message"] = [
                "目を覚ますと、太陽があなたを照らします、そしていくらかの体力を回復したと感じます。",
            ]
            player_status["Selections"] = ["続ける"]
            player_status["HP"] += 10
            yield
        }        
        return        
    }
}
function* game_logic(){
    player_status["Message"] = [
        "初めまして、これは《三和浮尘录》，このゲームは“三和大神”の生活をシミュレートしようとします，このように社会の底に人々の世界を見せる",
        "その前に、NHKのドキュメンタリーを見ることをお勧めします.",
        "私は深圳で働き、そのような群衆にさらされています。",
        "だから私は彼らが遭遇するジレンマを示すためにこのゲームを使うことを望みます。",
        "そして、自分の道をたどらないように他の人に警告することを望みます。",
        "私はこのゲームを日本語に翻訳しました、そして日本の友人たちもそれを好むことを望みます。",
    ]
    player_status["Special"] = '<iframe width="560" height="315" src="https://www.youtube.com/embed/YcidornQ7rU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    player_status["Selections"] = [
        "開始"
    ]
    var player_selection = yield;
    // start
    var start_message = [
        "あなたが最初にオンラインギャンブルを試みるとき、他の人はあなたがそれをしないように忠告します。",
        "今月の給料を失うとき、あなたはギャンブルを通してお金を取り戻したいです。",
        "あなたがすべてのあなたの貯蓄を失うとき、あなたはどこでも借り始めます。",
        "債権者があなたに返済を促し続けるとき、あなたはすでにあなたの結末を知っています。",
        "債権者はすべてのあなたの友人や両親にリマインダーを送ります。 あなたは最後のお金で三和への切符を買った。",
        "“三和人力市场”のドアの前に立つと、あなたは5元しか残っていません。",
    ]

    for(var i =0; i < start_message.length; i++)
    {
        player_status["Message"] = [start_message[i]]
        player_status["Selections"] = ["続ける"]
        player_selection = yield
    }
    var exit = false
    while(exit != true){
        player_status["Special"] = '<img src="statics/head.jpg">';
        player_status["Message"] = ["あなたは通りに立って見回しています。 次にどこへ行くかについて考えてください。"]
        player_status["Selections"]=[
            "通りを歩く",
            "働く",
            "お金を借りるためにAPPを使用する",
            "インターネットカフェに行きます",
            "寝る場所を探します"
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
        player_status["DialogMessage"] = "残念ながら、あなたの健康状態は耐えられないには低すぎるので、あなたは治療法を見つけることができません。 人々があなたを見つけたとき、あなたはすでに三河の通りで涼しいです。 あなたの体はあなたの故郷に送り返されました、しかし、親戚はお金を借りた葬儀を手伝うために前に来ることを望んでいませんでした。 最後に、あなたのお父さんが出てきてあなたを火葬し、あなたの空き部屋で唯一の家具になった - あなたの棺"
        return;
    }
    if(reason == "Money"){
        player_status["DialogMessage"] ="三和でさえ、生き残るためには少しお金がかかります。 あなたは本当に無力な立場にいるので、あなたは飢餓からそれほど遠くないかもしれません。"
        return;
    }
}
