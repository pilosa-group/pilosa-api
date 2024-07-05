export const initiatorTypes = [
  'audio',
  'beacon',
  'body',
  'css',
  'early-hint',
  'embed',
  'fetch',
  'frame',
  'iframe',
  'icon',
  'image',
  'img',
  'input',
  'link',
  'navigation',
  'object',
  'ping',
  'script',
  'track',
  'video',
  'xmlhttprequest',
];

export const isValidInitiatorType = (initiatorType: string): boolean =>
  initiatorTypes.includes(initiatorType);
