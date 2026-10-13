// Two bounded, replayable nightmare challenges. No real browser dialogs or tabs.
window.LevelModules = window.LevelModules || {};
(function () {
  const text = (tr, en) => (window.currentLanguage || 'tr') === 'tr' ? tr : en;
  function setup(id, url, trTitle, enTitle, build) {
    window.LevelModules[id] = {
      id, url, tabTitle: lang => lang === 'tr' ? trTitle : enTitle,
      root: null, handler: null, timers: [],
      render(container, onComplete, onError) {
        this.cleanup();
        const game = this;
        const defer = (fn, ms) => {
          const timer = setTimeout(() => {
            game.timers = game.timers.filter(x => x !== timer);
            if (game.root && game.root.isConnected) fn();
          }, ms);
          game.timers.push(timer);
        };
        container.innerHTML = '<div class="nightmare-stage" style="flex:1;min-height:0;overflow:auto;display:flex;align-items:center;justify-content:center;background:#e5e7eb;color:#202124;padding:18px"></div>';
        this.root = container.firstElementChild;
        build(this.root, onComplete, onError, defer, h => { this.handler = h; this.root.addEventListener('click', h); });
      },
      cleanup() {
        this.timers.forEach(clearTimeout);
        this.timers = [];
        if (this.root && this.handler) this.root.removeEventListener('click', this.handler);
        this.handler = null;
        this.root = null;
      }
    };
  }
  setup('permission_maze', 'https://consent-maze.invalid/settings',
    'İzin Labirenti', 'Permission Maze', (root, done, fail, defer, listen) => {
      // Every refusal is attainable; wrong action resets only the current step.
      const steps = 12;
      let step = 0, locked = false;
      const render = () => {
        const slot = (step * 7 + 1) % 4;
        const labels = [
          text('TÜMÜNÜ KABUL ET', 'ACCEPT ALL'),
          text('ÖNERİLENİ ETKİNLEŞTİR', 'ENABLE RECOMMENDED'),
          text('KİŞİSELLEŞTİR', 'PERSONALIZE'),
          text('GEREKSİZ İZİNLERİ REDDET', 'REJECT OPTIONAL')
        ];
        const buttons = [0, 1, 2, 3].map((i) => {
          const correct = i === slot;
          return '<button data-correct="' + correct + '" style="min-height:49px;cursor:pointer;border:1px solid #475569;border-radius:9px;background:' + (correct ? '#334155' : '#433846') + ';color:white;font-weight:700;padding:12px;">'
            + labels[correct ? 3 : (i + step) % 3] + '</button>';
        }).join('');
        root.innerHTML = '<section style="width:min(100%,560px);border:1px solid #dadce0;border-radius:5px;background:white;color:#202124;padding:24px;box-shadow:0 14px 35px #0003;font-family:Arial,sans-serif">'
          + '<div style="color:#5f6368;font-weight:700">' + text('ÇEREZ KÂBUSU', 'COOKIE NIGHTMARE') + '</div>'
          + '<h2 style="margin:12px 0">' + text('Tercihlerinizden emin misiniz?', 'Are you sure about your preferences?') + '</h2>'
          + '<p style="color:#5f6368;margin-bottom:20px">' + text('İsteğe bağlı izinleri 12 kez reddet. Butonlar her seferinde yer değiştirir.', 'Reject optional permissions 12 times. Buttons move after each choice.') + '</p>'
          + '<p style="margin-bottom:15px;font-family:monospace">' + step + ' / ' + steps + '</p>'
          + '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">' + buttons + '</div></section>';
      };
      listen(e => {
        const b = e.target.closest('button[data-correct]');
        if (!b || locked) return;
        if (b.dataset.correct !== 'true') { fail(); return; }
        step++;
        if (step >= steps) { locked = true; root.innerHTML = '<h2>' + text('TÜM İZİNLER REDDEDİLDİ!', 'ALL PERMISSIONS REJECTED!') + '</h2>'; defer(done, 400); }
        else render();
      });
      render();
    });

  setup('fake_skip', 'https://skip-button-hunt.invalid/play',
    'Sahte Geçiş Tuşları', 'Fake Skip Button Hunt', (root, done, fail, defer, listen) => {
      const rounds = 5, options = 24;
      let round = 0, locked = false;
      const render = () => {
        // One correct button each round. Trap clicks never block the winning solution.
        const correctIndex = (round * 11 + 17) % options;
        let buttons = '';
        for (let i = 0; i < options; i++) {
          const correct = i === correctIndex;
          buttons += '<button data-win="' + correct + '" style="min-height:42px;cursor:pointer;background:' + (correct ? '#14532d' : '#1e293b') + ';border:1px solid ' + (correct ? '#4ade80' : '#475569') + ';color:white;border-radius:8px;font-size:12px;font-weight:800;">'
            + (correct ? text('REKLAMI GEÇ ✓', 'SKIP AD ✓') : [text('REKLAMI GEÇ', 'SKIP AD'), text('HIZLI GEÇ', 'FAST SKIP'), 'SKIP ▶', '✕ CLOSE'][i % 4]) + '</button>';
        }
        root.innerHTML = '<section style="width:min(100%,750px);border:1px solid #dadce0;border-radius:5px;background:white;color:#202124;padding:19px;font-family:Arial,sans-serif">'
          + '<h2 style="margin-bottom:9px">' + text('24 BUTON, 1 GERÇEK ÇIKIŞ', '24 BUTTONS, 1 REAL EXIT') + '</h2>'
          + '<p style="color:#cbd5e1;margin-bottom:15px">' + text('Yeşil kenarlı ve ✓ işaretli gerçek butonu bul. 5 turu tamamla.', 'Find the real button with a green border and ✓. Clear 5 rounds.') + '</p>'
          + '<p style="font-family:monospace;margin-bottom:14px">' + (round + 1) + ' / ' + rounds + '</p>'
          + '<div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px">' + buttons + '</div></section>';
      };
      listen(e => {
        const button = e.target.closest('button[data-win]');
        if (!button || locked) return;
        if (button.dataset.win !== 'true') { fail(); button.disabled = true; button.style.opacity = '.35'; return; }
        round++;
        if (round >= rounds) { locked = true; root.innerHTML = '<h2>' + text('SAHTE BUTONLARI AŞTIN!', 'YOU BEAT THE FAKE BUTTONS!') + '</h2>'; defer(done, 400); }
        else render();
      });
      render();
    });
  // Twelve fake update dialogs, each with a different dismiss action.
  setup('update_nightmare', 'https://updates.invalid/reboot',
    'Sahte Güncelleme Kabusu', 'Fake Update Nightmare', (root, done, fail, defer, listen) => {
      let stage = 0, completed = false;
      const render = () => {
        const safe = (stage * 5 + 2) % 3;
        const correct = text('GÜNCELLEMEYİ ERTELE', 'POSTPONE UPDATE');
        const traps = [text('ŞİMDİ YÜKLE', 'INSTALL NOW'), text('TÜMÜNÜ KABUL ET', 'ACCEPT ALL')];
        const buttons = Array.from({length:3}, (_,i) => '<button data-safe="' + (i===safe) + '" style="cursor:pointer;padding:15px 9px;border:1px solid #64748b;border-radius:9px;color:white;background:' + (i===safe?'#14532d':'#7f1d1d') + '">' + (i===safe?correct:traps[i<safe?i:i-1]) + '</button>').join('');
        root.innerHTML = '<section style="background:#0874bd;border:1px solid #5dade2;border-radius:3px;padding:24px;width:min(100%,580px);text-align:center;color:white;font-family:Segoe UI,Arial,sans-serif;box-shadow:0 16px 40px #0004"><h2>⚙️ ' + text('ZORUNLU GÜNCELLEME', 'MANDATORY UPDATE') + '</h2><p style="margin:15px 0;color:#cbd5e1">' + text('Sahte güncellemeleri ertele. Her pencerede doğru seçeneği bul.', 'Postpone each fake update to escape.') + '</p><p style="margin:14px;font-family:monospace">' + stage + ' / 12</p><div style="display:grid;grid-template-columns:1fr;gap:10px">' + buttons + '</div></section>';
      };
      listen(e => {
        const b=e.target.closest('button[data-safe]'); if(!b||completed) return;
        if(b.dataset.safe!=='true'){fail();b.disabled=true;return;}
        stage++; if(stage===12){completed=true;root.innerHTML='<h2>'+text('GÜNCELLEMELER ENGELLENDİ','UPDATES DISMISSED')+'</h2>';defer(done,350);}else render();
      }); render();
    });

  // The progress bar lies; selecting the single diagnostic control advances.
  setup('loading_99', 'https://loading.invalid/99',
    'Yüzde 99 Tuzağı', '99 Percent Loading Trap', (root, done, fail, defer, listen) => {
      let phase=0,completed=false;
      const render=()=>{
        const safe=(phase*3+1)%4;
        const opts=Array.from({length:4},(_,i)=>'<button data-safe="'+(i===safe)+'" style="padding:12px;min-height:48px;cursor:pointer;background:#1e293b;border:1px solid #475569;border-radius:8px;color:white">'+(i===safe?text('BAĞLANTIYI DENETLE ✓','CHECK CONNECTION ✓'):[text('YENİDEN BAŞLAT','RESTART'),text('HIZLI YÜKLE','SPEED UP'),text('REKLAMI İZLE','WATCH AD')][i<safe?i:i-1])+'</button>').join('');
        root.innerHTML='<section style="width:min(100%,560px);padding:25px;border:2px solid #334155;border-radius:15px;background:#fff;color:#202124;text-align:center;font-family:Arial,sans-serif"><h2>'+text('YÜKLENİYOR...','LOADING...')+'</h2><div style="height:22px;border-radius:15px;background:#e5e7eb;margin:22px 0;overflow:hidden"><div style="width:99%;height:100%;background:#22c55e"></div></div><h2>99%</h2><p style="color:#94a3b8;margin:15px 0">'+text('Takılan işlemi 8 defa teşhis et.','Diagnose the stalled process 8 times.')+' '+phase+'/8</p><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px">'+opts+'</div></section>';
      };
      listen(e=>{const b=e.target.closest('button[data-safe]');if(!b||completed)return;if(b.dataset.safe!=='true'){fail();b.disabled=true;return;}phase++;if(phase===8){completed=true;root.innerHTML='<h2>100% ✓</h2>';defer(done,450);}else render();});render();
    });

  // Arithmetic captcha with deterministic, solvable answers and bounded rounds.
  setup('captcha_marathon', 'https://verification.invalid/marathon',
    'CAPTCHA Maratonu', 'CAPTCHA Marathon', (root, done, fail, defer, listen) => {
      let round=0, completed=false;
      const render=()=>{
        const a=7+round*3,b=4+(round%5),answer=a+b;
        const options=[answer-3,answer+2,answer,answer+5].map((num,i)=>'<button data-answer="'+num+'" style="min-height:54px;cursor:pointer;background:#1e293b;color:white;border:1px solid #64748b;border-radius:10px;font-size:20px;font-weight:800">'+num+'</button>').join('');
        root.innerHTML='<section style="width:min(100%,520px);background:#fff;color:#202124;border:1px solid #dadce0;padding:23px;border-radius:5px;box-shadow:0 14px 35px #0003;font-family:Arial,sans-serif;text-align:center"><h2>'+text('ROBOT OLMADIĞINI KANITLA','PROVE YOU ARE HUMAN')+'</h2><p style="margin:14px 0">'+text('8 doğrulamanın hepsini çöz.','Solve all 8 checks.')+' '+(round+1)+'/8</p><h1 style="font-size:38px;margin:20px 0">'+a+' + '+b+' = ?</h1><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">'+options+'</div></section>';
      };
      listen(e=>{const b=e.target.closest('button[data-answer]');if(!b||completed)return;const expected=7+round*3+4+(round%5);if(Number(b.dataset.answer)!==expected){fail();b.disabled=true;return;}round++;if(round===8){completed=true;root.innerHTML='<h2>'+text('DOĞRULANDIN ✓','VERIFIED ✓')+'</h2>';defer(done,400);}else render();});render();
    });
})();
