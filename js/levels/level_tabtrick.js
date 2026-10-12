// LEVEL: Sahte Sekme Hilesi (Pop-Under Tab Trick)
window.LevelModules = window.LevelModules || {};

window.LevelModules['tabtrick'] = {
  id: 'tabtrick',
  url: 'https://casino-slot-jackpot.xyz/win',
  tabTitle: (lang) => lang === 'tr' ? '🎰 CASINO BÜYÜK KAZANÇ' : '🎰 CASINO MEGA WIN',

  origTabClickHandler: null,
  trapTab: null,

  render: function(container, onComplete, onError, showToast, t) {
    this.cleanup();
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { name: 'K-T-A 7' };

    // Simulated Chrome sekme çubuğuna eriş
    const tabsContainer = document.querySelector('.chrome-tabs-container');
    const originalTab = document.getElementById('activeChromeTab');

    // Güvenlik: Eğer DOM'da sekme çubuğu bulunamazsa in-viewport sekme simülasyonu yap
    if (tabsContainer && originalTab) {
      originalTab.classList.remove('active');
      const origTitle = originalTab.querySelector('.tab-title');
      if (origTitle) {
        origTitle.textContent = isTr ? `🔗 ${game.name} Kapısı` : `🔗 ${game.name} Gate`;
      }

      this.trapTab = document.createElement('div');
      this.trapTab.className = 'chrome-tab active';
      this.trapTab.id = 'casinoTrapTab';
      this.trapTab.innerHTML = `
        <span class="tab-icon">🎰</span>
        <span class="tab-title">${isTr ? 'BÜYÜK KAZANÇ!' : 'MEGA JACKPOT!'}</span>
        <span class="tab-close" id="trapTabCloseBtn">×</span>
      `;
      tabsContainer.appendChild(this.trapTab);
    }

    // Viewport'a Casino Reklamı koy
    const renderCasinoPage = () => {
      container.innerHTML = `
        <div style="flex: 1; background: radial-gradient(circle, #701a75 0%, #1e1b4b 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; text-align: center;">
          <div style="font-size: 64px; animation: pulseGreen 1s infinite alternate;">🎰 777 🎰</div>
          <h1 style="font-size: 28px; font-weight: 900; color: #facc15; margin: 12px 0 6px 0;">
            ${isTr ? 'TEBRİKLER! 500.000 TL KAZANDINIZ!' : 'CONGRATULATIONS! $50,000 WON!'}
          </h1>
          <p style="font-size: 14px; color: #f5d0fe; max-width: 440px; margin-bottom: 24px; line-height: 1.5;">
            ${isTr 
              ? 'Bu pop-under reklam sekmesi otomatik açıldı! Asıl indirme sayfasına dönmek için yukarıdaki sekme çubuğundan diğer sekmeye tıklayın veya aşağıdaki butona basın!' 
              : 'This pop-under tab opened automatically! Click the original tab in the top tab bar to return!'}
          </p>

          <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
            <button id="casinoTrapBtn" style="background: #e11d48; color: #fff; font-family: var(--font-ui); font-size: 15px; font-weight: 900; padding: 12px 28px; border-radius: 10px; border: 2px solid #fda4af; cursor: pointer; box-shadow: 0 10px 25px rgba(225,29,72,0.6);">
              ${isTr ? 'ÖDÜLÜ AL (TUZAK)' : 'CLAIM PRIZE (TRAP)'}
            </button>

            <!-- YEDEK MOBİL/KULLANICI GEÇİŞİ: "SEKMEYİ KAPAT" -->
            <button id="closeCasinoTabBtn" style="background: #334155; color: #cbd5e1; font-family: var(--font-ui); font-size: 13px; font-weight: 700; padding: 12px 20px; border-radius: 10px; border: 1px solid #475569; cursor: pointer;">
              ✕ ${isTr ? 'Bu Sekmeyi Kapat ve Geri Dön' : 'Close Tab & Return'}
            </button>
          </div>
        </div>
      `;

      const trapBtn = document.getElementById('casinoTrapBtn');
      if (trapBtn) {
        trapBtn.addEventListener('click', () => {
          onError();
          if (window.AudioEngine) window.AudioEngine.play('fail');
          showToast(isTr ? 'Tuzak reklam! Yukarıdaki sekmelerden orijinal sekmeye dönün!' : 'Trap ad! Switch back to the original tab in the tab bar above!');
        });
      }

      const closeBtn = document.getElementById('closeCasinoTabBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          switchToRealPage();
        });
      }
    };

    // Orijinal indirme sayfası
    const renderRealPage = () => {
      container.innerHTML = `
        <div style="flex: 1; background: #0f172a; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; text-align: center;">
          <div style="font-size: 54px; margin-bottom: 12px;">✅</div>
          <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 6px;">
            ${isTr ? 'DOĞRU SEKMEDESİNİZ!' : 'YOU ARE ON THE RIGHT TAB!'}
          </h2>
          <p style="font-size: 13px; color: #94a3b8; max-width: 420px; margin-bottom: 24px;">
            ${isTr ? 'Sahte pop-under sekmesinden kurtuldunuz. Artık linke devam edebilirsiniz.' : 'You escaped the fake pop-under tab. You can now proceed.'}
          </p>
          <button id="tabSkipSuccessBtn" style="background: #22c55e; color: #000; font-family: var(--font-ui); font-size: 15px; font-weight: 800; padding: 12px 32px; border-radius: 10px; border: none; cursor: pointer; box-shadow: 0 4px 15px rgba(34,197,94,0.4);">
            ${isTr ? 'REKLAMI GEÇ ➜' : 'SKIP AD ➜'}
          </button>
        </div>
      `;

      const skipBtn = document.getElementById('tabSkipSuccessBtn');
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          onComplete();
        });
      }
    };

    const switchToRealPage = () => {
      if (originalTab) {
        originalTab.classList.add('active');
      }
      if (this.trapTab) {
        this.trapTab.remove();
        this.trapTab = null;
      }
      if (window.AudioEngine) window.AudioEngine.play('tick');
      renderRealPage();
    };

    renderCasinoPage();

    // Sekmeler arası geçiş olaylarını bağla
    if (originalTab) {
      this.origTabClickHandler = () => {
        switchToRealPage();
      };
      originalTab.addEventListener('click', this.origTabClickHandler);
    }

    if (this.trapTab) {
      const closeTabX = this.trapTab.querySelector('#trapTabCloseBtn');
      if (closeTabX) {
        closeTabX.addEventListener('click', (e) => {
          e.stopPropagation();
          switchToRealPage();
        });
      }
    }
  },

  cleanup: function() {
    if (this.trapTab) {
      this.trapTab.remove();
      this.trapTab = null;
    }
    const orig = document.getElementById('activeChromeTab');
    if (orig) {
      orig.classList.add('active');
      if (this.origTabClickHandler) {
        orig.removeEventListener('click', this.origTabClickHandler);
        this.origTabClickHandler = null;
      }
    }
  }
};
