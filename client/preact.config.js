import asyncPlugin from 'preact-cli-plugin-async';

export default function (config, env, helpers) {
	// let { index } = helpers.getPluginsByName(config, 'UglifyJsPlugin')[0] || {};
  // typeof index !== 'undefined' && config.plugins.splice(index, 1);
  asyncPlugin(config);
}