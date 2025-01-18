import LMDEnv from "../types/running/LMDEnv";
import fs from 'fs';
import * as dotenv from 'dotenv';

export class EnvUtil {

  static convertToEnvFormat(env: LMDEnv): string {
    const lines: string[] = [];

    for (const [key, value] of Object.entries(env)) {
      let envValue = String(value);

      if (envValue === '') {
        continue;
      }

      if (/[=\s]/.test(envValue)) {
        envValue = `"${envValue}"`;
      }

      lines.push(`${key}=${envValue}`);
    }

    return lines.join('\n');
  }

  static getEnvFile(filePath: string) {
    const data = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});
    return dotenv.parse(data)
  }

}
