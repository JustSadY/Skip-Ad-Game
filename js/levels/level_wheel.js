// LEVEL: Şans Çarkı / 1.000.000'ıncı Ziyaretçi Tuzağı
window.LevelModules = window.LevelModules || {};

window.LevelModules['wheel'] = {
  id: 'wheel',
  url: 'https://lucky-spin-reward.win/claim-bonus',
  tabTitle: (lang) => lang === 'tr' ? '🎉 TEBRİKLER KAZANDINIZ!' : '🎉 CONGRATULATIONS YOU WON!',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { name: 'K-T-A 7' };

    container.innerHTML = `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: radial-gradient(circle, #3b0764 0%, #0f172a 100%); padding: 20px; color: #fff; text-align: center; overflow: hidden; position: relative;">
        
        <div style="position: absolute; top: 10px; font-size: 24px; animation: bounce 1s infinite;">🎰 🎁 💰</div>

        <div style="background: rgba(15, 23, 42, 0.85); border: 2px solid #eab308; border-radius: 20px; padding: 24px; max-width: 480px; width: 100%; box-shadow: 0 0 40px rgba(234, 179, 8, 0.3);">
          <div style="font-size: 13px; font-weight: 800; color: #facc15; letter-spacing: 1px;">
            ${isTr ? '★ 1.000.000\'INCI ŞANSLI KULLANICI SEÇİLDİNİZ! ★' : '★ YOU ARE THE 1,000,000TH LUCKY VISITOR! ★'}
          </div>

          <h2 style="font-size: 20px; font-weight: 900; margin: 8px 0 16px 0;">
            ${isTr ? 'Çarkı Çevirin ve ' + game.name + ' VIP Lisansını Kazanın!' : 'Spin the Wheel and Win ' + game.name + ' VIP Key!'}
          </h2>

          <!-- DÖNEN ÇARK SİMÜLASYONU -->
          <div style="position: relative; width: 180px; height: 180px; margin: 0 auto 16px auto;">
            <div id="fortuneWheel" style="
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 6px solid #eab308;
              background: conic-gradient(#ef4444 0% 25%, #3b82f6 25% 50%, #22c55e 50% 75%, #f59e0b 75% 100%);
              box-shadow: 0 0 20px rgba(0,0,0,0.6);
              transition: transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 28px;
            ">
              🎯
            </div>
            <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); font-size: 22px;">🔻</div>
          </div>

          <!-- AKSİYON ALANI -->
          <div id="wheelActions">
            <button id="spinBtn" style="background: linear-gradient(135deg, #facc15 0%, #eab308 100%); color: #000; border: none; font-family: var(--font-ui); font-size: 15px; font-weight: 900; padding: 12px 32px; border-radius: 999px; cursor: pointer; box-shadow: 0 4px 15px rgba(234, 179, 8, 0.4);">
              ${isTr ? 'ŞANSINI DENE (ÜCRETSİZ ÇEVİR)' : 'SPIN FOR FREE'}
            </button>
          </div>

          <!-- KAZANMA POPUP KARTI (GİZLİ BAŞLAR) -->
          <div id="prizeResultCard" style="display: none; margin-top: 14px; background: rgba(0,0,0,0.5); padding: 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
            <div style="font-size: 16px; font-weight: 800; color: #4ade80;">
              🎉 ${isTr ? 'TEBRİKLER: ' + game.name + ' VIP ERİŞİMİ ÇIKTI!' : 'CONGRATULATIONS: ' + game.name + ' VIP KEY WON!'}
            </div>
            <button id="trapClaimBtn" style="background: #22c55e; color: #000; border: none; font-weight: 800; font-size: 13px; padding: 10px 20px; border-radius: 8px; margin-top: 10px; cursor: pointer; width: 100%;">
              ${isTr ? 'ÖDÜLÜ İNDİR VE ETKİNLEŞTİR (129 MB)' : 'DOWNLOAD & CLAIM REWARD'}
            </button>
          </div>

          <!-- GİZLİ REKLAMI GEÇ BAĞLANTISI -->
          <div style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">
            <a href="javascript:void(0)" id="declineSkipLink" style="color: #64748b; font-size: 11px; text-decoration: underline; cursor: pointer;">
              ${isTr ? 'Ödülü talep etmeden doğrudan hedef sayfaya geç (Reklamı Geç)' : 'Skip prize claim and proceed directly to target link (Skip Ad)'}
            </a>
          </div>

        </div>
      </div>
    `;

    const wheel = document.getElementById('fortuneWheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultCard = document.getElementById('prizeResultCard');
    const trapClaimBtn = document.getElementById('trapClaimBtn');
    const declineLink = document.getElementById('declineSkipLink');

    let isSpinning = false;

    // Çarkı Çevir
    spinBtn.addEventListener('click', () => {
      if (isSpinning) return;
      isSpinning = true;
      spinBtn.style.opacity = '0.5';
      spinBtn.style.pointerEvents = 'none';

      // 5 tur + hedef açı
      const rotations = 1800 + Math.floor(Math.random() * 360);
      wheel.style.transform = `rotate(${rotations}deg)`;
      if (window.AudioEngine) window.AudioEngine.play('tick');

      setTimeout(() => {
        resultCard.style.display = 'block';
        if (window.AudioEngine) window.AudioEngine.play('pass');
      }, 3100);
    });

    // Tuzak Ödülü Al Butonu
    trapClaimBtn.addEventListener('click', () => {
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
    });

    // Gerçek Reklamı Geç Linki
    declineLink.addEventListener('click', () => {
      declineLink.style.pointerEvents = 'none';
      if (window.AudioEngine) window.AudioEngine.play('pass');
      onComplete();
    });
  },

  cleanup: function() {}
};
