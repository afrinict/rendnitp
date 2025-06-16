import { NextApiRequest, NextApiResponse } from 'next';
import { updateProfile } from '@/api/profile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, profileData } = req.body;

    if (!userId || !profileData) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const result = await updateProfile(userId, profileData);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 