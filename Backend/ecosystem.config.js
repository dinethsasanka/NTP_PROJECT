module.exports = {
  apps: [
    {
      name: "crowd-backend",
      script: "server.js",
      watch: false, // set to true only for development
      env: {
        NODE_ENV: "production",
        PORT: 4000,
        MONGO_URI: "mongodb://localhost:27017/crowd_db", // change if using Atlas
        DEDUPE_WINDOW_SECONDS: 60,
        ALERT_THRESHOLD: 50,
        INGEST_API_KEY: "change_this_to_a_secret"
      },
      instances: 1,       // or "max" for cluster mode
      autorestart: true,
      max_memory_restart: "300M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      time: true
    }
  ]
};
