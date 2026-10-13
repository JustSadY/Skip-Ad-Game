// LEVEL: Ters Fare / Sarhoş İmleç Fiziği (Inverted Controls)
window.LevelModules = window.LevelModules || {};

window.LevelModules['cursor_lag'] = {
  id: 'cursor_lag',
  url: 'https://drunk-mouse-redirect.net/gate',
  tabTitle: (lang) => lang === 'tr' ? '🌀 Manyetik Alan Sapması' : '🌀 Magnetic Cursor Anomaly',

  mouseMoveHandler: null,
  clickHandler: null,
  pendingTimers: [],
  completed: false,

  render: function(container, onComplete, onError, showToast, t) {
    this.cleanup();
    this.completed = false;
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
        user-select: none;
      ">
        
        <!-- SANAL TERS İMLEYİCİ (CUSTOM INVERTED CURSOR) -->
        <div id="virtualCursor" style="
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 999;
          transform: translate(-50%, -50%);
          font-size: 24px;
          filter: drop-shadow(0 0 10px #f43f5e);
          transition: transform 0.05s ease, filter 0.2s ease;
          will-change: left, top;
        ">
          🎯
        </div>

        <div style="text-align: center; margin-bottom: 32px; pointer-events: none;">
          <div style="font-size: 42px; animation: spin 4s linear infinite; display: inline-block;">🌀</div>
          <h2 style="font-size: 22px; font-weight: 900; color: #f43f5e; margin: 10px 0 6px 0;">
            ${isTr ? 'MANYETİK İMLEYİCİ BOZULMASI!' : 'MAGNETIC CURSOR DISRUPTION!'}
          </h2>
          <p style="font-size: 14px; color: #a1a1aa; max-width: 440px;">
            ${isTr ? 'Fare kontrolleri TERSİNE çevrildi (Sağ=Sol, Aşağı=Yukarı). Sanal hedefi butona denk getirip tıklayın!' : 'Mouse controls are INVERTED (Right=Left, Down=Up). Aim the target at the button and click!'}
          </p>
        </div>

        <!-- HEDEF REKLAMI GEÇ BUTONU -->
        <div style="position: relative;">
          <button id="invertedTargetBtn" style="
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: #000;
            border: 3px solid #86efac;
            font-family: var(--font-ui);
            font-size: 17px;
            font-weight: 900;
            padding: 16px 44px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
            cursor: none;
            transition: transform 0.1s ease, box-shadow 0.15s ease;
          ">
            ${isTr ? 'REKLAMI GEÇ' : 'SKIP AD'}
          </button>
        </div>

      </div>
    `;

    const arena = document.getElementById('invertedArena');
    const cursor = document.getElementById('virtualCursor');
    const targetBtn = document.getElementById('invertedTargetBtn');

    let curX = 0;
    let curY = 0;

    // Başlangıçta ortala
    this.pendingTimers.push(setTimeout(() => {
      if (!arena.isConnected) return;
      const rect = arena.getBoundingClientRect();
      curX = rect.width / 2;
      curY = rect.height / 2;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
    }, 50));

    // Ters Fare Hareketi
    this.mouseMoveHandler = (e) => {
      const rect = arena.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      // Tam ters koordinat haritalaması (Ayna fiziği)
      curX = rect.width - relativeX;
      curY = rect.height - relativeY;

      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;

      // Buton üzerine gelindiğinde görsel geri bildirim
      const btnRect = targetBtn.getBoundingClientRect();
      const btnLeft = btnRect.left - rect.left;
      const btnRight = btnRect.right - rect.left;
      const btnTop = btnRect.top - rect.top;
      const btnBottom = btnRect.bottom - rect.top;

      if (curX >= btnLeft && curX <= btnRight && curY >= btnTop && curY <= btnBottom) {
        targetBtn.style.transform = 'scale(1.06)';
        targetBtn.style.boxShadow = '0 0 35px rgba(34, 197, 94, 0.8)';
        cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
      } else {
        targetBtn.style.transform = 'scale(1)';
        targetBtn.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.4)';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    arena.addEventListener('mousemove', this.mouseMoveHandler);

    // Tıklama Olayı
    this.clickHandler = (e) => {
      const arenaRect = arena.getBoundingClientRect();
      const btnRect = targetBtn.getBoundingClientRect();

      const btnLeft = btnRect.left - arenaRect.left;
      const btnRight = btnRect.right - arenaRect.left;
      const btnTop = btnRect.top - arenaRect.top;
      const btnBottom = btnRect.bottom - arenaRect.top;

      const pad = 24; // Adil ve cömert tıklama toleransı
      const isVirtualHit = (curX >= btnLeft - pad && curX <= btnRight + pad && curY >= btnTop - pad && curY <= btnBottom + pad);
      if (this.completed) return;

      if (isVirtualHit) {
        this.completed = true;
        arena.style.pointerEvents = 'none';
        targetBtn.style.transform = 'scale(0.95)';
        targetBtn.style.background = '#22c55e';
        if (window.AudioEngine) window.AudioEngine.play('pass');
        this.pendingTimers.push(setTimeout(() => {
          onComplete();
        }, 250));
      } else {
        onError();
        if (window.AudioEngine) window.AudioEngine.play('fail');
        cursor.style.filter = 'drop-shadow(0 0 20px #ef4444)';
        this.pendingTimers.push(setTimeout(() => {
          if (cursor.isConnected) cursor.style.filter = 'drop-shadow(0 0 10px #f43f5e)';
        }, 300));
      }
    };

    arena.addEventListener('click', this.clickHandler);
  },

  cleanup: function() {
    this.pendingTimers.forEach(clearTimeout);
    this.pendingTimers = [];
    const arena = document.getElementById('invertedArena');
    if (arena) {
      if (this.mouseMoveHandler) arena.removeEventListener('mousemove', this.mouseMoveHandler);
      if (this.clickHandler) arena.removeEventListener('click', this.clickHandler);
    }
    this.mouseMoveHandler = null;
    this.clickHandler = null;
  }
};
