# Electron Minimal Demo with Electron Builder

This repository demonstrates a minimal Electron application setup using electron-builder for packaging and publishing. The app supports auto-updating via electron-updater, with published releases hosted on an S3 bucket.

## Features

- Electron: Cross-platform desktop application development.
- electron-builder: Builds and packages the Electron app.
- electron-updater: Enables automatic download and updates from S3.
- AWS S3 Publishing: Configured to publish app releases to an S3 bucket for distribution.

## Setup

1. Clone the Repository

   ```bash
   git clone https://github.com/brtvcl/minimal-electron-auto-update
   cd minimal-electron-auto-update
   ```

2. Install Dependencies

   ```
   npm install
   ```

3. Setup Publishing

   3.1. Setup an S3 Bucket

   You can setup a real bucket with public read access from AWS if you want. Or for a quick test you can a have local s3 with minio. [Learn more about minio](https://min.io/)

   Run it with docker:

   ```
   docker run -p 9000:9000 -p 9001:9001 --name minio \
   -e "MINIO_ROOT_USER=minioadmin" \
   -e "MINIO_ROOT_PASSWORD=minioadmin" \
   -v /path/to/data:/data \
   minio/minio server /data --console-address ":9001"
   ```

   > And then go to minio dashboard create access key and create a bucket with public read access.

   3.2. Configure Environment Variables

   Create a .env file in the project root with the following AWS S3 credentials:

   ```
   AWS_ACCESS_KEY_ID=<your-access-key-id>
   AWS_SECRET_ACCESS_KEY=<your-secret-access-key>
   BUCKET_NAME=<your-bucket-name>
   BUCKET_ENDPOINT=<your-bucket-endpoint> # http://localhost:9000 if you are using minio
   BUCKET_REGION=<your-bucket-region> # us-east-1 if you are using minio
   ```

   > Note: Replace keys with your actual AWS credentials.

## Scripts

- **Start the App**

  Launch the app in development mode:

  ```
  npm run start
  ```

- **Build the app for distribution:**

  ```
  npm run build
  ```

- **Build and publish the app to the configured S3 bucket:**
  ```
  npm run publish
  ```
  Note: Ensure your .env file is correctly configured with your S3 credentials before running this command.

## Auto-Update

The app uses electron-updater to enable automatic updates from the S3 bucket. When a new release is published to the S3 bucket, the app will automatically download and install the update on the user's system.

To verify that the app can detect and apply updates from the S3 bucket, follow these steps:

1. **Set Initial Version**

   Open the package.json file and set the "version" field to 1.0.0.

2. **Build and Publish Version 1.0.0**

   Run the following commands to build and publish version 1.0.0 to your S3 bucket:

   ```
   npm run build
   npm run publish
   ```

3. **Install Version 1.0.0 Locally**

   Go to the dist directory where the built files are located and install version 1.0.0 on your computer.

4. **Prepare a New Version**

   Update the package.json version to a new version (e.g., 2.0.0) to simulate an update.

5. **Build and Publish Version 2.0.0**

   Run the build and publish commands again to publish version 2.0.0 to the S3 bucket:

   ```
   npm run build
   npm run publish
   ```

   > Note: Do not install version 2.0.0 on your computer; let it remain only in the S3 bucket.

6. **Launch the Installed Version 1.0.0**

   Open the installed app (version 1.0.0) on your computer. After a moment, a notification should appear, indicating that a new version (2.0.0) is available. This confirms that the auto-update feature is working, as the app detects and prompts to download the latest version from the S3 bucket.
