import { MinuteSecondsFormatPipe } from './minute-seconds-format.pipe';

describe('MinuteSecondsFormatPipe', () => {
  let pipe: MinuteSecondsFormatPipe;

  beforeEach(() => {
    pipe = new MinuteSecondsFormatPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "00:00" on input null', () => {
    const sut = pipe.transform(null);
    expect(sut).toEqual('00:00');
  });

  it('should return "00:00" on input undefined', () => {
    const sut = pipe.transform(undefined);
    expect(sut).toEqual('00:00');
  });

  it('should return "00:00" on input 0', () => {
    const sut = pipe.transform(0);
    expect(sut).toEqual('00:00');
  });

  it('should return "00:10" on input 10', () => {
    const sut = pipe.transform(10);
    expect(sut).toEqual('00:10');
  });

  it('should return "02:00" on input 120', () => {
    const sut = pipe.transform(120);
    expect(sut).toEqual('02:00');
  });

  it('should return "166:39" on input 9999', () => {
    const sut = pipe.transform(9999);
    expect(sut).toEqual('166:39');
  });
});
