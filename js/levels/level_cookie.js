// LEVEL: Gerçek OneTrust / Cookiebot GDPR Çerez Tercih Merkezi
window.LevelModules = window.LevelModules || {};

window.LevelModules['cookie'] = {
  id: 'cookie',
  url: 'https://privacy-gdpr-hell.com/consent',
  tabTitle: (lang) => lang === 'tr' ? 'Çerez Tercihleri' : 'Cookie Preferences',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div style="
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #090d16;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-sizing: border-box;
      ">
        
        <!-- ONETRUST GERÇEK ÇEREZ MODALI -->
        <div id="onetrustCard" style="
          background: #ffffff;
          color: #2d3748;
          border-radius: 12px;
          padding: 28px 24px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 25px 60px rgba(0,0,0,0.85);
          text-align: left;
          border: 1px solid #e2e8f0;
          transition: transform 0.2s;
        ">
          
          <!-- BAŞLIK & İKON -->
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <span style="font-size: 26px;">🍪</span>
            <h2 style="font-size: 18px; font-weight: 800; color: #1a202c; margin: 0;">
              ${isTr ? 'Gizlilik ve Çerez Tercih Merkezi' : 'Privacy & Cookie Preference Center'}
            </h2>
          </div>

          <p style="font-size: 12px; color: #4a5568; line-height: 1.5; margin-bottom: 20px;">
            ${isTr 
              ? 'Sitemizi ziyaret ettiğinizde reklam ve hedefleme çerezleri depolanabilir. Reklamı geçebilmek için lütfen çerez tercihlerinizi özelleştirin.' 
              : 'When you visit our website, tracking cookies may be stored. To skip the ad, please customize your cookie preferences.'}
          </p>

          <!-- AKORDİYON: TERCİHLERİ ÖZELLEŞTİR BÖLÜMÜ -->
          <div id="cookieAccordion" style="
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 20px;
          ">
            
            <!-- 1. ZORUNLU ÇEREZLER -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #edf2f7; margin-bottom: 10px;">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #2d3748;">
                  🔒 ${isTr ? 'Kesinlikle Gerekli Çerezler' : 'Strictly Necessary Cookies'}
                </div>
                <div style="font-size: 10px; color: #718096;">
                  ${isTr ? 'Sitenin çalışması için zorunludur' : 'Always active for site core functions'}
                </div>
              </div>
              <span style="font-size: 11px; font-weight: 700; color: #0284c7; background: #e0f2fe; padding: 2px 8px; border-radius: 4px;">
                ${isTr ? 'Her Zaman Etkin' : 'Always Active'}
              </span>
            </div>

            <!-- 2. HEDEFLEME REKLAMLARI (BAŞTA AÇIK, KAPATILMALI) -->
            <label style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; border-bottom: 1px solid #edf2f7; margin-bottom: 10px; cursor: pointer; user-select: none;">
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #2d3748;">
                  📡 ${isTr ? 'Agresif Hedefleme & Reklam İzleyicileri' : 'Targeting & Advertising Trackers'}
                </div>
                <div style="font-size: 10px; color: #718096;">
                  ${isTr ? 'Tüm verilerinizi 3. taraflarla paylaşır (KAPATIN)' : 'Shares all browsing data with 3rd parties (TURN OFF)'}
                </div>
              </div>
              <div class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px; pointer-events: none;">
                <input type="checkbox" id="ckAdTracking" checked style="opacity: 0; width: 0; height: 0;">
                <span class="slider" style="position: absolute; inset: 0; background: #0284c7; border-radius: 22px; transition: 0.2s;"></span>
              </div>
            </label>

            <!-- 3. REKLAMI GEÇİŞ ÇEREZİ (BAŞTA KAPALI, AÇILMASI GEREKİR!) -->
            <label style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none;">
              <div>
                <div style="font-size: 12px; font-weight: 800; color: #16a34a;">
                  ⚡ ${isTr ? 'Reklamı Atlama ve Doğrulama İzni' : 'Skip Ad & Instant Verification Cookie'}
                </div>
                <div style="font-size: 10px; color: #718096;">
                  ${isTr ? 'Reklamı geçmek için bu izni AÇIK konuma getirin' : 'Turn this ON to enable ad skip'}
                </div>
              </div>
              <div class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px; pointer-events: none;">
                <input type="checkbox" id="ckSkipEnable" style="opacity: 0; width: 0; height: 0;">
                <span class="slider" style="position: absolute; inset: 0; background: #cbd5e1; border-radius: 22px; transition: 0.2s;"></span>
              </div>
            </label>

          </div>

          <!-- BUTON GRUBU -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            
            <!-- GERÇEK ONAYLA BUTONU -->
            <button id="savePreferencesBtn" style="
              background: #0284c7;
              color: #ffffff;
              border: none;
              padding: 12px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 700;
              cursor: pointer;
              transition: background 0.2s;
              text-align: center;
            ">
              ${isTr ? 'Tercihlerimi Onayla ve Reklamı Geç' : 'Confirm Choices & Skip Ad'}
            </button>

            <!-- TUZAK BUTONLAR -->
            <div style="display: flex; gap: 8px;">
              <button id="trapAcceptAllBtn" style="
                flex: 1;
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #cbd5e1;
                padding: 9px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
              ">
                ${isTr ? 'Tümünü Kabul Et (Tuzak)' : 'Accept All (Trap)'}
              </button>

              <button id="trapRejectAllBtn" style="
                flex: 1;
                background: #f1f5f9;
                color: #475569;
                border: 1px solid #cbd5e1;
                padding: 9px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
              ">
                ${isTr ? 'Tümünü Reddet (Tuzak)' : 'Reject All (Trap)'}
              </button>
            </div>

          </div>

          <div style="margin-top: 14px; font-size: 10px; color: #a0aec0; text-align: center;">
            Powered by CookieGate Privacy Cloud • GDPR & KVKK Uyumlu
          </div>

        </div>

      </div>
    `;

    const saveBtn = document.getElementById('savePreferencesBtn');
    const trapAccept = document.getElementById('trapAcceptAllBtn');
    const trapReject = document.getElementById('trapRejectAllBtn');
    const ckAd = document.getElementById('ckAdTracking');
    const ckSkip = document.getElementById('ckSkipEnable');
    const card = document.getElementById('onetrustCard');

    // Checkbox UI senkronizasyonu
    const updateSwitchColors = () => {
      ckAd.nextElementSibling.style.background = ckAd.checked ? '#0284c7' : '#cbd5e1';
      ckSkip.nextElementSibling.style.background = ckSkip.checked ? '#16a34a' : '#cbd5e1';
    };

    ckAd.addEventListener('change', updateSwitchColors);
    ckSkip.addEventListener('change', updateSwitchColors);

    // Tuzaklar
    trapAccept.addEventListener('click', () => {
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
      showToast(isTr ? 'Tüm çerezleri kabul ettiniz! Reklamı geçmek için tercihleri doğru ayarlayın.' : 'You accepted all trackers! Set the toggles correctly to skip.');
    });

    trapReject.addEventListener('click', () => {
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
      showToast(isTr ? 'Tümünü reddederseniz reklam atlama çerezini de kapatmış olursunuz!' : 'Rejecting all also disables the ad-skipping cookie!');
    });

    // Doğru onaylama: Reklam izleyici kapalı, Reklam atlama izni açık olmalı!
    saveBtn.addEventListener('click', () => {
      if (!ckAd.checked && ckSkip.checked) {
        saveBtn.style.background = '#16a34a';
        saveBtn.textContent = isTr ? '✓ Çerezler Kaydedildi, Reklam Geçiliyor...' : '✓ Choices Saved, Skipping Ad...';
        if (window.AudioEngine) window.AudioEngine.play('pass');
        setTimeout(() => {
          onComplete();
        }, 300);
      } else {
        onError();
        if (card) {
          card.style.transform = 'translateX(-6px)';
          setTimeout(() => card.style.transform = 'translateX(6px)', 80);
          setTimeout(() => card.style.transform = 'translateX(0)', 160);
        }
        if (window.AudioEngine) window.AudioEngine.play('fail');
        showToast(isTr 
          ? 'Zararlı reklam çerezini KAPATIN ve yeşil "Reklamı Atlama" çerezini AÇIN!' 
          : 'Turn OFF advertising cookies and turn ON the green "Skip Ad" cookie!');
      }
    });
  },

  cleanup: function() {}
};
