# DEVELOPING FOR MAFIA IN JS

Hey all. This is a brief explainer on how to get to a usable JS development environment for KoLMafia. Ideally, this will cover everything you need to make a sample JavaScript mafia script. This was written by a JS novice, so hopefully it properly enumerates everything you need to do to get an environment up and running!

## PART ONE - BABY'S FIRST TS COMPILATION

- **STEP 1:** Download Node.js / NPM. This will allow you to install babel/webpack and set up a compiler. To download, visit [the latest node.js build](https://nodejs.org/en/). Then install the package manager, `yarn`, by opening a [terminal](https://www.ionos.com/help/email/troubleshooting-mail-basicmail-business/access-the-command-prompt-or-terminal/) and typing: `npm install -g yarn`. Think of this like immediately installing Chrome or Firefox on a new computer instead of using Internet Explorer.
- **STEP 2:** Let's set up a sample repository. You can do that using this starter repository right here! To do so, use the terminal to navigate to where you want the repo saved, and call `git clone https://github.com/docrostov/kol-ts-starter` 
  - *NOTE:* if this command does not work, you probably do not have Git installed on your computer, and will also need to install Git. Please find information on how to do that [here](https://github.com/git-guides/install-git).
  - *NOTE 2:* just doing a straight `git clone` like this is not recommended in a development context. Please follow the excellent [KoL Scripting Resources Guide](https://loathing-associates-scripting-society.github.io/KoL-Scripting-Resources/PR-Overview.html) which covers stuff like forking and pull requests.
- **STEP 3:** Run `yarn install` while inside your new directory to install the necessary dependencies, like the Loathing Scripting Society's JS toolkit (LIBRAM) & other KoLMafia JS toolkits. You will need to do this for every project you have, `yarn` essentially creates an isolated virtual environment for you to work in. This is rather convenient, as you get to avoid version conflicts between your packages!
- **STEP 4:** Let's build the code! Run `yarn run build`, and you'll see that your folder now has a folder called KoLMafia in it, which in turn has a scripts subfolder. This should look familiar, as that's how the KoLMafia directory is structured. The scripts folder has a kol-js-starter subfolder, and there you'll find a `main-script-name.js` file. Copy it into the scripts directory of your KoLMafia installation.
- **STEP 5:** From the KoLMafia GCLI, run `main-script-name.js` -- this should generate your MP statement. Congrats, you did the thing!

## PART TWO - DIPPING TOES INTO MORE COMPLEX MATTER

- Since you've successfully gotten the code to compile, now we can mess around with some stuff. It is recommended you use [VSCode](https://code.visualstudio.com/download) for editing due to its excellent TypeScript support. Once you install VSCode, open it and select the folder with the repository in it. You can also open a terminal within VSCode to save clicks by pressing `ctrl+shift+\`. For extra credit, you can install some very helpful VS Code extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). If you install the latter, your code will auto-format on save!
- A helpful command within `yarn` is `yarn init`. This is useful for changing details about the package without needing to manually muck around `packages.json` and hoping you changed everything correctly. Call `yarn init` now, and provide a cool name for your package (without any spaces). You will be then asked further questions like what version of the package this is, a description of said package and so on. You can skip any you don't feel like answering by pressing enter.
- Rather than be stuck running `yarn run build` every time you make an edit, you can instead call `yarn watch` before you begin working on your code. This process will keep running, and automatically build your code for you whenever you save your file. Convenient!
- Let's modify the code a little bit. The TS code that created the JS file you just ran lives in `src/main.ts` within the repository. At build, all this code does is tell you how much MP you have relative to the number 200; let's change the print statement to add your name in here. Modify `main.ts` to include the following, changing ``"[NAME]"`` to your name.:

```js
import { myMp, print } from "kolmafia";

export function checkMP(): string {
  if (myMp() < 200) {
    return "Your MP is less than 200, buddy.";
  } else {
    return "Your MP is greater than or equal to 200. Congratulations, [NAME]";
  }
}

export function main(): void {
  print(checkMP());
}
```
- Rather than manually copying the files every time you build your package, you can create a symlink that will let KoLMafia see the files in your repository folder. Keep in mind that you cannot do `./` completion with symlinks; you need to explicitly list out the entire file path. My symlink command on Mac OS was the following: `ln -s "$PWD/KoLmafia/scripts/PACKAGE_NAME ~/Library/Application\ Support/KoLmafia/scripts/` -- Windows and Linux users may need a different approach.
- Once you make the symlink, you can call `PACKAGE_NAME/main-script-name.js` from the KoLMafia GCLI. Neat!