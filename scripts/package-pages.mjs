import { mkdirSync, cpSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const root='docs/.vitepress/dist';
mkdirSync(path.join(root,'demo'),{recursive:true});
cpSync('apps/web/dist',path.join(root,'demo'),{recursive:true,force:true});
writeFileSync(path.join(root,'.nojekyll'),'');
console.log('Packaged public VitePress site + React/Three.js demo. Deployment remains manual.');
