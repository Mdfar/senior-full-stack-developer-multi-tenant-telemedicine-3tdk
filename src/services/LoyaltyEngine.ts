import { MedplumClient } from '@medplum/core'; import { Encounter, Organization } from '@medplum/fhirtypes';

/**

FHIR-Compliant Loyalty Engine

Rewards doctors based on completed Encounters */ export class LoyaltyEngine { constructor(private medplum: MedplumClient) {}

async processEncounterReward(encounter: Encounter): Promise<void> { if (encounter.status !== 'finished' || !encounter.participant) return;

const doctorRef = encounter.participant[0].individual?.reference;
if (!doctorRef) return;

// Fetch or Create a 'Basic' resource to store loyalty points
// Using a custom extension for 'loyalty-points'
const doctorPoints = await this.medplum.searchResources('Basic', {
  code: 'loyalty-profile',
  author: doctorRef
});

if (doctorPoints.length > 0) {
  const profile = doctorPoints[0];
  const currentPoints = parseInt(profile.extension?.find(e => e.url === 'points')?.valueInteger || '0');
  
  await this.medplum.updateResource({
    ...profile,
    extension: [{
      url: 'points',
      valueInteger: currentPoints + 10 // 10 points per consultation
    }]
  });
} else {
  await this.medplum.createResource({
    resourceType: 'Basic',
    code: { coding: [{ code: 'loyalty-profile' }] },
    author: { reference: doctorRef },
    extension: [{ url: 'points', valueInteger: 10 }]
  });
}


} }