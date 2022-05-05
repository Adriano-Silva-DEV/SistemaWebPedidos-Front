export class LocalStorageUtils {
    
    public obterUsuario() {
        return JSON.parse(localStorage.getItem('webpedidos.user'));
    }

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.accessToken);
        this.salvarUsuario(response.userToken);
    }

    public limparDadosLocaisUsuario() {
        localStorage.removeItem('webpedidos.token');
        localStorage.removeItem('webpedidos.user');
    }

    public obterTokenUsuario(): string {
        return localStorage.getItem('webpedidos.token');
    }

    public salvarTokenUsuario(token: string) {
        localStorage.setItem('webpedidos.token', token);
    }

    public salvarUsuario(user: string) {
        localStorage.setItem('webpedidos.user', JSON.stringify(user));
    }

}