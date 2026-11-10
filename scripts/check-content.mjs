// scripts/check-content.mjs
// Công cụ cho người phát triển (không bắt buộc để chạy site). Dùng: node scripts/check-content.mjs
// Duyệt js/content/*.js, in mọi mục có status 'pending' hoặc 'proposed'.
// Thoát mã 1 nếu còn 'pending' (chặn build production, docs/CONTENT.md mục 3).
import { readdirSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'js', 'content');
const sandbox = { window: {} };
sandbox.window.window = sandbox.window;
vm.createContext(sandbox);

// brand.js phải nạp trước home.js (home.js đọc brand.culturalGroups).
const files = readdirSync(root).filter((f) => f.endsWith('.js')).sort((a, b) => (a === 'brand.js' ? -1 : b === 'brand.js' ? 1 : a.localeCompare(b)));
for (const f of files) vm.runInContext(readFileSync(join(root, f), 'utf8'), sandbox, { filename: f });

const found = { pending: [], proposed: [] };
(function walk(node, path) {
  if (!node || typeof node !== 'object') return;
  if (node.status === 'pending' || node.status === 'proposed') found[node.status].push(path + (node.decision ? ` (${node.decision})` : ''));
  for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k);
})(sandbox.window.LL.content, 'content');

for (const s of ['pending', 'proposed']) {
  console.log(`\n${s.toUpperCase()}: ${found[s].length}`);
  found[s].forEach((p) => console.log('  ' + p));
}
process.exit(found.pending.length ? 1 : 0);
