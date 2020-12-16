"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.checkMP = void 0;
const kolmafia_1 = require("kolmafia");
function checkMP() {
    if (kolmafia_1.myMp() < 200) {
        return "Your MP is less than 200.";
    }
    else {
        return "Your MP is greater than or equal to 200.";
    }
}
exports.checkMP = checkMP;
function main() {
    kolmafia_1.print(checkMP());
}
exports.main = main;
//# sourceMappingURL=main.js.map