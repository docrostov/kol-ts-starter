# DEVELOPING FOR MAFIA IN TYPESCRIPT (TS)

Hey all. This is a brief explainer on how to get to a usable TS development environment for KoLMafia. Ideally, this will cover everything you need to make a sample JavaScript mafia script. This was written by a TS novice, so hopefully it properly enumerates everything you need to do to get an environment up and running!

## PART ONE - BABY'S FIRST TS COMPILATION

- **STEP 1:** Download Node.js / NPM. This will allow you to install babel/webpack and set up a compiler. To download, visit [the latest node.js build](https://nodejs.org/en/). Then install the package manager, `yarn`, by opening a [terminal](https://www.ionos.com/help/email/troubleshooting-mail-basicmail-business/access-the-command-prompt-or-terminal/) and typing: `npm install -g yarn`. Think of this like immediately installing Chrome or Firefox on a new computer instead of using Internet Explorer.
- **STEP 2:** Let's set up a sample repository. You can do that using this starter repository right here! To do so, use the terminal to navigate to where you want the repo saved, and call `git clone https://github.com/docrostov/kol-ts-starter`
  - _NOTE:_ if this command does not work, you probably do not have Git installed on your computer, and will also need to install Git. Please find information on how to do that [here](https://github.com/git-guides/install-git).
  - _NOTE 2:_ just doing a straight `git clone` like this is not recommended in a development context. Please follow the excellent [KoL Scripting Resources Guide](https://loathing-associates-scripting-society.github.io/KoL-Scripting-Resources/PR-Overview.html) which covers stuff like forking and pull requests.
- **STEP 3:** Run `yarn install` while inside your new directory to install the necessary dependencies, like the Loathing Scripting Society's TS toolkit (LIBRAM) & other KoLMafia TS/JS toolkits. You will need to do this for every project you have, `yarn` essentially creates an isolated virtual environment for you to work in. This is rather convenient, as you get to avoid version conflicts between your packages!
  - _NOTE:_ It is highly recommended to run `yarn upgrade kolmafia@latest`, `yarn upgrade libram@latest`, and `yarn upgrade eslint-plugin-libram@latest` after running `yarn install`. This is due to the fact that all three of these tools are upgraded very frequently, and this kol-ts-starter repo is not updated quite as frequently, so the "default" version may be a bit backdated from the most recent version of each package. After running these upgrade commands, if you are coding in VSCode, press `Ctrl+Shift+P` and then reload your window (the first option that pops up) to make sure the upgraded packages have been applied.
- **STEP 4:** Let's build the code! Run `yarn run build`, and you'll see that your folder now has a folder called KoLMafia in it, which in turn has a scripts subfolder. This should look familiar, as that's how the KoLMafia directory is structured. The scripts folder has a kol-ts-starter subfolder, and there you'll find a `main-script-name.js` file. Copy it into the scripts directory of your KoLMafia installation.
- **STEP 5:** From the KoLMafia GCLI, run `main-script-name.js` -- this should generate your MP statement. Congrats, you did the thing!

## PART TWO - DIPPING TOES INTO MORE COMPLEX MATTER

- Since you've successfully gotten the code to compile, now we can mess around with some stuff. It is recommended you use [VSCode](https://code.visualstudio.com/download) for editing due to its excellent TypeScript support. Once you install VSCode, open it and select the folder with the repository in it. You can also open a terminal within VSCode to save clicks by pressing `ctrl+shift+\`. For extra credit, you can install some very helpful VS Code extensions: [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode). If you install the latter, your code will auto-format on save!
- A helpful command within `yarn` is `yarn init`. This is useful for changing details about the package without needing to manually muck around `packages.json` and hoping you changed everything correctly. Call `yarn init` now, and provide a cool name for your package (without any spaces). You will be then asked further questions like what version of the package this is, a description of said package and so on. You can skip any you don't feel like answering by pressing enter.
- Rather than be stuck running `yarn run build` every time you make an edit, you can instead call `yarn watch` before you begin working on your code. This process will keep running, and automatically build your code for you whenever you save your file. Convenient!
- Let's modify the code a little bit. The TS code that created the JS file you just ran lives in `src/main.ts` within the repository. At build, all this code does is tell you how much MP you have relative to the number 200; let's change the print statement to add your name in here. Modify `main.ts` to include the following, changing `"[NAME]"` to your name.:

```ts
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

## PART THREE - WHAT ARE ALL THESE FILES FOR

__package.json__

The `package.json` file contains:
1. Metadata about your project
2. The aliases for functions you want to call e.g. `yarn build` is defined in this sample project as `"build": "yarn run build:types && yarn run build:js",`
3. The other Javascript dependencies that you need to either build or run your project

__webpack.config.js__

Webpack is a tool that combines multiple source files into one single file, including your dependencies. In other words, it makes scripts portable so you don't need users to have an entire `node_modules` folder in their KoLmafia scripts folder.

The `webpack.config.js` file contains data about what you want to files you want the build process to emit and how you want to build them. The entry object maps a list of filenames to produce to the corresponding Typescript files. In other words, if you want to produce one script then you want one entry here. Javascript does not support function overloading e.g. `function main()` and `function main(round, monster, page)` may not exist in the same file. Thus, if you want to have a consult script then you need to define another entry.

__yarn.lock__

The lock file contains the specific versions of the Javascript dependencies described in `package.json` as well as their hashes. This is vital for reproducible builds. It is extremely useful to include this file. (NOTE: If using npm instead of yarn, then you will have a `package-lock.json` file containing the same type of data.)
1. Other users will be able to build the script as you intend. When running `yarn install` and `npm install`, those programs will refer to their respective lock files to install the specified package versions. Thus, even if a required dependency such as [Libram](https://github.com/loathers/libram) has an update with a breaking change, other users won't end up creating broken builds.
2. If you end up needing to download the project yourself from the remote repository such as GitHub, you can build your script again immediately for the same reason as above.
3. This enables you to automate builds via workflows on GitHub/GitLab/etc. If another user can reproduce your script, then GitHub workflows can, too.

__tsconfig.json__

This file tells Typescript what settings to use when compiling. As years go by, it may be useful to change from the current target, es2018, to future versions of Javascript.

__babel.config.js__

Babel is a tool for adding backwards-compatible code to your script. Unfortunately, not all features in Javascript work in KoLmafia. You can see the table of support for new features in Mozilla Rhino, the Javascript engine used by KoLmafia [here](https://mozilla.github.io/rhino/compat/engines.html).

The babel.config.js file thus tells Babel what functions need to be [polyfilled](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) to work with KoLmafia. Not every function is listed here, because ideally, Babel already contains the list of functions needed to be polyfilled in `babel-compat-data`.

__eslintrc.json and .eslintignore__

ESLint is a tool that [lints](https://en.wikipedia.org/wiki/Lint_\(software\)) code. In other words, it is another tool for catching errors before you run your script. Additionally, thanks to the [eslint-plugin-libram](https://github.com/Loathing-Associates-Scripting-Society/eslint-plugin-libram) project, it also provides error checking for KoLmafia constants. For example, if you type in ``$item`seal toof` `` you'll receive the error `Unrecognized enumerated value name "seal toof".eslint(libram/verify-constants)`. The best part is it will automatically correct unambiguous errors such as capitalization and incomplete names.

The `eslintrc.json` file specifies rules beyond the default that you want to enable or disable. It lets you make linting stricter or looser as needed.

The `.eslintignore` file specifies what kinds of files to skip linting. You definitely don't want to lint your hundreds or thousands of third-party dependencies, for example.

__prettierrc.js and .prettierignore__

Prettier is a tool that automatically formats your code. It helps make it look consistent and more readable. It's especially nice to have for projects with multiple contributors, because that way code looks more consistent between multiple authors.

The `prettierrc.js` file specifies the [options](https://prettier.io/docs/en/options.html) of how you want your code formatted. In other words, as the project owner, you can dictate how you want the source code to look. Don't waste your time telling contributors what to do. Write in this file, `useTabs: true` or `tabWidth: 4` for non-default settings. If you have a GitHub workflow, you can ensure that it always runs ESLint and Prettier.

The `.prettierignore` file, like the `.eslintignore` file specifies what kinds of files to skip code formatting.

__.gitignore__

If you're going to commit your project to a repository such as GitHub, you don't want to commit every single file and folder within the project folder, like `node_modules`. This file automatically tells git to skip them.

__.vscode__

The files within this folder tell the [Visual Studio Code](https://code.visualstudio.com/) editor to automatically run ESLint and Prettier when saving files. If you aren't using this editor, then they don't do anything.