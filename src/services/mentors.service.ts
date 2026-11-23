import { Mentor } from '@/types';
import { mentorsData } from '@/data/mentors.data';

export const mentorService = {
  async getFeaturedMentors(): Promise<Mentor[]> {
    return Promise.resolve(mentorsData);
  },
};

