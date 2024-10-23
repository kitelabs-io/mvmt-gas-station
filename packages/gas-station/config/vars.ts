const { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET } = process.env

export const enableLoginWithEmail = false
export const enableLoginWithGitHub = true
export const enableLoginWithGoogle = !!AUTH_GOOGLE_ID && !!AUTH_GOOGLE_SECRET
