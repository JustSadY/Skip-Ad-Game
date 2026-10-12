// LEVEL: Şifre Çözücü / Spoiler Kutuları Tuzağı
window.LevelModules = window.LevelModules || {};

window.LevelModules['password'] = {
  id: 'password',
  url: 'https://protected-vault.link/unlock-file',
  tabTitle: (lang) => lang === 'tr' ? '🔑 Şifreli Bağlantı Kasası' : '🔑 Encrypted Link Vault',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { slug: 'kta-7' };
    const correctPass = `${game.slug.toUpperCase()}-2026`;

    container.innerHTML = `
      <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0f172a; padding: 20px; font-family: -apple-system, sans-serif; color: #fff;">
        
        <div style="background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 24px; max-width: 480px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <div style="font-size: 24px;">🔐</div>
            <h2 style="font-size: 18px; font-weight: 800; color: #f8fafc;">
              ${isTr ? 'Bu İndirme Bağlantısı Şifrelidir' : 'This Download Link is Password Protected'}
            </h2>
          </div>

          <p style="font-size: 12px; color: #94a3b8; margin-bottom: 16px;">
            ${isTr ? 'Aşağıdaki gizli kutulardan doğru şifreyi bulun ve kutuya yazın:' : 'Find the correct password from the hidden spoiler boxes below:'}
          </p>

          <!-- 3 SPOILER KUTUSU -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px;">
            <div class="spoiler-card" data-idx="1" style="background: #0f172a; border: 1px dashed #475569; border-radius: 8px; padding: 12px 6px; text-align: center; cursor: pointer;">
              <span class="spoiler-label" style="font-size: 11px; color: #facc15; font-weight: 700;">📦 ${isTr ? 'KUTU 1' : 'BOX 1'}</span>
            </div>
            <div class="spoiler-card" data-idx="2" style="background: #0f172a; border: 1px dashed #475569; border-radius: 8px; padding: 12px 6px; text-align: center; cursor: pointer;">
              <span class="spoiler-label" style="font-size: 11px; color: #facc15; font-weight: 700;">📦 ${isTr ? 'KUTU 2' : 'BOX 2'}</span>
            </div>
            <div class="spoiler-card" data-idx="3" style="background: #0f172a; border: 1px dashed #475569; border-radius: 8px; padding: 12px 6px; text-align: center; cursor: pointer;">
              <span class="spoiler-label" style="font-size: 11px; color: #facc15; font-weight: 700;">📦 ${isTr ? 'KUTU 3' : 'BOX 3'}</span>
            </div>
          </div>

          <!-- ŞİFRE GİRİŞ VE REKLAMI GEÇ -->
          <div style="background: #090d16; border: 1px solid #334155; border-radius: 10px; padding: 14px;">
            <div style="font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px;">
              ${isTr ? 'KİLİT ŞİFRESİ:' : 'VAULT PASSWORD:'}
            </div>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="passInput" placeholder="${isTr ? 'Şifreyi buraya yazın...' : 'Enter password...'}" style="
                flex: 1;
                background: #1e293b;
                border: 1px solid #475569;
                border-radius: 6px;
                padding: 10px 12px;
                color: #fff;
                font-family: monospace;
                font-size: 13px;
                outline: none;
              ">
              <button id="unlockBtn" style="
                background: #0284c7;
                color: #fff;
                border: none;
                font-family: var(--font-ui);
                font-size: 13px;
                font-weight: 800;
                padding: 0 18px;
                border-radius: 6px;
                cursor: pointer;
              ">
                ${isTr ? 'KİLİDİ AÇ & GEÇ' : 'UNLOCK & SKIP'}
              </button>
            </div>
          </div>

        </div>

      </div>
    `;

    // Rastgele kazanan kutu (1, 2 veya 3)
    const winningBox = 1 + Math.floor(Math.random() * 3);
    const passInput = document.getElementById('passInput');
    const unlockBtn = document.getElementById('unlockBtn');

    document.querySelectorAll('.spoiler-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.idx);
        if (window.AudioEngine) window.AudioEngine.play('tick');

        if (idx === winningBox) {
          card.style.borderColor = '#22c55e';
          card.style.background = 'rgba(34, 197, 94, 0.1)';
          card.innerHTML = `<span style="font-size: 12px; font-weight: 800; color: #22c55e;">🔑 ${correctPass}</span>`;
          passInput.value = correctPass; // Otomatik doldurma kolaylığı
        } else {
          card.style.borderColor = '#ef4444';
          card.style.background = 'rgba(239, 68, 68, 0.1)';
          card.innerHTML = `<span style="font-size: 10px; color: #ef4444;">${isTr ? '❌ Burası boş!' : '❌ Empty!'}</span>`;
        }
      });
    });

    const tryUnlock = () => {
      const entered = passInput.value.trim().toUpperCase();
      if (entered === correctPass) {
        unlockBtn.style.pointerEvents = 'none';
        unlockBtn.style.background = '#22c55e';
        unlockBtn.textContent = '✓ OK';
        if (window.AudioEngine) window.AudioEngine.play('pass');
        onComplete();
      } else {
        onError();
        passInput.classList.add('shake-anim');
        setTimeout(() => passInput.classList.remove('shake-anim'), 350);
        if (window.AudioEngine) window.AudioEngine.play('fail');
      }
    };

    unlockBtn.addEventListener('click', tryUnlock);
    passInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') tryUnlock();
    });
  },

  cleanup: function() {}
};
