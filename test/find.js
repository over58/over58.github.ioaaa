const path = require('path');
const locatePath = require('locate-path');

const stop = Symbol('findUp.stop');

async function getFile(name, options = {}){
  let directory = path.resolve(options.cwd || '')
  let {root} = path.parse(directory)
  const paths = [].concat(name);

  const runMatcher = async locateOptions => {
    if (typeof name !== 'function') {
      return locatePath(paths, locateOptions);
    }

    const foundPath = await name(locateOptions.cwd);
    if (typeof foundPath === 'string') {
      return locatePath([foundPath], locateOptions);
    }

    return foundPath;
  };
  while (true) {
    console.log(directory)

    const foundPath = await runMatcher({...options, cwd: directory});

    if (foundPath === stop) {
      return;
    }

    if (foundPath) {
      return path.resolve(directory, foundPath);
    }

    if(directory === root) {
      return
    }
    directory = path.dirname(directory)
  }
}

// getFile()

(async () =>{
  console.log(await locatePath(['file.html','find.js','package.json', 'test'], {cwd: process.cwd(), type: 'directory'}));
})()
