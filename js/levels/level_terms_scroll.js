// LEVEL: 10.000 Kelimelik Kullanıcı Sözleşmesi Kaydırma
window.LevelModules = window.LevelModules || {};

window.LevelModules['terms_scroll'] = {
  id: 'terms_scroll',
  url: 'https://eula-legal-service.net/user-agreement',
  tabTitle: (lang) => lang === 'tr' ? '📜 14 Sayfalık Hizmet Şartları' : '📜 14-Page Terms of Service',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    container.innerHTML = `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0c0a09; padding: 20px; font-family: -apple-system, sans-serif; color: #e7e5e4;">
        
        <div style="background: #1c1917; border: 1px solid #44403c; border-radius: 16px; max-width: 520px; width: 100%; padding: 22px; box-shadow: 0 20px 40px rgba(0,0,0,0.7);">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="font-size: 15px; font-weight: 800; color: #f59e0b;">
              📜 ${isTr ? 'KULLANICI SÖZLEŞMESİ & REKLAM İZNİ' : 'TERMS OF SERVICE & AD CONSENT'}
            </div>
            <div id="scrollPct" style="font-family: monospace; font-size: 12px; color: #a8a29e; background: #292524; padding: 2px 8px; border-radius: 4px;">
              %0
            </div>
          </div>

          <div style="font-size: 12px; color: #a8a29e; margin-bottom: 12px;">
            ${isTr ? '⚠️ Reklamı geçebilmek için sözleşmenin EN ALTINA kadar kaydırmalısınız.' : '⚠️ You must scroll to the VERY BOTTOM to unlock the skip button.'}
          </div>

          <!-- KAYDIRILABİLİR SÖZLEŞME METNİ -->
          <div id="termsScrollBox" style="
            height: 180px;
            overflow-y: scroll;
            background: #0c0a09;
            border: 2px solid #292524;
            border-radius: 8px;
            padding: 14px;
            font-size: 11px;
            line-height: 1.8;
            color: #78716c;
          ">
            <p><strong>MADDE 1: GENEL HÜKÜMLER</strong><br>Bu internet sayfasına eriştiğiniz andan itibaren tüm kişisel çerezlerinizi, tarayıcı geçmişinizi ve ekran görüntülerinizi üçüncü parti reklam ajanslarına devretmeyi gayrikabili rücu kabul etmiş sayılırsınız.</p>
            <p><strong>MADDE 2: VİRÜS VE YAZILIM SORUMLULUĞU</strong><br>İndireceğiniz dosyalardan bilgisayarınızın alev alması, işlemcinizin aşırı ısınması veya uzaylılar tarafından kaçırılmanız durumunda sitemiz hiçbir mesuliyet kabul etmemektedir.</p>
            <p><strong>MADDE 3: REKLAMI GEÇME HAKKI</strong><br>Kullanıcı reklamı geçmek için sonsuz sabır göstermek zorundadır. Butonlar kaçabilir, sahte pencereler açılabilir ve pop-up fırtınaları kopabilir.</p>
            <p><strong>MADDE 4: RUH VE VERİ TESLİMİ</strong><br>Hizmeti kullanmaya devam ederek ruhunuzu ve ekran kartınızın tüm işlem gücünü kripto para madenciliği için kiralamış sayılırsınız.</p>
            <p><strong>MADDE 5: NİHAİ ONAY</strong><br>Tebrikler, bu metnin sonuna kadar geldiniz. Aşağıdaki butona basarak şartları onaylayabilir ve reklamı geçebilirsiniz.</p>
          </div>

          <!-- ONAY BUTONU (BAŞTA KİLİTLİ) -->
          <button id="termsAcceptBtn" disabled style="
            width: 100%;
            margin-top: 16px;
            background: #292524;
            color: #78716c;
            border: 2px solid #44403c;
            font-family: var(--font-ui);
            font-size: 14px;
            font-weight: 800;
            padding: 12px;
            border-radius: 8px;
            cursor: not-allowed;
            transition: all 0.3s;
          ">
            ${isTr ? '🔒 SÖZLEŞMEYİ SONUNA KADAR OKUYUN' : '🔒 SCROLL TO BOTTOM TO UNLOCK'}
          </button>

        </div>

      </div>
    `;

    const scrollBox = document.getElementById('termsScrollBox');
    const pctSpan = document.getElementById('scrollPct');
    const acceptBtn = document.getElementById('termsAcceptBtn');

    scrollBox.addEventListener('scroll', () => {
      const maxScroll = scrollBox.scrollHeight - scrollBox.clientHeight;
      const current = scrollBox.scrollTop;
      const pct = Math.min(100, Math.round((current / maxScroll) * 100));
      pctSpan.textContent = `%${pct}`;

      // En alta ulaşıldı mı? (Genişletilmiş tolerans ve %95 barajı)
      if (pct >= 95 || maxScroll - current <= 20) {
        acceptBtn.disabled = false;
        acceptBtn.style.cursor = 'pointer';
        acceptBtn.style.background = '#22c55e';
        acceptBtn.style.borderColor = '#86efac';
        acceptBtn.style.color = '#000';
        acceptBtn.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.4)';
        acceptBtn.textContent = isTr ? '✓ ŞARTLARI ONAYLA VE REKLAMI GEÇ' : '✓ ACCEPT TERMS & SKIP AD';
        if (window.AudioEngine) window.AudioEngine.play('tick');
      }
    });

    acceptBtn.addEventListener('click', () => {
      if (acceptBtn.disabled) return;
      acceptBtn.style.pointerEvents = 'none';
      if (window.AudioEngine) window.AudioEngine.play('pass');
      onComplete();
    });
  },

  cleanup: function() {}
};
