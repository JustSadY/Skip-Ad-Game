// LEVEL: Gerçek Cloudflare Turnstile Doğrulaması (Verify You Are Human)
window.LevelModules = window.LevelModules || {};

window.LevelModules['human_calc'] = {
  id: 'human_calc',
  url: 'https://security-challenge.net/verify-platform',
  tabTitle: (lang) => lang === 'tr' ? 'Lütfen bekleyin... (CloudGate)' : 'Just a moment... (CloudGate)',

  timer: null,

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div style="
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #111827;
        padding: 24px;
        color: #f9fafb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        box-sizing: border-box;
      ">
        
        <!-- CLOUDFLARE TURNSTILE RESMİ DOĞRULAMA KARTI -->
        <div id="turnstileCard" style="
          background: #1f2937;
          border: 1px solid #374151;
          border-radius: 12px;
          padding: 36px 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
          text-align: left;
        ">
          
          <!-- SİTE ALAN ADI VE CLOUD İKONU -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <div style="font-size: 20px; font-weight: 700; color: #f3f4f6;">
              security-challenge.net
            </div>
            
            <div style="display: flex; align-items: center; gap: 8px;">
              <svg width="32" height="22" viewBox="0 0 32 22" fill="none">
                <path d="M25.5 8.5C24.7 4.2 21 1 16.5 1C12.9 1 9.8 3.1 8.3 6.2C3.6 6.7 0 10.7 0 15.5C0 20.7 4.3 25 9.5 25H25.5C29.1 25 32 22.1 32 18.5C32 15.1 29.3 12.3 25.5 8.5Z" fill="#f97316"/>
              </svg>
              <span style="font-size: 13px; font-weight: 700; color: #f97316;">CloudGate</span>
            </div>
          </div>

          <!-- DOĞRULAMA BAŞLIĞI -->
          <h2 style="font-size: 19px; font-weight: 600; margin-bottom: 8px; color: #ffffff;">
            ${isTr ? 'Lütfen bir insan olduğunuzu doğrulayın' : 'Please verify you are human'}
          </h2>
          
          <p style="font-size: 13px; color: #9ca3af; margin-bottom: 28px; line-height: 1.5;">
            ${isTr 
              ? 'security-challenge.net sitesine devam etmeden önce tarayıcınızın bağlantı güvenliği kontrol ediliyor.' 
              : 'Verifying if you are a human before accessing security-challenge.net.'}
          </p>

          <!-- GERÇEK TURNSTILE ONAY WIDGET KUTUSU -->
          <div id="turnstileWidgetBox" style="
            background: #111827;
            border: 1px solid #4b5563;
            border-radius: 8px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          " onmouseover="this.style.borderColor='#f97316'" onmouseout="this.style.borderColor='#4b5563'">
            
            <div style="display: flex; align-items: center; gap: 16px;">
              <!-- CHECKBOX / SPINNER -->
              <div id="turnstileBoxCheck" style="
                width: 28px;
                height: 28px;
                border: 2px solid #9ca3af;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1f2937;
                transition: all 0.2s;
              "></div>

              <span id="turnstileStatusLabel" style="font-size: 14px; font-weight: 600; color: #e5e7eb;">
                ${isTr ? 'İnsan olduğumu doğrula (Reklamı Geç)' : 'Verify I am human (Skip Ad)'}
              </span>
            </div>

            <!-- WIDGET SAĞ ALT LOGO -->
            <div style="display: flex; flex-direction: column; align-items: flex-end; opacity: 0.85;">
              <span style="font-size: 10px; font-weight: 800; color: #f97316;">CloudGate</span>
              <span style="font-size: 8px; color: #9ca3af;">Gizlilik • Şartlar</span>
            </div>

          </div>

          <!-- YANLIŞ TUZAK UYARISI / YALANCI REKLAM BANNERI -->
          <div style="margin-top: 24px; padding: 12px; background: rgba(239, 68, 68, 0.1); border: 1px dashed #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 11px; color: #fca5a5;">
              ⚠️ ${isTr ? 'Doğrulama zaman aşımına uğramadan hızlıca tıkla!' : 'Click fast before session expires!'}
            </span>
            <button id="trapFastPassBtn" style="background: #ef4444; color: #fff; border: none; padding: 5px 12px; border-radius: 5px; font-size: 11px; font-weight: 700; cursor: pointer;">
              ${isTr ? 'HIZLI GEÇ' : 'QUICK PASS'}
            </button>
          </div>

          <!-- RAY ID & ALT BİLGİ -->
          <div style="margin-top: 24px; font-family: monospace; font-size: 11px; color: #6b7280; text-align: left;">
            Ray ID: 8c19ef03a74b210 • Performance & security by CloudGate
          </div>

        </div>

      </div>
    `;

    const widget = document.getElementById('turnstileWidgetBox');
    const checkbox = document.getElementById('turnstileBoxCheck');
    const label = document.getElementById('turnstileStatusLabel');
    const trapBtn = document.getElementById('trapFastPassBtn');

    let isVerifying = false;

    // Tuzak buton
    trapBtn.addEventListener('click', () => {
      onError();
      if (window.AudioEngine) window.AudioEngine.play('fail');
      showToast(isTr ? 'Sahte hızlı geçiş! Yalnızca resmi CloudGate kutucuğunu işaretleyin.' : 'Fake pass! Only check the official CloudGate box.');
    });

    // Gerçek Cloudflare Turnstile Tıklaması
    widget.addEventListener('click', () => {
      if (isVerifying) return;
      isVerifying = true;
      widget.style.pointerEvents = 'none';

      // 1. Dönen Yükleme Spinner Animasyonu
      checkbox.innerHTML = `
        <div style="
          width: 18px;
          height: 18px;
          border: 2px solid #f97316;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        "></div>
      `;
      checkbox.style.borderColor = '#f97316';
      label.textContent = isTr ? 'Doğrulanıyor...' : 'Verifying...';

      if (window.AudioEngine) window.AudioEngine.play('tick');

      // 2. 1.1 Saniye sonra yeşil onay ve başarıyla geçiş
      setTimeout(() => {
        checkbox.style.background = '#22c55e';
        checkbox.style.borderColor = '#22c55e';
        checkbox.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        label.textContent = isTr ? '✓ Başarılı! Yönlendiriliyorsunuz...' : '✓ Success! Redirecting...';
        label.style.color = '#4ade80';

        if (window.AudioEngine) window.AudioEngine.play('pass');

        setTimeout(() => {
          onComplete();
        }, 350);
      }, 1100);
    });
  },

  cleanup: function() {}
};
