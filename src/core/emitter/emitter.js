import mitt from 'mitt';

export function useEmitter(app) {
  app.provide('emitter', mitt());
}
