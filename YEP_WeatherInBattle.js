//=============================================================================
// Yanfly Engine Plugins - Weather In Battle
// YEP_WeatherInBattle.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_WeatherInBattle = true;

var Yanfly = Yanfly || {};
Yanfly.WIB = Yanfly.WIB || {};
Yanfly.WIB.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Allows you to have weather in battle. Weather also becomes
 * controllable through action sequences.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Weather does not appear in battles in RPG Maker MV by default. This causes a
 * disconnect from entering a battle on a map with weather effects rolling in
 * the background to a battle scene where the skies are suddenly devoid of such
 * weather behavior. This plugin adds in the simple effect of making whatever
 * weather that's being played on the map also affect the weather played in
 * battle. There's also new functions to save weather settings and recall them
 * for later in addition to a new action sequence for those using the Battle
 * Engine Core plugin.
 *
 * If you are using YEP_BattleEngineCore.js, place this plugin underneath it
 * in the Plugin Manager's plugin list.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * Plugin Commands:
 * 
 *   SaveWeather
 *   - Saves the current weather settings, meaning the type, power, and
 *   duration to change will be saved.
 *
 *   RecallWeather
 *   - Recalls the last saved weather settings. If nothing was last saved,
 *   then nothing will happen. Using this plugin command will not remove the
 *   last saved weather settings from memory.
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * If you have YEP_BattleEngineCore.js installed with this plugin located
 * underneath it in the Plugin Manager, you can make use of these extra
 * damage related action sequences.
 *
 *=============================================================================
 * WEATHER: type, (power), (duration)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'type' with either 'none', 'rain', 'storm', or 'snow'.
 * Replace 'power' with a value between 1 and 9.
 * Replace 'duration' with the number of frames you want the change to be.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: weather: rain, 5, 20
 *                weather: storm, 7, 60
 *                weather: snow, 9, 90
 *                weather: none, 1, 60
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 */
//=============================================================================

//=============================================================================
// Game_Screen
//=============================================================================

Game_Screen.prototype.saveWeather = function() {
    this._savedWeather = {
        type: this._weatherType || 'none',
        power: this._weatherPowerTarget || 0,
        duration: this._weatherDuration || 0
    }
};

Game_Screen.prototype.recallWeather = function() {
    if (this._savedWeather === undefined) return;
    this.changeWeather(this._savedWeather.type, this._savedWeather.power,
      this._savedWeather.duration);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

// Set Weather Effect
Game_Interpreter.prototype.command236 = function() {
    $gameScreen.changeWeather(this._params[0], this._params[1],
      this._params[2]);
    if (this._params[3]) {
      this.wait(this._params[2]);
    }
    return true;
};

Yanfly.WIB.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.WIB.Game_Interpreter_pluginCommand.call(this, command, args);
  if (command.match(/SaveWeather/i)) {
    $gameScreen.saveWeather();
  } else if (command.match(/RecallWeather/i)) {
    $gameScreen.recallWeather();
  }
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Yanfly.WIB.Spriteset_Battle_createLowerLayer =
  Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
  Yanfly.WIB.Spriteset_Battle_createLowerLayer.call(this);
  this.createWeather();
};

Spriteset_Battle.prototype.createWeather = function() {
  this._weather = new Weather();
  this.addChild(this._weather);
};

Yanfly.WIB.Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
  Yanfly.WIB.Spriteset_Battle_update.call(this);
  this.updateWeather();
};

Spriteset_Battle.prototype.updateWeather = function() {
  this._weather.type = $gameScreen.weatherType();
  this._weather.power = $gameScreen.weatherPower();
};

//=============================================================================
// YEP_BattleEngineCore Compatibility
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

Yanfly.WIB.BattleManager_procActSeq = BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  if (actionName === 'WEATHER') {
    return this.actionWeather(actionArgs);
  }
  return Yanfly.WIB.BattleManager_procActSeq.call(this, actionName, actionArgs);
};

}; // Imported.YEP_BattleEngineCore

BattleManager.actionWeather = function(actionArgs) {
  var type = actionArgs[0].toLowerCase();
  var power = Number(actionArgs[1]) || 0;
  var duration = (actionArgs[2] === undefined) ? 20 :
    (Number(actionArgs[2]) || 0);
  if (type === 'clear') type = 'none';
  if (type !== 'none') power = power.clamp(1, 9);
  $gameScreen.changeWeather(type, power, duration);
  return false;
};

//=============================================================================
// End of File
//=============================================================================