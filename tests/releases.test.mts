import assert from "node:assert/strict";
import test from "node:test";
import { fetchLatestRelease, parseRelease } from "../.vitepress/theme/releases.mts";

const base = "https://github.com/mateusneiva/licht-launcher/releases/download/v0.2.3/";
const names = [
  "latest.json",
  "Licht-Launcher-0.2.3-Iris-linux-x64-portable",
  "Licht-Launcher-0.2.3-Iris-linux-x64.AppImage",
  "Licht-Launcher-0.2.3-Iris-linux-x64.AppImage.sig",
  "Licht-Launcher-0.2.3-Iris-linux-x64.deb",
  "Licht-Launcher-0.2.3-Iris-windows-x64-portable.exe",
  "Licht-Launcher-0.2.3-Iris-windows-x64-setup.exe",
  "Licht-Launcher-0.2.3-Iris-windows-x64-setup.exe.sig",
];
const payload = {
  tag_name: "v0.2.3",
  assets: names.map((name) => ({ name, browser_download_url: `${base}${name}` })),
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status });
const noWait = async () => {};

test("lists the packages ordered by system, ignoring signatures and the update manifest", () => {
  const release = parseRelease(payload);
  assert.equal(release.version, "0.2.3");
  assert.deepEqual(release.downloads.map(({ system, name, url }) => [system, name, url]), [
    ["Windows (64-bit)", ".exe", `${base}Licht-Launcher-0.2.3-Iris-windows-x64-setup.exe`],
    ["Windows (64-bit), portable", ".exe", `${base}Licht-Launcher-0.2.3-Iris-windows-x64-portable.exe`],
    ["Linux (64-bit), portable", ".AppImage", `${base}Licht-Launcher-0.2.3-Iris-linux-x64.AppImage`],
    ["Debian, Ubuntu and compatible distributions", ".deb", `${base}Licht-Launcher-0.2.3-Iris-linux-x64.deb`],
  ]);
});

test("skips packages missing from a release instead of failing", () => {
  const release = parseRelease({ ...payload, assets: payload.assets.filter(({ name }) => name.endsWith(".deb")) });
  assert.deepEqual(release.downloads.map(({ name }) => name), [".deb"]);
});

test("rejects a release with no recognised package", () => {
  assert.throws(() => parseRelease({ tag_name: "v1.0.0", assets: [] }), /no downloadable packages/);
});

test("rejects an unexpected payload", () => {
  assert.throws(() => parseRelease({ assets: [] }), /unexpected release payload/);
  assert.throws(() => parseRelease("<html>"), /unexpected release payload/);
});

test("requests the latest release of the launcher, sending the token when given", async () => {
  const requests: Array<{ url: string; authorization: string | null }> = [];
  const fetchRelease = async (url: URL, init: RequestInit) => {
    requests.push({ url: url.href, authorization: new Headers(init.headers).get("authorization") });
    return json(payload);
  };
  await fetchLatestRelease({ fetchRelease, wait: noWait, token: "secret" });
  await fetchLatestRelease({ fetchRelease, wait: noWait });
  assert.deepEqual(requests, [
    { url: "https://api.github.com/repos/mateusneiva/licht-launcher/releases/latest", authorization: "Bearer secret" },
    { url: "https://api.github.com/repos/mateusneiva/licht-launcher/releases/latest", authorization: null },
  ]);
});

test("retries after a transient failure and then succeeds", async () => {
  const outcomes = [() => new Response("", { status: 503 }), () => { throw new Error("Network unavailable"); }, () => json(payload)];
  let calls = 0;
  const release = await fetchLatestRelease({ fetchRelease: async () => outcomes[calls++](), wait: noWait });
  assert.equal(calls, 3);
  assert.equal(release.version, "0.2.3");
});

test("gives up after three attempts with the last error", async () => {
  let calls = 0;
  await assert.rejects(fetchLatestRelease({
    fetchRelease: async () => { calls++; return new Response("", { status: 502 }); },
    wait: noWait,
  }), /HTTP 502/);
  assert.equal(calls, 3);
});

test("does not retry a permanent failure", async () => {
  let calls = 0;
  await assert.rejects(fetchLatestRelease({
    fetchRelease: async () => { calls++; return new Response("", { status: 404 }); },
    wait: noWait,
  }), /HTTP 404/);
  assert.equal(calls, 1);
});
