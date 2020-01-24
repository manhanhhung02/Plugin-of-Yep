//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 3
// YEP_X_ActSeqPack3.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack3 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP3 = Yanfly.ASP3 || {};

//=============================================================================
 /*:
 * @plugindesc v1.02 (É necessário ter YEP_BattleEngineCore.js) Controle
 * de Câmera é adicionado para as sequências de ações do BEC.
 * @author Yanfly Engine Plugins
 *
 * @param Camera Option
 * @desc Opções de texto usadas para o movimento da Câmera mostrado na
 * batalha.
 * @default Battle Camera
 *
 * @help
 * ============================================================================
 * Introdução
 * ============================================================================
 *
 * O plugin Action Sequence Pack 3 é um plugin de extensão para o Battle
 * Engine Core do Yanfly Engine Plugins. Esse plugin de extensão não
 * irá funcionar sem o plugin principal.
 *
 * Esse plugin de extensão contém as funções mais básicas usadas para
 * personalizar sequências de ações numa escala visual. Esse plugin foca em
 * controle de câmera e zoom de tela.
 *
 * ============================================================================
 * Sequências de Ações - ala Melody
 * ============================================================================
 *
 * O Battle Engine Core inclui o sistema Battle Engine do Yanfly Engine Melody,
 * onde cada um dos aspectos dos efeitos de habilidade e itens podem ser
 * controlados a um certo ponto. Esses são chamados de Sequências de Ações,
 * onde cada comando na sequência de ação causa o jogo a realizar uma ação
 * individual distinta.
 *
 * Cada habilidade e item consiste de cinco diferentes sequências de ações.
 * Elas são as seguintes:
 *
 * 1. Acões de Set Up
 *   Eles preparam o combatente ativo antes de executar a ação e os seus
 * efeitos individuais. Normalmente o que você vê aqui são coisas como
 * o combatente ativo mover um pouco para frente, desembainhando sua arma, etc.
 * Essa etapa irá ocorrer antes que o combatente ativo gaste o custo de
 * sua habilidade ou item.
 *
 * 2. Acões Inteiras
 *   Essas ações vão afetar todos os alvos simultâneamente. Embora essa seção
 * não precisa ser usada, a maioria das ações vão usar isso para mostrar
 * animações sobre todos os inimigos. Essa etapa ocorre depois do custo de
 * habilidade e item.
 *
 * 3. Ações de Alvo
 *   Essa seção irá afetar todos os alvos individualmente. Usada primeiramente
 * por ataques físicos que irão entregar mais formas de dano. Ações que
 * ocorrem aqui não irão afetar outros alvos a não ser que seja ordenado
 * especificamente para afetar.
 *
 * 4. Ações de Seguir
 *   Essa seção irá se dedicar a trabalhos de cleanup depois das ações de
 * alvos individuais. Aqui, ela fará coisas como remover flags imortais,
 * começar eventos comuns, e mais.
 *
 * 5. Ações Terminadas
 *   Essa seção vai ter o close up das sequências de ações do combatente ativo.
 * Normalmente coisas como fazer esperar e aguardar no último minuto para
 * habilidades e itens, mover de volta para o lugar, e outros.
 *
 * Agora que você sabe cada um dos cinco passos de cada sequência de ação, aqui
 * estão os tags que você pode inserir dentro das habilidades e itens. Preste
 * atenção para cada nome de tag.
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
 * Eles irão fazer seus respectivos conjunto de ações. Os métodos para inserir
 * para a lista de ações podem ser achados embaixo no core do Help Manual.
 *
 * Além disso,  para prevenir que cada um dos seus noteboxes de item de seu
 * banco de dados esteja cheia de listas de sequências de ações, há um
 * atalho que você pode fazer para copiar todas as ações de set up, ações
 * inteiras, ações de alvo, ações de seguir, e ações terminadas com apenas
 * uma linha.
 *
 * <action copy: x:y>
 *
 * Substitua x com "item" ou "skill" para estabelecer o tipo para o código de
 * lista de ações para copiar diretamente. O número inteiro y é então o ID
 * atribuído para àquele específico tipo de objeto. Por exemplo, para copiar
 * as sequências de ações da 45º habilidade, o código seria
 * <action copy: skill:45> para qualquer coisa que irá aceitar esses códigos
 * de ações. Se você realmente usar esse notetag, ele levará prioridade sobre
 * qualquer outro custom que você pôs no notebox.
 *
 * ============================================================================
 * Digitamento de Alvo
 * ============================================================================
 *
 * Você pode perceber que em algumas das ações abaixo irá dizer "refer to
 * target typing" que é essa seção bem aqui. Aqui está uma rápida lista dos
 * vários alvos que você pode selecionar.
 *
 *   user; Isso irá selecionar o combatente ativo.
 *   target, targets; Isso irá selecionar os combatentes ativos em questão.
 *   actors, existing actors; Isso irá selecionar todos os personagens vivos.
 *   all actors; Isso irá selecionar todos personagens, incluindo os mortos.
 *   dead actors: Isso irá selecionar apenas os personagens mortos.
 *   actors not user; Isso irá selecionar todos os personagens vivos menos
 *   o usuário.
 *   actor x; Isso irá selecionar o personagem no slot x.
 *   character x; Isso irá selecionar o personagem específico com o ID de
 *     personagem de x
 *   enemies, existing enemies; Isso irá selecionar todos os inimigos vivos.
 *   all enemies; Isso irá selecionar todos os inimigos, incluindo os mortos.
 *   dead enemies: Isso irá selecionar apenas os inimigos mortos.
 *   enemies not user; Isso irá selecionar todos os inimigos menos o usuário.
 *   enemy x; Isso irá selecionar o inimigo no slot x.
 *   friends; Isso irá selecionar os aliados vivos do combatente.
 *   all friends; Isso irá selecionar todos os aliados do combatente, até os
 *     mortos.
 *   dead friends; Isso irá selecionar os aliados mortos do combatente.
 *   friends not user; Isso irá selecionar os aliados do combatente, menos
 *     ele mesmo.
 *   friend x: Isso irá selecionar o aliado do combatente no slot x.
 *   opponents; Isso irá selecionar os oponentes vivos do combatente.
 *   all opponents; Isso irá selecionar todos os oponentes do combatente.
 *   dead opponents; Isso irá selecionar os oponentes mortos do combatente.
 *   opponent x: Isso irá selecionar o oponente do combatente no slot x.
 *   all alive; Seleciona todos os personagens e inimigos vivos.
 *   all members; Seleciona todos os personagens e inimigos vivos e mortos.
 *   all dead; Seleciona todos os personagens e inimigos mortos.
 *   all not user; Isso irá selecionar todos os combatentes vivos menos o
 *     usuário.
 *   focus;  Seleciona o combatente ativo e seus alvos.
 *   not focus; Seleciona tudo menos o combatente ativo e seus alvos.
 *
 * ============================================================================
 * Sequência de Ações - Lista de Ações
 * ============================================================================
 *
 * Aqui contém a lista de ações que você pode usar dentro das cinco
 * sequências de ações. Cada ação tem uma função única e requer certos
 * formatos para operar propriamente.
 *
 *=============================================================================
 * CAMERA CLAMP ON
 * CAMERA CLAMP OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Por padrão, o clamp da câmera está ligado, o que força a câmera a nunca
 * pan fora das fronteiras do campo de batalha. Porém, no caso de você
 * querer desligar isso, use "camera clamp off' para desligá-la. O
 * clamp, porém, irá voltar a ficar ligado no final de cada ação
 * 'perform finish'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: camera clamp on
 *                 camera clamp off
 *=============================================================================
 *
 *=============================================================================
 * CAMERA FOCUS: target, (location), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA FOCUS: target, FRONT BASE, (frames)
 * CAMERA FOCUS: target, BASE, (frames)
 * CAMERA FOCUS: target, BACK BASE, (frames)
 * CAMERA FOCUS: target, FRONT CENTER, (frames)
 * CAMERA FOCUS: target, CENTER, (frames)
 * CAMERA FOCUS: target, BACK CENTER, (frames)
 * CAMERA FOCUS: target, FRONT HEAD, (frames)
 * CAMERA FOCUS: target, HEAD, (frames)
 * CAMERA FOCUS: target, BACK HEAD, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Isso irá focar em um ou mais alvos (referir-se ao digitamento de alvo) e
 * localização. Se a localização for omitida, a câmera irá focar o centro
 * do(s) alvo(s).
 * Nota: A câmera não passará fora das fronteiras da tela.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: camera focus: user
 *                 camera focus: target, front, 40
 *                 camera focus: enemies, center, 30
 *=============================================================================
 *
 *=============================================================================
 * CAMERA OFFSET: DIRECTION, DISTANCE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA OFFSET: LEFT, distance
 * CAMERA OFFSET: RIGHT, distance
 * CAMERA OFFSET: UP, distance
 * CAMERA OFFSET: DOWN, distance
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Desloca a câmera numa direção por (distância) quantia.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: camera offset: left, 200
 *                 camera offset: right, Graphics.boxWidth / 4
 *                 camera offset: up, 300
 *                 camera offset: down, $gameVariables.value(3);
 *=============================================================================
 *
 *=============================================================================
 * CAMERA PAN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA PAN: LEFT, distance, (frames)
 * CAMERA PAN: RIGHT, distance, (frames)
 * CAMERA PAN: UP, distance, (frames)
 * CAMERA PAN: DOWN, distance, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Pan a câmera em uma direção numa certa distância em pixels. Você
 * pode usar uma combinação de esquerda/direita e cima/baixo para
 * realizar um pan de câmera diagonal. Usar 'frames' irá permitir
 * que você ajuste a duração do pan de câmera. Omitir 'frames' irá
 * estabelecer a duração do pan de câmera para 30 frames.
 * Nota: A câmera não passará fora das fronteiras da tela.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: camera pan: left, 200
 *                 camera pan: up, 250
 *                 camera pan: right, 500, 60
 *                 camera pan: down: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * CAMERA SCREEN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA SCREEN: TOP LEFT, (frames)
 * CAMERA SCREEN: FAR LEFT, (frames)
 * CAMERA SCREEN: BOTTOM LEFT, (frames)
 * CAMERA SCREEN: TOP CENTER, (frames)
 * CAMERA SCREEN: CENTER, (frames)
 * CAMERA SCREEN: BOTTOM CENTER, (frames)
 * CAMERA SCREEN: TOP RIGHT, (frames)
 * CAMERA SCREEN: FAR RIGHT, (frames)
 * CAMERA SCREEN: BOTTOM RIGHT, (frames)
 * CAMERA SCREEN: POINT, x, y, (frames)
 * CAMERA SCREEN: target, FRONT, (frames)
 * CAMERA SCREEN: target, BASE, (frames)
 * CAMERA SCREEN: target, BACK, (frames)
 * CAMERA SCREEN: target, FRONT CENTER, (frames)
 * CAMERA SCREEN: target, CENTER, (frames)
 * CAMERA SCREEN: target, BACK CENTER, (frames)
 * CAMERA SCREEN: target, FRONT TOP, (frames)
 * CAMERA SCREEN: target, TOP, (frames)
 * CAMERA SCREEN: target, BACK TOP, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Move a câmerca para uma certa parte da tela. Se você escolher um
 * alvo, a câmera irá se prender àquela parte do alvo. Usar (frames) irá
 * determinar a duração de tempo que a câmera irá se mover para a
 * localização do alvo. Omitir (frames) irá estabelecer a duração
 * do pan de câmera para 30 frames.
 * Nota: A câmera não passará fora das fronteiras da tela.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: camera screen: top left
 *                 camera screen: far right, 30
 *                 camera screen: point, 400, 300, 60
 *                 camera screen: user, base
 *                 camera screen: targets, base, 60
 *=============================================================================
 *
 *=============================================================================
 * RESET CAMERA: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reseta a localização da câmera de volta para a localização padrão, que
 * é o centro do campo de batalha. Usar (frames) irá permitir que você
 * ajuste a duração em que a câmera reseta. Omitir 'frames' irá estabelecer
 * a câmera a resetar em 30 frames.
 * Nota: A câmera não passará fora das fronteiras da tela.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: reset camera
 *                 reset camera: 30
 *=============================================================================
 *
 *=============================================================================
 * RESET ZOOM: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reseta o zoom da câmera de volta para o zoom padrão, que é 100%.
 * Usar (frames) irá permitir que você ajuste a duração em que o
 * zoom reseta. Omitir 'frames' irá estabelecer o zoom a resetar em
 * 30 frames.
 * Nota: A câmera não passará fora das fronteiras da tela.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: reset zoom
 *                 reset zoom: 30
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR CAMERA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a câmera terminar de pan antes de ir para para a próxima ação na
 * sequência de ações.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for camera
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ZOOM
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera o zoom acabar de mudar antes de ir para a próxima ação na
 * sequência de ações.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: wait for zoom
 *=============================================================================
 *
 *=============================================================================
 * ZOOM: x%, (frames)
 * ZOOM: x.y, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Zoom para proporção x% ou x.y. Usar (frames) irá permitir que você
 * ajuste a duração em que o zoom ocorre. Omitir 'frames' irá estabelecer
 * a duração do zoom para 30 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Exemplo de uso: zoom: 200%
 *                 zoom: 1.5, 45
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated the Game_Screen.startZoom() function from beta to newest version.
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
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ASP3CameraOption = String(Yanfly.Parameters['Camera Option']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP3.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // CAMERA CLAMP
  if (['CAMERA CLAMP ON', 'CAMERA CLAMP OFF'].contains(actionName)) {
    return this.actionCameraClamp(actionName);
  }
  // CAMERA FOCUS
  if (['CAMERA FOCUS', 'FOCUS CAMERA'].contains(actionName)) {
    return this.actionCameraFocus(actionArgs);
  }
  // CAMERA OFFSET
  if (['CAMERA OFFSET', 'OFFSET CAMERA'].contains(actionName)) {
    return this.actionCameraOffset(actionArgs);
  }
  // CAMERA PAN
  if (['CAMERA PAN', 'PAN CAMERA'].contains(actionName)) {
    return this.actionCameraPan(actionArgs);
  }
  // CAMERA SCREEN
  if (actionName === 'CAMERA SCREEN') {
    return this.actionCameraScreen(actionArgs);
  }
  // RESET CAMERA
  if (actionName === 'RESET CAMERA') {
    return this.actionResetCamera(actionArgs);
  }
  // RESET ZOOM
  if (actionName === 'RESET ZOOM') {
    return this.actionResetZoom(actionArgs);
  }
  // WAIT FOR CAMERA
  if (actionName === 'WAIT FOR CAMERA') {
    return this.actionWaitForCamera();
  }
  // WAIT FOR ZOOM
  if (actionName === 'WAIT FOR ZOOM') {
    return this.actionWaitForZoom();
  }
  // ZOOM
  if (actionName === 'ZOOM') {
    return this.actionZoom(actionArgs);
  }
  return Yanfly.ASP3.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

Yanfly.ASP3.BattleManager_actionPerformFinish =
    BattleManager.actionPerformFinish;
BattleManager.actionPerformFinish = function() {
    this.actionResetZoom([30]);
    this.resetCamera([30]);
    return Yanfly.ASP3.BattleManager_actionPerformFinish.call(this);
};

BattleManager.actionCameraClamp = function(actionName) {
    if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    if (actionName === 'CAMERA CLAMP ON') {
      this._cameraClamp = true;
    } else if (actionName === 'CAMERA CLAMP OFF') {
      this._cameraClamp = false;
    }
    return true;
};

BattleManager.actionCameraFocus = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    this._cameraFocusGroup = this.makeActionTargets(actionArgs[0]);
    if (this._cameraFocusGroup.length < 1) return false;
    var type = (actionArgs[1]) ? actionArgs[1].toUpperCase() : 'CENTER';
    var frames = actionArgs[2] || 30;
    if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'BASE';
    } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'BASE';
    } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'BASE';
    } else if (['FRONT CENTER', 'FRONT MIDDLE', 'FRONT'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['CENTER', 'MIDDLE'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['BACK CENTER', 'BACK MIDDLE', 'BACK'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'TOP';
    } else if (['HEAD', 'TOP'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'TOP';
    } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'TOP';
    } else {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionCameraOffset = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['LEFT'].contains(cmd)) {
      this._cameraOffsetX = -1 * eval(actionArgs[1]) || 100;;
    } else if (['RIGHT'].contains(cmd)) {
      this._cameraOffsetX = eval(actionArgs[1]) || 100;;
    } else if (['UP'].contains(cmd)) {
      this._cameraOffsetY = -1 * eval(actionArgs[1]) || 100;;
    } else if (['DOWN'].contains(cmd)) {
      this._cameraOffsetY = eval(actionArgs[1]) || 100;;
    }
    return true;
};

BattleManager.actionCameraPan = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    var frames = 30;
    if (['LEFT'].contains(cmd)) {
      this._cameraX -= eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['RIGHT'].contains(cmd)) {
      this._cameraX += eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['UP'].contains(cmd)) {
      this._cameraY -= eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['DOWN'].contains(cmd)) {
      this._cameraY += eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionCameraScreen = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    var frames = 30;
    if (['TOP LEFT', 'UPPER LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['FAR LEFT', 'ABSOLUTE LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM LEFT', 'LOWER LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['TOP CENTER', 'UPPER CENTER'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['CENTER', 'MIDDLE'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM CENTER', 'LOWER CENTER'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['TOP RIGHT', 'UPPER RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['FAR RIGHT', 'ABSOLUTE RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM RIGHT', 'LOWER RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      this._cameraX = eval(actionArgs[1]) || 0;
      this._cameraY = eval(actionArgs[2]) || 0;
      frames = actionArgs[3] || 30;
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var type = actionArgs[1].toUpperCase();
      var frames = actionArgs[2] || 30;
      if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
      'FRONT'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
      'BACK'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['CENTER', 'MIDDLE'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else if (['HEAD', 'TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else {
        return true;
      }
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionResetCamera = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var duration = parseInt(actionArgs[0]) || 30;
    this.resetCamera(duration);
    return true;
};

BattleManager.actionResetZoom = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var duration = parseInt(actionArgs[0]) || 30;
    var x = this.cameraX();
    var y = this.cameraY();
    $gameScreen.startZoom(x, y, 1, duration);
    return true;
};

BattleManager.actionWaitForCamera = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForCamera();
    return false;
};

BattleManager.actionWaitForZoom = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForZoom();
    return false;
};

BattleManager.actionZoom = function(actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var scale = parseFloat(RegExp.$1 * 0.01) || 1.0;
    } else {
      var scale = parseFloat(actionArgs[0]) || 1.0;
    }
    var duration = parseInt(actionArgs[1]) || 30;
    var x = this.cameraX();
    var y = this.cameraY();
    $gameScreen.startZoom(x, y, scale, duration);
    return true;
};

Yanfly.ASP3.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    this.resetCamera();
    this.actionResetZoom([1]);
    Yanfly.ASP3.BattleManager_setup.call(this, troopId, canEscape, canLose);
};

BattleManager.resetCamera = function(duration) {
    this._cameraX = Graphics.boxWidth / 2;
    this._cameraY = Graphics.boxHeight / 2;
    this._cameraOffsetX = 0;
    this._cameraOffsetY = 0;
    this._cameraFocusGroup = [];
    this._cameraFocusPosX = 'BASE';
    this._cameraFocusPosY = 'BASE';
    this._cameraClamp = true;
    $gameScreen.setCameraDuration(duration);
};

BattleManager.cameraClamp = function() {
    return this._cameraClamp;
};

BattleManager.cameraX = function() {
    if (this._cameraFocusGroup.length > 0) {
      var value = this.cameraFocusX();
    } else {
      var value = this._cameraX;
    }
    value += this._cameraOffsetX;
    return value;
};

BattleManager.cameraY = function() {
    if (this._cameraFocusGroup.length > 0) {
      var value = this.cameraFocusY();
    } else {
      var value = this._cameraY;
    }
    value += this._cameraOffsetY;
    return value;
};

BattleManager.cameraFocusX = function() {
    var i = this.targetPosX(this._cameraFocusGroup, this._cameraFocusPosX);
    return i;
};

BattleManager.cameraFocusY = function() {
    var i = this.targetPosY(this._cameraFocusGroup, this._cameraFocusPosY);
    return i;
};

BattleManager.targetPosX = function(group, position) {
    var value = 0;
    if (position === 'MIDDLE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value += battler.cameraPosX();
      }
    } else if (position === 'FRONT') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        if (battler.isActor()) var offset = -1 * battler.spriteWidth() / 2;
        if (battler.isEnemy()) var offset = battler.spriteWidth() / 2;
        value = Math.max(battler.cameraPosX() + offset, value);
      }
      value *= group.length;
    } else if (position === 'BACK') {
      value = Graphics.boxWidth;
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        if (battler.isActor()) var offset = battler.spriteWidth() / 2;
        if (battler.isEnemy()) var offset = -1 * battler.spriteWidth() / 2;
        value = Math.min(battler.cameraPosX() + offset, value);
      }
      value *= group.length;
    }
    value /= group.length;
    return value;
};

BattleManager.targetPosY = function(group, position) {
    var value = 0;
    if (position === 'BASE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value = Math.max(battler.cameraPosY(), value);
      }
      value *= group.length;
    } else if (position === 'MIDDLE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value += battler.cameraPosY() - battler.spriteHeight() / 2;
      }
    } else if (position === 'TOP') {
      value = Graphics.boxHeight;
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value = Math.min(battler.cameraPosY() - battler.spriteHeight(), value);
      }
      value *= group.length;
    }
    value /= group.length;
    return value;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.updatePosition = function() {
    var zoom = $gameScreen.zoomScale();
    var clamp = BattleManager.cameraClamp();
    this.scale.x = zoom;
    this.scale.y = zoom;
    var screenX = -1 * $gameScreen.zoomX() * zoom + Graphics.boxWidth / 2;
    var screenY = -1 * $gameScreen.zoomY() * zoom + Graphics.boxHeight / 2;
    if (clamp && zoom >= 1.0) {
      var clampX1 = -Graphics.boxWidth * zoom + Graphics.boxWidth;
      var clampY2 = -Graphics.boxHeight * zoom + Graphics.boxHeight;
      this.x = Math.round(screenX.clamp(clampX1, 0));
      this.y = Math.round(screenY.clamp(clampY2, 0));
    } else if (clamp && zoom < 1.0) {
      this.x = Math.round((Graphics.boxWidth - Graphics.boxWidth * zoom) / 2);
      this.y = Math.round((Graphics.boxHeight - Graphics.boxHeight * zoom) / 2);
    } else {
      this.x = Math.round(screenX);
      this.y = Math.round(screenY);
    }
    this.x += Math.round($gameScreen.shake());
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.cameraPosX = function() {
    var value = this.spritePosX();
    return value;
};

Game_Battler.prototype.cameraPosY = function() {
    var value = this.spritePosY();
    if (Imported.YEP_X_ActSeqPack2) {
      value -= this.battler().getFloatHeight() * this.spriteHeight();
      value -= this.battler().getJumpHeight() * this.spriteHeight();
    }
    return value;
};

//=============================================================================
// Game_Screen
//=============================================================================

Yanfly.ASP3.Game_Screen_clearZoom = Game_Screen.prototype.clearZoom;
Game_Screen.prototype.clearZoom = function() {
    Yanfly.ASP3.Game_Screen_clearZoom.call(this);
    this._cameraDuration = 0;
};

Yanfly.ASP3.Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
    Yanfly.ASP3.Game_Screen_update.call(this);
    this.updateBattleCamera();
};

Game_Screen.prototype.startZoom = function(x, y, scale, duration) {
    this._zoomX = x;
    this._zoomY = y;
    this._zoomScaleTarget = scale;
    this._zoomDuration = duration;
};

Game_Screen.prototype.isZooming = function() {
    return this._zoomDuration > 0;
};

Game_Screen.prototype.setCameraDuration = function(duration) {
    this._cameraDuration = duration;
};

Game_Screen.prototype.updateBattleCamera = function() {
    if (!$gameParty.inBattle()) return;
    if (this._cameraDuration > 0) {
      var d = this._cameraDuration;
      var tx = BattleManager.cameraX();
      var ty = BattleManager.cameraY();
      this._zoomX = (this._zoomX * (d - 1) + tx) / d;
      this._zoomY = (this._zoomY * (d - 1) + ty) / d;
      this._cameraDuration--;
    } else {
      this._zoomX = BattleManager.cameraX();
      this._zoomY = BattleManager.cameraY();
    }
};

Game_Screen.prototype.isBattleCameraPanning = function() {
    if ($gameParty.inBattle()) return this._cameraDuration > 0;
    return false;
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.battleCamera = true;

Yanfly.ASP3.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.ASP3.ConfigManager_makeData.call(this);
    config.battleCamera = this.battleCamera;
    return config;
};

Yanfly.ASP3.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.ASP3.ConfigManager_applyData.call(this, config);
    this.battleCamera = this.readConfigBattleCamera(config, 'battleCamera');
};

ConfigManager.readConfigBattleCamera = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return true;
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.ASP3.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.ASP3.Window_Options_addGeneralOptions.call(this);
    this.addCommand(Yanfly.Param.ASP3CameraOption, 'battleCamera');
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP3.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'camera') {
      if ($gameScreen.isBattleCameraPanning()) return true;
    } else if (this._waitMode === 'zoom') {
      if ($gameScreen.isZooming()) return true;
    }
    return Yanfly.ASP3.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForCamera = function() {
    this.setWaitMode('camera');
};

Window_BattleLog.prototype.waitForZoom = function() {
    this.setWaitMode('zoom');
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.ASP3.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    Yanfly.ASP3.Scene_Map_onMapLoaded.call(this);
    $gameScreen.clearZoom();
};

//=============================================================================
// End of File
//=============================================================================
};
