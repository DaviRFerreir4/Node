export class CheckInLimitError extends Error {
  constructor() {
    super('Check-ins Limit Reached')
  }
}
