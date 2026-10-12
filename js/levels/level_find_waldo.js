// LEVEL: Kamufle Olmuş Reklamı Geç Butonu (Fenerle Arama)
window.LevelModules = window.LevelModules || {};

window.LevelModules['find_waldo'] = {
  id: 'find_waldo',
  url: 'https://gamers-blog-portal.org/download-news',
  tabTitle: (lang) => lang === 'tr' ? '📰 Oyun İncelemesi & İndir' : '📰 Game Review & Download',

  mouseHandler: null,

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { name: 'K-T-A 7' };

    // Butonun rastgele yerleşeceği 4 farklı yer
    const positions = [
      { top: '35%', left: '78%' },
      { top: '72%', left: '15%' },
      { top: '55%', left: '82%' },
      { top: '88%', left: '45%' }
    ];
    const chosenPos = positions[Math.floor(Math.random() * positions.length)];

    container.innerHTML = `
      <div id="flashlightContainer" style="
        flex: 1;
        background: #0f172a;
        color: #94a3b8;
        font-family: -apple-system, sans-serif;
        padding: 24px;
        overflow-y: auto;
        position: relative;
        cursor: crosshair;
      ">
        
        <div style="max-width: 680px; margin: 0 auto; position: relative;">
          
          <div style="display: flex; gap: 12px; margin-bottom: 16px;">
            <span style="background: #ef4444; color: #fff; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">SICAK HABER</span>
            <span style="font-size: 12px; color: #64748b;">12 Ekim 2026 • 24.120 Okunma</span>
          </div>

          <h1 style="font-size: 26px; font-weight: 900; color: #f8fafc; margin-bottom: 12px;">
            ${game.name} Çıktı Mı? Sistem Gereksinimleri ve İndirme Linkleri
          </h1>

          <!-- SAHTE DEV REKLAM BANNERI -->
          <div style="background: #1e293b; border: 2px solid #334155; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 18px; font-weight: 800; color: #facc15; margin-bottom: 8px;">⚡ ULTRA HIZLI İNDİRME LİNKİ</div>
            <p style="font-size: 12px; color: #cbd5e1; margin-bottom: 14px;">P2P ve Hızlı Sunucular Aktif (VIP Üyelik Gerekebilir)</p>
            <button id="trapFakeBannerBtn" style="background: #3b82f6; color: #fff; border: none; font-weight: 800; padding: 10px 24px; border-radius: 8px; cursor: pointer;">
              HIZLI İNDİR (60 MB/s)
            </button>
          </div>

          <p style="font-size: 13px; line-height: 1.8; margin-bottom: 16px;">
            Merakla beklenen yeni nesil açık dünya yapımı sonunda oyuncularla buluştu. Oyun dünyasında büyük yankı uyandıran bu sürüm, yenilenmiş grafik motoru ve gelişmiş fizik dinamikleriyle çıtayı zirveye taşıyor. Ancak oyuncuların indirme yaparken reklam ağlarına dikkat etmesi gerekiyor.
          </p>

          <p style="font-size: 13px; line-height: 1.8; margin-bottom: 16px;">
            Geliştirici stüdyonun yaptığı resmi açıklamaya göre, sunucular yoğun talep nedeniyle zaman zaman kilitlenebiliyor. Dosyayı indirmek isteyen kullanıcılar doğru geçiş linkini dikkatlice aramalıdır. Birçok kullanıcı sahte butonlara tıklayarak vakit kaybetmektedir.
          </p>

          <!-- KAMUFLE EDİLMİŞ GERÇEK REKLAMI GEÇ BUTONU -->
          <button id="camouflagedSkipBtn" style="
            position: absolute;
            top: ${chosenPos.top};
            left: ${chosenPos.left};
            background: #131b2e;
            border: 1px solid #1c2742;
            color: #334155;
            opacity: 0.75;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.2s ease;
            z-index: 50;
            user-select: none;
          ">
            ${isTr ? 'Reklamı Geç' : 'Skip Ad'}
          </button>

          <div style="background: #1e293b; border-radius: 8px; padding: 14px; font-size: 12px; line-height: 1.6; margin-top: 24px;">
            <div style="font-weight: 800; color: #38bdf8; margin-bottom: 6px;">İpucu:</div>
            ${isTr ? 'Sayfada gizlenmiş soluk bir "Reklamı Geç" butonu var. Fare imlecinizi yazılar üzerinde gezdirin!' : 'There is a faint "Skip Ad" button hidden on this page. Move your mouse to spot it!'}
          </div>

        </div>

      </div>
    `;

    const trapBtn = document.getElementById('trapFakeBannerBtn');
    const realBtn = document.getElementById('camouflagedSkipBtn');

    // Fare üzerine gelince fener gibi belirginleşsin
    realBtn.addEventListener('mouseenter', () => {
      realBtn.style.color = '#38bdf8';
      realBtn.style.background = '#1e293b';
      realBtn.style.borderColor = '#38bdf8';
      realBtn.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
    });

    realBtn.addEventListener('mouseleave', () => {
      realBtn.style.color = '#1e293b';
      realBtn.style.background = '#131b2e';
      realBtn.style.borderColor = '#1c2742';
      realBtn.style.boxShadow = 'none';
    });

    trapBtn.addEventListener('click', () => {
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
    });

    realBtn.addEventListener('click', () => {
      realBtn.style.pointerEvents = 'none';
      if (window.AudioEngine) window.AudioEngine.play('pass');
      onComplete();
    });
  },

  cleanup: function() {}
};
