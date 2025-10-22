import upload from "./multerPng.middleware.config.js";

export const signatureUploadMiddleware = upload.fields([
    { name: 'signature', maxCount: 1 },
    { name: 'contract', maxCount: 1 },
])