/*
 node checksum.js
 node checksum.js verify
 -----------------------
 calculates a checksum of all the files being tracked by git except the
 file the checksum is stored into. if the verify command is provided,
 this will exit with status 1 if the checksum on disk doesnt exist or
 doesnt match the current checksum. the purpose of this file is to
 verify a build was completed just before pushing to github. this is
 important because we can't build on the t2.micro since its too weak.
 this is a way to ensure we didn't forget to build. obviously, calculate
 the checksum right after building, then commit immediately.
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const exec = require('child_process').execSync;
const indexFile = path.join(__dirname, '.git', 'index');
const hashFile = path.join(__dirname, 'checksum');

const calcHash = () => {
  const tempIndexFile = path.join(os.tmpdir(), Date.now() + 'xyz');
  const execOpts = {
    cwd: __dirname,
    env: {
      GIT_INDEX_FILE: tempIndexFile,
    },
  };

  if (!fs.existsSync(indexFile)) {
    return undefined;
  }

  fs.copyFileSync(indexFile, tempIndexFile);

  exec('git add .', execOpts);

  if (fs.existsSync(hashFile)) {
    exec(`git rm --cached ${hashFile}`, execOpts);
  }

  const hash = exec('git write-tree', execOpts).toString().trim();
  fs.unlinkSync(tempIndexFile);
  return hash;
};

// returns true if hash exists and equals current hash.
const checkHash = () => {
  try {
    const prev = fs.readFileSync(hashFile).toString();
    return prev && (prev === calcHash());
  } catch (e) {
    return false;
  }
};

if (process.argv[process.argv.length - 1] === 'verify') {
  if (!checkHash()) {
    console.error('verify checksum failed! you probably didnt build ' +
        'immediately before a git push.');
    process.exit(1);
  }
} else {
  const hash = calcHash();
  if (!hash) {
    console.error('couldnt calculate checksum for this repo! perhaps this ' +
        'isnt a git repo. have you performed a git add?');
    process.exit(1);
  }
  console.log('determined checksum of this repo. you should ' +
      'commit/push before you edit any other files!');
  fs.writeFileSync(hashFile, hash);
}