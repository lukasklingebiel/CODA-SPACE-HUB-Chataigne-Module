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
  var idx = container.getChild("ObjectID").get();
  script.log("Val: " + valName + " value changed, new value: " + value.get() + "; Object ID: " + idx);

  if (valName == "name") {
    objectName(idx, value.get());
  }
  else if (valName == "mute") {
    objectMute(idx, value.get());
  }
  else if (valName == "solo") {
    objectSolo(idx, value.get());
  }
  else if (valName == "spread") {
    objectSpread(idx, value.get());
  }
  else if (valName == "knnK") {
    objectKNN(idx, value.get());
  }
  else if (valName == "lfe1Send") {
    objectLFE1Send(idx, value.get());
  }
  else if (valName == "lfe2Send") {
    objectLFE2Send(idx, value.get());
  }
  else if (valName == "polarityInvert") {
    objectPolarityInvert(idx, value.get());
  }
  else if (valName == "levelDB") {
    objectLevel(idx, value.get());
  }
  else if (valName == "randomPlay") {
    objectRandomPlay(idx, value.get());
  }
  else if (valName == "orbitPlay") {
    objectOrbitPlay(idx, value.get());
  }
  else {
    script.log("Unknown value: " + valName);
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
    Objects[i].ObjectContainer.setCollapsed(true);

    // TODO: Hide Object ID
    Objects[i].objID = Objects[i].ObjectContainer.addIntParameter("Object ID", "Object ID", objID);
    Objects[i].objID.setAttribute("readOnly", true);

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

    Objects[i].spread = Objects[i].ObjectContainer.addFloatParameter(
      "Spread",
      "Spread",
      0.0,
      0.0,
      100.0
    );

    Objects[i].kNeighbours = Objects[i].ObjectContainer.addIntParameter(
      "KNN K",
      "KNN K",
      2,
      0,
      128
    );

    Objects[i].lfe1Send = Objects[i].ObjectContainer.addFloatParameter(
      "LFE1 Send",
      "LFE1 Send",
      -80.0,
      -80.0,
      10.0
    );

    Objects[i].lfe2Send = Objects[i].ObjectContainer.addFloatParameter(
      "LFE2 Send",
      "LFE2 Send",
      -80.0,
      -80.0,
      10.0
    );

    Objects[i].polarityInvert = Objects[i].ObjectContainer.addBoolParameter(
      "Polarity Invert",
      "Polarity Invert",
      0
    );

    Objects[i].leveldB = Objects[i].ObjectContainer.addFloatParameter(
      "Level dB",
      "Level dB",
      0.0,
      -80.0,
      10.0
    );

    Objects[i].randomPlay = Objects[i].ObjectContainer.addBoolParameter(
      "Random Play",
      "Random Play",
      0
    );

    Objects[i].orbitPlay = Objects[i].ObjectContainer.addBoolParameter(
      "Orbit Play",
      "Orbit Play",
      0
    );
  }
}

// Object Azimuth
// /source/*/azim
// Param: f
// Range: -180 - 180°
// Example: /source/1/azim 45°
function objectAzimuth(index, val) {
  local.send("/source/" + index + "/azim", val);
}

// Object Elevation
// /source/*/elev
// Param: f
// Range: -90 - 90°
// Example: /source/1/elev 30°
function objectElevation(index, val) {
  local.send("/source/" + index + "/elev", val);
}

// Object Distance
// /source/*/dist
// Param: f
// Range: 0 - 100% scaled by Max Distance
// Example: /source/1/dist 50%
function objectDistance(index, val) {
  local.send("/source/" + index + "/dist", val);
}

// Object Name
// /source/*/name
// Param: s
// Example: /source/1/name "Name"
function objectName(index, name) {
  local.send("/source/" + index + "/name", name);
}

// Object Mute
// /source/*/mute
// Example: /source/1/mute 1
function objectMute(index, val) {
  local.send("/source/" + index + "/mute", val);
}

// Object Solo
// /source/*/solo
// Example: /source/1/solo 1
function objectSolo(index, val) {
  local.send("/source/" + index + "/solo", val);
}

// Object Spread
// /source/*/spread
// Param: f
// Range: 0 - 100
// Example: /source/1/spread 50
function objectSpread(index, val) {
  local.send("/source/" + index + "/spread", val);
}

// Object KNN K
// /source/*/kneighbours
// Param: i
// Example: /source/1/kneighbours 4
function objectKNN(index, val) {
  local.send("/source/" + index + "/kneighbours", val);
}

