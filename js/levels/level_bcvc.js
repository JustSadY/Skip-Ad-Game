// LEVEL 1: Furgusal Link Kısaltıcı (link-skip.net)
window.LevelModules = window.LevelModules || {};

window.LevelModules['bcvc'] = {
  id: 'bcvc',
  get url() {
    const game = window.currentGame || { slug: 'kta-7' };
    return `https://link-skip.net/${game.slug}`;
  },
  tabTitle: (lang) => {
    const game = window.currentGame || { name: 'K-T-A 7' };
    return `link-skip - ${game.name}`;
  },
  
  timer: null,

  render: function(container, onComplete, onError, showToast, t) {
    const game = window.currentGame || { name: 'K-T-A 7', slug: 'kta-7', file: 'KTA7_Full_Setup.pkg', size: '68 GB' };

    container.innerHTML = `
      <header class="bcvc-header-bar">
        <div class="bcvc-brand-area">
          <div class="bcvc-logo">
            link<span class="dot-vc">.skip</span>
            <span class="bcvc-logo-tag">shortener</span>
          </div>
          <div class="bcvc-target-dest">
            <span>${t('bcvc_target_prefix') || 'Hedef:'}</span>
            <strong>${game.name}</strong>
          </div>
        </div>

        <div class="bcvc-action-area">
          <div class="bcvc-timer-box" id="bcvcTimerBox">
            <span>${t('bcvc_wait_text') || 'Lütfen bekleyin:'}</span>
            <span class="bcvc-sec-num" id="bcvcSec">5</span>
            <span>${t('bcvc_sec_unit') || 'sn'}</span>
          </div>

          <button class="bcvc-skip-button" id="bcvcSkipBtn" style="display: none;">
            <span>${t('btn_skip_ad') || 'REKLAMI GEÇ'}</span>
            <span>➜</span>
          </button>
        </div>
      </header>

      <main class="bcvc-content-body">
        <div class="fake-ad-card" id="fakeAdCard">
          <span class="fake-ad-tag">SPONSORED ADVERTISEMENT</span>
          <div class="fake-ad-icon">🎮⚡</div>
          <h2 class="fake-ad-title">⚡ ${game.name} ULTRA SÜRÜM</h2>
          <p class="fake-ad-desc">Beklenen açık dünya oyunu yayında! Oyunu hemen başlatmak için aşağıdaki butona basın.</p>
          <button class="fake-download-btn" id="fakeDownloadBtn">
            <span style="font-size: 18px;">⬇️</span>
            <span>OYUNU BAŞLAT (${game.size})</span>
          </button>
          <div class="fake-file-info">
            ${game.file} • SHA-256 Doğrulandı • Dijital Sertifikalı
          </div>
        </div>
      </main>
    `;

    const timerBox = document.getElementById('bcvcTimerBox');
    const secSpan = document.getElementById('bcvcSec');
    const skipBtn = document.getElementById('bcvcSkipBtn');
    const fakeBtn = document.getElementById('fakeDownloadBtn');
    const fakeCard = document.getElementById('fakeAdCard');

    let count = 5;

    this.timer = setInterval(() => {
      if (count > 1) {
        count--;
        secSpan.textContent = count;
        if (window.AudioEngine) window.AudioEngine.play('tick');
      } else if (count === 1) {
        count = 0;
        clearInterval(this.timer);
        timerBox.style.display = 'none';
        skipBtn.style.display = 'inline-flex';
        if (window.AudioEngine) window.AudioEngine.play('tick');
      }
    }, 1000);

    // Erken tık
    timerBox.addEventListener('click', () => {
      onError();
      showToast(t('toast_wait') || 'Lütfen 5 saniye bekleyin! Reklamı henüz geçemezsiniz!');
    });

    // Sahte buton tık
    const handleTrap = (e) => {
      e.stopPropagation();
      onError();
      fakeCard.classList.add('shake-anim');
      setTimeout(() => fakeCard.classList.remove('shake-anim'), 350);
      showToast(t('toast_fake_click') || 'Tuzak butona tıkladınız! Sağ üstteki reklamı geç butonunu bekleyin!');
    };

    fakeBtn.addEventListener('click', handleTrap);
    fakeCard.addEventListener('click', handleTrap);

    // Gerçek Reklamı Geç
    skipBtn.addEventListener('click', () => {
      if (skipBtn.classList.contains('disabled')) return;
      skipBtn.style.pointerEvents = 'none';
      if (this.timer) clearInterval(this.timer);
      onComplete();
    });
  },

  cleanup: function() {
    if (this.timer) clearInterval(this.timer);
  }
};
