module.exports = {
  apps: [
    {
      name: "bidan-website-1234",
      script: "npm",
      args: "run start",

      env_development: {
        NODE_ENV: "development",
        PORT: 4321
      },

      env_production: {
        NODE_ENV: "production",
        PORT: 1234
      },
      watch: false
    }
  ]
};

