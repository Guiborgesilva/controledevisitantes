import { NextApiRequest, NextApiResponse } from 'next';
import { fetchVisitanteById } from '@/app/lib/actions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;

  try {
    const visitante = await fetchVisitanteById(id as string);
    res.status(200).json({ visitante });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o visitante.' });
  }
}
