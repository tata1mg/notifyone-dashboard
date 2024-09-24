export const getHealthColor = (health: string) => {
  switch (health) {
    case 'HEALTHY':
      return 'green';
    case 'SLOW':
    case 'OUTAGE':
      return 'yellow';
    case 'OVERLOADED':
    case 'DEGRADED':
      return 'volcano';
    default:
      return '';
  }
};
