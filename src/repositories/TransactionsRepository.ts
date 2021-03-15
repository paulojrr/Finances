import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transaction = await this.find();

    const income = transaction.filter(trans => trans.type === 'income');

    const totalIncome = income.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    const outcome = transaction.filter(trans => trans.type === 'outcome');

    const totalOutcome = outcome.reduce((accumulator, current) => {
      return accumulator + current.value;
    }, 0);

    const total = totalIncome - totalOutcome;

    const balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }
}

export default TransactionsRepository;
