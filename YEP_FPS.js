1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
//=============================================================================
// Yanfly Engine Plugins - FPS Synch Option
// YEP_FpsSynchOption.js
//=============================================================================
 
var Imported = Imported || {};
Imported.YEP_SynchFpsOption = true;
 
var Yanfly = Yanfly || {};
Yanfly.FpsSynch = Yanfly.FpsSynch || {};
Yanfly.FpsSynch.version = 1.03;
 
//=============================================================================
 /*:
 * @plugindesc v1.03 Adds a new command to Options menu for synching
 * the FPS of moniters with higher FPS rates.
 * @author Yanfly Engine Plugins
 *
 * @param Command Name
 * @desc Command name used inside of the Options menu.
 * @default Synch Monitor FPS
 *
 * @param Default Setting
 * @type boolean
 * @on ON
 * @off OFF
 * @desc The default setting of the Synch Monitor FPS.
 * OFF - false (Recommended)  ON - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin is to be used with RPG Maker MV version 1.1.0 and upward.
 *
 * RPG Maker MV is constructed in a way where each update to its engine is done
 * once per frame update. While this is normally fine, as many players view the
 * game through 60 fps, some players experience the game differently as their
 * hardware may run at higher than 60 fps.
 *
 * When RPG Maker MV version 1.1.0 is implemented, it implemented Galenmereth's
 * fluid timestep, which forces the game to always play as if it is 60 fps. In
 * practice, this is great for everybody because players that experience more
 * 60 fps will be able to play the game as if it was 60 fps.
 *
 * However, there comes a problem when a player's hardware isn't strong enough
 * to support RPG Maker MV natively at 60 fps (such as the case with older
 * computers, or weaker mobile devices) or if the player is using video 
 * recording software that goes below 60 fps. The game will appear laggy and
 * jumping without good response rates from input commands or possibly even
 * make the player miss out on certain visual frame updates.
 *
 * This plugin places a setting in the Options menu to enable or disable the
 * fluid timestep addition and utilize the former RPG Maker MV engine updating
 * function. This way, players will have the option of using fluid timesteps or
 * opting to not use it instead of forcing it on everybody who may not be able
 * to handle it.
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[302]Synch Monitor FPS
 *
 * Help Description:
 * Turn this ON if your monitor runs above 60 FPS
 * to synchronize the game to run at 60 FPS.
 *
 * Symbol:
 * synchFps
 *
 * Show/Hide:
 * show = Imported.YEP_SynchFpsOption;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Compatibility update with YEP_OptionsCore.js.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - The plugin is now prevented if the project's core files are under version
 * RPG Maker MV 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================
 
if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0') {
 
//=============================================================================
// Parameter Variables
//=============================================================================
 
Yanfly.Parameters = PluginManager.parameters('YEP_FpsSynchOption');
Yanfly.Param = Yanfly.Param || {};
 
Yanfly.Param.FpsSynchCmd = String(Yanfly.Parameters['Command Name']);
Yanfly.Param.FpsSDefault = eval(String(Yanfly.Parameters['Default Setting']));
 
//=============================================================================
// MainCode
//=============================================================================
 
ConfigManager.synchFps = Yanfly.Param.FpsSDefault;
 
Yanfly.FpsSynch.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.FpsSynch.ConfigManager_makeData.call(this);
    config.synchFps = this.synchFps;
    return config;
};
 
Yanfly.FpsSynch.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.FpsSynch.ConfigManager_applyData.call(this, config);
    this.synchFps = this.readConfigFpsSynch(config, 'synchFps');
};
 
ConfigManager.readConfigFpsSynch = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return Yanfly.Param.FpsSDefault;
    }
};
 
//=============================================================================
// SceneManager
//=============================================================================
 
SceneManager.updateMainFluidTimestep = SceneManager.updateMain;
 
SceneManager.updateMain = function() {
    if (ConfigManager.synchFps) {
      this.updateMainFluidTimestep();
    } else {
      this.updateMainNoFpsSynch();
    }
};
 
SceneManager.updateMainNoFpsSynch = function() {
    this.updateInputData();
    this.changeScene();
    this.updateScene();
    this.renderScene();
    this.requestUpdate();
};
 
//=============================================================================
// Window_Options
//=============================================================================
 
Yanfly.FpsSynch.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.FpsSynch.Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) {
      this.addCommand(Yanfly.Param.FpsSynchCmd, 'synchFps');
    }
};
 
//=============================================================================
// Version Compatibility Update
//=============================================================================
} else {
 
var text = '';
text += 'You are getting this error because you are trying to run FPS Synch ';
text += 'Options while your project files are lower than version 1.1.0. \n\n';
text += 'Please visit this thread for instructions on how to update your ';
text += 'project files to 1.1.0 or higher: \n\n';
text += 'http://forums.rpgmakerweb.com/index.php?/topic/';
text += '71400-rpg-maker-mv-v134-update/';
console.log(text);
require('nw.gui').Window.get().showDevTools();
 
} // (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= '1.1.0')
 
//=============================================================================
// End of File
//=============================================================================