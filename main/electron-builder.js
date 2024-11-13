require("dotenv").config();

module.exports = {
  appId: "com.example.minimalapp",
  productName: "MinimalElectronApp",
  directories: {
    output: "dist",
  },
  publish: {
    provider: "s3",
    bucket: process.env.BUCKET_NAME,
    endpoint: process.env.BUCKET_ENDPOINT,
    region: process.env.BUCKET_REGION,
  },
};
