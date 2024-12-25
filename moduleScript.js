function init() {
  script.log("Custom module init");
}


function moduleParameterChanged(param) {
  script.log(param.name + " parameter changed, new value: " + param.get());
}

function moduleValueChanged(value) {
  script.log(value.name + " value changed, new value: " + value.get());
}

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

// Master Level dB
// /master/gaindB
// Param: f
// Range: -80 - 0dB
// Example: /master/gaindB -6dB
function masterGain(val) {
  local.send("/master/gaindB", val);
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