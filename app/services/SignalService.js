import signals from 'signals';

class SignalService {

  signals = [
    'WINDOW_RESIZED',
    'AUDIO_ON_BEAT'
  ]

  constructor()
  {
    for (let i = 0; i < this.signals.length; i++) {
      let signal = this.signals[i];
      this[signal] = new signals();
    }
  }
}

export default new SignalService();
