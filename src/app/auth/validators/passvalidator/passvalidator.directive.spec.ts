import { PassvalidatorDirective } from './passvalidator.directive';

describe('PassvalidatorDirective', () => {
  let directive: PassvalidatorDirective;

  beforeEach(() => {
    directive = new PassvalidatorDirective();
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });
});
