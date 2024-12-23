const baseConfig = require("./../../karma.conf.js");

module.exports = function (config) {
  // Load the base configuration
  baseConfig(config);

  // Override or add additional settings
  config.set({
    coverageReporter: {
      subdir: "demo",
    },
  });
};
