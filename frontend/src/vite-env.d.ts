/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_TWITTER_URL?: string;
  readonly VITE_GOOGLE_DRIVE_FOLDER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
