// LEVEL: Gerçek Google Chrome Kırmızı Güvenlik Uyarısı (Deceptive Site Ahead)
window.LevelModules = window.LevelModules || {};

window.LevelModules['fake_virus'] = {
  id: 'fake_virus',
  url: 'chrome-error://chromewebdata/danger',
  tabTitle: (lang) => lang === 'tr' ? '⚠️ Güvenlik Uyarısı' : '⚠️ Security Warning',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div style="
        flex: 1;
        width: 100%;
        height: 100%;
        background: #d93025;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 24px;
        font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        box-sizing: border-box;
        overflow-y: auto;
      ">
        
        <!-- CHROME GÜVENLİK SAYFASI İÇERİK KUTUSU -->
        <div style="max-width: 600px; width: 100%; text-align: left;">
          
          <!-- BÜYÜK UYARI İKONU -->
          <div style="margin-bottom: 24px;">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 4L4 40H44L24 4Z" fill="#ffffff" fill-opacity="0.2"/>
              <path d="M24 8L7.5 38H40.5L24 8Z" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M24 20V28" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
              <circle cx="24" cy="33" r="2" fill="#ffffff"/>
            </svg>
          </div>

          <!-- BAŞLIK -->
          <h1 style="
            font-size: 26px;
            font-weight: 500;
            line-height: 1.3;
            margin-bottom: 16px;
            letter-spacing: -0.2px;
          ">
            ${isTr ? 'Yanıltıcı siteye girmek üzeresiniz' : 'Deceptive site ahead'}
          </h1>

          <!-- AÇIKLAMA METNİ -->
          <p style="
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 24px;
            opacity: 0.95;
            color: #ffffff;
          ">
            ${isTr 
              ? 'Saldırganlar <strong>defense-alert-scan.org</strong> sitesinde şifrelerinizi, mesajlarınızı veya indirme dosyalarınızı çalmanız için sizi kandırabilir (örneğin kötü amaçlı yazılımlar veya sahte reklamlar yoluyla).'
              : 'Attackers on <strong>defense-alert-scan.org</strong> may trick you into doing something dangerous like installing software or revealing your personal info.'}
          </p>

          <!-- BUTONLAR (GÜVENLİĞE DÖN & GELİŞMİŞ) -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
            
            <!-- GELİŞMİŞ ACCORDION BUTONU -->
            <button id="chromeAdvancedBtn" style="
              background: transparent;
              color: #ffffff;
              border: 1px solid rgba(255,255,255,0.4);
              padding: 9px 18px;
              border-radius: 4px;
              font-size: 13px;
              font-weight: 500;
              cursor: pointer;
              transition: background 0.15s;
            ">
              ${isTr ? 'Gelişmiş' : 'Advanced'}
            </button>

            <!-- TUZAK: GÜVENLİĞE DÖN BUTONU -->
            <button id="chromeBackToSafetyBtn" style="
              background: #ffffff;
              color: #d93025;
              border: none;
              padding: 10px 22px;
              border-radius: 4px;
              font-size: 14px;
              font-weight: 700;
              cursor: pointer;
              box-shadow: 0 1px 3px rgba(0,0,0,0.2);
              transition: opacity 0.15s;
            ">
              ${isTr ? 'Güvenliğe dön' : 'Back to safety'}
            </button>

          </div>

          <!-- GELİŞMİŞ DETAY PANELİ (BAŞTA GİZLİ) -->
          <div id="chromeAdvancedDetails" style="
            display: none;
            background: rgba(0,0,0,0.18);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 6px;
            padding: 18px;
            margin-top: 16px;
            line-height: 1.6;
            font-size: 13px;
          ">
            <p style="margin-bottom: 12px; opacity: 0.95;">
              ${isTr 
                ? 'Google Güvenli Tarama bu sitede şüpheli yönlendirmeler tespit etti. Güvenlik risklerini göze alıp reklamı geçmek istiyorsanız aşağıdaki bağlantıyı kullanabilirsiniz:'
                : 'Google Safe Browsing recently detected phishing on this site. If you understand the risks and want to skip the ad, click the link below:'}
            </p>

            <!-- GERÇEK ÇIKIŞ / ATLATMA LİNKİ -->
            <a href="javascript:void(0)" id="chromeProceedUnsafeLink" style="
              color: #ffffff;
              font-weight: 700;
              text-decoration: underline;
              display: inline-block;
              cursor: pointer;
              padding: 4px 0;
            ">
              ${isTr ? 'Bu güvenli olmayan siteyi ziyaret et ve Reklamı Geç (güvenli değil) →' : 'Proceed to unsafe site and Skip Ad (unsafe) →'}
            </a>
          </div>

          <!-- ALT BİLGİ DİPNOTU -->
          <div style="margin-top: 24px; font-size: 11px; opacity: 0.8;">
            ERR_CERT_COMMON_NAME_INVALID • Safe Browsing Protection System
          </div>

        </div>

      </div>
    `;

    const advancedBtn = document.getElementById('chromeAdvancedBtn');
    const advancedDetails = document.getElementById('chromeAdvancedDetails');
    const backSafetyBtn = document.getElementById('chromeBackToSafetyBtn');
    const proceedLink = document.getElementById('chromeProceedUnsafeLink');

    // "Gelişmiş" tıklanınca gizli bypass bağlantısını aç
    advancedBtn.addEventListener('click', () => {
      const isVisible = advancedDetails.style.display === 'block';
      advancedDetails.style.display = isVisible ? 'none' : 'block';
      advancedBtn.style.background = isVisible ? 'transparent' : 'rgba(255,255,255,0.15)';
      if (window.AudioEngine) window.AudioEngine.play('tick');
    });

    // "Güvenliğe dön" tıklandığında hata ver (Tuzak buton)
    backSafetyBtn.addEventListener('click', () => {
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
      showToast(isTr ? 'Güvenliğe dönerseniz reklamı geçemezsiniz! "Gelişmiş" seçeneğini inceleyin.' : 'Returning to safety won\'t skip the ad! Check "Advanced" options.');
    });

    // "Bu güvenli olmayan siteyi ziyaret et" -> GERÇEK GEÇİŞ!
    proceedLink.addEventListener('click', () => {
      proceedLink.style.pointerEvents = 'none';
      proceedLink.textContent = isTr ? 'Siteye giriliyor ve reklam geçiliyor...' : 'Proceeding and skipping ad...';
      if (window.AudioEngine) window.AudioEngine.play('pass');
      setTimeout(() => {
        onComplete();
      }, 300);
    });
  },

  cleanup: function() {}
};
