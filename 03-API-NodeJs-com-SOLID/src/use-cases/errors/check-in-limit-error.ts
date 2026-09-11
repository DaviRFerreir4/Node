export class CheckInLimitError extends Error {
  constructor() {
    super('Check-ins limit reached')
  }
}
