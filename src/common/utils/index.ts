export const getTagColor = (health: string) => {
  switch (health) {
    case 'HEALTHY':
    case 'SUCCESS':
      return 'green';
    case 'SLOW':
    case 'OUTAGE':
    case 'INITIATED':
      return 'yellow';
    case 'OVERLOADED':
    case 'DEGRADED':
    case 'FAILED':
      return 'volcano';
    case 'NEW':
      return 'grey';
    default:
      return '';
  }
};
