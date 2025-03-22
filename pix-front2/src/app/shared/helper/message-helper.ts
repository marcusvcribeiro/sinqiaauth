export class MessageHelper {
  public static extrairMensagem(mensagem: string): string {
    if (!mensagem) {
      return '';
    }
    return mensagem.replace(/<[a-zA-Z0-9]*>/, '').trim();
  }
}
