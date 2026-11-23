import { Programme } from '@/types';
import { programmesData } from '@/data/programmes.data';

/**
 * ProgrammeService abstraction
 * In future iterations, replace internal calls with MongoDB / Mongoose queries:
 * e.g., return await ProgrammeModel.find({ isActive: true }).lean();
 */
export const programmeService = {
  async getAllProgrammes(): Promise<Programme[]> {
    // Simulated async fetch to preserve future DB query contract
    return Promise.resolve(programmesData);
  },

  async getProgrammeBySlug(slug: string): Promise<Programme | undefined> {
    return Promise.resolve(programmesData.find((p) => p.slug === slug));
  },

  async getFlagshipProgrammes(): Promise<Programme[]> {
    return Promise.resolve(programmesData.filter((p) => p.hasNAAT));
  },
};

