import { Produto } from '@/app/domain/entidade/Produto';
import { ICatalogoRepository } from '@/app/application/commands/interfaces/ICatalogoRepository';

interface CreateProdutoDTO {
  nome: string;
  categoria: string;
  valor: number;
}

export class CreateProdutoUseCase {
  constructor(private readonly catalogoRepository: ICatalogoRepository) {}

  async execute(data: CreateProdutoDTO): Promise<Produto> {
    const produto = new Produto(data);
    await this.catalogoRepository.save(produto);
    return produto;
  }
}
