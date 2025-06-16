import { NextApiRequest, NextApiResponse } from 'next';
import { getProfile } from '@/api/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ message: 'Missing user ID' });
    }

    const profileData = await getProfile(userId);
    return res.status(200).json(profileData);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 