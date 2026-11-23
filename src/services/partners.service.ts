import { IndustryPartner } from '@/types';
import { partnersData } from '@/data/partners.data';

export const partnerService = {
  async getCorporatePartners(): Promise<IndustryPartner[]> {
    return Promise.resolve(partnersData);
  },
};

