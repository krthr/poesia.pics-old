import admin from "firebase-admin";

const runtimeConfig = useRuntimeConfig();

export const app = admin.initializeApp({
  credential: admin.credential.cert(
    runtimeConfig.googleApplicationCredentialsJson
  ),
});

export const firestore = app.firestore();
export const storage = app.storage();

export const poemsCollection = firestore.collection("poems");
export const picsBucket = storage.bucket("gs://poesia.pics");
