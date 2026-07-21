import { Page } from "@playwright/test";
import fs from "fs";
import path from "path";

export class Evidence {

  private static createFolder(folder: string) {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  static async captureScreenshot(
    page: Page,
    fileName: string,
    folderName: "success" | "failure" = "success"
  ) {

    const folder = path.join(
      process.cwd(),
      "evidence",
      "screenshots",
      folderName
    );

    this.createFolder(folder);

    await page.screenshot({
      path: path.join(folder, `${fileName}.png`),
      fullPage: true,
    });
  }
}