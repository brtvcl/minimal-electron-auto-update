require("dotenv").config();

module.exports = {
  appId: "com.example.minimalapp",
  productName: "MinimalElectronApp",
  directories: {
    output: "dist",
  },
  publish: {
    provider: "s3",
    bucket: "electron",
    endpoint: "http://localhost:9000",
    region: "us-east-1",
  },
};
