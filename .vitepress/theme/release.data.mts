import { fetchLatestRelease, type Release } from "./releases.mts";

declare const data: Release;
export { data };

export default {
  load: (): Promise<Release> => fetchLatestRelease({ token: process.env.GITHUB_TOKEN }),
};
