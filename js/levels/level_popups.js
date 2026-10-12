// LEVEL: Pop-Up Fırtınası (Yalandan Reklam Atmalar)
window.LevelModules = window.LevelModules || {};

window.LevelModules['popups'] = {
  id: 'popups',
  url: 'https://ad-storm-portal.xyz/unblock',
  tabTitle: (lang) => lang === 'tr' ? 'Reklam Yağmuru!' : 'Pop-Up Storm!',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div id="popupStage" style="flex: 1; position: relative; overflow: hidden; background: #0a0e17; display: flex; align-items: center; justify-content: center; padding: 20px;">
        
        <!-- MERKEZDEKİ GERÇEK GEÇİŞ BUTONU -->
        <div style="text-align: center; z-index: 1;">
          <div style="font-size: 48px; margin-bottom: 12px;">🏆</div>
          <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 6px;">
            ${isTr ? 'REKLAMLARIN ARKASINDAKİ GERÇEK BUTON' : 'THE REAL BUTTON BEHIND ADS'}
          </h2>
          <p style="font-size: 13px; color: #94a3b8; margin-bottom: 20px;">
            ${isTr ? 'Tüm pencereleri kapatarak gerçek butona ulaş!' : 'Close all pop-up windows to reach the real button!'}
          </p>
          <button id="finalUnderneathBtn" style="background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; font-family: var(--font-ui); font-size: 16px; font-weight: 800; padding: 14px 36px; border-radius: 12px; border: 2px solid #86efac; cursor: pointer; box-shadow: 0 10px 25px rgba(34, 197, 94, 0.4);">
            ${isTr ? '✓ REKLAMI GEÇ' : '✓ SKIP AD'}
          </button>
        </div>

        <!-- POP-UP 1: TELEFON ÖDÜLÜ -->
        <div class="pop-window" id="pop1" style="position: absolute; top: 12%; left: 15%; width: 290px; background: #1e293b; border: 2px solid #facc15; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); z-index: 10;">
          <div style="background: #facc15; color: #000; padding: 6px 12px; font-weight: 800; font-size: 12px; display: flex; justify-content: space-between; align-items: center; border-radius: 10px 10px 0 0;">
            <span>🎁 ${isTr ? '1.000.000. ZİYARETÇİ!' : '1,000,000th VISITOR!'}</span>
            <span class="pop-close" style="cursor: pointer; font-size: 14px; padding: 0 4px;">✕</span>
          </div>
          <div style="padding: 16px; text-align: center; color: #cbd5e1; font-size: 12px;">
            <div style="font-size: 32px; margin-bottom: 6px;">📱</div>
            <strong>${isTr ? 'Akıllı Telefon Kazandınız!' : 'You Won a Smartphone!'}</strong>
            <button class="pop-trap-btn" style="width: 100%; margin-top: 10px; background: #facc15; border: none; color: #000; font-weight: 800; padding: 8px; border-radius: 6px; cursor: pointer;">
              ${isTr ? 'Hemen Al' : 'Claim Now'}
            </button>
          </div>
        </div>

        <!-- POP-UP 2: VİRÜS UYARISI -->
        <div class="pop-window" id="pop2" style="position: absolute; top: 25%; right: 18%; width: 310px; background: #1e293b; border: 2px solid #ef4444; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); z-index: 12;">
          <div style="background: #ef4444; color: #fff; padding: 6px 12px; font-weight: 800; font-size: 12px; display: flex; justify-content: space-between; align-items: center; border-radius: 10px 10px 0 0;">
            <span>⚠️ ${isTr ? 'GÜVENLİK TEHLİKESİ' : 'SECURITY ALERT'}</span>
            <span class="pop-close" style="cursor: pointer; font-size: 14px; padding: 0 4px;">✕</span>
          </div>
          <div style="padding: 16px; text-align: center; color: #cbd5e1; font-size: 12px;">
            <div style="font-size: 32px; margin-bottom: 6px;">👾</div>
            <strong>${isTr ? 'Bilgisayarda 47 Virüs Bulundu!' : '47 Viruses Detected!'}</strong>
            <button class="pop-trap-btn" style="width: 100%; margin-top: 10px; background: #ef4444; border: none; color: #fff; font-weight: 800; padding: 8px; border-radius: 6px; cursor: pointer;">
              ${isTr ? 'Hemen Temizle' : 'Clean Now'}
            </button>
          </div>
        </div>

        <!-- POP-UP 3: BİLDİRİM İZNİ -->
        <div class="pop-window" id="pop3" style="position: absolute; bottom: 15%; left: 30%; width: 280px; background: #1e293b; border: 1px solid #334155; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); z-index: 14;">
          <div style="background: #0f172a; padding: 8px 12px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between; align-items: center; border-radius: 10px 10px 0 0;">
            <span>🔔 ${isTr ? 'Bildirim İzni' : 'Notification Permission'}</span>
            <span class="pop-close" style="cursor: pointer; font-size: 14px; padding: 0 4px;">✕</span>
          </div>
          <div style="padding: 14px; text-align: center; font-size: 12px; color: #cbd5e1;">
            <p>${isTr ? 'Reklam güncellemeleri almak istiyor musunuz?' : 'Want to receive ad updates?'}</p>
            <div style="display: flex; gap: 8px; margin-top: 10px;">
              <button class="pop-trap-btn" style="flex: 1; background: #3b82f6; border: none; color: #fff; font-weight: 700; padding: 6px; border-radius: 6px; cursor: pointer;">${isTr ? 'İzin Ver' : 'Allow'}</button>
              <button class="pop-close-btn" style="flex: 1; background: #334155; border: none; color: #fff; font-weight: 700; padding: 6px; border-radius: 6px; cursor: pointer;">${isTr ? 'Engelle' : 'Block'}</button>
            </div>
          </div>
        </div>

        <!-- POP-UP 4: ÇARKIFELEK -->
        <div class="pop-window" id="pop4" style="position: absolute; top: 40%; left: 40%; width: 270px; background: #1e293b; border: 2px solid #a855f7; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); z-index: 16;">
          <div style="background: #a855f7; color: #fff; padding: 6px 12px; font-weight: 800; font-size: 12px; display: flex; justify-content: space-between; align-items: center; border-radius: 10px 10px 0 0;">
            <span>🎡 ${isTr ? 'ŞANSLI ÇARK' : 'LUCKY WHEEL'}</span>
            <span class="pop-close" style="cursor: pointer; font-size: 14px; padding: 0 4px;">✕</span>
          </div>
          <div style="padding: 14px; text-align: center; font-size: 12px; color: #cbd5e1;">
            <div style="font-size: 32px;">🎯</div>
            <p style="margin-top: 4px;">${isTr ? 'Bedava çevirme hakkı kazandınız!' : 'You got a free spin!'}</p>
            <button class="pop-trap-btn" style="width: 100%; margin-top: 8px; background: #a855f7; border: none; color: #fff; font-weight: 800; padding: 6px; border-radius: 6px; cursor: pointer;">
              ${isTr ? 'Çevir!' : 'Spin!'}
            </button>
          </div>
        </div>

      </div>
    `;

    const stage = document.getElementById('popupStage');
    let openCount = 4;

    const closePop = (win) => {
      win.style.transform = 'scale(0.8)';
      win.style.opacity = '0';
      win.style.transition = 'all 0.2s';
      if (window.AudioEngine) window.AudioEngine.play('tick');
      setTimeout(() => {
        win.remove();
        openCount--;
      }, 200);
    };

    stage.querySelectorAll('.pop-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const win = btn.closest('.pop-window');
        closePop(win);
      });
    });

    stage.querySelectorAll('.pop-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const win = btn.closest('.pop-window');
        closePop(win);
      });
    });

    stage.querySelectorAll('.pop-trap-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onError();
        const win = btn.closest('.pop-window');
        win.classList.add('shake-anim');
        setTimeout(() => win.classList.remove('shake-anim'), 350);
        showToast(isTr ? 'Sahte reklama tıkladınız! Sağ üstteki X ile kapatın!' : 'Clicked fake ad! Close it using the top-right X!');
      });
    });

    document.getElementById('finalUnderneathBtn').addEventListener('click', () => {
      if (openCount > 0) {
        onError();
        showToast(isTr ? 'Önce önünüzdeki reklam pencerelerini kapatın!' : 'Close the popup windows blocking your view first!');
        return;
      }
      onComplete();
    });
  },

  cleanup: function() {}
};
