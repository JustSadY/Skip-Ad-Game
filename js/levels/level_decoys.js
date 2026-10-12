// LEVEL: Gerçek MediaFire / Softonic Sahte İndirme Reklamları Tuzağı (AdChoices Fake Downloads)
window.LevelModules = window.LevelModules || {};

window.LevelModules['decoys'] = {
  id: 'decoys',
  url: 'https://turbodrive-cloud.net/download/file',
  tabTitle: (lang) => lang === 'tr' ? 'Hızlı Dosya İndir' : 'Fast File Download',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { name: 'K-T-A 7', file: 'KTA7_Full_Setup.pkg', size: '68 GB' };

    container.innerHTML = `
      <div style="
        flex: 1;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: #f1f5f9;
        color: #1e293b;
        padding: 30px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
      ">
        
        <!-- YAZILIM İNDİRME SAYFASI KAPSAYICISI -->
        <div style="width: 100%; max-width: 680px;">
          
          <!-- ÜST SİTE BAŞLIĞI -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 24px;">📥</span>
              <span style="font-size: 20px; font-weight: 900; color: #0284c7;">TurboDrive Cloud</span>
            </div>
            <span style="font-size: 11px; color: #64748b; background: #e2e8f0; padding: 4px 10px; border-radius: 999px; font-weight: 600;">
              SHA-256 Doğrulandı
            </span>
          </div>

          <!-- 1. BÜYÜK SAHTE ADCHOICES REKLAM BANNERI (TUZAK) -->
          <div class="adchoices-fake-banner" style="
            background: #ffffff;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            position: relative;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
            cursor: pointer;
            text-align: center;
          ">
            <!-- ADCHOICES ETİKETİ -->
            <div style="position: absolute; top: 4px; right: 6px; font-size: 9px; color: #0284c7; font-weight: 700; display: flex; align-items: center; gap: 2px;">
              <span>AdChoices</span>
              <span style="background: #0284c7; color: #fff; border-radius: 50%; width: 11px; height: 11px; display: inline-flex; align-items: center; justify-content: center; font-size: 8px;">i</span>
            </div>

            <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">REKLAM • SPONSORED</div>
            
            <button class="decoy-ad-button" style="
              background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
              color: #ffffff;
              border: 1px solid #15803d;
              border-radius: 6px;
              padding: 14px 40px;
              font-size: 18px;
              font-weight: 900;
              box-shadow: 0 4px 14px rgba(34,197,94,0.4);
              cursor: pointer;
              letter-spacing: 0.5px;
            ">
              ⬇️ ${isTr ? 'START DOWNLOAD (HIZLI İNDİR)' : 'START DOWNLOAD NOW'}
            </button>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px;">
              PDF Converter & Media Player v4.2 • 2.1 MB
            </div>
          </div>

          <!-- GERÇEK DOSYA DETAY KARTI (REKLAMI GEÇMEK İÇİN BURADAKİ BUTON KULLANILIR) -->
          <div style="
            background: #ffffff;
            border: 2px solid #0284c7;
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 10px 25px rgba(2, 132, 199, 0.1);
          ">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <div>
                <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0 0 4px 0;">
                  📦 ${game.file}
                </h3>
                <div style="font-size: 12px; color: #64748b;">
                  ${game.name} • Boyut: ${game.size} • Dosya Türü: Kurulum Paketi
                </div>
              </div>

              <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 6px;">
                ✓ Güvenli & Virüssüz
              </span>
            </div>

            <!-- GERÇEK BUTON -->
            <button id="realFileDownloadBtn" style="
              width: 100%;
              background: #0284c7;
              color: #ffffff;
              border: none;
              padding: 14px 20px;
              border-radius: 8px;
              font-size: 15px;
              font-weight: 800;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              box-shadow: 0 4px 15px rgba(2, 132, 199, 0.35);
              transition: background 0.15s;
            ">
              <span>🚀</span>
              <span>${isTr ? 'REKLAMI GEÇ VE İNDİRMEYİ BAŞLAT' : 'SKIP AD & LAUNCH DOWNLOAD'}</span>
              <span>(${game.size})</span>
            </button>
          </div>

          <!-- 2. ALT SAHTE ADCHOICES REKLAM BANNERLARI (TUZAK GRUBU) -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
            
            <div class="adchoices-fake-banner" style="
              background: #ffffff;
              border: 1px solid #cbd5e1;
              border-radius: 8px;
              padding: 14px;
              text-align: center;
              position: relative;
              cursor: pointer;
            ">
              <div style="position: absolute; top: 4px; right: 6px; font-size: 8px; color: #0284c7;">AdChoices ⓘ</div>
              <div style="font-size: 9px; color: #94a3b8; margin-bottom: 6px;">SPONSORED</div>
              <button class="decoy-ad-button" style="
                background: #f59e0b;
                color: #000;
                border: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                width: 100%;
              ">
                ⚡ HIZLI YÜKLE (PRO)
              </button>
            </div>

            <div class="adchoices-fake-banner" style="
              background: #ffffff;
              border: 1px solid #cbd5e1;
              border-radius: 8px;
              padding: 14px;
              text-align: center;
              position: relative;
              cursor: pointer;
            ">
              <div style="position: absolute; top: 4px; right: 6px; font-size: 8px; color: #0284c7;">AdChoices ⓘ</div>
              <div style="font-size: 9px; color: #94a3b8; margin-bottom: 6px;">SPONSORED</div>
              <button class="decoy-ad-button" style="
                background: #3b82f6;
                color: #fff;
                border: none;
                padding: 10px 16px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 13px;
                cursor: pointer;
                width: 100%;
              ">
                📥 İNDİRME YÖNETİCİSİ
              </button>
            </div>

          </div>

        </div>

      </div>
    `;

    // Sahte AdChoices reklamlarına tıklanınca hata ver
    container.querySelectorAll('.adchoices-fake-banner').forEach(banner => {
      banner.addEventListener('click', () => {
        onError();
        if (window.AudioEngine) window.AudioEngine.play('fail');
        showToast(isTr 
          ? 'Tuzak! Üzerinde "AdChoices" yazan butonlar sponsorlu reklamlardır. Gerçek dosya kutusundaki butonu bulun.' 
          : 'Trap! Buttons with "AdChoices" are sponsored ads. Find the button in the genuine file box.');
      });
    });

    // Gerçek Dosya Butonuna Basınca Seviyeyi Geç
    const realBtn = document.getElementById('realFileDownloadBtn');
    realBtn.addEventListener('click', () => {
      realBtn.style.pointerEvents = 'none';
      realBtn.style.background = '#22c55e';
      realBtn.textContent = isTr ? '✓ İndirme Başlatıldı, Reklam Geçiliyor...' : '✓ Download Started, Skipping...';
      if (window.AudioEngine) window.AudioEngine.play('pass');
      setTimeout(() => {
        onComplete();
      }, 350);
    });
  },

  cleanup: function() {}
};
