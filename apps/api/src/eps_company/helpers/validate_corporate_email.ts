import axios from 'axios';

async function validateCorporateEmail(email: string): Promise<boolean> {
  const apiKey = process.env.HUNTER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`,
    );

    const data = response?.data?.data;

    if (
      !data.webmail &&
      !data.disposable &&
      data.mx_records &&
      data.smtp_check &&
      data.status === 'valid'
    ) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export { validateCorporateEmail };
