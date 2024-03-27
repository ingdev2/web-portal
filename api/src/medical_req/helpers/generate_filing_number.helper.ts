import { EntityManager } from 'typeorm';

async function getLastFilingNumber(
  entityManager: EntityManager,
): Promise<string | null> {
  try {
    const lastFilingNumber = await entityManager.query(`
      SELECT filing_number
      FROM medical_req
      ORDER BY "createdAt" DESC
      LIMIT 1
    `);

    return lastFilingNumber.length > 0
      ? lastFilingNumber[0].filing_number
      : null;
  } catch (error) {
    throw error;
  }
}

export async function generateFilingNumber(
  entityManager: EntityManager,
): Promise<string> {
  try {
    const lastFilingNumber = await getLastFilingNumber(entityManager);

    const nextNumber = lastFilingNumber
      ? parseInt(lastFilingNumber.split('-')[1]) + 1
      : 1;

    const formattedNumber = nextNumber.toString().padStart(8, '0');

    const filingNumber = `SRM-${formattedNumber}`;

    return filingNumber;
  } catch (error) {
    throw error;
  }
}
