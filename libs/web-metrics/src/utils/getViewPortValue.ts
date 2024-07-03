import { Viewport } from '@app/web-metrics/beacon.controller';

const isViewportValid = (viewport: Viewport): boolean =>
  Array.isArray(viewport) &&
  viewport.length == 2 &&
  viewport.every((v) => typeof v === 'number');

const getViewportIndex = (viewport: Viewport, index: number): number | null =>
  isViewportValid(viewport) ? viewport[index] : null;

export const getViewportValue = (
  viewport: Viewport,
  dimension: 'width' | 'height',
) => getViewportIndex(viewport, dimension === 'width' ? 0 : 1);
