// LEVEL: Fareden Kaçan Buton (Dodging Button)
window.LevelModules = window.LevelModules || {};

window.LevelModules['flee'] = {
  id: 'flee',
  url: 'https://speed-gate.io/catch-me',
  tabTitle: (lang) => lang === 'tr' ? 'Hızlı Buton Arenası' : 'Dodging Button Arena',

  mouseHandler: null,

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div id="fleeArena" style="flex: 1; position: relative; overflow: hidden; background: radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0b0f19 80%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
        
        <div style="text-align: center; margin-bottom: 24px; pointer-events: none; z-index: 5;">
          <h2 style="font-size: 24px; font-weight: 800; color: #facc15; margin-bottom: 6px;">
            ${isTr ? '🏃 KAÇAN REKLAM BUTONU' : '🏃 FLEEING AD BUTTON'}
          </h2>
          <p style="font-size: 13px; color: #94a3b8; max-width: 480px;">
            ${isTr ? 'Reklamı geçmek istiyorsan önce butonu yakala! Fare yaklaştıkça kaçar.' : 'Catch the button if you want to skip! It evades your cursor.'}
          </p>
        </div>

        <!-- KAÇAN BUTON -->
        <button id="fleeBtn" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #22c55e; color: #000; font-family: var(--font-ui); font-size: 15px; font-weight: 800; padding: 14px 28px; border-radius: 12px; border: 2px solid #86efac; cursor: pointer; box-shadow: 0 10px 25px rgba(34, 197, 94, 0.5); transition: left 0.12s ease-out, top 0.12s ease-out; z-index: 20; white-space: nowrap;">
          ${isTr ? 'REKLAMI GEÇ (YAKALA!)' : 'SKIP AD (CATCH ME!)'}
        </button>

        <!-- YARDIMCI / HİLE BUTONU (KÖŞEDE) -->
        <div style="position: absolute; bottom: 24px; display: flex; gap: 12px; z-index: 10;">
          <button id="freezeTrapBtn" style="background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); color: #c7d2fe; font-size: 12px; font-weight: 700; padding: 8px 16px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
            ❄️ ${isTr ? 'Butonu 2 Saniyeliğine Dondur' : 'Freeze Button for 2s'}
          </button>
        </div>

      </div>
    `;

    const arena = document.getElementById('fleeArena');
    const fleeBtn = document.getElementById('fleeBtn');
    const freezeBtn = document.getElementById('freezeTrapBtn');

    let isFrozen = false;
    let posX = arena.clientWidth / 2;
    let posY = arena.clientHeight / 2;

    this.mouseHandler = (e) => {
      if (isFrozen) return;

      const rect = arena.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const btnRect = fleeBtn.getBoundingClientRect();
      const btnCenterX = (btnRect.left + btnRect.width / 2) - rect.left;
      const btnCenterY = (btnRect.top + btnRect.height / 2) - rect.top;

      const dx = btnCenterX - mouseX;
      const dy = btnCenterY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // 140px menzile girdiğinde kaç
      if (dist < 140) {
        const angle = Math.atan2(dy, dx);
        const speed = 120;
        
        let newX = btnCenterX + Math.cos(angle) * speed;
        let newY = btnCenterY + Math.sin(angle) * speed;

        // Sınırlar içinde tut
        const padding = 80;
        newX = Math.max(padding, Math.min(arena.clientWidth - padding, newX));
        newY = Math.max(padding, Math.min(arena.clientHeight - padding, newY));

        fleeBtn.style.left = `${newX}px`;
        fleeBtn.style.top = `${newY}px`;
        fleeBtn.style.transform = 'translate(-50%, -50%)';
      }
    };

    arena.addEventListener('mousemove', this.mouseHandler);

    freezeBtn.addEventListener('click', () => {
      isFrozen = true;
      fleeBtn.style.background = '#38bdf8';
      fleeBtn.style.borderColor = '#bae6fd';
      fleeBtn.textContent = isTr ? '❄️ DONDURULDU! TIKLA!' : '❄️ FROZEN! CLICK!';
      if (window.AudioEngine) window.AudioEngine.play('tick');

      setTimeout(() => {
        isFrozen = false;
        fleeBtn.style.background = '#22c55e';
        fleeBtn.style.borderColor = '#86efac';
        fleeBtn.textContent = isTr ? 'REKLAMI GEÇ (YAKALA!)' : 'SKIP AD (CATCH ME!)';
      }, 2000);
    });

    fleeBtn.addEventListener('click', () => {
      onComplete();
    });
  },

  cleanup: function() {
    if (this.mouseHandler) {
      const arena = document.getElementById('fleeArena');
      if (arena) arena.removeEventListener('mousemove', this.mouseHandler);
    }
  }
};
