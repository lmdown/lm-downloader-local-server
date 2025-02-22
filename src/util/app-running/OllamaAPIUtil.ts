import InstalledModel from '@/types/running/app-running/InstalledModel';
import * as http from 'http';
export default class OllamaAPIUtil {

  static async getInstalledModels(): Promise<InstalledModel[]> {
    const maxRetries = 3;
    const retryDelay = 500;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`try get model list: ${attempt}`);
      try {
          return await this.makeRequest();
      } catch (error) {
          if (attempt === maxRetries) {
              console.error('request error, all failed. ', error);
              // throw error;
          }
          console.warn(`request error: ${error.message}`);
          await this.delay(retryDelay);
      }
    }
  }

  static makeRequest(): Promise<InstalledModel[]> {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: '127.0.0.1',
            port: 11434,
            // path: '/api/models',
            path: '/api/tags',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const responseJson = JSON.parse(data);
                        const models = responseJson.models;
                        models.forEach((model: { name: string }, index: number) => {
                            console.log(`${index + 1}. ${model.name}`);
                        });
                        resolve(models as InstalledModel[]);
                    } catch (error) {
                        reject(new Error(`parse json error: ${error.message}`));
                    }
                } else {
                    reject(new Error(`request failed: ${res.statusCode} ${res.statusMessage}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error(`req error: ${error.message}`));
        });

        req.end();
    });
  }

  static delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

}
