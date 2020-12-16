# DEVELOPING FOR MAFIA IN JS

Hey all. This is a brief explainer on how to get to a usable JS development environment for KOLMafia. Ideally, this will cover everything you need to make a sample JavaScript mafia script. This was written by a JS novice, so hopefully it properly enumerates everything you need to do to get an environment up and running!

- **STEP 1:** Download Node.js / NPM. This will allow you to install babel/webpack and set up a compiler. To download, visit [the latest node.js build](https://nodejs.org/en/). (You can also use homebrew or any other package manager, depending on your preferences, but I don't really want to go into homebrew etc right now.)
- **STEP 2:** Once this is downloaded, you want to install babel & webpack. These are used to transpile TypeScript code (which is easy to read and easy to script) into classic JavaScript (which is a mess, and painful to interface with). Mafia can only read classic JS, so this is a necessary step to make clean and fun JS code. To install, you will run the following in your command line to install the primary babel dependencies: `npm install --save-dev @babel/core @babel/preset-env`
- **STEP 3:** Now you will install the babel core, which is a necessary dependency. Run the following command: `npm install --save-dev @babel/core`
- **STEP 4:** Now you will install the babel loader, which is a necessary dependency. Run the following command: `npm install --save-dev babel-loader`
- **STEP 5:** Now you will install the webpack module, which packs it all together. Run the following command: `npm install --save-dev webpack`
- **STEP 6:** Let's set up a sample repository. You can do that using this starter repository right here! I would recommend starting by forking the repository, which you can do up top using the "fork" button. Once you have forked this repository, clone it to your machine with `git clone` & the .git URL that is accessible via the green 'CODE' button above the file tree in the GitHub page you'll see before you.
- **STEP 7:** You should now have a copy of this repository on your machine, with a package.json file you can use to help ensure your dependencies are installed. Run `npm install` while in your new directory to ensure your local copy of npm has correctly installed necessary dependencies, like the Loathing Scripting Society's JS toolkit (LIBRAM). 
- **STEP 7:** Let's modify the code a little bit. At build, all this code does is change your clan; let's add a print statement. Modify "main.ts" to include the following:
```js
export function breakfast() {
  setClan('Bonus Adventures from Hell');
}

export function main() {
  breakfast();
  print("Hey, you ran a script! Cool!");
}
```
- **STEP 8:** Now, let's update package.json; run `npm init` to revamp the package.json file to reflect whatever you want your script to be named. The "name" will propagate down into the final build. 
- **STEP 9:** Let's build your code! Run `npm run build` to build out a new output main.js file.
- **STEP 10:** If you move that main.js file into your mafia folder, you will have a script you can call by just typing `main.js` into the GCLI. Congrats! You've made a thing!