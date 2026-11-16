import { execFileSync } from 'node:child_process';
import { chmodSync } from 'node:fs';
const [, , action, raw] = process.argv;
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const fail=(message)=>{console.error(message);process.exit(1)};
if(action==='hooks'){
  chmodSync('.githooks/post-merge',0o755);
  git('config','core.hooksPath','.githooks');
  console.log('Installed local Git hooks path. No remote hooks or GitHub Actions enabled.');
}else if(['feature','fix','release'].includes(action)){
  if(!raw || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(raw)) fail('Supply one safe branch slug or release version.');
  if(git('status','--porcelain')) fail('Working tree is not clean: stash or commit changes yourself first.');
  const current=git('branch','--show-current');
  if(current!=='main') fail('Switch to a clean local main branch before creating a new branch.');
  const branch=`${action}/${raw}`;
  git('switch','-c',branch);
  console.log(`Created local branch ${branch}. No push/commit/merge performed.`);
}else if(action==='tag'){
  if(!raw || !/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/.test(raw)) fail('Supply a semantic version, e.g. 0.2.0');
  if(git('status','--porcelain')) fail('Commit your changes yourself before tagging.');
  if(git('branch','--show-current')!=='main') fail('Tag releases from main.');
  git('tag',`v${raw}`);
  console.log(`Created local tag v${raw}. Push tags explicitly when ready.`);
}else fail('Supported: feature <slug>, fix <slug>, release <semver>, tag <semver>, hooks');
