// LEVEL: Gerçek Google reCAPTCHA Sesli Doğrulama (Audio Challenge)
window.LevelModules = window.LevelModules || {};

window.LevelModules['audio_captcha'] = {
  id: 'audio_captcha',
  url: 'https://audiocheck-cdn.net/verify-sound',
  tabTitle: (lang) => lang === 'tr' ? '🎧 Sesli Doğrulama (BotCheck)' : '🎧 Audio Challenge (BotCheck)',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    // 4 Haneli Rastgele Sayı Kodu Üret
    let currentCode = '';
    const generateNewCode = () => {
      let code = '';
      for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10).toString();
      }
      return code;
    };

    currentCode = generateNewCode();

    const turkishDigits = ['Sıfır', 'Bir', 'İki', 'Üç', 'Dört', 'Beş', 'Altı', 'Yedi', 'Sekiz', 'Dokuz'];
    const englishDigits = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

    container.innerHTML = `
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #0b0f19; padding: 20px;">
        
        <!-- GERÇEK RECAPTCHA AUDIO KART TASARIMI -->
        <div id="audioCard" style="
          background: #ffffff;
          color: #202124;
          border-radius: 8px;
          width: 100%;
          max-width: 380px;
          box-shadow: 0 16px 36px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1);
          overflow: hidden;
          font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
          transition: transform 0.2s ease;
        ">
          
          <!-- MAVİ BAŞLIK -->
          <div style="
            background: #1a73e8;
            color: #ffffff;
            padding: 18px 20px 14px 20px;
          ">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 13px; font-weight: 500; opacity: 0.95;">
                ${isTr ? 'Sesli Güvenlik Doğrulaması' : 'Audio Security Challenge'}
              </span>
              <span style="font-size: 18px;">🎧</span>
            </div>
            <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">
              ${isTr ? 'Duyduğunuz Sayıları Girin' : 'Enter the Numbers You Hear'}
            </div>
            <div style="font-size: 11px; opacity: 0.85; margin-top: 4px;">
              ${isTr ? 'Aşağıdaki oynat butonuna basıp 4 haneli kodu dinleyin.' : 'Press play below to hear the 4-digit code.'}
            </div>
          </div>

          <!-- SES ÇALMA VE GİRİŞ ALANI -->
          <div style="padding: 20px 20px 12px 20px;">
            
            <!-- OYNATMA KUTUSU -->
            <div style="
              background: #f8f9fa;
              border: 1px solid #dadce0;
              border-radius: 6px;
              padding: 16px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 16px;
            ">
              <button id="playAudioChallengeBtn" style="
                background: #1a73e8;
                color: #ffffff;
                border: none;
                border-radius: 50%;
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(26,115,232,0.4);
                transition: transform 0.15s, background 0.15s;
              ">
                ▶
              </button>

              <!-- SES DALGASI ANİMASYONU -->
              <div id="audioWaveBars" style="display: flex; gap: 4px; align-items: center; height: 28px;">
                <span class="wave-bar" style="width: 4px; height: 8px; background: #9aa0a6; border-radius: 2px;"></span>
                <span class="wave-bar" style="width: 4px; height: 16px; background: #9aa0a6; border-radius: 2px;"></span>
                <span class="wave-bar" style="width: 4px; height: 24px; background: #9aa0a6; border-radius: 2px;"></span>
                <span class="wave-bar" style="width: 4px; height: 12px; background: #9aa0a6; border-radius: 2px;"></span>
                <span class="wave-bar" style="width: 4px; height: 20px; background: #9aa0a6; border-radius: 2px;"></span>
                <span class="wave-bar" style="width: 4px; height: 10px; background: #9aa0a6; border-radius: 2px;"></span>
              </div>

              <div id="audioStatusText" style="font-size: 12px; color: #5f6368; font-weight: 500;">
                ${isTr ? 'Oynatmaya hazır' : 'Ready to play'}
              </div>
            </div>

            <!-- SAYI GİRİŞ KUTUSU -->
            <div>
              <label for="audioCodeInput" style="display: block; font-size: 12px; font-weight: 500; color: #3c4043; margin-bottom: 6px;">
                ${isTr ? '4 Haneli Güvenlik Kodu:' : '4-Digit Verification Code:'}
              </label>
              <input type="text" id="audioCodeInput" maxlength="4" placeholder="----" autocomplete="off" style="
                width: 100%;
                padding: 10px 14px;
                font-size: 22px;
                letter-spacing: 10px;
                text-align: center;
                font-weight: 800;
                font-family: monospace;
                border: 2px solid #dadce0;
                border-radius: 6px;
                outline: none;
                color: #202124;
                transition: border-color 0.2s;
              ">
              <div id="audioHintLink" style="font-size: 11px; color: #1a73e8; cursor: pointer; text-decoration: underline; margin-top: 6px; text-align: center; user-select: none;">
                ${isTr ? 'Sesi duyamıyor musunuz? Kodu göster' : 'Cannot hear audio? Reveal code'}
              </div>
            </div>

            <!-- HATA MESAJI -->
            <div id="audioErrorMsg" style="
              min-height: 20px;
              color: #d93025;
              font-size: 12px;
              font-weight: 500;
              margin-top: 8px;
              display: none;
            ">
              ${isTr ? 'Kod hatalı! Lütfen sesi tekrar dinleyin.' : 'Incorrect code! Please listen again.'}
            </div>

          </div>

          <!-- ALT BAR (RELOAD & DOĞRULA) -->
          <div style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 20px;
            border-top: 1px solid #e0e0e0;
            background: #fafafa;
          ">
            <div style="display: flex; gap: 14px; color: #5f6368; font-size: 20px;">
              <span id="audioReloadBtn" title="${isTr ? 'Yeni Ses Üret' : 'New Challenge'}" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='rotate(90deg)'" onmouseout="this.style.transform='rotate(0deg)'">↻</span>
              <span title="BotCheck Audio v3" style="cursor: pointer; font-size: 16px;">🛡️</span>
            </div>

            <button id="audioVerifyBtn" style="
              background: #1a73e8;
              color: #ffffff;
              border: none;
              font-family: inherit;
              font-size: 13px;
              font-weight: 700;
              padding: 10px 24px;
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
    `;

    const playBtn = document.getElementById('playAudioChallengeBtn');
    const input = document.getElementById('audioCodeInput');
    const verifyBtn = document.getElementById('audioVerifyBtn');
    const reloadBtn = document.getElementById('audioReloadBtn');
    const statusText = document.getElementById('audioStatusText');
    const errorMsg = document.getElementById('audioErrorMsg');
    const card = document.getElementById('audioCard');
    const waveBars = document.querySelectorAll('.wave-bar');

    let isPlaying = false;

    // Web Speech API + Web Audio ile Seslendirme
    const speakCode = () => {
      if (isPlaying) return;
      isPlaying = true;
      statusText.textContent = isTr ? 'Dinleniyor...' : 'Playing...';
      playBtn.style.opacity = '0.7';

      // Dalga barları animasyonu
      let waveInterval = setInterval(() => {
        waveBars.forEach(bar => {
          const h = 6 + Math.random() * 22;
          bar.style.height = `${h}px`;
          bar.style.background = '#1a73e8';
        });
      }, 100);

      // Web Speech API kontrolü
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const words = currentCode.split('').map(d => {
          const num = parseInt(d);
          return isTr ? turkishDigits[num] : englishDigits[num];
        }).join(', ');

        const utterance = new SpeechSynthesisUtterance(words);
        utterance.rate = 0.85; // Net ve sakin okuma hızı
        utterance.pitch = 1.0;
        utterance.lang = isTr ? 'tr-TR' : 'en-US';

        utterance.onend = () => {
          clearInterval(waveInterval);
          waveBars.forEach(bar => { bar.style.height = '10px'; bar.style.background = '#9aa0a6'; });
          isPlaying = false;
          statusText.textContent = isTr ? 'Tekrar Dinle' : 'Play Again';
          playBtn.style.opacity = '1';
        };

        utterance.onerror = () => {
          fallbackToneSound();
        };

        window.speechSynthesis.speak(utterance);
      } else {
        fallbackToneSound();
      }

      function fallbackToneSound() {
        // Yedek: Sayı kadar ton çalar
        const digits = currentCode.split('').map(Number);
        digits.forEach((num, idx) => {
          setTimeout(() => {
            if (window.AudioEngine) window.AudioEngine.play('coin');
          }, idx * 450);
        });

        setTimeout(() => {
          clearInterval(waveInterval);
          waveBars.forEach(bar => { bar.style.height = '10px'; bar.style.background = '#9aa0a6'; });
          isPlaying = false;
          statusText.textContent = isTr ? 'Tekrar Dinle' : 'Play Again';
          playBtn.style.opacity = '1';
        }, digits.length * 450 + 200);
      }
    };

    playBtn.addEventListener('click', speakCode);

    const hintLink = document.getElementById('audioHintLink');
    if (hintLink) {
      hintLink.addEventListener('click', () => {
        input.value = currentCode;
        if (errorMsg) errorMsg.style.display = 'none';
        if (window.AudioEngine) window.AudioEngine.play('coin');
      });
    }

    input.addEventListener('input', () => {
      if (errorMsg) errorMsg.style.display = 'none';
      input.style.borderColor = '#1a73e8';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verifyBtn.click();
    });

    // Yenileme
    reloadBtn.addEventListener('click', () => {
      currentCode = generateNewCode();
      input.value = '';
      if (errorMsg) errorMsg.style.display = 'none';
      speakCode();
      if (window.AudioEngine) window.AudioEngine.play('tick');
    });

    // Doğrulama
    verifyBtn.addEventListener('click', () => {
      const userVal = input.value.trim();

      if (userVal === currentCode) {
        verifyBtn.style.pointerEvents = 'none';
        verifyBtn.style.background = '#0f9d58'; // Google Green
        verifyBtn.textContent = isTr ? '✓ DOĞRULANDI' : '✓ VERIFIED';
        if (window.AudioEngine) window.AudioEngine.play('pass');
        setTimeout(() => {
          onComplete();
        }, 350);
      } else {
        onError();
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.textContent = isTr ? 'Hatalı kod! Lütfen tekrar dinleyip yazın.' : 'Incorrect code! Please listen again.';
        }
        input.style.borderColor = '#d93025';
        if (card) {
          card.style.transform = 'translateX(-8px)';
          setTimeout(() => card.style.transform = 'translateX(8px)', 80);
          setTimeout(() => card.style.transform = 'translateX(-4px)', 160);
          setTimeout(() => card.style.transform = 'translateX(0)', 240);
        }
        if (window.AudioEngine) window.AudioEngine.play('fail');
      }
    });

    // İlk açılışta 300ms sonra otomatik ses çal
    setTimeout(() => {
      speakCode();
    }, 400);
  },

  cleanup: function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
