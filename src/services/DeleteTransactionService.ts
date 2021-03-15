import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const idExists = await transactionRepository.findOne(id);

    if (!idExists) {
      throw new AppError('Transaction does not exist');
    }

    await transactionRepository.remove(idExists);
  }
}

export default DeleteTransactionService;
