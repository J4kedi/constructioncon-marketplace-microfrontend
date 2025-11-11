import { Request, Response } from 'express';
import { CreateProdutoUseCase } from './CreateProdutoUseCase';
import { CatalogoRepositoryMemory } from '@/app/infrastructure/database/CatalogoRepositoryMemory';
import { CreateProdutoValidator } from '@/app/features/catalogo/create/CreateProdutoValidator';

const catalogoRepository = new CatalogoRepositoryMemory();
const createProdutoUseCase = new CreateProdutoUseCase(catalogoRepository);

export class CreateProdutoController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const validator = new CreateProdutoValidator();
      validator.validate(req.body);

      const produto = await createProdutoUseCase.execute(req.body);
      return res.status(201).json(produto);
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}
