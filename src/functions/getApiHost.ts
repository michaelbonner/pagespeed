"server-only";

export const getApiHost = () => {
  if (process.env.VERCEL_ENV === "production") {
    return "https://pagespeed.bootpack.dev";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
};
