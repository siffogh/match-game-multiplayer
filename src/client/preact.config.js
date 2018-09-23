import asyncPlugin from "preact-cli-plugin-async";

export default function(config, env, helpers) {
  if (config.devServer) {
    config.devServer.proxy = [
      {
        path: "/socket.io/**",
        target: "http://localhost:3000",
        ws: true
      },
      {
        path: "/api/**",
        target: "http://localhost:3000"
      }
    ];
    config.devServer.quiet = true;
  }
  asyncPlugin(config);
}
