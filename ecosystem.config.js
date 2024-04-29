module.exports = {
  apps: [
    {
      name: "Personal Website",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_interpreter: "node",
    },
  ],
};