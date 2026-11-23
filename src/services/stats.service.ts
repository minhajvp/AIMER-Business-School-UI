import { InstitutionalStat } from '@/types';
import { institutionalStats, heroKeyMetrics } from '@/data/stats.data';

export const statsService = {
  async getInstitutionalStats(): Promise<InstitutionalStat[]> {
    return Promise.resolve(institutionalStats);
  },

  async getHeroMetrics(): Promise<{ value: string; label: string }[]> {
    return Promise.resolve(heroKeyMetrics);
  },
};

