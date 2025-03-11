// Globals
var Objects = [];

function init() {
  script.log("SPACE HUB Control module init");

  createObjectContainer();
}

function moduleParameterChanged(param) {
  script.log("Param: " + param.name + " parameter changed, new value: " + param.get());
}

function moduleValueChanged(value) {
  var valName = value.name;
  var container = value.getParent();
  script.log(container);
  script.log("Val: " + valName + " value changed, new value: " + value.get() + "; Object ID: " + container.ID);

  if (valName == "name") {
    objectName(container.ID, value.get());
  }
  else if (valName == "mute") {
    // TODO: Update Object Mute
  }
  else if (valName == "solo") {
    //  TODO: Update Object Solo
  }
}

function createObjectContainer() {
  ObjectsContainer = local.values.addContainer("Objects Container");

  for (var i = 0; i < 128; i++) {
    var objID = i + 1;
    Objects.push({
      "ID": objID
    });
    Objects[i].ObjectContainer = ObjectsContainer.addContainer(
      "Object " + objID
    );

    // TODO: Add Object Parameters
    Objects[i].sourceName = Objects[i].ObjectContainer.addStringParameter(
      "Name",
      "Name",
      "Name"
    );

    Objects[i].mute = Objects[i].ObjectContainer.addBoolParameter(
      "Mute",
      "Mute",
      0
    );

    Objects[i].solo = Objects[i].ObjectContainer.addBoolParameter(
      "Solo",
      "Solo",
      0
    );
  }
}

// Object Name
// /source/*/name
// Param: s
// Example: /source/1/name "Name"
function objectName(index, name) {
  local.send("/source/" + index + "/name", name);
}

/*###############################################
 * Groups
 ###############################################*/

// TODO

/*###############################################
 * VCA
 ###############################################*/

// TODO

/*###############################################
 * Snapshot
 ###############################################*/

// Prev Snapshot
// /snapshot/prev
// Param: f
// seconds
// Example: /snapshot/prev 0.0
// optional argument = Fade Time
function previousSnapshot() {
  local.send("/snapshot/prev");
}

// Next Snapshot
// /snapshot/next
// Param: f
// seconds
// Example: /snapshot/next 0.0
// optional argument = Fade Time
function nextSnapshot() {
  local.send("/snapshot/next");
}

// Load Snapshot
// /snapshot/*/load
// Param: f
// seconds
// Example: /snapshot/1/load 0.0
// optional argument = Fade Time
function loadSnapshot(index) {
  local.send("/snapshot/" + index + "/load");
}

/*###############################################
 * Reverb
 ###############################################*/

// Previous Reverb Preset
// /reverb/prev
// Example: /reverb/prev
function previousReverbPreset() {
  local.send("/reverb/prev");
}

// Next Reverb Preset
// /reverb/next
// Example: /reverb/next
function nextReverbPreset() {
  local.send("/reverb/next");
}

// Load Reverb Preset
// /reverb/*/load
// Example: /reverb/1/load
function loadReverbPreset(index) {
  local.send("/reverb/" + index + "/load");
}

// Reverb Level dB
// /reverb/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /reverb/leveldB -6dB
function reverbLevel(val) {
  local.send("/reverb/leveldB", val);
}

// Reverb Mute
// /reverb/mute
// Example: /reverb/mute 1
function reverbMute(val) {
  local.send("/reverb/mute", val);
}

// Reverb Direct Level dB
// /reverb/directleveldB
// Param: f
// Range: -80 - 10dB
// Example: /reverb/directleveldB -6dB
function reverbDirectLevel(val) {
  local.send("/reverb/directleveldB", val);
}

// Reverb Early Level dB
// /reverb/earlyleveldB
// Param: f
// Range: -80 - 10dB
// Example: /reverb/earlyleveldB -6dB
function reverbEarlyLevel(val) {
  local.send("/reverb/earlyleveldB", val);
}

