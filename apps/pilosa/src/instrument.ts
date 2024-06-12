import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

type SentryConfig = {
  dsn: string;
  tracesSampleRate?: number;
  profilesSampleRate?: number;
};

export const initSentry = ({
  dsn,
  tracesSampleRate = 1.0,
  profilesSampleRate = 1.0,
}: SentryConfig) =>
  Sentry.init({
    dsn,
    tracesSampleRate,
    profilesSampleRate,
    integrations: [nodeProfilingIntegration()],
  });
