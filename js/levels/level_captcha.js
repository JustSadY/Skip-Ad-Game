// LEVEL: Gerçek Fotoğraflı Bot Doğrulaması (Google reCAPTCHA v2 Birebir Tarzı)
window.LevelModules = window.LevelModules || {};

window.LevelModules['captcha'] = {
  id: 'captcha',
  url: 'https://security-verify.net/bot-check',
  tabTitle: (lang) => lang === 'tr' ? 'Robot Doğrulaması' : 'Bot Verification',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    // GERÇEK FOTOĞRAFLI KATEGORİ HAVUZU
    const themes = [
      {
        id: 'traffic_light',
        targetTr: 'trafik lambası',
        targetEn: 'traffic lights',
        instructionTr: 'içeren tüm kareleri seçin',
        instructionEn: 'all squares with',
        correctPhotos: [
          'assets/captcha/traffic_light_1.jpg',
          'assets/captcha/traffic_light_2.jpg',
          'assets/captcha/traffic_light_3.jpg',
          'assets/captcha/traffic_light_4.jpg'
        ],
        decoyPhotos: [
          'assets/captcha/decoy_lamp_1.jpg',
          'assets/captcha/decoy_car_1.jpg',
          'assets/captcha/decoy_bench_1.jpg',
          'assets/captcha/decoy_mailbox_1.jpg',
          'assets/captcha/bus_1.jpg',
          'assets/captcha/hydrant_1.jpg',
          'assets/captcha/decoy_car_2.jpg'
        ]
      },
      {
        id: 'hydrant',
        targetTr: 'yangın musluğu',
        targetEn: 'fire hydrants',
        instructionTr: 'içeren tüm kareleri seçin',
        instructionEn: 'all squares with',
        correctPhotos: [
          'assets/captcha/hydrant_1.jpg',
          'assets/captcha/hydrant_2.jpg',
          'assets/captcha/hydrant_3.jpg',
          'assets/captcha/hydrant_4.jpg'
        ],
        decoyPhotos: [
          'assets/captcha/decoy_mailbox_1.jpg',
          'assets/captcha/decoy_mailbox_2.jpg',
          'assets/captcha/decoy_lamp_2.jpg',
          'assets/captcha/decoy_bench_2.jpg',
          'assets/captcha/decoy_car_1.jpg',
          'assets/captcha/bicycle_1.jpg',
          'assets/captcha/decoy_lamp_1.jpg'
        ]
      },
      {
        id: 'crosswalk',
        targetTr: 'yaya geçidi',
        targetEn: 'crosswalks',
        instructionTr: 'içeren tüm kareleri seçin',
        instructionEn: 'all squares with',
        correctPhotos: [
          'assets/captcha/crosswalk_1.jpg',
          'assets/captcha/crosswalk_2.jpg',
          'assets/captcha/crosswalk_3.jpg',
          'assets/captcha/crosswalk_4.jpg'
        ],
        decoyPhotos: [
          'assets/captcha/decoy_car_1.jpg',
          'assets/captcha/decoy_car_2.jpg',
          'assets/captcha/decoy_lamp_1.jpg',
          'assets/captcha/decoy_bench_1.jpg',
          'assets/captcha/bus_2.jpg',
          'assets/captcha/traffic_light_2.jpg',
          'assets/captcha/decoy_bench_2.jpg'
        ]
      },
      {
        id: 'bicycle',
        targetTr: 'bisiklet',
        targetEn: 'bicycles',
        instructionTr: 'içeren tüm kareleri seçin',
        instructionEn: 'all squares with',
        correctPhotos: [
          'assets/captcha/bicycle_1.jpg',
          'assets/captcha/bicycle_2.jpg',
          'assets/captcha/bicycle_3.jpg',
          'assets/captcha/bicycle_4.jpg'
        ],
        decoyPhotos: [
          'assets/captcha/bus_1.jpg',
          'assets/captcha/decoy_car_1.jpg',
          'assets/captcha/decoy_lamp_2.jpg',
          'assets/captcha/decoy_bench_1.jpg',
          'assets/captcha/hydrant_2.jpg',
          'assets/captcha/decoy_mailbox_2.jpg',
          'assets/captcha/decoy_car_3.jpg'
        ]
      },
      {
        id: 'bus',
        targetTr: 'otobüs',
        targetEn: 'buses',
        instructionTr: 'içeren tüm kareleri seçin',
        instructionEn: 'all squares with',
        correctPhotos: [
          'assets/captcha/bus_1.jpg',
          'assets/captcha/bus_2.jpg',
          'assets/captcha/bus_3.jpg',
          'assets/captcha/bus_4.jpg'
        ],
        decoyPhotos: [
          'assets/captcha/decoy_car_1.jpg',
          'assets/captcha/decoy_car_2.jpg',
          'assets/captcha/decoy_car_3.jpg',
          'assets/captcha/bicycle_2.jpg',
          'assets/captcha/decoy_bench_2.jpg',
          'assets/captcha/hydrant_3.jpg',
          'assets/captcha/decoy_lamp_1.jpg'
        ]
      }
    ];

    function shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    let currentTheme = themes[Math.floor(Math.random() * themes.length)];

    const buildChallenge = () => {
      // 3 veya 4 doğru görsel seç
      const numCorrect = Math.random() < 0.5 ? 3 : 4;
      const shuffledCorrect = shuffle(currentTheme.correctPhotos).slice(0, numCorrect);
      const numDecoys = 9 - numCorrect;
      const shuffledDecoys = shuffle(currentTheme.decoyPhotos).slice(0, numDecoys);

      const items = [
        ...shuffledCorrect.map(img => ({ img, isCorrect: true })),
        ...shuffledDecoys.map(img => ({ img, isCorrect: false }))
      ];

      return shuffle(items);
    };

    let activeItems = buildChallenge();

    const renderCaptchaContent = () => {
      container.innerHTML = `
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 16px; background: #0b0f19;">
          
          <!-- GERÇEK RECAPTCHA KART TASARIMI -->
          <div id="captchaCard" style="
            background: #ffffff;
            color: #202124;
            border-radius: 8px;
            width: 100%;
            max-width: 390px;
            box-shadow: 0 16px 36px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1);
            overflow: hidden;
            font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            transition: transform 0.2s ease;
          ">
            
            <!-- MAVİ BAŞLIK (AUTHENTIC RECAPTCHA BLUE HEADER) -->
            <div style="
              background: #1a73e8;
              color: #ffffff;
              padding: 18px 20px 14px 20px;
              line-height: 1.25;
            ">
              <div style="font-size: 13px; font-weight: 400; opacity: 0.95; margin-bottom: 2px;">
                ${isTr ? 'Şunları içeren tüm kareleri seçin:' : 'Select all squares with'}
              </div>
              <div style="font-size: 24px; font-weight: 700; text-transform: lowercase; letter-spacing: -0.3px;">
                ${isTr ? currentTheme.targetTr : currentTheme.targetEn}
              </div>
              <div style="font-size: 11px; opacity: 0.88; margin-top: 6px;">
                ${isTr ? 'Hiçbiri kalmayınca doğrula butonuna basın.' : 'Click verify once there are none left.'}
              </div>
            </div>

            <!-- FOTOĞRAF ALANI (3x3 GERÇEK FOTOĞRAF IZGARASI) -->
            <div style="padding: 10px 10px 6px 10px; background: #ffffff;">
              <div id="captchaGrid" style="
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 4px;
                background: #f1f3f4;
                padding: 4px;
                border-radius: 4px;
              ">
                <!-- 9 Adet Gerçek Fotoğraf karesi JS ile eklenir -->
              </div>

              <!-- HATA / GERİ BİLDİRİM METNİ -->
              <div id="captchaErrorMsg" style="
                min-height: 20px;
                color: #d93025;
                font-size: 12px;
                font-weight: 500;
                margin-top: 6px;
                text-align: left;
                padding-left: 4px;
                display: none;
              ">
                ${isTr ? 'Lütfen tüm doğru görselleri seçin.' : 'Please select all matching images.'}
              </div>
            </div>

            <!-- ALT BAR (ARAÇLAR & DOĞRULA BUTONU) -->
            <div style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 16px;
              border-top: 1px solid #e0e0e0;
              background: #fafafa;
            ">
              
              <!-- SOL İKONLAR: YENİLE, SESLİ, BİLGİ -->
              <div style="display: flex; gap: 14px; color: #5f6368; font-size: 20px;">
                <span id="captchaReload" title="${isTr ? 'Yeni Soru Getir' : 'Reload Challenge'}" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='rotate(90deg)'" onmouseout="this.style.transform='rotate(0deg)'">↻</span>
                <span id="captchaAudio" title="${isTr ? 'Sesli İpucu' : 'Audio Challenge'}" style="cursor: pointer;">🎧</span>
                <span id="captchaInfo" title="BotCheck v2.4" style="cursor: pointer; font-size: 18px;">ℹ️</span>
              </div>

              <!-- SAĞ: PARODİ LOGO VE DOĞRULA BUTONU -->
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="text-align: right; line-height: 1;">
                  <div style="font-size: 10px; font-weight: 700; color: #5f6368;">BotCheck</div>
                  <div style="font-size: 8px; color: #9aa0a6;">Gizlilik • Şartlar</div>
                </div>

                <button id="captchaVerifyBtn" style="
                  background: #1a73e8;
                  color: #ffffff;
                  border: none;
                  font-family: inherit;
                  font-size: 13px;
                  font-weight: 700;
                  padding: 10px 22px;
                  border-radius: 4px;
                  cursor: pointer;
                  letter-spacing: 0.5px;
                  text-transform: uppercase;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                  transition: background 0.15s, transform 0.1s;
                ">
                  ${isTr ? 'DOĞRULA' : 'VERIFY'}
                </button>
              </div>

            </div>

          </div>
        </div>
      `;

      const selected = new Set();
      const grid = document.getElementById('captchaGrid');
      const errorMsg = document.getElementById('captchaErrorMsg');
      const card = document.getElementById('captchaCard');

      activeItems.forEach((item, index) => {
        const tile = document.createElement('div');
        tile.className = 'captcha-tile';
        tile.style.cssText = `
          position: relative;
          aspect-ratio: 1;
          cursor: pointer;
          background-image: url('${item.img}');
          background-size: cover;
          background-position: center;
          border-radius: 2px;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          user-select: none;
        `;

        tile.addEventListener('click', () => {
          if (selected.has(index)) {
            selected.delete(index);
            tile.style.transform = 'scale(1)';
            tile.style.boxShadow = 'none';
            tile.style.outline = 'none';
            const badge = tile.querySelector('.check-circle-badge');
            if (badge) badge.remove();
          } else {
            selected.add(index);
            tile.style.transform = 'scale(0.88)';
            tile.style.boxShadow = '0 0 0 3px #1a73e8';
            tile.style.outline = '2px solid #ffffff';
            
            // Orijinal reCAPTCHA mavi tik dairesi
            const badge = document.createElement('div');
            badge.className = 'check-circle-badge';
            badge.style.cssText = `
              position: absolute;
              top: 4px;
              left: 4px;
              width: 22px;
              height: 22px;
              background: #1a73e8;
              color: #ffffff;
              border: 2px solid #ffffff;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              font-weight: 900;
              box-shadow: 0 2px 5px rgba(0,0,0,0.4);
            `;
            badge.textContent = '✓';
            tile.appendChild(badge);
          }
          if (errorMsg) errorMsg.style.display = 'none';
          if (window.AudioEngine) window.AudioEngine.play('tick');
        });

        grid.appendChild(tile);
      });

      // YENİLE BUTONU
      document.getElementById('captchaReload').addEventListener('click', () => {
        currentTheme = themes[Math.floor(Math.random() * themes.length)];
        activeItems = buildChallenge();
        renderCaptchaContent();
        if (window.AudioEngine) window.AudioEngine.play('tick');
      });

      // SESLİ İPUCU BUTONU
      document.getElementById('captchaAudio').addEventListener('click', () => {
        if (window.AudioEngine) {
          window.AudioEngine.play('coin');
          setTimeout(() => window.AudioEngine.play('tick'), 150);
        }
      });

      // DOĞRULA BUTONU
      document.getElementById('captchaVerifyBtn').addEventListener('click', () => {
        const correctIndices = activeItems
          .map((item, idx) => item.isCorrect ? idx : -1)
          .filter(idx => idx !== -1);

        const isPerfect = correctIndices.length > 0 &&
          correctIndices.every(idx => selected.has(idx)) &&
          selected.size === correctIndices.length;

        if (isPerfect) {
          const verifyBtn = document.getElementById('captchaVerifyBtn');
          verifyBtn.style.pointerEvents = 'none';
          verifyBtn.style.background = '#0f9d58'; // Google Green
          verifyBtn.textContent = isTr ? '✓ BAŞARILI' : '✓ VERIFIED';
          if (window.AudioEngine) window.AudioEngine.play('pass');
          setTimeout(() => {
            onComplete();
          }, 350);
        } else {
          // Hatalı seçim: Titreme animasyonu & hata mesajı
          if (errorMsg) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = isTr ? 'Lütfen tüm doğru görselleri seçin.' : 'Please select all matching images.';
          }
          if (card) {
            card.style.transform = 'translateX(-8px)';
            setTimeout(() => card.style.transform = 'translateX(8px)', 80);
            setTimeout(() => card.style.transform = 'translateX(-4px)', 160);
            setTimeout(() => card.style.transform = 'translateX(4px)', 240);
            setTimeout(() => card.style.transform = 'translateX(0)', 320);
          }
          onError();
          if (window.AudioEngine) window.AudioEngine.play('fail');
        }
      });
    };

    renderCaptchaContent();
  },

  cleanup: function() {}
};
