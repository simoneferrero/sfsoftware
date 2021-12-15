import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import dbConnect from '../../../lib/dbConnect';
import { getBottles, addBottle } from '../../../controllers/bottle';

const bottlesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      getBottles(req, res);

      break;

    case 'POST': {
      addBottle(req, res);

      break;
    }

    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withApiAuthRequired(bottlesRoute);
