import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

import dbConnect from '../../../lib/dbConnect';
import { getBottle, modifyBottle } from '../../../controllers/bottle';

const bottlesRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      getBottle(req, res);

      break;

    case 'PATCH': {
      modifyBottle(req, res);

      break;
    }

    default: {
      res.setHeader('Allow', ['GET', 'PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
};

export default withApiAuthRequired(bottlesRoute);
