var Winmenu = cc.Layer.extend({
    helloLabel:null,

    init:function () {
        var bRet = false;
        if (this._super()) {
            winSize = cc.Director.getInstance().getWinSize();

            var mainMenuNormal = cc.Sprite.create(s_menuButton, cc.rect(0, 0, 200, 50));
            var mainMenuSelected = cc.Sprite.create(s_menuButton, cc.rect(0, 0, 200, 50));
            var mainMenuDisabled = cc.Sprite.create(s_menuButton, cc.rect(0, 0, 200, 50));

            var mainMenu = cc.MenuItemSprite.create(mainMenuNormal, mainMenuSelected, mainMenuDisabled, function () {
                this.onMainMenu();
            }.bind(this));      

            var retryGameNormal = cc.Sprite.create(s_restartButton, cc.rect(0, 0, 200, 50));
            var retryGameSelected = cc.Sprite.create(s_restartButton, cc.rect(0, 0, 200, 50));
            var retryGameDisabled = cc.Sprite.create(s_restartButton, cc.rect(0, 0, 200, 50));

            var retryGame = cc.MenuItemSprite.create(retryGameNormal, retryGameSelected, retryGameDisabled, function () {
                this.onRetryGame();
            }.bind(this));       

            var menu = cc.Menu.create(retryGame, mainMenu);
            menu.alignItemsVerticallyWithPadding(60);
            this.addChild(menu);
            menu.setPosition(winSize.width / 2, winSize.height / 2);

            this.helloLabel = cc.LabelTTF.create("YOU WON!!", "Arial", 38);
            this.helloLabel.setColor(new cc.Color3B(0,0,0));
            this.helloLabel.setPosition(cc.p(winSize.width / 2, winSize.height - 100));
            this.addChild(this.helloLabel, 5);

            bRet = true;
        }
        return bRet;
    },
    onRetryGame:function (pSender) {
        cc.LoaderScene.preload(g_ressources, function () {
            var scene = cc.Scene.create();
            scene.addChild(GameLayer.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    },
     onMainMenu:function (pSender) {
        cc.LoaderScene.preload(g_mainmenu, function () {
            var scene = cc.Scene.create();
            scene.addChild(SysMenu.create());
            cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
        }, this);
    }
});

Winmenu.create = function () {
    var sg = new Winmenu();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

Winmenu.scene = function () {
    var scene = cc.Scene.create();
    var layer = Winmenu.create();
    scene.addChild(layer);
    return scene;
};
