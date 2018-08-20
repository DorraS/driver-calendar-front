import { DiverCalendarModule } from './diver-calendar.module';

describe('DiverCalendarModule', () => {
  let diverCalendarModule: DiverCalendarModule;

  beforeEach(() => {
    diverCalendarModule = new DiverCalendarModule();
  });

  it('should create an instance', () => {
    expect(diverCalendarModule).toBeTruthy();
  });
});
