/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const Room = lazyLoad(
  () => import('./index'),
  module => module.Room,
);
