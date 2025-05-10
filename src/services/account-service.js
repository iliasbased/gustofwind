import BaseService from "./base-service";

export default class AccountService extends BaseService {
  constructor() {
    super();
  }

  async attemptLogin(email, password) {
    return await this.fetch("http://localhost/index.php/account/login", {
      email,
      password,
    });
  }
}