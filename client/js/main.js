
define(['jquery', 'app', 'entrypoint'], function($, App, EntryPoint) {
    var app, game;

    var initApp = function() {
        $(document).ready(function() {
            app = new App();
            app.center();$('#container').bind("contextmenu", function(e){
                e.preventDefault();
            });

            if(Detect.isWindows()) {
                // Workaround for graphical glitches on text
                $('body').addClass('windows');
            }

            if(Detect.isOpera()) {
                // Fix for no pointer events
                $('body').addClass('opera');
            }

            if(Detect.isFirefoxAndroid()) {
                // Remove chat placeholder
                $('#chatinput').removeAttr('placeholder');
            }

            $('body').click(function(event) {
                if($('#parchment').hasClass('credits')) {
                    app.toggleScrollContent('credits');
                }

                if($('#parchment').hasClass('legal')) {
                    app.toggleScrollContent('legal');
                }

                if($('#parchment').hasClass('about')) {
                    // app.toggleScrollContent('about');
                    game.textWindowHandler.toggleTextWindow();
                    game.toggleItemInfo();
                }
            });

            $('.barbutton').click(function() {
                $(this).toggleClass('active');
            });

            $('#chatbutton').click(function() {
                if($('#chatbutton').hasClass('active')) {
                    app.showChat();
                } else {
                    app.hideChat();
                }
            });

            $('#helpbutton').click(function() {
                app.hideWindows();
                game.textWindowHandler.toggleTextWindow();
                game.toggleItemInfo();
            });

            $('#achievementsbutton').click(function() {
                app.toggleAchievements();
            });

            $('#instructions').click(function() {
                app.hideWindows();
            });

            $('#playercount').click(function() {
                app.togglePopulationInfo();
            });

            $('#population').click(function() {
                app.togglePopulationInfo();
            });

            $('.clickable').click(function(event) {
                event.stopPropagation();
            });

            $('#toggle-credits').click(function() {
                app.toggleScrollContent('credits');
            });

            $('#toggle-legal').click(function() {
                app.toggleScrollContent('legal');
                if(game.renderer.mobile) {
                    if($('#parchment').hasClass('legal')) {
                        $(this).text('close');
                    } else {
                        $(this).text('Privacy');
                    }
                };
            });

            $('#create-new span').click(function() {
                app.animateParchment('loadcharacter', 'confirmation');
            });

            $('#continue span').click(function() {
                app.animateParchment('confirmation', 'createcharacter');
                $('body').removeClass('returning');
                app.clearValidationErrors();
            });

            $('#cancel span').click(function() {
                app.animateParchment('confirmation', 'loadcharacter');
            });

            $('#nameinput').bind("keyup", function() {
                app.toggleButton();
            });
            $('#pwinput').bind("keyup", function() {
                app.toggleButton();
            });
            $('#pwinput2').bind("keyup", function() {
                app.toggleButton();
            });
            $('#emailinput').bind("keyup", function() {
                app.toggleButton();
            });

            $('#previous').click(function() {
                var $achievements = $('#achievements');

                if(app.currentPage === 1) {
                    return false;
                } else {
                    app.currentPage -= 1;
                    $achievements.removeClass().addClass('active page' + app.currentPage);
                }
            });

            $('#next').click(function() {
                var $achievements = $('#achievements'),
                    $lists = $('#lists'),
                    nbPages = $lists.children('ul').length;

                if(app.currentPage === nbPages) {
                    return false;
                } else {
                    app.currentPage += 1;
                    $achievements.removeClass().addClass('active page' + app.currentPage);
                }
            });

            $('#notifications div').bind(TRANSITIONEND, app.resetMessagesPosition.bind(app));

            $('.close').click(function() {
                app.hideWindows();
            });

            $('.twitter').click(function() {
                var url = $(this).attr('href');

               app.openPopup('twitter', url);
               return false;
            });

            $('.facebook').click(function() {
                var url = $(this).attr('href');

               app.openPopup('facebook', url);
               return false;
            });

            $('.play span').click(function(event) {
                app.tryStartingGame();
            });

            $('#dropAccept').click(function(event) {
                try {
                    var count = parseInt($('#dropCount').val());
                    if(count > 0) {
                        if(count > game.player.inventoryCount[app.inventoryNumber])
                            count = game.player.inventoryCount[app.inventoryNumber];

                        game.client.sendInventory("empty", app.inventoryNumber, count);

                        game.player.inventoryCount[app.inventoryNumber] -= count;
                        if(game.player.inventoryCount[app.inventoryNumber] === 0)
                            game.player.inventory[app.inventoryNumber] = null;
                    }
                } catch(e) {
                }

                setTimeout(function () {
                    app.hideDropDialog();
                }, 100);
            });

            $('#dropCancel').click(function(event) {
                setTimeout(function () {
                    app.hideDropDialog();
                }, 100);
            });

            document.addEventListener("touchstart", function() {},false);

            $('#resize-check').bind("transitionend", app.resizeUi.bind(app));
            $('#resize-check').bind("webkitTransitionEnd", app.resizeUi.bind(app));
            $('#resize-check').bind("oTransitionEnd", app.resizeUi.bind(app));

            log.info("App initialized.");

            initGame();
        });
    };

    var initGame = function() {
        require(['game'], function(Game) {

            var canvas = document.getElementById("entities"),
                background = document.getElementById("background"),
                foreground = document.getElementById("foreground"),
                input = document.getElementById("chatinput");

            game = new Game(app);
            game.setup('#bubbles', canvas, background, foreground, input);
            app.setGame(game);

            if(app.isDesktop && app.supportsWorkers) {
                game.loadMap();
            }

            game.onGameStart(function() {
                app.initEquipmentIcons();
                var entry = new EntryPoint();
				entry.execute(game);
            });

            game.onDisconnect(function(message) {
                $('#death').find('p').html(message+"<em>Please reload the page.</em>");
                $('#respawn').hide();
            });

            game.onPlayerDeath(function() {
                if($('body').hasClass('credits')) {
                    $('body').removeClass('credits');
                }
                $('body').addClass('death');
            });

            game.onPlayerEquipmentChange(function() {
                app.initEquipmentIcons();
            });

            game.onPlayerInvincible(function() {
                $('#hitpoints').toggleClass('invincible');
            });

            game.onNbPlayersChange(function(worldPlayers, totalPlayers) {
                var setWorldPlayersString = function(string) {
                        $("#instance-population").find("span:nth-child(2)").text(string);
                        $("#playercount").find("span:nth-child(2)").text(string);
                    },
                    setTotalPlayersString = function(string) {
                        $("#world-population").find("span:nth-child(2)").text(string);
                    };

                $("#playercount").find("span.count").text(worldPlayers);

                $("#instance-population").find("span").text(worldPlayers);
                if(worldPlayers == 1) {
                    setWorldPlayersString("player");
                } else {
                    setWorldPlayersString("players");
                }

                $("#world-population").find("span:nth-child(1)").text(totalPlayers);
                if(totalPlayers == 1) {
                    setTotalPlayersString("player");
                } else {
                    setTotalPlayersString("players");
                }
            });
            					
            // game.onGuildPopulationChange( function(guildName, guildPopulation) {
			// 	var setGuildPlayersString = function(string) {
			// 		$("#guild-population").find("span:nth-child(2)").text(string);
			// 	};
			// 	$('#guild-population').addClass("visible");
            //     $("#guild-population").find("span").text(guildPopulation);
			// 	$('#guild-name').text(guildName);
            //     if(guildPopulation == 1) {
            //         setGuildPlayersString("player");
            //     } else {
            //         setGuildPlayersString("players");
            //     }
			// });

            game.onNotification(function(message) {
				app.showMessage(message);
            });

            app.initHealthBar();
            app.initTargetHud();
            app.initExpBar();
            $('#nameinput').attr('value', '');
            $('#pwinput').attr('value', '');
            $('#pwinput2').attr('value', '');
            $('#emailinput').attr('value', '');
            $('#chatbox').attr('value', '');

            if(game.renderer.mobile || game.renderer.tablet) {
                $('#foreground').bind('touchstart', function(event) {
                    app.center();
                    app.setMouseCoordinates(event.originalEvent.touches[0]);
                    game.click();
                    app.hideWindows();
                });
            } else {
                $('#foreground').click(function(event) {
                    app.center();
                    app.setMouseCoordinates(event);
                     if(game && !app.dropDialogPopuped) {
                	    game.pvpFlag = event.shiftKey;
                	    game.click();
                	}
                   app.hideWindows();
                });
            }

            $('body').unbind('click');
            $('body').click(function(event) {
                var hasClosedParchment = false;

                if($('#parchment').hasClass('credits')) {
                    if(game.started) {
                        app.closeInGameScroll('credits');
                        hasClosedParchment = true;
                    } else {
                        app.toggleScrollContent('credits');
                    }
                }

                if($('#parchment').hasClass('legal')) {
                    if(game.started) {
                        app.closeInGameScroll('legal');
                        hasClosedParchment = true;
                    } else {
                        app.toggleScrollContent('legal');
                    }
                }

                if($('#parchment').hasClass('about')) {
                    if(game.started) {
                        app.closeInGameScroll('about');
                        hasClosedParchment = true;
                    } else {
                        // app.toggleScrollContent('about');
                        game.textWindowHandler.toggleTextWindow();
                        game.toggleItemInfo();
                    }
                }

                if(game.started && !game.renderer.mobile && game.player && !hasClosedParchment  && !app.dropDialogPopuped) {
                    game.click();
                }
            });

            $('#respawn').click(function(event) {
                game.audioManager.playSound("revive");
                game.respawn();
                $('body').removeClass('death');
            });

            $(document).mousemove(function(event) {
                app.setMouseCoordinates(event);
                if(game.started) {
            	    game.pvpFlag = event.shiftKey;
                    game.movecursor();
                }
            });

            $(document).mouseup(function(event) { 
                if(event.button === 2) {
                    app.center();
                    app.setMouseCoordinates(event);

                    game.rightClick();
                }
            });

            $(document).keyup(function(e) {
                var key = e.which;
                
                if (game.started && !$('#chatbox').hasClass('active'))
                {
                    switch(key) {
                        case Types.Keys.LEFT:
                        case Types.Keys.A:
                        case Types.Keys.KEYPAD_4:
                            game.player.moveLeft = false;
                            game.player.disableKeyboardNpcTalk = false;
                            break;
                        case Types.Keys.RIGHT:
                        case Types.Keys.D:
                        case Types.Keys.KEYPAD_6:
                            game.player.moveRight = false;
                            game.player.disableKeyboardNpcTalk = false;
                            break;
                        case Types.Keys.UP:
                        case Types.Keys.W:
                        case Types.Keys.KEYPAD_8:
                            game.player.moveUp = false;
                            game.player.disableKeyboardNpcTalk = false;
                            break;
                        case Types.Keys.DOWN:
                        case Types.Keys.S:
                        case Types.Keys.KEYPAD_2:
                            game.player.moveDown = false;
                            game.player.disableKeyboardNpcTalk = false;
                            break;
                        default:
                            break;
                    }
                }
            });

            $(document).keydown(function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if(key === 13) {
                    if($('#chatbox').hasClass('active')) {
                        app.hideChat();
                    } else {
                        app.showChat();
                    }
                }
                else if(key === 16)
                    game.pvpFlag = true;
                else if(key === 27)
                    app.hideDropDialog();
            });

             $(document).keyup(function(e) {
            	var key = e.which;

                if(key === 16)
                    game.pvpFlag = false;
            });
           $('#chatinput').keydown(function(e) {
                var key = e.which,
                    $chat = $('#chatinput'),
                    placeholder = $(this).attr("placeholder");

             //   if (!(e.shiftKey && e.keyCode === 16) && e.keyCode !== 9) {
            //        if ($(this).val() === placeholder) {
             //           $(this).val('');
            //            $(this).removeAttr('placeholder');
            //            $(this).removeClass('placeholder');
            //        }
            //    }

                if(key === 13) {
                    if($chat.attr('value') !== '') {
                        if(game.player) {
                            game.say($chat.attr('value'));
                        }
                        $chat.attr('value', '');
                        app.hideChat();
                        $('#foreground').focus();
                        return false;
                    } else {
                        app.hideChat();
                        return false;
                    }
                }

                if(key === 27) {
                    app.hideChat();
                    return false;
                }
            });

            $('#chatinput').focus(function(e) {
                var placeholder = $(this).attr("placeholder");

                if(!Detect.isFirefoxAndroid()) {
                    $(this).val(placeholder);
                }

                if ($(this).val() === placeholder) {
                    this.setSelectionRange(0, 0);
                }
            });

            $('#nameinput').focusin(function() {
                $('#name-tooltip').addClass('visible');
            });

            $('#nameinput').focusout(function() {
                $('#name-tooltip').removeClass('visible');
            });

            $('#nameinput').keypress(function(event) {
                $('#name-tooltip').removeClass('visible');
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $pw = $('#pwinput'),
                    pw = $pw.attr('value');
                var $pw2 = $('#pwinput2'),
                    pw2 = $pw2.attr('value');
                var $email = $('#emailinput'),
                    email = $email.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        if(pw2 !== '' && pw2 !== undefined && pw === pw2)
                            app.tryStartingGame(name, pw, email, function() {
                                $name.blur(); // exit keyboard on mobile
                            });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            $('#pwinput').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $pw = $('#pwinput'),
                    pw = $pw.attr('value');
                var $pw2 = $('#pwinput2'),
                    pw2 = $pw2.attr('value');
                var $email = $('#emailinput'),
                    email = $email.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        if(pw2 !== '' && pw2 !== undefined && pw === pw2)
                            app.tryStartingGame(name, pw, email, function() {
                                $name.blur(); // exit keyboard on mobile
                            });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            $('#pwinput2').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $pw = $('#pwinput'),
                    pw = $pw.attr('value');
                var $pw2 = $('#pwinput2'),
                    pw2 = $pw2.attr('value');
                var $email = $('#emailinput'),
                    email = $email.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        if(pw2 !== '' && pw2 !== undefined && pw === pw2)
                            app.tryStartingGame(name, pw, email, function() {
                                $name.blur(); // exit keyboard on mobile
                            });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });
            $('#loginpwinput').keypress(function(event) {
                var $name = $('#nameinput'),
                    name = $name.attr('value');
                var $loginpw = $('#loginpwinput'),
                    loginpw = $loginpw.attr('value');

                if(event.keyCode === 13) {
                    if(name !== '') {
                        app.tryStartingGame(name, loginpw, "", function() {
                            $name.blur(); // exit keyboard on mobile
                        });
                        return false; // prevent form submit
                    } else {
                        return false; // prevent form submit
                    }
                }
            });

            $('#mutebutton').click(function() {
                game.audioManager.toggle();
            });

            $(document).bind("keydown", function(e) {
                var key = e.which,
                    $chat = $('#chatinput');

                if($('#chatinput:focus').size() == 0 && $('#nameinput:focus').size() == 0 && game.ready && !app.dropDialogPopuped) {
                    if(key === 13) { // Enter
                        $chat.focus();
                        return false;
                    } else if(key === 8) { // BackSpace
                        return false;
                    } else if(key === 49 || key === 50){ // 1,2,6
                        game.keyDown(key);
                        return false;
                    } else if(key === 107){ // +
                        game.chathandler.incChatWindow();
                    } else if(key === 109){ // -
                        game.chathandler.decChatWindow();
                    }
                } else {
                    if(key === 13 && game.ready) {
                        $chat.focus();
                        return false;
                    }
                }
            });

             $('#healthbar').click(function(e) {
                var hb = $('#healthbar'),
                    hp = $('#hitpoints'),
                    hpg = $('#hpguide');

                var hbp = hb.position(),
                    hpp = hp.position();

                if((e.offsetX >= hpp.left) && (e.offsetX < hb.width())) {
                    if(hpg.css('display') === 'none') {
                        hpg.css('display', 'block');

                        setInterval(function () {
                            if(((game.player.hitPoints / game.player.maxHitPoints) <= game.hpGuide) && 
                               (game.healShortCut >= 0) && 
                               Types.isHealingItem(game.player.inventory[game.healShortCut]) &&
                               (game.player.inventoryCount[game.healShortCut] > 0)
                              ) {
                                game.eat(game.healShortCut);
                            }
                        }, 100);
                    }
                    hpg.css('left', e.offsetX + 'px');

                    game.hpGuide = (e.offsetX - hpp.left) / (hb.width()- hpp.left);
                }

                return false;
            });
           if(game.renderer.tablet) {
                $('body').addClass('tablet');
            }
        });
    };

    initApp();
});
