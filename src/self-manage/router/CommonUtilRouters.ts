import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

router.post('/path-join', (req:Request, res:Response) => {
  const paths: string[] = req.body.paths
  let resultPath = ''
  if(paths) {
    resultPath = path.join(...paths)
  }
  res.json({
    resultPath
  });
});

export default router;
