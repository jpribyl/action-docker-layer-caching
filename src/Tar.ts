import { promises as fs } from "fs";
import * as path from "path";

export interface Manifest {
  Config: string;
  RepoTags: string[] | null;
  Layers: string[];
}

export type Manifests = Manifest[];

export async function loadRawManifests(rootPath: string) {
  return (await fs.readFile(path.join(rootPath, `manifest.json`))).toString();
}

export async function loadManifests(path: string) {
  const raw = await loadRawManifests(path);
  const manifests = JSON.parse(raw.toString()) satisfies Manifests;
  return manifests;
}
