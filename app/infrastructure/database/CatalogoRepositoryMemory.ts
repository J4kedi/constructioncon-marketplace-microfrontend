import { Produto } from '@/app/domain/entidade/Produto';
import { ICatalogoRepository } from '@/app/application/commands/interfaces/ICatalogoRepository';

export class CatalogoRepositoryMemory implements ICatalogoRepository {
  private produtos: Produto[] = [];

  async save(produto: Produto): Promise<void> {
    this.produtos.push(produto);
  }

  async findAll(): Promise<Produto[]> {
    return this.produtos;
  }

  async findById(id: string): Promise<Produto | null> {
    return this.produtos.find(p => p.id === id) || null;
  }

  async update(id: string, data: Partial<Produto>): Promise<Produto | null> {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index === -1) return null;

    const produto = this.produtos[index];
    this.produtos[index] = { ...produto, ...data };
    return this.produtos[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.produtos.findIndex(p => p.id === id);
    if (index === -1) return false;

    this.produtos.splice(index, 1);
    return true;
  }
}
