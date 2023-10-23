export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}
/*
export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}
*/
export function getRandomItems<T>(items: T[], amount = -1): T[] {
  let startPosition = generateRandomValue(0, items.length - 1);
  let endPosition = startPosition + generateRandomValue(startPosition, items.length);
  let randomItems = items.slice(startPosition, endPosition);

  if (amount !== -1) {
    while (randomItems.length < amount) {
      startPosition = generateRandomValue(0, items.length - 1);
      endPosition = startPosition + generateRandomValue(startPosition, items.length);
      randomItems = items.slice(startPosition, endPosition);
    }

    return randomItems;
  }

  return randomItems;
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
