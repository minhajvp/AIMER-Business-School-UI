import { StudentOutcome } from '@/types';
import { outcomesData } from '@/data/outcomes.data';

export const outcomeService = {
  async getAllOutcomes(): Promise<StudentOutcome[]> {
    return Promise.resolve(outcomesData);
  },

  async getOutcomesByType(type: 'internship' | 'placement' | 'venture'): Promise<StudentOutcome[]> {
    return Promise.resolve(outcomesData.filter((o) => o.type === type));
  },
};

