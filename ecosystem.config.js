module.exports = {
  apps: [
    {
      name: "Personal Website",
      exec_mode: "cluster",
      instances: 1,
      script: "node_modules/next/dist/bin/next",
    },
  ],
};
