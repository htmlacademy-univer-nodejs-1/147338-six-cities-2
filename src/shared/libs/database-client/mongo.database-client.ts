import { DatabaseClient } from './database-client.interface.js';
import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { Logger } from '../logger/index.js';
import { Components } from '../../types/index.js';
import { RETRY_TIMEOUT, RETRY_TIMES } from './const.js';
import { setTimeout } from 'node:timers/promises';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose!: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Components.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('Client is already connected to database');
    }

    this.logger.info('Trying to connect to MongoDB...');

    let attempt = 0;
    while (attempt < RETRY_TIMES) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt (${attempt}/5)`, error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish database connection after ${attempt} attempts`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
