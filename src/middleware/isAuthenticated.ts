/**
 * author: Elijah Ndung'u
 * dev.elijah.ndungu@gmail.com
 */

import { Request, Response, NextFunction } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default isAuthenticated;
