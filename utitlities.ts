import { Locator, Page } from "@playwright/test";

export default class Utilities {

    getRandomPageName(character:number) {
        const randomstring = require("randomstring");
        return randomstring.generate(character);
    }

}
