import { MethodPhase } from '@/types';
import { methodPhasesData } from '@/data/method.data';

export const methodService = {
  async getMethodPhases(): Promise<MethodPhase[]> {
    return Promise.resolve(methodPhasesData);
  },
};

