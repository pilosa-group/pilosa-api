import { Module } from '@nestjs/common';
import { BeaconController } from './beacon.controller';
import { ClientsModule } from '../clients/clients.module';
import { InfluxdbService } from './influxdb.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [BeaconController],
  providers: [InfluxdbService],
  imports: [ClientsModule, ConfigModule],
})
export class MetricsModule {}
