// LEVEL: Pop-Up Fırtınası (Tam Ekran Tarzı Büyük Reklam Pencereleri)
window.LevelModules = window.LevelModules || {};

window.LevelModules['popups'] = {
  id: 'popups',
  url: 'https://ad-storm-portal.xyz/unblock',
  tabTitle: (lang) => lang === 'tr' ? 'Reklam Yağmuru!' : 'Pop-Up Storm!',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div id="popupStage" style="
        flex: 1;
        position: relative;
        overflow: hidden;
        background: radial-gradient(circle at center, #111827 0%, #030712 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        user-select: none;
      ">
        
        <!-- MERKEZDEKİ GERÇEK GEÇİŞ BUTONU (TÜM REKLAMLAR KAPANDIĞINDA AÇILIR) -->
        <div style="
          text-align: center;
          z-index: 1;
          max-width: 520px;
          width: 90%;
          background: #1e293b;
          border: 2px solid #334155;
          border-radius: 20px;
          padding: 40px 24px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.8);
        ">
          <div style="font-size: 58px; margin-bottom: 14px;">🏆</div>
          <h2 style="font-size: 24px; font-weight: 900; color: #f8fafc; margin-bottom: 8px; letter-spacing: -0.5px;">
            ${isTr ? 'TÜM REKLAMLAR TEMİZLENDİ!' : 'ALL ADS CLEARED!'}
          </h2>
          <p style="font-size: 14px; color: #94a3b8; margin-bottom: 26px; line-height: 1.5;">
            ${isTr ? 'Ekranı kapatan tüm reklam pencerelerini başarıyla geçtiniz. Artık oyuna devam edebilirsiniz.' : 'You have closed all pop-up ads blocking the screen. You may now proceed.'}
          </p>
          <button id="finalUnderneathBtn" style="
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
            color: #ffffff;
            font-family: var(--font-ui);
            font-size: 17px;
            font-weight: 900;
            padding: 16px 48px;
            border-radius: 12px;
            border: 2px solid #86efac;
            cursor: pointer;
            box-shadow: 0 12px 30px rgba(34, 197, 94, 0.4);
            letter-spacing: 0.5px;
            transition: transform 0.15s, box-shadow 0.15s;
          " onmouseover="this.style.transform='scale(1.03)';" onmouseout="this.style.transform='scale(1)';">
            ${isTr ? '✓ REKLAMI GEÇ' : '✓ SKIP AD'}
          </button>
        </div>

        <!-- POP-UP 3 (Z-INDEX 10): TARAYICI SİSTEM BİLDİRİM VE PROTOKOL PENCERESİ -->
        <div class="pop-window" id="pop3" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(0.5deg);
          width: min(92%, 580px);
          background: #18202f;
          border: 2px solid #3b82f6;
          border-radius: 16px;
          box-shadow: 0 30px 70px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1);
          z-index: 10;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        ">
          <!-- Başlık Çubuğu -->
          <div style="background: #1d4ed8; color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 800; font-size: 13px; display: flex; align-items: center; gap: 8px;">
              <span>🔔</span>
              <span>${isTr ? 'SİSTEM BİLDİRİM PROTOKOLÜ' : 'SYSTEM NOTIFICATION PROTOCOL'}</span>
            </div>
            <div class="pop-close" title="${isTr ? 'Kapat' : 'Close'}" style="
              cursor: pointer;
              background: rgba(0,0,0,0.25);
              width: 28px;
              height: 28px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 15px;
              font-weight: 900;
              transition: background 0.2s;
            " onmouseover="this.style.background='rgba(239,68,68,0.8)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">✕</div>
          </div>
          <!-- İçerik -->
          <div style="padding: 24px; text-align: center; color: #cbd5e1;">
            <div style="font-size: 46px; margin-bottom: 12px;">🛡️</div>
            <h3 style="font-size: 18px; font-weight: 800; color: #ffffff; margin-bottom: 8px;">
              ${isTr ? 'İndirme Sunucusuna Bağlanılsın mı?' : 'Connect to High-Speed Download Mirror?'}
            </h3>
            <p style="font-size: 13px; color: #94a3b8; max-width: 440px; margin: 0 auto 20px auto; line-height: 1.5;">
              ${isTr ? 'Bulut dosya eşitleme servisi masaüstünüze arka plan veri akışı ve özel promosyonlar göndermek için onay istiyor.' : 'Cloud mirror requests permission to stream background data and promotional updates to your browser.'}
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; max-width: 380px; margin: 0 auto;">
              <button class="pop-trap-btn" style="flex: 1; background: #2563eb; color: #fff; border: none; font-weight: 800; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 13px;">
                ${isTr ? 'İzin Ver & Devam Et' : 'Allow & Continue'}
              </button>
              <button class="pop-close-btn" style="flex: 1; background: #334155; color: #cbd5e1; border: 1px solid #475569; font-weight: 700; padding: 12px; border-radius: 8px; cursor: pointer; font-size: 13px;">
                ${isTr ? '✕ Bildirimi Kapat' : '✕ Dismiss'}
              </button>
            </div>
          </div>
        </div>

        <!-- POP-UP 1 (Z-INDEX 15): 1.000.000. ZİYARETÇİ DEV ALTIN ÖDÜL TAKEOVER -->
        <div class="pop-window" id="pop1" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-1deg);
          width: min(92%, 600px);
          background: #1e1b4b;
          border: 2px solid #facc15;
          border-radius: 16px;
          box-shadow: 0 35px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(250,204,21,0.3);
          z-index: 15;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        ">
          <!-- Başlık Çubuğu -->
          <div style="background: linear-gradient(90deg, #facc15 0%, #eab308 100%); color: #000; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 900; font-size: 13px; display: flex; align-items: center; gap: 8px; letter-spacing: 0.5px;">
              <span>🎁</span>
              <span>${isTr ? 'TEBRİKLER! 1.000.000. ŞANSLI ZİYARETÇİ!' : 'CONGRATULATIONS! 1,000,000th VISITOR!'}</span>
            </div>
            <div class="pop-close" title="${isTr ? 'Kapat' : 'Close'}" style="
              cursor: pointer;
              background: rgba(0,0,0,0.15);
              width: 28px;
              height: 28px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 15px;
              font-weight: 900;
              transition: background 0.2s;
            " onmouseover="this.style.background='rgba(239,68,68,0.8)'; this.style.color='#fff';" onmouseout="this.style.background='rgba(0,0,0,0.15)'; this.style.color='#000';">✕</div>
          </div>
          <!-- İçerik -->
          <div style="padding: 24px; text-align: center; color: #fef08a;">
            <div style="display: flex; justify-content: center; gap: 16px; font-size: 42px; margin-bottom: 8px;">
              <span>📱</span>
              <span>💰</span>
              <span>🎉</span>
            </div>
            <h3 style="font-size: 20px; font-weight: 900; color: #facc15; margin-bottom: 6px;">
              ${isTr ? 'YENİ NESİL AKILLI TELEFON KAZANDINIZ!' : 'YOU WON A FLAGSHIP SMARTPHONE!'}
            </h3>
            <p style="font-size: 13px; color: #cbd5e1; max-width: 440px; margin: 0 auto 16px auto; line-height: 1.5;">
              ${isTr ? 'IP adresiniz bugünün 1.000.000 numaralı şanslı kullanıcısı olarak seçildi. Ödülünüz 2 dakika içinde rezerve edilmezse bir sonraki kullanıcıya devredilecektir!' : 'Your IP address was selected as today\'s lucky winner! Claim within 2 minutes before it expires!'}
            </p>
            <div style="display: inline-block; background: #312e81; color: #facc15; font-family: monospace; font-weight: 800; font-size: 13px; padding: 4px 16px; border-radius: 20px; border: 1px solid #facc15; margin-bottom: 20px;">
              ⏱️ ${isTr ? 'Kalan Süre: 01:48' : 'Time Remaining: 01:48'}
            </div>
            <div>
              <button class="pop-trap-btn" style="
                background: linear-gradient(135deg, #facc15 0%, #fb923c 100%);
                color: #000;
                border: none;
                font-family: inherit;
                font-size: 15px;
                font-weight: 900;
                padding: 13px 40px;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 10px 25px rgba(250, 204, 21, 0.4);
              ">
                ${isTr ? 'ÖDÜLÜ ADRESİME GÖNDER' : 'CLAIM MY SMARTPHONE'}
              </button>
            </div>
          </div>
        </div>

        <!-- POP-UP 2 (Z-INDEX 20): DEV KRİTİK GÜVENLİK VE VİRÜS ALARMI -->
        <div class="pop-window" id="pop2" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(1deg);
          width: min(92%, 620px);
          background: #1c1117;
          border: 2px solid #ef4444;
          border-radius: 16px;
          box-shadow: 0 35px 85px rgba(0,0,0,0.95), 0 0 0 1px rgba(239,68,68,0.4);
          z-index: 20;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        ">
          <!-- Başlık Çubuğu -->
          <div style="background: #dc2626; color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 900; font-size: 13px; display: flex; align-items: center; gap: 8px;">
              <span>⚠️</span>
              <span>${isTr ? 'ACİL SİSTEM GÜVENLİK TEHLİKESİ (WINDOWS SHIELD)' : 'CRITICAL SECURITY THREAT DETECTED'}</span>
            </div>
            <div class="pop-close" title="${isTr ? 'Kapat' : 'Close'}" style="
              cursor: pointer;
              background: rgba(0,0,0,0.3);
              width: 28px;
              height: 28px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 15px;
              font-weight: 900;
              transition: background 0.2s;
            " onmouseover="this.style.background='rgba(0,0,0,0.6)'" onmouseout="this.style.background='rgba(0,0,0,0.3)'">✕</div>
          </div>
          <!-- İçerik -->
          <div style="padding: 24px; text-align: center; color: #fca5a5;">
            <div style="font-size: 46px; margin-bottom: 8px;">👾</div>
            <h3 style="font-size: 21px; font-weight: 900; color: #ef4444; margin-bottom: 6px;">
              ${isTr ? '47 ADET TEHLİKELİ TRUVA ATI & CASUS YAZILIM TESPİT EDİLDİ!' : '47 INFECTED TROJANS & SPYWARE DETECTED!'}
            </h3>
            <p style="font-size: 13px; color: #e2e8f0; max-width: 480px; margin: 0 auto 16px auto; line-height: 1.5;">
              ${isTr ? 'Tarayıcınızın arka planında aktif veri sızıntısı algılandı. Sabit diskiniz zarar görmeden ve dosyalarınız kilitlenmeden derhal temizleyin!' : 'Active background data exfiltration detected. Clean your hard drive immediately before critical system files are encrypted!'}
            </p>
            <!-- Simüle Edilmiş Tehdit Listesi -->
            <div style="
              background: #0b0709;
              border: 1px solid #7f1d1d;
              border-radius: 8px;
              padding: 10px 14px;
              font-family: monospace;
              font-size: 11px;
              color: #f87171;
              text-align: left;
              max-width: 480px;
              margin: 0 auto 20px auto;
              line-height: 1.6;
            ">
              <div>🔴 [KRİTİK] Trojan.Generic.CoinMiner.32 - %98 CPU Tüketimi</div>
              <div>🔴 [TEHLİKELİ] Adware.SpyTrack.Keylogger - Şifreler Tehlikede</div>
            </div>
            <div>
              <button class="pop-trap-btn" style="
                background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
                color: #ffffff;
                border: none;
                font-family: inherit;
                font-size: 15px;
                font-weight: 900;
                padding: 13px 42px;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 10px 25px rgba(239, 68, 68, 0.5);
              ">
                ${isTr ? 'BİLGİSAYARI ŞİMDİ TEMİZLE' : 'CLEAN INFECTIONS NOW'}
              </button>
            </div>
          </div>
        </div>

        <!-- POP-UP 4 (EN ÜST KATMAN - Z-INDEX 25): DEV ŞANSLI ÇARKIFELEK BONUS MODALI -->
        <div class="pop-window" id="pop4" style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-0.5deg);
          width: min(92%, 620px);
          background: #1a0b2e;
          border: 2px solid #c084fc;
          border-radius: 16px;
          box-shadow: 0 40px 90px rgba(0,0,0,0.95), 0 0 0 1px rgba(192,132,252,0.4);
          z-index: 25;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
        ">
          <!-- Başlık Çubuğu -->
          <div style="background: linear-gradient(90deg, #9333ea 0%, #7e22ce 100%); color: #fff; padding: 10px 16px; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 900; font-size: 13px; display: flex; align-items: center; gap: 8px;">
              <span>🎡</span>
              <span>${isTr ? 'ŞANSLI ÇARKIFELEK MEGA VIP BONUS' : 'LUCKY SPIN WHEEL VIP BONUS'}</span>
            </div>
            <div class="pop-close" title="${isTr ? 'Kapat' : 'Close'}" style="
              cursor: pointer;
              background: rgba(0,0,0,0.25);
              width: 28px;
              height: 28px;
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 15px;
              font-weight: 900;
              transition: background 0.2s;
            " onmouseover="this.style.background='rgba(239,68,68,0.8)'" onmouseout="this.style.background='rgba(0,0,0,0.25)'">✕</div>
          </div>
          <!-- İçerik -->
          <div style="padding: 24px; text-align: center; color: #e9d5ff;">
            <div style="font-size: 48px; margin-bottom: 8px; filter: drop-shadow(0 0 15px rgba(192,132,252,0.6));">🎯</div>
            <h3 style="font-size: 21px; font-weight: 900; color: #ffffff; margin-bottom: 6px;">
              ${isTr ? 'ÜCRETSİZ 1X VIP ÇEVİRME HAKKI KAZANDINIZ!' : 'YOU WON 1X FREE VIP WHEEL SPIN!'}
            </h3>
            <p style="font-size: 13px; color: #d8b4fe; max-width: 440px; margin: 0 auto 16px auto; line-height: 1.5;">
              ${isTr ? 'Büyük ikramiye: 250.000 TL Nakit veya Lüks Otomobil! Şansınızı denemek için aşağıdaki butona basın.' : 'Grand Prize: $50,000 Cash or Luxury Sports Car! Spin right now to reveal your prize.'}
            </p>
            <div style="display: flex; justify-content: center; gap: 14px; margin-bottom: 20px;">
              <span style="background: rgba(168,85,247,0.2); border: 1px solid #a855f7; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700;">💎 %100 Kazanma Garantisi</span>
              <span style="background: rgba(234,179,8,0.2); border: 1px solid #eab308; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 700;">⚡ Anında Teslim</span>
            </div>
            <div>
              <button class="pop-trap-btn" style="
                background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
                color: #ffffff;
                border: none;
                font-family: inherit;
                font-size: 16px;
                font-weight: 900;
                padding: 14px 44px;
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 10px 25px rgba(168, 85, 247, 0.5);
              ">
                ${isTr ? 'ÇARKI ÇEVİR VE KAZAN!' : 'SPIN THE WHEEL NOW!'}
              </button>
            </div>
          </div>
        </div>

      </div>
    `;

    const stage = document.getElementById('popupStage');
    let openCount = 4;

    const closePop = (win) => {
      win.style.transform = 'translate(-50%, -50%) scale(0.85)';
      win.style.opacity = '0';
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
        showToast(isTr ? 'Sponsorlu reklama tıkladınız! Sağ üstteki X ile kapatın.' : 'Clicked sponsored ad! Close it using the top-right X.');
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
