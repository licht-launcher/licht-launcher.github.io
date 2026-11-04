<script setup lang="ts">
import { onMounted, ref } from "vue";
import { data } from "./release.data.mts";
import { fetchLatestRelease } from "./releases.mts";

const release = ref(data);

// The build embeds the release that was current at deploy time. If a newer one
// exists, replace it; on any failure the embedded data stays on the page.
onMounted(async () => {
  try {
    release.value = await fetchLatestRelease();
  } catch {
    // Keep the release embedded at build time.
  }
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Your system</th>
        <th>Format</th>
        <th>Download</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="download in release.downloads" :key="download.url">
        <td>{{ download.system }}</td>
        <td><code>{{ download.name }}</code></td>
        <td><a :href="download.url">Download</a></td>
      </tr>
    </tbody>
  </table>
  <p>Latest version: <strong>{{ release.version }}</strong></p>
</template>

<style scoped>
table {
  display: table;
  width: 100%;
}
</style>
