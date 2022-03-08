export default class TokenHandler {
  private LOCAL_STORAGE_SECRET_KEY = process.env.SECRET_KEY || "teste_uol::secret";

  public getDataFromLocalStorage(): any | null {
    const stringData = localStorage.getItem(this.LOCAL_STORAGE_SECRET_KEY);
    if (!stringData) {
      return null;
    }
    
    const data = JSON.parse(stringData);
    return data;
  }

  public setDataInLocalStorage(payload: any): void {
    const data = JSON.stringify(payload);
    localStorage.setItem(this.LOCAL_STORAGE_SECRET_KEY, data);
  }

  public clearLocalStorage(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_SECRET_KEY);
  }
}

const tokenHandler = new TokenHandler();

export { TokenHandler, tokenHandler };