// LEVEL: Bozuk / Düşen Buton (Fizik & Zıplama Tuzağı)
window.LevelModules = window.LevelModules || {};

window.LevelModules['broken_button'] = {
  id: 'broken_button',
  url: 'https://physics-ad-server.net/download-gate',
  tabTitle: (lang) => lang === 'tr' ? '⚠️ Sayfa Düzeni Bozuldu' : '⚠️ Layout Malfunction',

  animFrameId: null,

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div id="physicsContainer" style="
        flex: 1;
        width: 100%;
        height: 100%;
        background: #0f172a;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 60px;
      ">
        
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 440px; width: 100%; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <div style="font-size: 28px; margin-bottom: 8px;">🔩 🔧</div>
          <h2 style="font-size: 18px; font-weight: 800; color: #f8fafc; margin-bottom: 8px;">
            ${isTr ? 'Bağlantı Hazır: Aşağıdaki Butona Basın' : 'Link Ready: Click the Button Below'}
          </h2>
          <p style="font-size: 12px; color: #94a3b8; margin-bottom: 40px;">
            ${isTr ? 'Vidaları biraz gevşemiş gibi görünüyor...' : 'The screws look a bit loose...'}
          </p>

          <!-- BOŞ BUTON YUVASI -->
          <div id="buttonSocket" style="
            width: 220px;
            height: 48px;
            border: 2px dashed #475569;
            border-radius: 10px;
            margin: 0 auto;
            position: relative;
          "></div>
        </div>

        <!-- YERÇEKİMİYLE DÜŞEN GERÇEK BUTON -->
        <button id="fallingButton" style="
          position: absolute;
          width: 220px;
          height: 48px;
          background: #22c55e;
          color: #000;
          font-family: var(--font-ui);
          font-size: 15px;
          font-weight: 900;
          border: 2px solid #86efac;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
          transition: transform 0.05s ease;
          user-select: none;
        ">
          ${isTr ? 'REKLAMI GEÇ' : 'SKIP AD'}
        </button>

      </div>
    `;

    const arena = document.getElementById('physicsContainer');
    const socket = document.getElementById('buttonSocket');
    const btn = document.getElementById('fallingButton');

    // Başlangıç konumu socket'in tam üstü
    const updateInitialPos = () => {
      const sRect = socket.getBoundingClientRect();
      const aRect = arena.getBoundingClientRect();
      btn.style.left = `${sRect.left - aRect.left}px`;
      btn.style.top = `${sRect.top - aRect.top}px`;
    };
    updateInitialPos();

    let hasFallen = false;
    let isCaught = false;

    // Fizik değişkenleri
    let posX = 0;
    let posY = 0;
    let velX = (Math.random() - 0.5) * 6;
    let velY = 0;
    const gravity = 0.55;
    const bounce = -0.7;

    const startFalling = () => {
      if (hasFallen) return;
      hasFallen = true;

      const sRect = socket.getBoundingClientRect();
      const aRect = arena.getBoundingClientRect();
      posX = sRect.left - aRect.left;
      posY = sRect.top - aRect.top;
      velY = 2;

      if (window.AudioEngine) window.AudioEngine.play('fail');

      const physicsLoop = () => {
        if (isCaught) return;

        const aWidth = arena.clientWidth;
        const aHeight = arena.clientHeight;
        const btnWidth = btn.offsetWidth;
        const btnHeight = btn.offsetHeight;

        velY += gravity;
        posX += velX;
        posY += velY;

        // Zemine çarpma
        if (posY + btnHeight >= aHeight - 10) {
          posY = aHeight - 10 - btnHeight;
          velY *= bounce;
          velX *= 0.95; // Sürtünme
          if (Math.abs(velY) > 2 && window.AudioEngine) window.AudioEngine.play('tick');
        }

        // Yan duvarlara çarpma
        if (posX <= 10) {
          posX = 10;
          velX = -velX;
        } else if (posX + btnWidth >= aWidth - 10) {
          posX = aWidth - 10 - btnWidth;
          velX = -velX;
        }

        btn.style.left = `${posX}px`;
        btn.style.top = `${posY}px`;
        btn.style.transform = `rotate(${velX * 3}deg)`;

        window.LevelModules['broken_button'].animFrameId = requestAnimationFrame(physicsLoop);
      };

      physicsLoop();
    };

    btn.addEventListener('mouseenter', startFalling);

    btn.addEventListener('click', () => {
      if (!hasFallen) {
        startFalling();
        return;
      }
      if (isCaught) return;
      isCaught = true;
      btn.style.pointerEvents = 'none';
      btn.style.background = '#facc15';
      btn.textContent = isTr ? 'YAKALANDI!' : 'CAUGHT!';
      if (window.AudioEngine) window.AudioEngine.play('pass');

      setTimeout(() => {
        onComplete();
      }, 300);
    });
  },

  cleanup: function() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }
};
