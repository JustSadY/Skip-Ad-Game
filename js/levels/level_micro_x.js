// LEVEL: Gerçek Google AdSense / AdChoices Reklam Afişi ve Minik 'X' Kapatma Tuzağı
window.LevelModules = window.LevelModules || {};

window.LevelModules['micro_x'] = {
  id: 'micro_x',
  url: 'https://fullscreen-ad-network.net/display',
  tabTitle: (lang) => lang === 'tr' ? 'Sponsorlu Reklam' : 'Sponsored Banner',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { name: 'K-T-A 7' };

    container.innerHTML = `
      <div style="
        flex: 1;
        width: 100%;
        height: 100%;
        position: relative;
        background: #0f172a;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 20px;
        box-sizing: border-box;
      ">
        
        <!-- REKLAM KAPANDIKTAN SONRA GÖRÜNEN GERÇEK SAYFA -->
        <div id="underlyingPage" style="text-align: center; z-index: 1;">
          <div style="font-size: 52px; margin-bottom: 12px;">🎉</div>
          <h2 style="font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
            ${isTr ? 'Tebrikler! Reklam Başarıyla Kapatıldı' : 'Congrats! Ad Successfully Closed'}
          </h2>
          <p style="font-size: 13px; color: #94a3b8; margin-bottom: 24px; max-width: 420px; line-height: 1.5;">
            ${isTr 
              ? `${game.name} indirme linkine ulaşmak için aşağıdaki butona basın.` 
              : `Click the button below to proceed to the ${game.name} download.`}
          </p>
          <button id="afterXSkipBtn" style="
            background: #22c55e;
            color: #000000;
            font-family: var(--font-ui);
            font-size: 15px;
            font-weight: 800;
            padding: 14px 36px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.4);
            transition: transform 0.1s;
          ">
            ${isTr ? 'REKLAMI GEÇ ➔' : 'SKIP AD ➔'}
          </button>
        </div>

        <!-- DEV GERÇEKÇİ GOOGLE ADSENSE REKLAM BANNERI (ÖNDE) -->
        <div id="giantAdsenseBanner" style="
          position: absolute;
          inset: 20px;
          background: #ffffff;
          border: 1px solid #dadce0;
          border-radius: 8px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.85);
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          
          <!-- GERÇEK GOOGLE ADCHOICES KÖŞE ETİKETİ VE MİNİK 'X' -->
          <div style="
            position: absolute;
            top: 6px;
            right: 8px;
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid #dadce0;
            border-radius: 3px;
            padding: 2px 4px;
            font-size: 10px;
            color: #5f6368;
            font-family: Roboto, Arial, sans-serif;
            z-index: 30;
          ">
            <span style="font-size: 9px; margin-right: 4px; color: #1a73e8; font-weight: 600;">AdChoices</span>
            <span style="font-size: 10px; color: #1a73e8; margin-right: 6px;">ⓘ</span>
            
            <!-- GERÇEK MİKRO X BUTONU -->
            <button id="realMicroX" title="${isTr ? 'Bu reklamı kapat' : 'Close this ad'}" style="
              background: #f1f3f4;
              border: 1px solid #dadce0;
              color: #3c4043;
              font-size: 11px;
              font-weight: 700;
              line-height: 1;
              width: 22px;
              height: 22px;
              border-radius: 3px;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 0;
              transition: background 0.15s;
            ">
              ✕
            </button>
          </div>

          <!-- BANNER İÇERİĞİ -->
          <div style="font-size: 54px; margin-bottom: 8px;">🎁 📱 ⚡</div>

          <span style="
            font-size: 10px;
            font-weight: 700;
            color: #9aa0a6;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 4px;
          ">
            GOOGLE SPONSORED ADVERTISEMENT
          </span>

          <h1 style="
            font-size: 26px;
            font-weight: 900;
            color: #1a73e8;
            margin: 4px 0 10px 0;
            text-align: center;
          ">
            ${isTr ? 'TEBRİKLER! YENİ NESİL AKILLI TELEFON KAZANDINIZ!' : 'CONGRATULATIONS! YOU WON A NEW SMARTPHONE!'}
          </h1>

          <p style="
            font-size: 13px;
            color: #5f6368;
            max-width: 440px;
            text-align: center;
            line-height: 1.5;
            margin-bottom: 24px;
          ">
            ${isTr 
              ? 'Ödülünüzü hemen teslim almak ve onaylamak için aşağıdaki butona tıklayın! (UYARI: Bu bir reklamdır, kapatmak için sağ üstteki küçük çarpıyı bulun.)' 
              : 'Claim your prize today by clicking the button below! (Find the real tiny X at the top right to close).'}
          </p>

          <!-- TUZAK BÜYÜK BUTON -->
          <button class="trap-ad-banner-click" style="
            background: linear-gradient(180deg, #1a73e8 0%, #1557b0 100%);
            color: #ffffff;
            border: none;
            padding: 14px 44px;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(26,115,232,0.4);
            letter-spacing: 0.5px;
          ">
            ${isTr ? 'HEDİYEYİ AL & REKLAMI KAPAT' : 'CLAIM PRIZE & CLOSE'}
          </button>

        </div>

      </div>
    `;

    const banner = document.getElementById('giantAdsenseBanner');
    const realMicroX = document.getElementById('realMicroX');
    const afterSkipBtn = document.getElementById('afterXSkipBtn');

    // Banner'ın herhangi bir yerine tıklayınca tuzak uyarısı
    banner.addEventListener('click', (e) => {
      // Eğer gerçek X'e basılmadıysa hata ver
      if (e.target === realMicroX) return;
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
      banner.style.transform = 'translateX(-6px)';
      setTimeout(() => banner.style.transform = 'translateX(6px)', 80);
      setTimeout(() => banner.style.transform = 'translateX(0)', 160);
      showToast(isTr 
        ? 'Reklamın içine tıkladınız! Sağ üst köşedeki minik AdChoices "✕" simgesine basmalısınız.' 
        : 'You clicked the ad! Find the tiny AdChoices "✕" at the top right.');
    });

    // Gerçek Mikro 'X' Tıklaması
    realMicroX.addEventListener('click', (e) => {
      e.stopPropagation();
      banner.style.transform = 'scale(0.01) translateY(40px)';
      banner.style.opacity = '0';
      if (window.AudioEngine) window.AudioEngine.play('pass');
      setTimeout(() => {
        banner.remove();
      }, 300);
    });

    // Sayfa altındaki REKLAMI GEÇ butonu
    afterSkipBtn.addEventListener('click', () => {
      onComplete();
    });
  },

  cleanup: function() {}
};
