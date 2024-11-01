class homepage {
  get username() {
    return $("input[name='username']");
  }
  get password() {
    return $("input[name='password']");
  }
  get loginButton() {
    return $("button[type='submit']");
  }

  get dashboard() {
    return $("//h6[text()='Dashboa']");
  }
}
module.exports = new homepage();
