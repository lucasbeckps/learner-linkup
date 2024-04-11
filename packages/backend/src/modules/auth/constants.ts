import { config } from 'dotenv';
import * as findWorkspaceRoot from 'find-yarn-workspace-root';
import * as process from 'node:process';

config({ path: `${findWorkspaceRoot()}/.env` });

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
  bypassKey: process.env.JWT_BYPASS_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
