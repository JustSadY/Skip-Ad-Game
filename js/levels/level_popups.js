// LEVEL: Pop-Up Storm — Nightmare mode, 50 bounded in-game windows.
// All popups are DOM elements inside the simulated browser, never browser tabs.
window.LevelModules = window.LevelModules || {};

window.LevelModules['popups'] = {
  id: 'popups',
  url: 'https://ad-storm-portal.xyz/unblock',
  tabTitle: (lang) => lang === 'tr' ? 'Reklam Kabusu!' : 'Popup Nightmare!',
  stage: null,
  clickHandler: null,
  timers: [],
  finished: false,

  render: function(container, onComplete, onError, showToast) {
    this.cleanup();
    this.finished = false;
    const self = this;
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const TOTAL = 50;
    const MAX_VISIBLE = 7;
    let spawned = 0;
    let closed = 0;
    let active = 0;
    let nextId = 0;

    const messages = isTr ? [
      ['⚠️', 'KRİTİK GÜVENLİK UYARISI', 'Bilgisayarınızda 99 sorun bulundu.', 'HEMEN ONAR'],
      ['🎁', 'ŞANSLI ZİYARETÇİ!', 'Ödülünüzü almak için hemen devam edin.', 'ÖDÜLÜ AL'],
      ['🔔', 'BİLDİRİM İZNİ', 'Bildirimleri açarak özel teklifleri kaçırmayın.', 'İZİN VER'],
      ['🎡', 'MEGA VIP ÇARKI', 'Büyük ödüle sadece bir tık kaldı.', 'ŞİMDİ ÇEVİR'],
      ['💾', 'İNDİRME HAZIR', 'Dosyanız için hızlı indirmeyi etkinleştirin.', 'İNDİR']
    ] : [
      ['⚠️', 'CRITICAL SECURITY ALERT', '99 problems were detected on your computer.', 'FIX NOW'],
      ['🎁', 'LUCKY VISITOR!', 'Claim your surprise prize before it expires.', 'CLAIM PRIZE'],
      ['🔔', 'NOTIFICATION PERMISSION', 'Enable notifications for exclusive offers.', 'ALLOW'],
      ['🎡', 'VIP BONUS WHEEL', 'You are one click away from the grand prize.', 'SPIN NOW'],
      ['💾', 'DOWNLOAD READY', 'Activate fast download for your file.', 'DOWNLOAD']
    ];

    container.innerHTML = '<div id="popupStage" style="flex:1;min-height:0;position:relative;overflow:hidden;background:radial-gradient(circle,#1e293b,#030712);display:flex;align-items:center;justify-content:center;padding:12px;isolation:isolate;">'
      + '<div style="position:absolute;top:12px;left:12px;z-index:10000;background:#0f172a;border:1px solid #64748b;color:#f8fafc;border-radius:9px;padding:9px 12px;font:700 13px monospace;pointer-events:none;">'
      + (isTr ? 'KÂBUS MODU · KAPATILAN REKLAM: ' : 'NIGHTMARE · ADS CLOSED: ')
      + '<span id="popupProgress">0 / 50</span></div>'
      + '<div id="popupVictory" hidden style="position:relative;z-index:2;width:min(92%,490px);background:#172033;border:2px solid #22c55e;border-radius:16px;padding:30px 20px;text-align:center;color:white;box-shadow:0 24px 55px #000a;">'
      + '<div style="font-size:46px">🏆</div><h2 style="font-size:23px;margin:12px 0">'
      + (isTr ? '50 REKLAMI TEMİZLEDİN!' : 'ALL 50 ADS CLEARED!')
      + '</h2><p style="color:#cbd5e1;margin:12px 0 22px">'
      + (isTr ? 'Bu sefer gerçekten bitti.' : 'This time it really is over.')
      + '</p><button type="button" data-action="finish" style="background:#16a34a;color:white;border:0;border-radius:10px;padding:15px 28px;cursor:pointer;font-weight:800">'
      + (isTr ? '✓ REKLAMI GEÇ' : '✓ SKIP AD') + '</button></div></div>';

    const stage = container.querySelector('#popupStage');
    const progress = container.querySelector('#popupProgress');
    const victory = container.querySelector('#popupVictory');
    this.stage = stage;

    const schedule = (fn, delay) => {
      const timer = setTimeout(() => {
        self.timers = self.timers.filter(id => id !== timer);
        if (self.stage === stage && stage.isConnected && !self.finished) fn();
      }, delay);
      self.timers.push(timer);
    };

    const spawn = () => {
      if (spawned >= TOTAL || active >= MAX_VISIBLE || self.finished) return;
      const id = ++nextId;
      const data = messages[(id - 1) % messages.length];
      const win = document.createElement('section');
      win.className = 'pop-window';
      win.dataset.popupId = String(id);
      win.style.cssText = 'position:absolute;left:50%;top:50%;width:min(90%,460px);max-height:75%;overflow:auto;'
        + 'transform:translate(calc(-50% + ' + (((id * 53) % 91) - 45) + 'px),calc(-50% + ' + (((id * 37) % 75) - 37) + 'px));'
        + 'background:#172033;border:2px solid ' + ['#f59e0b','#ef4444','#a855f7','#38bdf8'][id % 4]
        + ';border-radius:13px;box-shadow:0 18px 55px #000c;color:white;z-index:' + (10 + id) + ';';
      win.innerHTML = '<header style="display:flex;justify-content:space-between;align-items:center;gap:8px;background:#334155;padding:10px 12px;font-weight:800;font-size:12px;">'
        + '<span>' + data[0] + ' ' + data[1] + ' #' + id + '</span>'
        + '<button type="button" data-action="close" aria-label="' + (isTr ? 'Reklamı kapat' : 'Close ad') + '" style="background:#991b1b;border:0;border-radius:6px;color:white;cursor:pointer;min-width:34px;min-height:34px;font-weight:900;">✕</button>'
        + '</header><div style="padding:22px 15px;text-align:center"><div style="font-size:36px;margin-bottom:10px">' + data[0]
        + '</div><p style="line-height:1.5;margin:0 0 17px;font-size:14px">' + data[2] + '</p>'
        + '<button type="button" data-action="trap" style="background:#eab308;color:#111827;border:0;border-radius:8px;padding:12px 20px;font-weight:800;cursor:pointer;">'
        + data[3] + '</button></div>';
      stage.appendChild(win);
      spawned++;
      active++;
    };

    const revealIfFinished = () => {
      if (closed !== TOTAL || active !== 0 || spawned !== TOTAL) return;
      victory.hidden = false;
      victory.style.display = 'block';
    };

    const closePopup = win => {
      if (!win || win.dataset.closing === 'true' || self.finished) return;
      win.dataset.closing = 'true';
      win.remove();
      active--;
      closed++;
      progress.textContent = closed + ' / ' + TOTAL;
      if (window.AudioEngine) window.AudioEngine.play('tick');

      if (spawned < TOTAL) {
        // Bounded replacement: some closes produce two new ads, others only one.
        // The quota always stops at 50, so the level cannot run forever.
        const extra = (closed % 3 === 0) ? 1 : 0;
        const replacementCount = Math.min(1 + extra, TOTAL - spawned, MAX_VISIBLE - active);
        schedule(() => {
          for (let i = 0; i < replacementCount; i++) spawn();
          revealIfFinished();
        }, 110);
      } else {
        revealIfFinished();
      }
    };

    this.clickHandler = e => {
      const button = e.target.closest('button[data-action]');
      if (!button || !stage.contains(button) || self.finished) return;
      e.preventDefault();
      e.stopPropagation();
      const action = button.dataset.action;
      if (action === 'close') closePopup(button.closest('.pop-window'));
      if (action === 'trap') {
        onError();
        const win = button.closest('.pop-window');
        if (win) {
          win.classList.add('shake-anim');
          schedule(() => { if (win.isConnected) win.classList.remove('shake-anim'); }, 350);
        }
        showToast(isTr ? 'Bu sahte bir buton! X işaretini bul.' : 'That was a trap! Find the X.');
      }
      if (action === 'finish' && closed === TOTAL && active === 0 && spawned === TOTAL) {
        self.finished = true;
        onComplete();
      }
    };
    stage.addEventListener('click', this.clickHandler);
    for (let i = 0; i < 5; i++) spawn();
  },

  cleanup: function() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    if (this.stage && this.clickHandler) this.stage.removeEventListener('click', this.clickHandler);
    this.stage = null;
    this.clickHandler = null;
    this.finished = false;
  }
};
