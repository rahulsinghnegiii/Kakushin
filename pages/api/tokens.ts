import type { NextApiRequest, NextApiResponse } from 'next';
import { Token } from '@/lib/types';

type ErrorResponse = {
  error: string;
};

/**
 * API endpoint to fetch mock token holdings
 * Returns a list of tokens with their balances
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Token[] | ErrorResponse>
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Mock token data
    const tokens: Token[] = [
      {
        name: 'Crypto Cat',
        symbol: 'CAT',
        balance: 5,
      },
      {
        name: 'Moon Token',
        symbol: 'MOON',
        balance: 12,
      },
    ];

    // Return successful response
    return res.status(200).json(tokens);
  } catch (error) {
    console.error('Error in tokens API:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
