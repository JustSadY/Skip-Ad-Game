// LEVEL: Ters Fare / Sarhoş İmleç Fiziği (Inverted Controls)
window.LevelModules = window.LevelModules || {};

window.LevelModules['cursor_lag'] = {
  id: 'cursor_lag',
  url: 'https://drunk-mouse-redirect.net/gate',
  tabTitle: (lang) => lang === 'tr' ? '🌀 Manyetik Alan Sapması' : '🌀 Magnetic Cursor Anomaly',

  mouseMoveHandler: null,
  clickHandler: null,

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div id="invertedArena" style="
        flex: 1;
        width: 100%;
        height: 100%;
        background: #09090b;
        position: relative;
        overflow: hidden;
        cursor: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      ">
        
        <!-- SANAL İMLEYİCİ (CUSTOM INVERTED CURSOR) -->
        <div id="virtualCursor" style="
          position: absolute;
          width: 20px;
          height: 20px;
          pointer-events: none;
          z-index: 999;
          transform: translate(-50%, -50%);
          font-size: 20px;
          filter: drop-shadow(0 0 8px #f43f5e);
          transition: transform 0.02s linear;
        ">
          🎯
        </div>

        <div style="text-align: center; margin-bottom: 30px; pointer-events: none;">
          <div style="font-size: 36px; animation: spin 4s linear infinite; display: inline-block;">🌀</div>
          <h2 style="font-size: 20px; font-weight: 900; color: #f43f5e; margin: 8px 0;">
            ${isTr ? 'MANYETİK İMLEYİCİ BOZULMASI!' : 'MAGNETIC CURSOR DISRUPTION!'}
          </h2>
          <p style="font-size: 13px; color: #a1a1aa;">
            ${isTr ? 'Fare kontrolleri TERSİNE çevrildi (Sağ=Sol, Aşağı=Yukarı). Butona nişan alın!' : 'Mouse controls are INVERTED (Right=Left, Down=Up). Aim for the button!'}
          </p>
        </div>

        <!-- HEDEF REKLAMI GEÇ BUTONU -->
        <div style="position: relative;">
          <button id="invertedTargetBtn" style="
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: #000;
            border: 3px solid #86efac;
            font-family: var(--font-ui);
            font-size: 16px;
            font-weight: 900;
            padding: 16px 36px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
            cursor: none;
            transition: transform 0.1s;
          ">
            ${isTr ? 'REKLAMI GEÇ' : 'SKIP AD'}
          </button>
        </div>

      </div>
    `;

    const arena = document.getElementById('invertedArena');
    const cursor = document.getElementById('virtualCursor');
    const targetBtn = document.getElementById('invertedTargetBtn');

    let curX = window.innerWidth / 2;
    let curY = window.innerHeight / 2;

    this.mouseMoveHandler = (e) => {
      const rect = arena.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Tam ters koordinat haritalaması
      curX = rect.width - relativeX;
      curY = rect.height - relativeY;

      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
    };

    arena.addEventListener('mousemove', this.mouseMoveHandler);

    this.clickHandler = (e) => {
      // Sanal imlecin hedef butonun sınırları içinde olup olmadığını hesapla
      const btnRect = targetBtn.getBoundingClientRect();
      const arenaRect = arena.getBoundingClientRect();

      const pad = 16;
      const isTargetHit = e.target === targetBtn || 
        (curX >= btnLeft - pad && curX <= btnRight + pad && curY >= btnTop - pad && curY <= btnBottom + pad);

      if (isTargetHit) {
        arena.style.pointerEvents = 'none';
        targetBtn.style.transform = 'scale(0.95)';
        if (window.AudioEngine) window.AudioEngine.play('pass');
        onComplete();
      } else {
        onError();
        if (window.AudioEngine) window.AudioEngine.play('fail');
      }
    };

    arena.addEventListener('click', this.clickHandler);
  },

  cleanup: function() {
    const arena = document.getElementById('invertedArena');
    if (arena) {
      if (this.mouseMoveHandler) arena.removeEventListener('mousemove', this.mouseMoveHandler);
      if (this.clickHandler) arena.removeEventListener('click', this.clickHandler);
    }
  }
};
