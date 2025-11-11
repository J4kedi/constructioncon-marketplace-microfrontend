import { Produto } from '@/app/domain/entidade/Produto';

export interface ICatalogoRepository {
  save(produto: Produto): Promise<void>;
  findAll(): Promise<Produto[]>;
  findById(id: string): Promise<Produto | null>;
  update(id: string, data: Partial<Produto>): Promise<Produto | null>;
  delete(id: string): Promise<boolean>;
}
