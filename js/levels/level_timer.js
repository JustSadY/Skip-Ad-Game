// LEVEL: Donan Sayaç / Gözünü Ayırma (Pausing Timer)
window.LevelModules = window.LevelModules || {};

window.LevelModules['timer'] = {
  id: 'timer',
  url: 'https://attention-gate.org/watch-ad',
  tabTitle: (lang) => lang === 'tr' ? 'Dikkatli İzleyici Testi' : 'Attention Check',

  tickInterval: null,
  mouseMoveTimeout: null,
  mouseHandler: null,

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div id="attentionZone" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #090d16; padding: 20px;">
        
        <div style="width: 100%; max-width: 580px; background: #131b2e; border: 2px solid #334155; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8); text-align: center; position: relative;">
          
          <div style="background: #1e293b; padding: 12px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 12px; font-weight: 700; color: #cbd5e1;">📺 SPONSORED VIDEO</span>
            <span id="attentionStatus" style="font-size: 11px; font-weight: 800; color: #22c55e;">● İZLENİYOR</span>
          </div>

          <div style="padding: 40px 20px; min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="font-size: 48px; margin-bottom: 8px;">👀</div>
            <h3 style="font-size: 18px; font-weight: 800; color: #facc15; margin-bottom: 6px;">
              ${isTr ? 'GÖZÜNÜ AYIRMA!' : 'DO NOT LOOK AWAY!'}
            </h3>
            <p style="font-size: 12px; color: #94a3b8; max-width: 360px;">
              ${isTr ? 'Sayacı ilerletmek için farenizi bu kutunun içinde hareket ettirmeye devam edin!' : 'Keep moving your mouse inside this box to advance the countdown!'}
            </p>

            <div style="margin-top: 24px; display: flex; align-items: center; gap: 12px;">
              <div id="pauseNotice" style="display: none; background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #f87171; padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 800;">
                ⚠️ ${isTr ? 'SAYAÇ DURDU! HAREKET ET!' : 'TIMER PAUSED! MOVE CURSOR!'}
              </div>

              <div id="timerDisplayBox" style="background: #0f172a; border: 1px solid #334155; padding: 10px 20px; border-radius: 10px; font-family: var(--font-mono); font-size: 20px; font-weight: 900; color: #38bdf8;">
                <span id="gazeSec">5</span>s
              </div>

              <button id="timerSkipBtn" style="display: none; background: #22c55e; color: #000; font-family: var(--font-ui); font-size: 14px; font-weight: 800; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);">
                ${isTr ? 'REKLAMI GEÇ ➜' : 'SKIP AD ➜'}
              </button>
            </div>
          </div>

        </div>

      </div>
    `;

    const zone = document.getElementById('attentionZone');
    const statusSpan = document.getElementById('attentionStatus');
    const pauseNotice = document.getElementById('pauseNotice');
    const gazeSec = document.getElementById('gazeSec');
    const timerBox = document.getElementById('timerDisplayBox');
    const skipBtn = document.getElementById('timerSkipBtn');

    let count = 5;
    let isMoving = true;

    this.mouseHandler = () => {
      isMoving = true;
      pauseNotice.style.display = 'none';
      statusSpan.textContent = isTr ? '● İZLENİYOR' : '● WATCHING';
      statusSpan.style.color = '#22c55e';

      clearTimeout(this.mouseMoveTimeout);
      this.mouseMoveTimeout = setTimeout(() => {
        isMoving = false;
        pauseNotice.style.display = 'inline-block';
        statusSpan.textContent = isTr ? '⏸ DONDU' : '⏸ PAUSED';
        statusSpan.style.color = '#ef4444';
        if (window.AudioEngine) window.AudioEngine.play('fail');
      }, 1200);
    };

    zone.addEventListener('mousemove', this.mouseHandler);

    this.tickInterval = setInterval(() => {
      if (isMoving && count > 0) {
        count--;
        gazeSec.textContent = count;
        if (window.AudioEngine) window.AudioEngine.play('tick');

        if (count === 0) {
          clearInterval(this.tickInterval);
          timerBox.style.display = 'none';
          pauseNotice.style.display = 'none';
          skipBtn.style.display = 'inline-block';
        }
      }
    }, 1000);

    skipBtn.addEventListener('click', () => {
      onComplete();
    });
  },

  cleanup: function() {
    if (this.tickInterval) clearInterval(this.tickInterval);
    if (this.mouseMoveTimeout) clearTimeout(this.mouseMoveTimeout);
  }
};
