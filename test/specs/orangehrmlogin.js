// import { homepage } from "../pageobjects/homepage";
const homepage = require("../pageobjects/homepage.js");
const Exceldata = require("../data/userdata.js");
describe("Login page of orangehrm", () => {
  it("Login with valid credentials", async () => {
    Exceldata.sheetName = "Orangehrmlogin";

    await browser.url(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    browser.pause(1000);
    let un = await Exceldata.read("username");
    let pw = await Exceldata.read("password");

    await homepage.username.setValue(un);
    await homepage.password.setValue(pw);
    await homepage.loginButton.click();

    await homepage.dashboard.waitForExist({ timeout: 5000 });
  });
});
