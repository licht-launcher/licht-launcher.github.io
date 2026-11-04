const endpoint = new URL("https://api.github.com/repos/mateusneiva/licht-launcher/releases/latest");
const maxAttempts = 3;

export interface Download {
  system: string;
  name: string;
  url: string;
}

export interface Release {
  version: string;
  downloads: Download[];
}

// Listed in display order; the first rule matching an asset file name wins.
const packages = [
  { pattern: /-windows-x64-setup\.exe$/, system: "Windows (64-bit)", name: ".exe" },
  { pattern: /-windows-x64-portable\.exe$/, system: "Windows (64-bit), portable", name: ".exe" },
  { pattern: /-linux-x64\.AppImage$/, system: "Linux (64-bit), portable", name: ".AppImage" },
  { pattern: /-linux-x64\.deb$/, system: "Debian, Ubuntu and compatible distributions", name: ".deb" },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Validates a GitHub release payload and maps its assets to the download table. */
export function parseRelease(payload: unknown): Release {
  if (!isRecord(payload) || typeof payload.tag_name !== "string" || !Array.isArray(payload.assets)) {
    throw new Error("Cannot read the latest release: unexpected release payload");
  }
  const assets = payload.assets.flatMap((asset: unknown) =>
    isRecord(asset) && typeof asset.name === "string" && typeof asset.browser_download_url === "string"
      ? [{ name: asset.name, url: asset.browser_download_url }]
      : [],
  );
  const downloads = packages.flatMap(({ pattern, system, name }) => {
    const asset = assets.find((candidate) => pattern.test(candidate.name));
    return asset ? [{ system, name, url: asset.url }] : [];
  });
  if (downloads.length === 0) {
    throw new Error("Cannot read the latest release: no downloadable packages");
  }
  return { version: payload.tag_name.replace(/^v/, ""), downloads };
}

interface FetchLatestReleaseOptions {
  fetchRelease?: (url: URL, init: RequestInit) => Promise<Response>;
  wait?: (milliseconds: number) => Promise<void>;
  token?: string;
}

class PermanentError extends Error {}

/** Fetches the latest launcher release, retrying transient failures with a growing delay. */
export async function fetchLatestRelease({
  fetchRelease = fetch,
  wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
  token,
}: FetchLatestReleaseOptions = {}): Promise<Release> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetchRelease(endpoint, { headers, signal: AbortSignal.timeout(30_000) });
      if (!response.ok) {
        const message = `Cannot read the latest release: HTTP ${response.status}`;
        if (response.status < 500 && response.status !== 429) throw new PermanentError(message);
        throw new Error(message);
      }
      return parseRelease(await response.json());
    } catch (error) {
      if (error instanceof PermanentError || attempt === maxAttempts) throw error;
      await wait(1000 * 2 ** (attempt - 1));
    }
  }
}
