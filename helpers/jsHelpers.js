export const isValidVar = toCheck => typeof toCheck !== 'undefined' && toCheck !== null;

export const isValidString = toCheck => isValidVar(toCheck) && typeof toCheck === 'string' && toCheck !== '';
