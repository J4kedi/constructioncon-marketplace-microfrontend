
import { CreateProdutoUseCase } from './CreateProdutoUseCase';
import { CatalogoRepositoryMemory } from '../../../infrastructure/database/CatalogoRepositoryMemory';

describe('CreateProdutoUseCase', () => {
  it('deve criar um produto válido', async () => {
    const repo = new CatalogoRepositoryMemory();
    const useCase = new CreateProdutoUseCase(repo);

    const produto = await useCase.execute({
      nome: 'Fundação Estaca',
      categoria: 'Infraestrutura',
      valor: 15000,
    });

    expect(produto).toHaveProperty('id');
    expect(produto.nome).toBe('Fundação Estaca');
  });

  it('deve lançar erro para valor negativo', async () => {
    const repo = new CatalogoRepositoryMemory();
    const useCase = new CreateProdutoUseCase(repo);

    await expect(
      useCase.execute({
        nome: 'Item inválido',
        categoria: 'Teste',
        valor: -100,
      })
    ).rejects.toThrow('O valor deve ser um número positivo.');
  });
});
