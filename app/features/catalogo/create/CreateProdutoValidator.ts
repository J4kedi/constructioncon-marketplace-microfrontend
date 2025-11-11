export class CreateProdutoValidator {
  validate(data: any): void {
    const { nome, categoria, valor } = data;

    if (!nome || typeof nome !== 'string') {
      throw new Error('Nome é obrigatório e deve ser uma string.');
    }

    if (!categoria || typeof categoria !== 'string') {
      throw new Error('Categoria é obrigatória e deve ser uma string.');
    }

    if (valor === undefined || typeof valor !== 'number' || valor < 0) {
      throw new Error('Valor é obrigatório e deve ser um número positivo.');
    }
  }
}