// Object LFE1 Send
// /source/*/lfe1
// Param: f
// Range: -80 - 10dB
// Example: /source/1/lfe1 -6dB
function objectLFE1Send(index, val) {
  local.send("/source/" + index + "/lfe1", val);
}

// Object LFE2 Send
// /source/*/lfe2
// Param: f
// Range: -80 - 10dB
// Example: /source/1/lfe2 -6dB
function objectLFE2Send(index, val) {
  local.send("/source/" + index + "/lfe2", val);
}

// Object Polarity Invert
// /source/*/invertphase
// Example: /source/1/invertphase 1
function objectPolarityInvert(index, val) {
  local.send("/source/" + index + "/invertphase", val);
}

// Object Level dB
// /source/*/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /source/1/leveldB -6dB
function objectLevel(index, val) {
  local.send("/source/" + index + "/leveldB", val);
}

// Object Random Play
// /source/*/random/play
// Example: /source/1/random/play 1
function objectRandomPlay(index, val) {
  local.send("/source/" + index + "/random/play", val);
}

// Object Orbit Play
// /source/*/orbit/play
// Example: /source/1/orbit/play 1
function objectOrbitPlay(index, val) {
  local.send("/source/" + index + "/orbit/play", val);
}

// Object Orbit Restart
// /source/*/orbit/restart
// Example: /source/1/orbit/restart
function objectOrbitRestart(index) {
  local.send("/source/" + index + "/orbit/restart");
}


/*###############################################
 * Groups
 ###############################################*/

// Group Azimuth
// /group/*/azim
// Param: f
// Range: -180 - 180°
// Example: /group/1/azim 45°
function groupAzimuth(index, val) {
  local.send("/group/" + index + "/azim", val);
}

// Group Elevation
// /group/*/elev
// Param: f
// Range: -90 - 90°
// Example: /group/1/elev 30°
function groupElevation(index, val) {
  local.send("/group/" + index + "/elev", val);
}

// Group Distance
// /group/*/dist
// Param: f
// Range: 0 - 100% scaled by Max Distance
// Example: /group/1/dist 50%
function groupDistance(index, val) {
  local.send("/group/" + index + "/dist", val);
}

// Group Spread
// /group/*/spread
// Param: f
// Range: 0 - 100%
// Example: /group/1/spread 50%
function groupSpread(index, val) {
  local.send("/group/" + index + "/spread", val);
}

// Group LFE1 Send
// /group/*/lfe1
// Param: f
// Range: -80 - 10dB
// Example: /group/1/lfe1 -6dB
function groupLFE1Send(index, val) {
  local.send("/group/" + index + "/lfe1", val);
}

// Group LFE2 Send
// /group/*/lfe2
// Param: f
// Range: -80 - 10dB
// Example: /group/1/lfe2 -6dB
function groupLFE2Send(index, val) {
  local.send("/group/" + index + "/lfe2", val);
}

// Group Solo
// /group/*/solo
// Example: /group/1/solo 1
function groupSolo(index, val) {
  local.send("/group/" + index + "/solo", val);
}

// Group Mute
// /group/*/mute
// Example: /group/1/mute 1
function groupMute(index, val) {
  local.send("/group/" + index + "/mute", val);
}

/*###############################################
 * VCA
 ###############################################*/

// VCA Level dB
// /vca/*/leveldB
// Param: f
// Range: -80 - 10dB
// Example: /vca/1/leveldB -6dB
function vcaLevel(index, val) {
  local.send("/vca/" + index + "/leveldB", val);
}

// VCA Mute
// /vca/*/mute
// Example: /vca/1/mute 1
function vcaMute(index, val) {
  local.send("/vca/" + index + "/mute", val);
}

// VCA Name
// /vca/*/name
// Param: s
// Example: /vca/1/name "Name"
function vcaName(index, name) {
  local.send("/vca/" + index + "/name", name);
}

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

// TODO: Reverb Parameters

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

// Binaural LowBoost
// /downmix/binaural/lowboost
// Param: f
// Range: -12 - 12dB
// Example: /downmix/binaural/lowboost 0dB
function downmixBinauralLowBoost(val) {
  local.send("/downmix/binaural/lowboost", val);
}

// Binaural HFShelf
// /downmix/binaural/hfshelf
// Param: f
// Range: -12 - 12dB
// Example: /downmix/binaural/hfshelf 0dB
function downmixBinauralHFShelf(val) {
  local.send("/downmix/binaural/hfshelf", val);
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
