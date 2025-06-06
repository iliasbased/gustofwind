export default class BaseService{
  constructor() {}

  async fetch(url, data) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });

    return await response.json();
  }
}
