import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import Bottle from '../../models/Bottle';

export const getBottles = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = getSession(req, res);

    if (!session) throw new Error('Unauthenticated user');

    const bottles = await Bottle.find({ user: session.user.sub });

    res.status(200).json({ success: true, data: bottles });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export const getBottle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = getSession(req, res);

    if (!session) throw new Error('Unauthenticated user');

    const bottles = await Bottle.find({
      _id: req.query.id,
      user: session.user.sub,
    });

    res.status(200).json({ success: true, data: bottles });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export const addBottle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = getSession(req, res);

    if (!session) throw new Error('Unauthenticated user');

    const bottle = await Bottle.create({ ...req.body, user: session.user.sub });
    res.status(201).json({ success: true, data: bottle });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

export const modifyBottle = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const session = getSession(req, res);

    if (!session) throw new Error('Unauthenticated user');

    const bottle = await Bottle.findOneAndUpdate(
      { _id: req.query.id, user: session.user.sub },
      req.body,
      { new: true }
    );
    res.status(201).json({ success: true, data: bottle });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
