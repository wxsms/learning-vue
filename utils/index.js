export function isObj (obj) {
  return obj !== null && typeof obj === 'object';
}

export function isBaseType (obj) {
  return ['string', 'number', 'boolean'].includes(typeof obj);
}
