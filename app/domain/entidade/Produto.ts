export class Produto {
  public readonly id: string;
  public nome: string;
  public categoria: string;
  public valor: number;

  constructor(props: Omit<Produto, 'id'>, id?: string) {
    this.validate(props);
    this.id = id ?? Date.now().toString();
    this.nome = props.nome;
    this.categoria = props.categoria;
    this.valor = props.valor;
  }

  private validate(props: Omit<Produto, 'id'>) {
    if (!props.nome || !props.categoria || props.valor === undefined) {
      throw new Error('Campos obrigatórios: nome, categoria e valor.');
    }

    if (typeof props.valor !== 'number' || props.valor < 0) {
      throw new Error('O valor deve ser um número positivo.');
    }
  }
}