// Reverb Cluster Level dB
// /reverb/clusterleveldB
// Param: f
// Range: -80 - 10dB
// Example: /reverb/clusterleveldB -6dB
function reverbClusterLevel(val) {
  local.send("/reverb/clusterleveldB", val);
}

// Reverb Late Level dB
// /reverb/lateleveldB
// Param: f
// Range: -80 - 10dB
// Example: /reverb/lateleveldB -6dB
function reverbLateLevel(val) {
  local.send("/reverb/lateleveldB", val);
}

/*###############################################
 * Downmix
 ###############################################*/

// Mono Level dB
// /downmix/mono/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /downmix/mono/leveldB -6dB
function downmixMonoLevel(val) {
  local.send("/downmix/mono/leveldB", val);
}

// Mono Mute
// /downmix/mono/mute
// Example: /downmix/mono/mute 1
function downmixMonoMute(val) {
  local.send("/downmix/mono/mute", val);
}

// Stereo Level dB
// /downmix/stereo/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /downmix/stereo/leveldB -6dB
function downmixStereoLevel(val) {
  local.send("/downmix/stereo/leveldB", val);
}

// Stereo Mute
// /downmix/stereo/mute
// Example: /downmix/stereo/mute 1
function downmixStereoMute(val) {
  local.send("/downmix/stereo/mute", val);
}

// Stereo Focus
// /downmix/stereo/focusfrontback
// Param: f
// Range: -1 - 1
// Example: /downmix/stereo/focusfrontback 0
function downmixStereoFocus(val) {
  local.send("/downmix/stereo/focusfrontback", val);
}

// LFE1 Level dB
// /downmix/lfe1/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /downmix/lfe1/leveldB -6dB
function downmixLFE1Level(val) {
  local.send("/downmix/lfe1/leveldB", val);
}

// LFE1 Mute
// /downmix/lfe1/mute
// Example: /downmix/lfe1/mute 1
function downmixLFE1Mute(val) {
  local.send("/downmix/lfe1/mute", val);
}

// LFE2 Level dB
// /downmix/lfe2/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /downmix/lfe2/leveldB -6dB
function downmixLFE2Level(val) {
  local.send("/downmix/lfe2/leveldB", val);
}

// LFE2 Mute
// /downmix/lfe2/mute
// Example: /downmix/lfe2/mute 1
function downmixLFE2Mute(val) {
  local.send("/downmix/lfe2/mute", val);
}

// PFL Level dB
// /downmix/pfl/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /downmix/pfl/leveldB -6dB
function downmixPFLLevel(val) {
  local.send("/downmix/pfl/leveldB", val);
}

// PFL Mute
// /downmix/pfl/mute
// Example: /downmix/pfl/mute 1
function downmixPFLMute(val) {
  local.send("/downmix/pfl/mute", val);
}

// Binaural Level dB
// /downmix/binaural/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /downmix/binaural/leveldB -6dB
function downmixBinauralLevel(val) {
  local.send("/downmix/binaural/leveldB", val);
}

// Binaural Mute
// /downmix/binaural/mute
// Example: /downmix/binaural/mute 1
function downmixBinauralMute(val) {
  local.send("/downmix/binaural/mute", val);
}

/*###############################################
 * Additional
 ###############################################*/

// Master Level dB
// /master/gaindB
// Param: f
// Range: -80 - 10dB
// Example: /master/gaindB -6dB
function masterGain(val) {
  local.send("/master/gaindB", val);
}

// Master Mute
// /master/mute
// Example: /master/mute 1
function masterMute(val) {
  local.send("/master/mute", val);
}

// Global Play
// /global/play
// Example: /global/play 1
function globalPlay(val) {
  local.send("/global/play", val);
}

// BPM
// /global/bpm
// Param: f or int
// Example: /global/bpm 126
// Set SPACE HUB BPM
function bpm(val) {
  local.send("/global/bpm", val);
}

// Global Restart
// /global/restart
// Example: /global/restart
function restartOrbits() {
  local.send("/global/restart");
}
