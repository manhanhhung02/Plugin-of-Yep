//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 2
// YEP_X_ActSeqPack2.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack2 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP2 = Yanfly.ASP2 || {};

//=============================================================================
 /*:
 * @plugindesc v1.08 (Ă‰ necessĂ¡rio ter YEP_BattleEngineCore.js) FunĂ§Ăµes
 * visuais sĂ£o adicionadas Ă s sequĂªncias de aĂ§Ăµes do BEC.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * IntroduĂ§Ă£o
 * ============================================================================
 *
 * O plugin Action Sequence Pack 2 Ă© um plugin de extensĂ£o para o Battle
 * Engine Core do Yanfly Engine Plugins. Esse plugin de extensĂ£o nĂ£o
 * irĂ¡ funcionar sem o plugin principal.
 *
 * Esse plugin de extensĂ£o contĂ©m as funĂ§Ăµes mais bĂ¡sicas usadas para
 * personalizar sequĂªncias de aĂ§Ăµes numa escala visual. Esse plugin
 * foca em fazer os combatentes a realizarem aĂ§Ăµes visuais.
 *
 * ============================================================================
 * SequĂªncias de AĂ§Ăµes - ala Melody
 * ============================================================================
 *
 * O Battle Engine Core inclui o sistema Battle Engine do Yanfly Engine Melody,
 * onde cada um dos aspectos dos efeitos de habilidade e itens podem ser
 * controlados a um certo ponto. Esses sĂ£o chamados de SequĂªncias de AĂ§Ăµes,
 * onde cada comando na sequĂªncia de aĂ§Ă£o causa o jogo a realizar uma aĂ§Ă£o
 * individual distinta.
 *
 * Cada habilidade e item consiste de cinco diferentes sequĂªncias de aĂ§Ăµes.
 * Elas sĂ£o as seguintes:
 *
 * 1. AcĂµes de Set Up
 *   Eles preparam o combatente ativo antes de executar a aĂ§Ă£o e os seus
 * efeitos individuais. Normalmente o que vocĂª vĂª aqui sĂ£o coisas como
 * o combatente ativo mover um pouco para frente, desembainhando sua arma, etc.
 * Essa etapa irĂ¡ ocorrer antes que o combatente ativo gaste o custo de
 * sua habilidade ou item.
 *
 * 2. AcĂµes Inteiras
 *   Essas aĂ§Ăµes vĂ£o afetar todos os alvos simultĂ¢neamente. Embora essa seĂ§Ă£o
 * nĂ£o precisa ser usada, a maioria das aĂ§Ăµes vĂ£o usar isso para mostrar
 * animaĂ§Ăµes sobre todos os inimigos. Essa etapa ocorre depois do custo de
 * habilidade e item.
 *
 * 3. AĂ§Ăµes de Alvo
 *   Essa seĂ§Ă£o irĂ¡ afetar todos os alvos individualmente. Usada primeiramente
 * por ataques fĂ­sicos que irĂ£o entregar mais formas de dano. AĂ§Ăµes que
 * ocorrem aqui nĂ£o irĂ£o afetar outros alvos a nĂ£o ser que seja ordenado
 * especificamente para afetar.
 *
 * 4. AĂ§Ăµes de Seguir
 *   Essa seĂ§Ă£o irĂ¡ se dedicar a trabalhos de cleanup depois das aĂ§Ăµes de
 * alvos individuais. Aqui, ela farĂ¡ coisas como remover flags imortais,
 * comeĂ§ar eventos comuns, e mais.
 *
 * 5. AĂ§Ăµes Terminadas
 *   Essa seĂ§Ă£o vai ter o close up das sequĂªncias de aĂ§Ăµes do combatente ativo.
 * Normalmente coisas como fazer esperar e aguardar no Ăºltimo minuto para
 * habilidades e itens, mover de volta para o lugar, e outros.
 *
 * Agora que vocĂª sabe cada um dos cinco passos de cada sequĂªncia de aĂ§Ă£o, aqui
 * estĂ£o os tags que vocĂª pode inserir dentro das habilidades e itens. Preste
 * atenĂ§Ă£o para cada nome de tag.
 *
 * 1. <setup action>                                5. <finish action>
 *     action list                                      action list
 *     action list                                      action list
 *    </setup action>                                  </finish action>
 *
 * 2. <whole action>       3. <target action>       4. <follow action>
 *     action list             action list              action list
 *     action list             action list              action list
 *    </whole action>         </target action>         </follow action>
 *
 * Eles irĂ£o fazer seus respectivos conjunto de aĂ§Ăµes. Os mĂ©todos para inserir
 * para a lista de aĂ§Ăµes podem ser achados embaixo no core do Help Manual.
 *
 * AlĂ©m disso,  para prevenir que cada um dos seus noteboxes de item de seu
 * banco de dados esteja cheia de listas de sequĂªncias de aĂ§Ăµes, hĂ¡ um
 * atalho que vocĂª pode fazer para copiar todas as aĂ§Ăµes de set up, aĂ§Ăµes
 * inteiras, aĂ§Ăµes de alvo, aĂ§Ăµes de seguir, e aĂ§Ăµes terminadas com apenas
 * uma linha.
 *
 * <action copy: x:y>
 *
 * Substitua x com "item" ou "skill" para estabelecer o tipo para o cĂ³digo de
 * lista de aĂ§Ăµes para copiar diretamente. O nĂºmero inteiro y Ă© entĂ£o o ID
 * atribuĂ­do para Ă quele especĂ­fico tipo de objeto. Por exemplo, para copiar
 * as sequĂªncias de aĂ§Ăµes da 45Âº habilidade, o cĂ³digo seria
 * <action copy: skill:45> para qualquer coisa que irĂ¡ aceitar esses cĂ³digos
 * de aĂ§Ăµes. Se vocĂª realmente usar esse notetag, ele levarĂ¡ prioridade sobre
 * qualquer outro custom que vocĂª pĂ´s no notebox.
 *
 * ============================================================================
 * Digitamento de Alvo
 * ============================================================================
 *
 * VocĂª pode perceber que em algumas das aĂ§Ăµes abaixo irĂ¡ dizer "refer to
 * target typing" que Ă© essa seĂ§Ă£o bem aqui. Aqui estĂ¡ uma rĂ¡pida lista dos
 * vĂ¡rios alvos que vocĂª pode selecionar.
 *
 *   user; Isso irĂ¡ selecionar o combatente ativo.
 *   target, targets; Isso irĂ¡ selecionar os combatentes ativos em questĂ£o.
 *   actors, existing actors; Isso irĂ¡ selecionar todos os personagens vivos.
 *   all actors; Isso irĂ¡ selecionar todos personagens, incluindo os mortos.
 *   dead actors: Isso irĂ¡ selecionar apenas os personagens mortos.
 *   actors not user; Isso irĂ¡ selecionar todos os personagens vivos menos
 *   o usuĂ¡rio.
 *   actor x; Isso irĂ¡ selecionar o personagem no slot x.
 *   character x; Isso irĂ¡ selecionar o personagem especĂ­fico com o ID de
 *     personagem de x
 *   enemies, existing enemies; Isso irĂ¡ selecionar todos os inimigos vivos.
 *   all enemies; Isso irĂ¡ selecionar todos os inimigos, incluindo os mortos.
 *   dead enemies: Isso irĂ¡ selecionar apenas os inimigos mortos.
 *   enemies not user; Isso irĂ¡ selecionar todos os inimigos menos o usuĂ¡rio.
 *   enemy x; Isso irĂ¡ selecionar o inimigo no slot x.
 *   friends; Isso irĂ¡ selecionar os aliados vivos do combatente.
 *   all friends; Isso irĂ¡ selecionar todos os aliados do combatente, atĂ© os
 *     mortos.
 *   dead friends; Isso irĂ¡ selecionar os aliados mortos do combatente.
 *   friends not user; Isso irĂ¡ selecionar os aliados do combatente, menos
 *     ele mesmo.
 *   friend x: Isso irĂ¡ selecionar o aliado do combatente no slot x.
 *   opponents; Isso irĂ¡ selecionar os oponentes vivos do combatente.
 *   all opponents; Isso irĂ¡ selecionar todos os oponentes do combatente.
 *   dead opponents; Isso irĂ¡ selecionar os oponentes mortos do combatente.
 *   opponent x: Isso irĂ¡ selecionar o oponente do combatente no slot x.
 *   all alive; Seleciona todos os personagens e inimigos vivos.
 *   all members; Seleciona todos os personagens e inimigos vivos e mortos.
 *   all dead; Seleciona todos os personagens e inimigos mortos.
 *   all not user; Isso irĂ¡ selecionar todos os combatentes vivos menos o
 *     usuĂ¡rio.
 *   focus;  Seleciona o combatente ativo e seus alvos.
 *   not focus; Seleciona tudo menos o combatente ativo e seus alvos.
 *
 * ============================================================================
 * SequĂªncia de AĂ§Ăµes - Lista de AĂ§Ăµes
 * ============================================================================
 *
 * Aqui contĂ©m a lista de aĂ§Ăµes que vocĂª pode usar dentro das cinco
 * sequĂªncias de aĂ§Ăµes. Cada aĂ§Ă£o tem uma funĂ§Ă£o Ăºnica e requer certos
 * formatos para operar propriamente.
 *
 *=============================================================================
 * ATTACK ANIMATION: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Mostra a animaĂ§Ă£o de ataque do combatente ativo no(s) alvo(s). Essa serĂ¡
 * a animaĂ§Ă£o determinada pela(s) arma(s) do personagem. Se for um inimigo,
 * ela serĂ¡ determinada pela animaĂ§Ă£o de ataque do inimigo.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: attack animation: target
 *=============================================================================
 *
 *=============================================================================
 * ENEMY EFFECT: target, effect-type
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso afeta apenas os inimigos. Faz o alvo mostrar um efeito 'whiten' ou
 * 'blink'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: enemy effect: targets, whiten
 *                 enemy effect: targets, blink
 *=============================================================================
 *
 *=============================================================================
 * FACE target: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FACE target1: FORWARD
 * FACE target1: BACKWARD
 * FACE target1: HOME
 * FACE target1: AWAY FROM HOME
 * FACE target1: POINT, x coordinate, y coordinate
 * FACE target1: AWAY FROM POINT, x coordinate, y coordinate
 * FACE target1: target2
 * FACE target1: AWAY FROM target2
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso farĂ¡ o combatente a olhar para uma certa direĂ§Ă£o. Argumentos podem
 * ser usados nos formatos acima. Esse comando de sequĂªncia de aĂ§Ă£o farĂ¡ o
 * target1 a olhar para qualquer daquelas direĂ§Ăµes. Se target2 for usado,
 * entĂ£o target1 irĂ¡ olhar para direĂ§Ăµes relativas ao target2.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: face user: forward
 *                 face target: backward
 *                 face enemies: home
 *                 face allies: away from home
 *                 face target: point, 20, 40
 *                 face target: away from point, 500, 600
 *                 face user: target
 *                 face target: away from user
 *=============================================================================
 *
 *=============================================================================
 * FADE OUT: (frames)
 * FADE IN: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * DĂ¡ um fade out e fade in na tela, respectivamente. VocĂª pode estabelecer
 * a quantidade de frames para o processo de fading. Se vocĂª omitir frames,
 * 60 frames serĂ£o usados por padrĂ£o.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: fade out
 *                 fade in: 10
 *=============================================================================
 *
 *=============================================================================
 * FLASH SCREEN: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FLASH SCREEN: WHITE, (frames)
 * FLASH SCREEN: RED, (frames)
 * FLASH SCREEN: ORANGE, (frames)
 * FLASH SCREEN: YELLOW, (frames)
 * FLASH SCREEN: GREEN, (frames)
 * FLASH SCREEN: BLUE, (frames)
 * FLASH SCREEN: PURPLE, (frames)
 * FLASH SCREEN: MAGENTA, (frames)
 * FLASH SCREEN: BLACK, (frames)
 * FLASH SCREEN: (red), (green), (blue), (intensity), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa a tela do jogo a piscar uma certa cor. Se para os argumentos vocĂª
 * usar um nome de cor, ele irĂ¡ usar uma configuraĂ§Ă£o prĂ©-feita de piscamento.
 * Se vocĂª escolher usar suas prĂ³prias configuraĂ§Ăµes, use o formato de
 * intensidade vermelho, verde, e azul para determinar qual cor vocĂª prefere.
 * ConfiguraĂ§Ăµes de intensidade de vermelho, verde, e azul variam de 0 a 255.
 * Se frames forem usados, esse serĂ¡ a duraĂ§Ă£o do piscamento da tela. Se
 * omitido, o contador padrĂ£o de frame serĂ¡ de 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: flash screen: white
 *                 flash screen: red, 45
 *                 flash screen: 128, 170, 214, 170
 *                 flash screen: 68, 68, 68, 170, 45
 *=============================================================================
 *
 *=============================================================================
 * FLOAT target: (height), (frames)
 * FLOAT target: (height%), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa o alvo a flutuar no ar acima do chĂ£o por height%. A altura Ă© relativa
 * ao alvo flutuante. Usar 100% significa que o alvo flutuarĂ¡ acima do chĂ£o
 * 100% acima de sua altura. Se nenhum sinal de '%' for usado, o alvo flutuarĂ¡
 * naquela quantidade de pixels em vez de numa porcentagem da altura do alvo.
 * Os frames determinam quantos frames demorarĂ£o para o alvo atingir Ă quela
 * altura. Usar 0% para a altura vai levar o alvo de volta para o chĂ£o.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: float user: 200%
 *                 float enemies: 500, 30
 *                 float target: 0%, 30
 *=============================================================================
 *
 *=============================================================================
 * HIDE BATTLE HUD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esconde o hud de batalha para nĂ£o obstruir quaisquer animaĂ§Ăµes sendo
 * reproduzidas. VocĂª pode revelar o hud de batalha de novo usando
 * 'show battle hud'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: hide battle hud
 *=============================================================================
 *
 *=============================================================================
 * JUMP target: (height), (frames)
 * JUMP target: (height%), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa o alvo a pular uma altura relativa ao prĂ³prio alvo. Se o alvo
 * pular uma altura de 200%, a altura serĂ¡ de 200% da altura do alvo.
 * Se nenhum sinal de '%' for usado, o alvo pularĂ¡ naquela quantidade
 * de pixels em vez de numa porcentagem da altura do alvo. A contagem
 * de frames Ă© de quanto tempo o alvo ficarĂ¡ no ar. VocĂª pode usar isso
 * com a sequĂªncia de aĂ§Ă£o 'Move' para fazer com que o alvo pareĂ§a estar
 * pulando uma distĂ¢ncia.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: jump user: 150%
 *                 jump target: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * MOTION type: target, (no weapon)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOTION WALK: target
 * MOTION STANDBY: target
 * MOTION CHANT: target
 * MOTION GUARD: target
 * MOTION DAMAGE: target
 * MOTION EVADE: target
 * MOTION ATTACK: target
 * MOTION THRUST: target
 * MOTION SWING: target
 * MOTION MISSILE: target
 * MOTION SKILL: target
 * MOTION SPELL: target
 * MOTION ITEM: target
 * MOTION ESCAPE: target
 * MOTION VICTORY: target
 * MOTION DYING: target
 * MOTION ABNORMAL: target
 * MOTION SLEEP: target
 * MOTION DEAD: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * ForĂ§a o alvo a realizar o especĂ­fico tipo de aĂ§Ă£o no sideview. Se vocĂª
 * fizer um comando de sequĂªncia de aĂ§Ă£o para que o alvo realize 'attack',
 * o alvo automaticamente determinarĂ¡ baseado na arma em que ele estiver
 * equipando para usar um impulso, balanĂ§o, ou movimento de mĂ­ssil. Ataque,
 * impulso, balanĂ§o e mĂ­ssil tambĂ©m mostrarĂ£o a arma do alvo, se ele
 * tiver uma.
 *
 * If 'no weapon' is used after the target, no weapons will be displayed. This
 * effect will only work with the Thrust, Swing, and Missile motions.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: motion walk: user
 *                motion thrust: user, no weapon
 *=============================================================================
 *
 *=============================================================================
 * MOVE target: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOVE target1: HOME, (frames)
 * MOVE target1: RETURN, (frames)
 * MOVE target1: FORWARD, (distance), (frames)
 * MOVE target1: BACKWARD, (distance), (frames)
 * MOVE target1: POINT, x coordinate, y coordinate, (frames)
 * MOVE target1: target2, BASE, (frames)
 * MOVE target1: target2, CENTER, (frames)
 * MOVE target1: target2, HEAD, (frames)
 * MOVE target1: target2, FRONT BASE, (frames)
 * MOVE target1: target2, FRONT CENTER, (frames)
 * MOVE target1: target2, FRONT HEAD, (frames)
 * MOVE target1: target2, BACK BASE, (frames)
 * MOVE target1: target2, BACK CENTER, (frames)
 * MOVE target1: target2, BACK HEAD, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esse Ă© o comando de movimento. Argumentos podem ser usados nos formatos
 * acima. Esse comando de sequĂªncia de aĂ§Ă£o irĂ¡ mover o target1 para qualquer
 * uma daquelas localizaĂ§Ăµes listadas nos argumentos. Se for em direĂ§Ă£o ao
 * target2, vocĂª deve incluir qual localizaĂ§Ă£o relativa ao target2 para o
 * target1 viajar.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: move user: home, 20
 *                 move target: forward, 48, 12
 *                 move enemy 1: point, 400, 300
 *                 move actor 2: front base, 20
 *=============================================================================
 *
 *=============================================================================
 * OPACITY target: x, (frames)
 * OPACITY target: x%, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muda a opacidade do alvo para x (0-255) ou x% (0% a 100%). Se vocĂª usar
 * 'frames', essa serĂ¡ a duraĂ§Ă£o de frames para a mudanĂ§a de opacidade para
 * o alvo.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: opacity user: 50%, 30
 *                 opacity not focus: 0
 *=============================================================================
 *
 *=============================================================================
 * SHOW BATTLE HUD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Se o hud de batalha estava escondido usando 'hide battle hud', use isso para
 * mostrar o hud de batalha de volta para a tela do jogador.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: show battle hud
 *=============================================================================
 *
 *=============================================================================
 * SHAKE SCREEN: (power), (speed), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa a tela do jogo a balanĂ§ar. Ajuste o power de 0-9, speed de 0-1,
 * e os frames para alterar a duraĂ§Ă£o do balanceamento de tela. Se esses
 * valores forem omitidos, eles vĂ£o para os valores padrĂµes de 5 power,
 * 5 speed, e 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: shake screen
 *                 shake screen: 9
 *                 shake screen: 3, 9, 30
 *=============================================================================
 *
 *=============================================================================
 * TINT SCREEN: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * TINT SCREEN: NORMAL, (frames)
 * TINT SCREEN: DARK, (frames)
 * TINT SCREEN: SEPIA, (frames)
 * TINT SCREEN: SUNSET, (frames)
 * TINT SCREEN: NIGHT, (frames)
 * TINT SCREEN: (red), (green), (blue), (gray), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muda o tom da tela de batalha. Se usar os argumentos 'normal', 'dark',
 * 'sepia', 'sunset', ou 'night' a tela terĂ¡ um tom prĂ©-feito. Se nĂ£o,
 * entĂ£o os argumentos para os valores de vermelho, verde, azul, e cinza
 * tĂªm que ser colodados para o tom. Vermelho, verde, e azul podem variar
 * de -255 a 255 enquanto que cinza vai variar de 0 a 255. Se frames forem
 * usados, isso mudarĂ¡ a duraĂ§Ă£o com que a tela mudarĂ¡ para o tom. Se
 * omitido, a quantidade padrĂ£o de frames usados serĂ¡ de 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: tint screen: normal
 *                 tint screen: sepia, 30
 *                 tint screen: 68, -34, -34, 0
 *                 tint screen: 68, -68, 0, 68, 45
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR FLOAT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera para todas as mudanĂ§as de flutuaĂ§Ă£o do combatente terminarem antes
 * de ir para a prĂ³xima aĂ§Ă£o na sequĂªncia de aĂ§Ă£o.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for float
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR JUMP
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera todos os pulos do combatente terminarem antes de ir para a prĂ³xima
 * aĂ§Ă£o na sequĂªncia de aĂ§Ă£o.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for jump
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR OPACITY
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera para todos os combatentes terminarem a mudanĂ§a de opacidade antes de
 * ir para a prĂ³xima aĂ§Ă£o na sequĂªncia de aĂ§Ă£o.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for opacity
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.08:
 * - State Icon and State Overlays will now synch together for floating and
 * jumping battlers.
 *
 * Version 1.07c:
 * - Synchronized battle animations to floating and jumping battlers.
 * 
 * Version 1.06:
 * - Updated weapon motions for YEP_X_AnimatedSVEnemies to work with sideview
 * enemies.
 *
 * Version 1.05:
 * - Creating compatibility for a future plugin.
 *
 * Version 1.04a:
 * - Rewrote and updated movement formulas.
 *
 * Version 1.03:
 * - Made a change to Motion action sequence. 'Wait' is now substituted for
 * 'Standby' as to not confuse it with the actual Motion Wait action sequence.
 * - Added a 'no weapon' option to Motion action sequences. This new tag will
 * only affect the 'Thrust', 'Swing', and 'Missile' motions.
 *
 * Version 1.02:
 * - Added a check for motion attack to differentiate between actor and enemy.
 *
 * Version 1.01:
 * - Updated help file to include Character X for target typing.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack2');
Yanfly.Param = Yanfly.Param || {};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP2.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ATTACK ANIMATION
  if (actionName === 'ATTACK ANIMATION') {
    return this.actionAttackAnimation(actionArgs);
  }
  // ENEMY EFFECT
  if (actionName === 'ENEMY EFFECT') {
    return this.actionEnemyEffect(actionArgs);
  }
  // FACE TARGET
  if (actionName.match(/FACE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFace(string, actionArgs);
    }
  }
  // FADE IN, FADE OUT
  if (['FADE IN', 'FADE OUT'].contains(actionName)) {
    return this.actionFadeScreen(actionName, actionArgs);
  }
  // FLASH SCREEN
  if (actionName === 'FLASH SCREEN') {
    return this.actionFlashScreen(actionArgs);
  }
  // FLOAT TARGET
  if (actionName.match(/FLOAT[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFloat(string, actionArgs);
    }
  }
  // HIDE BATTLE HUD, SHOW BATTLE HUD
  if (['HIDE BATTLE HUD', 'SHOW BATTLE HUD'].contains(actionName)) {
    return this.actionBattleHud(actionName);
  }
  // JUMP TARGET
  if (actionName.match(/JUMP[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionJump(string, actionArgs);
    }
  }
  // MOTION TYPE
  if (actionName.match(/MOTION[ ](.*)/i)) {
    return this.actionMotionTarget(String(RegExp.$1), actionArgs);
  }
  // MOVE TARGET
  if (actionName.match(/MOVE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionMove(string, actionArgs);
    }
  }
  // OPACITY TARGET
  if (actionName.match(/OPACITY[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionOpacity(string, actionArgs);
    }
  }
  // SHAKE SCREEN
  if (actionName === 'SHAKE SCREEN') {
    return this.actionShakeScreen(actionArgs);
  }
  // TINT SCREEN
  if (actionName === 'TINT SCREEN') {
    return this.actionTintScreen(actionArgs);
  }
  // WAIT FOR FLOAT
  if (actionName === 'WAIT FOR FLOAT') {
    return this.actionWaitForFloat();
  }
  // WAIT FOR JUMP
  if (actionName === 'WAIT FOR JUMP') {
    return this.actionWaitForJump();
  }
  // WAIT FOR OPACITY
  if (actionName === 'WAIT FOR OPACITY') {
    return this.actionWaitForOpacity();
  }
  return Yanfly.ASP2.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAttackAnimation = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  if (mirror && this._subject.isActor()) {
    this._logWindow.showActorAtkAniMirror(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  } else {
    this._logWindow.showAttackAnimation(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  }
  return true;
};

BattleManager.actionBattleHud = function(actionName) {
  if (actionName === 'HIDE BATTLE HUD') {
    this._windowLayer.x = Graphics.boxWidth * 495;
  } else if (actionName === 'SHOW BATTLE HUD') {
    this._windowLayer.x = 0;
  }
  return false;
}

BattleManager.actionEnemyEffect = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    if (actionArgs[1].toUpperCase() === 'WHITEN') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('whiten');
      });
    } else if (actionArgs[1].toUpperCase() === 'BLINK') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('blink');
      });
    }
    return true;
};

BattleManager.actionFace = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['FORWARD', 'NORMAL'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceForward();
      });
    } else if (['BACKWARD', 'MIRROR'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceBackward();
      });
    } else if (['HOME', 'ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceHome();
      });
    } else if (['AWAY FROM HOME', 'AWAY FROM ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceAwayHome();
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      });
    } else if (['AWAY FROM POINT', 'AWAY FROM POSITION', 'AWAY FROM COORDINATE',
    'AWAY FROM SCREEN', 'AWAY FROM SCREEN POS',
    'AWAY FROM COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      });
    } else if (cmd.match(/AWAY[ ]FROM[ ](.*)/i)) {
      var targets = this.makeActionTargets(String(RegExp.$1));
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      }, this);
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      }, this);
    }
    return false;
};

BattleManager.actionFadeScreen = function(actionName, actionArgs) {
  var frames = actionArgs[0] || 60;
  if (actionName === 'FADE IN') {
    $gameScreen.startFadeIn(frames);
  } else if (actionName === 'FADE OUT') {
    $gameScreen.startFadeOut(frames);
  }
  return false;
};

BattleManager.actionFlashScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'WHITE') {
      var flash = [255, 255, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'RED') {
      var flash = [255, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'ORANGE') {
      var flash = [255, 128, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'YELLOW') {
      var flash = [255, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'GREEN') {
      var flash = [0, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLUE') {
      var flash = [0, 128, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'PURPLE') {
      var flash = [128, 64, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'MAGENTA') {
      var flash = [255, 0, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLACK') {
      var flash = [0, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var intensity = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var flash = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(intensity)];
    }
    $gameScreen.startFlash(flash, frames);
    return false;
};

BattleManager.actionFloat = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(\d+)([%ï¼…])/i)) {
      var floatPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var floatPeak = 0.0;
    } else {
      var floatPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var floatRate = floatPeak + (pixels / mover.spriteHeight());
      mover.spriteFloat(floatRate, frames);
    });
    return false;
};

BattleManager.actionJump = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(\d+)([%ï¼…])/i)) {
      var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var jumpPeak = 0.0;
    } else {
      var jumpPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
      mover.spriteJump(jumpRate, frames);
    });
    return true;
};

BattleManager.actionMotionTarget = function(name, actionArgs) {
    if (name.toUpperCase() === 'WAIT') return this.actionMotionWait(actionArgs);
    if (name.toUpperCase() === 'STANDBY') name = 'WAIT';
    var movers = this.makeActionTargets(actionArgs[0]);
    if (movers.length < 1) return true;
    var cmd = name.toLowerCase();
    var motion = 'wait';
    if (actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON') {
      var showWeapon = false;
    } else {
      var showWeapon = true;
    }
    if (['wait', 'chant', 'guard', 'evade', 'skill', 'spell', 'item', 'escape',
    'victory', 'dying', 'abnormal', 'sleep', 'dead'].contains(cmd)) {
      motion = cmd;
    } else if (['walk', 'move'].contains(cmd)) {
      motion = 'walk';
    } else if (['damage', 'hit'].contains(cmd)) {
      motion = 'damage';
    } else if (['attack'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.performAttack();
      });
      return false;
    } else if (['thrust', 'swing', 'missile'].contains(cmd)) {
      motion = cmd;
      movers.forEach(function(mover) {
        mover.forceMotion(motion);
        if (mover.isActor() && showWeapon) {
          var weapons = mover.weapons();
          var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
          var attackMotion = $dataSystem.attackMotions[wtypeId];
          if (attackMotion && [0, 1, 2].contains(attackMotion.type)) {
            mover.startWeaponAnimation(attackMotion.weaponImageId);
          }
        }
        if (Imported.YEP_X_AnimatedSVEnemies) {
          if (mover.isEnemy() && mover.hasSVBattler() && showWeapon) {
            var attackMotion = $dataSystem.attackMotions[wtypeId];
            mover.startWeaponAnimation(mover.weaponImageId());
          }
        }
      });
      return false;
    }
    movers.forEach(function(mover) {
      mover.forceMotion(motion);
    });
    return false;
};

BattleManager.actionMove = function(name, actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['HOME', 'ORIGIN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('walk');
        mover.spriteFaceHome();
      });
    } else if (['RETURN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('evade');
        mover.spriteFaceForward();
      });
    } else if (['FORWARD', 'FORWARDS', 'BACKWARD',
    'BACKWARDS'].contains(cmd)) {
      var distance = actionArgs[1] || Yanfly.Param.BECStepDist;
      if (['BACKWARD', 'BACKWARDS'].contains(cmd)) distance *= -1;
      var frames = actionArgs[2] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveForward(distance, frames);
        mover.requestMotion('walk');
        if (['FORWARD', 'FORWARDS'].contains(cmd)) {
          mover.spriteFaceForward();
        } else {
          mover.spriteFaceBackward();
        }
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      var frames = actionArgs[3] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveToPoint(destX, destY, frames);
        mover.requestMotion('walk');
        mover.spriteFacePoint(destX, destY);
      });
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      var frames = actionArgs[2] || 12;
      var type = actionArgs[1].toUpperCase();
      if (targets.length < 1) return false;
      for (var i = 0; i < movers.length; ++i) {
        var mover = movers[i];
        if (!mover) continue;
        if (['BASE', 'FOOT', 'FEET'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'center');
          var destY = this.actionMoveY(mover, targets, 'foot');
        } else if (['CENTER', 'MIDDLE'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'center');
          var destY = this.actionMoveY(mover, targets, 'center');
        } else if (['HEAD', 'TOP'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'center');
          var destY = this.actionMoveY(mover, targets, 'head');
        } else if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
        'FRONT'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'front');
          var destY = this.actionMoveY(mover, targets, 'foot');
        } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
        'BACK'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'back');
          var destY = this.actionMoveY(mover, targets, 'foot');
        } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'front');
          var destY = this.actionMoveY(mover, targets, 'center');
        } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'back');
          var destY = this.actionMoveY(mover, targets, 'center');
        } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'front');
          var destY = this.actionMoveY(mover, targets, 'head');
        } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
          var destX = this.actionMoveX(mover, targets, 'back');
          var destY = this.actionMoveY(mover, targets, 'head');
        }
        mover.battler().moveToPoint(destX, destY, frames);
        mover.spriteFacePoint(destX, destY);
      }
    }
    return true;
};

BattleManager.actionMoveX = function(mover, targets, value) {
    value = this.actionMoveXLocation(mover, targets, value);
    var max = targets.length;
    var moverWidth = mover.spriteWidth();
    if (value === 'center') {
      var destX = null;
    } else {
      var destX = (value === 'left') ? Graphics.boxWidth : 0;
    }
    for (var i = 0; i < max; ++i) {
      var target = targets[i];
      if (!target) continue;
      var targetWidth = target.spriteWidth();
      var point = target.spritePosX();
      if (value === 'center') {
        destX = (destX === null) ? 0 : destX;
        destX += point;
      } else if (value === 'left') {
        point -= targetWidth / 2;
        point -= (mover.isActor() ? 1 : 1) * moverWidth / 2;
        destX = Math.min(point, destX);
      } else {
        point += targetWidth / 2;
        point += (mover.isActor() ? 1 : 1) * moverWidth / 2;
        destX = Math.max(point, destX);
      }
    }
    if (value === 'center') destX /= max;
    return destX;
};

BattleManager.actionMoveXLocation = function(mover, targets, value) {
    if (value === 'center') return 'center';
    var actors = 0;
    var enemies = 0;
    var max = targets.length;
    for (var i = 0; i < max; ++i) {
      var target = targets[i];
      if (!target) continue;
      if (target.isActor()) actors += 1;
      if (target.isEnemy()) enemies += 1;
    }
    if (actors > 0 && enemies === 0) {
      return (value === 'front') ? 'left' : 'right';
    } else if (actors === 0 && enemies > 0) {
      return (value === 'front') ? 'right' : 'left';
    } else {
      if (mover.isActor()) {
        return (value === 'front') ? 'right' : 'left';
      } else { // enemy
        return (value === 'front') ? 'left' : 'right';
      }
    }
    return 'center';
};

BattleManager.actionMoveY = function(mover, targets, value) {
    var max = targets.length;
    var destY = 0;
    var point = (value === 'head') ? Graphics.boxHeight : 0;
    for (var i = 0; i < max; ++i) {
      var target = targets[i];
      if (!target) continue;
      if (value === 'head') {
        point = Math.min(target.spritePosY() - target.spriteHeight(), point);
      } else if (value === 'center') {
        point += target.spritePosY() - target.spriteHeight() / 2;
      } else { // foot
        point = Math.max(target.spritePosY(), point);
      }
    }
    destY = (value === 'center') ? point / max : point;
    return destY;
};

BattleManager.actionOpacity = function(name, actionArgs) {
    var targets = this.makeActionTargets(name);
    if (targets.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    if (cmd.match(/(\d+)([%ï¼…])/i)) {
      var opacity = parseInt(RegExp.$1 * 0.01 * 255).clamp(0, 255);
    } else if (cmd.match(/(\d+)/i)) {
      var opacity = parseInt(RegExp.$1);
    } else {
      return false;
    }
    targets.forEach(function(target) {
      target.spriteOpacity(opacity, frames);
    });
    return false;
};

BattleManager.actionTintScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'NORMAL') {
      var tint = [0, 0, 0, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'DARK') {
      var tint = [-68, -68, -68, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SEPIA') {
      var tint = [34, -34, -68, 170];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SUNSET') {
      var tint = [68, -34, -34, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'NIGHT') {
      var tint = [68, -68, 0, 68];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var gray = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var tint = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(gray)];
    }
    $gameScreen.startTint(tint, frames);
    return false;
};

BattleManager.actionShakeScreen = function(actionArgs) {
    var power = actionArgs[0] || 5;
    var speed = actionArgs[1] || 5;
    var frames = actionArgs[2] || 60;
    $gameScreen.startShake(parseInt(power), parseInt(speed), parseInt(frames));
    return false;
};

BattleManager.actionWaitForFloat = function() {
    this._logWindow.waitForFloat();
    return false;
};

BattleManager.actionWaitForJump = function() {
    this._logWindow.waitForJump();
    return false;
};

BattleManager.actionWaitForOpacity = function() {
    this._logWindow.waitForOpacity();
    return false;
};

BattleManager.setWindowLayer = function(windowLayer) {
    this._windowLayer = windowLayer;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.ASP2.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.ASP2.Sprite_Battler_initMembers.call(this);
    this.resetFloat();
    this.setupJump(0, 0);
    this.resetOpacity();
};

Sprite_Battler.prototype.resetFloat = function() {
    this._floatHeight = 0.0;
    this._floatTarget = 0;
    this._floatDur = 0;
    this._floatRate = 0;
};

Sprite_Battler.prototype.resetOpacity = function() {
    this._opacityTarget = 255;
    this._opacityDur = 0;
    this._opacityRate = 0;
    this._opacityChanging = false;
};

Sprite_Battler.prototype.setupFloat = function(floatHeight, floatDuration) {
    floatDuration = Math.max(1, floatDuration);
    this._floatTarget = floatHeight;
    this._floatDur = floatDuration;
    var rate = Math.abs(this._floatHeight - floatHeight) / floatDuration;
    this._floatRate = rate;
};

Sprite_Battler.prototype.setupJump = function(jumpHeight, jumpDuration) {
    this._jumpHeight = jumpHeight;
    this._jumpDur = jumpDuration;
    this._jumpFull = jumpDuration;
};

Sprite_Battler.prototype.setupOpacityChange = function(target, duration) {
    duration = Math.max(1, duration);
    this._opacityTarget = target;
    this._opacityDur = duration;
    var rate = Math.abs(this.opacity - target) / duration;
    this._opacityRate = rate;
    this._opacityChanging = true;
};

Yanfly.ASP2.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.ASP2.Sprite_Battler_update.call(this);
    if (this._battler) {
      this.updateFloat();
      this.updateStateSprites();
      this.updateWeapon();
      this.updateOpacity();
    }
};

Sprite_Battler.prototype.updateFloat = function() {
    if (!this._battler) return;
    if (this._floatDur > 0) this._floatDur--;
    if (this._jumpDur > 0) this._jumpDur--;
    var baseY = this._battler.anchorY();
    var floatHeight = this.getFloatHeight();
    var jumpHeight = this.getJumpHeight();
    var height = floatHeight + jumpHeight;
    if (this._mainSprite && this._mainSprite.bitmap) {
      var rate = this._battler.spriteHeight() / this._mainSprite.height;
      this._mainSprite.anchor.y = (baseY + height * rate);
      this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
    } else {
      this.anchor.y = (baseY + height);
    }
};

Sprite_Battler.prototype.updateStateSprites = function() {
    var height = this._battler.spriteHeight() * -1;
    height -= Sprite_StateIcon._iconHeight;
    if (this._stateIconSprite) this._stateIconSprite.y = height;
    if (this._stateSprite) {
      this._stateSprite.y = (this._battler.spriteHeight() - 64) * -1;
    }
    var heightRate = 0;
    heightRate += this.getFloatHeight();
    heightRate += this.getJumpHeight();
    if (this._enemy && this._enemy.isFloating()) {
      heightRate += this.addFloatingHeight();
    };
    var height = this._battler.spriteHeight();
    if (this._stateIconSprite) {
      this._stateIconSprite.y += Math.ceil(heightRate * -height);
    }
    if (this._stateSprite) {
      this._stateSprite.y += Math.ceil(heightRate * -height);
    }
};

Sprite_Battler.prototype.updateWeapon = function() {
    if (!this._battler) return;
    if (!this._battler.isActor()) return;
    this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
};

Sprite_Battler.prototype.getFloatHeight = function() {
    if (this._floatDur <= 0) {
      this._floatHeight = this._floatTarget;
    } else {
      var target = this._floatTarget;
      var rate = this._floatRate;
      if (this._floatHeight >= target) {
        this._floatHeight = Math.max(target, this._floatHeight - rate);
      } else {
        this._floatHeight = Math.min(target, this._floatHeight + rate);
      }
    }
    return this._floatHeight;
};

Sprite_Battler.prototype.getJumpHeight = function() {
    if (this._jumpDur <= 0) {
      return 0;
    } else {
      var x = this._jumpFull - this._jumpDur;
      var h = this._jumpFull / 2;
      var k = this._jumpHeight;
      var a = -k / Math.pow(h, 2);
      var height = a * Math.pow((x - h), 2) + k;
    }
    return height;
};

Sprite_Battler.prototype.updateOpacity = function() {
    if (this.antiOpacityChange()) return;
    this._opacityDur--;
    if (this._opacityDur <= 0) {
      if (this.opacity !== this._opacityTarget) {
        this.opacity = this._opacityTarget;
      }
      this._opacityChanging = false;
    } else {
      var target = this._opacityTarget;
      var rate = this._opacityRate;
      if (this.opacity >= target) {
        this.opacity = Math.max(target, this.opacity - rate);
      } else {
        this.opacity = Math.min(target, this.opacity + rate);
      }
    }
};

Sprite_Battler.prototype.antiOpacityChange = function() {
    if (!this._opacityChanging) return true;
    return false;
};

Sprite_Battler.prototype.isFloating = function() {
    return this._floatDur > 0;
};

Sprite_Battler.prototype.isJumping = function() {
    return this._jumpDur > 0;
};

Sprite_Battler.prototype.isChangingOpacity = function() {
    return this._opacityDur > 0;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Yanfly.ASP2.Sprite_Animation_updatePosition =
    Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
    Yanfly.ASP2.Sprite_Animation_updatePosition.call(this);
    if (this._animation.position === 3) return;
    if (this.isBattlerRelated()) this.updateBattlerPosition();
};

Sprite_Animation.prototype.isBattlerRelated = function() {
    if (this._target instanceof Sprite_Battler) return true;
    if (this._target.parent instanceof Sprite_Battler) return true;
    return false;
};

Sprite_Animation.prototype.updateBattlerPosition = function() {
    if (this._target instanceof Sprite_Battler) {
      var target = this._target;
    } else if (this._target.parent instanceof Sprite_Battler) {
      var target = this._target.parent;
    } else {
      return;
    }
    if (!target.bitmap) return;
    if (target.bitmap.height <= 0) return;
    var heightRate = target.getFloatHeight() + target.getJumpHeight();
    var height = heightRate * target.bitmap.height;
    this.y -= height;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isAnyoneFloating = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isFloating();
    });
};

Spriteset_Battle.prototype.isAnyoneJumping = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isJumping();
    });
};

Spriteset_Battle.prototype.isAnyoneChangingOpacity = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isChangingOpacity();
    });
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.spriteFloat = function(floatHeight, floatDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupFloat(floatHeight, floatDuration);
};

Game_Battler.prototype.spriteJump = function(jumpHeight, jumpDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupJump(jumpHeight, jumpDuration);
};

Game_Battler.prototype.spriteOpacity = function(opacity, duration) {
    if (!this.battler()) return;
    this.battler().setupOpacityChange(opacity, duration);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.ASP2.Scene_Base_createWindowLayer =
    Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    Yanfly.ASP2.Scene_Base_createWindowLayer.call(this);
    BattleManager.setWindowLayer(this._windowLayer);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP2.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'float') {
      if (this._spriteset.isAnyoneFloating()) return true;
    } else if (this._waitMode === 'jump') {
      if (this._spriteset.isAnyoneJumping()) return true;
    } else if (this._waitMode === 'opacity') {
      if (this._spriteset.isAnyoneChangingOpacity()) return true;
    }
    return Yanfly.ASP2.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForFloat = function() {
    this.setWaitMode('float');
};

Window_BattleLog.prototype.waitForJump = function() {
    this.setWaitMode('jump');
};

Window_BattleLog.prototype.waitForOpacity = function() {
    this.setWaitMode('opacity');
};

//=============================================================================
// End of File
//=============================================================================
};