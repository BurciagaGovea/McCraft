// src/functions/drive.js
import { google } from 'googleapis';
import fs from 'fs';

// Construye el objeto de credenciales desde .env
const keys = {
  type:         process.env.GOOGLE_TYPE,
  project_id:   process.env.GOOGLE_PROJECT_ID,
  private_key:  process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  client_id:    process.env.GOOGLE_CLIENT_ID
};

const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    SCOPES
  );
  await client.authorize();
  return client;
}

// export nombrado
export async function uploadImage(file) {
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  const res = await drive.files.create({
    requestBody: {
      name:    file.originalname,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
    },
    media: {
      mimeType: file.mimetype,
      body:     fs.createReadStream(file.path)
    },
    fields: 'id'
  });

  return `https://drive.google.com/uc?id=${res.data.id}`;
}