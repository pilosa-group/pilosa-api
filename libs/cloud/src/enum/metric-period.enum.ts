export enum MetricPeriod {
  DAY = '1 day',
  FIFTEEN_MINUTES = '15 minutes',
  FIVE_MINUTES = '5 minutes',
  HOUR = '1 hour',
  MINUTE = '1 minute',
  MONTH = '1 month',
  THIRTY_MINUTES = '30 minutes',
  THREE_MONTHS = '3 months',
  WEEK = '1 week',
  YEAR = '1 year',
}

export type MetricPeriodValue = keyof typeof MetricPeriod;

export const periodToSeconds = (period: MetricPeriod): number => {
  switch (period) {
    case MetricPeriod.MINUTE:
      return 60;
    case MetricPeriod.FIVE_MINUTES:
      return 300;
    case MetricPeriod.FIFTEEN_MINUTES:
      return 900;
    case MetricPeriod.THIRTY_MINUTES:
      return 1800;
    case MetricPeriod.HOUR:
      return 3600;
    case MetricPeriod.DAY:
      return 86400;
    case MetricPeriod.WEEK:
      return 604800;
    case MetricPeriod.MONTH:
      return 2592000;
    case MetricPeriod.THREE_MONTHS:
      return 7776000;
    case MetricPeriod.YEAR:
      return 31536000;
  }
};

export const periodToMilliseconds = (period: MetricPeriod): number =>
  periodToSeconds(period) * 1000;
