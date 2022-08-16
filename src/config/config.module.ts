import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
})
export class ConfigurationModule {
  constructor(private configService: ConfigService) {}
}
