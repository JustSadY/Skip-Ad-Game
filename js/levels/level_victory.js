// LEVEL 10: FİNAL - SAHTE YÜKLEME EKRANI & CHROME DİNAZOR OYUNU
// Tüm reklamları geçen kullanıcı "K-T-A 7" oyununun yüklendiğini sanır (%99).
// Ancak aniden bağlantı kopar (Chrome Offline Page) ve T-Rex Dinazor oyunu başlar!
// Dinazor ölürse oyuncu doğrudan Ana Menüye fırlatılır!

window.LevelModules = window.LevelModules || {};

window.LevelModules['victory'] = {
  id: 'victory',
  get url() {
    const game = window.currentGame || { slug: 'kta-7' };
    return `https://play.${game.slug.toLowerCase()}.net/launch`;
  },
  tabTitle: (lang) => {
    const game = window.currentGame || { name: 'K-T-A 7' };
    return lang === 'tr' ? `${game.name}: Başlatılıyor...` : `${game.name}: Launching...`;
  },

  animFrameId: null,
  loadingTimeout: null,
  crashTimeout: null,
  stageTimeouts: [],
  keyHandler: null,

  render: function(container, onComplete, onError, showToast, t) {
    this.cleanup();
    const isTr = (window.currentLanguage || 'tr') === 'tr';
    const game = window.currentGame || { name: 'K-T-A 7', subtitle: 'SAN VARONA • CRIME REPACK' };

    // 1. FAZ: SAHTE YÜKLEME EKRANI (%99'A KADAR DOLDUR)
    container.innerHTML = `
      <div id="fakeLoadingScreen" style="
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle at center, #111827 0%, #030712 100%);
        padding: 30px;
        position: relative;
        overflow: hidden;
      ">
        <div style="position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px); background-size: 24px 24px; opacity: 0.5;"></div>

        <div style="position: relative; z-index: 2; text-align: center; max-width: 520px; width: 100%;">
          <div style="font-size: 42px; margin-bottom: 8px; filter: drop-shadow(0 0 20px rgba(250, 204, 21, 0.4));">🎮</div>
          
          <h1 style="
            font-size: clamp(32px, 5vw, 44px);
            font-weight: 900;
            letter-spacing: -1px;
            margin-bottom: 4px;
            background: linear-gradient(135deg, #facc15 0%, #fb923c 50%, #f43f5e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          ">${game.name}</h1>
          
          <div style="font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: #94a3b8; letter-spacing: 2px; margin-bottom: 32px;">
            ${game.subtitle}
          </div>

          <!-- YÜKLEME ÇUBUĞU (PROGRESS BAR) -->
          <div style="
            width: 100%;
            height: 12px;
            background: #1e293b;
            border-radius: 999px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
            margin-bottom: 14px;
          ">
            <div id="loadingProgressFill" style="
              width: 0%;
              height: 100%;
              background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #a855f7 100%);
              border-radius: 999px;
              transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
              box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
            "></div>
          </div>

          <!-- YÜZDE VE DURUM BİLGİSİ -->
          <div style="display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: 12px; color: #cbd5e1;">
            <span id="loadingStatusText">${isTr ? 'Oyun motoru başlatılıyor...' : 'Initializing game engine...'}</span>
            <span id="loadingPercentText" style="font-weight: 800; color: #38bdf8;">0%</span>
          </div>

          <div style="margin-top: 24px; font-size: 12px; color: #64748b;">
            ${isTr ? '⚠️ Lütfen tarayıcı penceresini kapatmayın.' : '⚠️ Please do not close browser window.'}
          </div>
        </div>
      </div>
    `;

    const progressFill = document.getElementById('loadingProgressFill');
    const percentText = document.getElementById('loadingPercentText');
    const statusText = document.getElementById('loadingStatusText');

    const loadingStages = [
      { pct: 28, delay: 600, tr: 'Shader önbellekleri derleniyor...', en: 'Compiling shader cache...' },
      { pct: 64, delay: 1300, tr: 'San Verona haritası belleğe alınıyor...', en: 'Loading San Verona map data...' },
      { pct: 92, delay: 2000, tr: 'Sunucuya bağlanılıyor...', en: 'Connecting to multiplayer server...' },
      { pct: 99, delay: 2700, tr: '%99 Neredeyse hazır, başlatılıyor...', en: '99% Almost ready, launching...' }
    ];

    loadingStages.forEach(stage => {
      const tid = setTimeout(() => {
        if (!progressFill) return;
        progressFill.style.width = stage.pct + '%';
        percentText.textContent = stage.pct + '%';
        statusText.textContent = isTr ? stage.tr : stage.en;
        if (window.AudioEngine) window.AudioEngine.play('tick');
      }, stage.delay);
      this.stageTimeouts.push(tid);
    });

    // 3.4 saniye sonra GLITCH ve LOST CONNECTION (CHROME OFFLINE EKRANI)
    this.loadingTimeout = setTimeout(() => {
      this.triggerLostConnection(container, isTr, onError, showToast);
    }, 3400);
  },

  triggerLostConnection: function(container, isTr, onError, showToast) {
    if (window.AudioEngine) window.AudioEngine.play('fail');

    // Chrome Başlık ve URL güncellemesi: chrome-error://chromewebdata/
    if (window.setChromeUrl) {
      window.setChromeUrl('chrome-error:', '//chromewebdata/');
    }
    if (window.setChromeTabTitle) {
      window.setChromeTabTitle(isTr ? 'İnternet bağlantısı yok' : 'No internet', '🦖');
    }

    container.innerHTML = `
      <div id="chromeOfflineView" style="
        flex: 1;
        width: 100%;
        height: 100%;
        background: #202124;
        color: #e8eaed;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        padding: 40px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
        box-sizing: border-box;
      ">
        
        <div style="width: 100%; max-width: 640px;">
          <!-- DİNAZOR OYUN CANVAS ALANI -->
          <div style="width: 100%; margin-bottom: 24px; position: relative;">
            <canvas id="dinoCanvas" width="640" height="180" style="
              background: #202124;
              display: block;
              border-bottom: 2px solid #5f6368;
              cursor: pointer;
              max-width: 100%;
            "></canvas>
            
            <div id="dinoStartHint" style="
              position: absolute;
              top: 12px;
              left: 110px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 11px;
              color: #9aa0a6;
              background: rgba(0,0,0,0.4);
              padding: 4px 10px;
              border-radius: 4px;
              border: 1px solid rgba(255,255,255,0.08);
            ">
              ${isTr ? '🎮 Zıplamak için [ BOŞLUK ] veya [ TIKLA ]' : '🎮 Press [ SPACE ] or [ TAP ] to jump'}
            </div>
          </div>

          <!-- HATA DETAYLARI -->
          <div>
            <h1 style="font-size: 24px; font-weight: 500; margin-bottom: 16px; color: #e8eaed;">
              ${isTr ? 'İnternet bağlantısı yok' : 'No internet'}
            </h1>
            
            <p style="font-size: 14px; color: #9aa0a6; margin-bottom: 12px; line-height: 1.5;">
              ${isTr ? 'Aşağıdakileri deneyin:' : 'Try:'}
            </p>
            
            <ul style="font-size: 13px; color: #9aa0a6; margin-left: 20px; margin-bottom: 24px; line-height: 1.8;">
              <li>${isTr ? 'Ağ kablolarını, modemi ve yönlendiriciyi kontrol etme' : 'Checking the network cables, modem, and router'}</li>
              <li>${isTr ? 'Kablosuz ağa yeniden bağlanma' : 'Reconnecting to Wi-Fi'}</li>
              <li>${isTr ? 'Ağ Teşhislerini ve Bağlantıyı Yenileme' : 'Running Network Diagnostics and Reset'}</li>
            </ul>

            <div style="font-family: monospace; font-size: 12px; color: #80868b; margin-top: 10px;">
              DNS_PROBE_FINISHED_NO_INTERNET
            </div>
          </div>
        </div>

      </div>
    `;

    this.startDinoGame(document.getElementById('dinoCanvas'), isTr, onError, showToast);
  },

  // 2. FAZ: CHROME DİNAZOR OYUN MOTORU (CANVAS T-REX RUNNER)
  startDinoGame: function(canvas, isTr, onError, showToast) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Piksel Dinazor ve Kaktüs Bitmap Tanımları
    const DINO_FRAMES = {
      // Bekleme / Koşma 1
      run1: [
        "............#####...",
        "...........#######..",
        "...........#.#####..",
        "...........#######..",
        "...........#######..",
        "...........####.....",
        "...........#######..",
        "#.........########..",
        "##.......######.....",
        "###.....#######.....",
        "##############......",
        ".############.......",
        "..##########........",
        "...########.........",
        "....##...##.........",
        "....#...............",
        "....#..............."
      ],
      // Koşma 2
      run2: [
        "............#####...",
        "...........#######..",
        "...........#.#####..",
        "...........#######..",
        "...........#######..",
        "...........####.....",
        "...........#######..",
        "#.........########..",
        "##.......######.....",
        "###.....#######.....",
        "##############......",
        ".############.......",
        "..##########........",
        "...########.........",
        "....##...##.........",
        "..........#.........",
        "..........#........."
      ],
      // Zıplama
      jump: [
        "............#####...",
        "...........#######..",
        "...........#.#####..",
        "...........#######..",
        "...........#######..",
        "...........####.....",
        "...........#######..",
        "#.........########..",
        "##.......######.....",
        "###.....#######.....",
        "##############......",
        ".############.......",
        "..##########........",
        "...########.........",
        "....##...##.........",
        "....##...##.........",
        "...................."
      ],
      // Ölü Dinazor (Gözü X)
      dead: [
        "............#####...",
        "...........#######..",
        "...........#X#####..",
        "...........#######..",
        "...........#######..",
        "...........####.....",
        "...........#######..",
        "#.........########..",
        "##.......######.....",
        "###.....#######.....",
        "##############......",
        ".############.......",
        "..##########........",
        "...########.........",
        "....##...##.........",
        "....#.....#.........",
        "...................."
      ]
    };

    const CACTUS_SPRITES = [
      // Küçük Kaktüs
      [
        "..#..",
        ".###.",
        ".###.",
        "#####",
        "#####",
        ".###.",
        ".###.",
        ".###.",
        ".###."
      ],
      // Çiftli Kaktüs
      [
        "..#....#..",
        ".###..###.",
        "#####.###.",
        "#####.####",
        ".###.#####",
        ".###..###.",
        ".###..###.",
        ".###..###."
      ],
      // Büyük Kaktüs
      [
        "...#...",
        "..###..",
        ".#####.",
        "#######",
        "#######",
        "..###..",
        "..###..",
        "..###..",
        "..###..",
        "..###.."
      ]
    ];

    function drawBitmap(matrix, startX, startY, pxSize, color) {
      ctx.fillStyle = color;
      for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
          const char = matrix[r][c];
          if (char === '#' || char === 'X') {
            ctx.fillRect(startX + c * pxSize, startY + r * pxSize, pxSize, pxSize);
          }
        }
      }
    }

    const groundY = 145;
    const pxSize = 2;

    let dino = {
      x: 50,
      y: groundY - 34,
      vy: 0,
      isGrounded: true,
      width: 40,
      height: 34
    };

    let obstacles = [];
    let clouds = [
      { x: 200, y: 30, speed: 0.6 },
      { x: 450, y: 45, speed: 0.8 },
      { x: 580, y: 20, speed: 0.5 }
    ];

    let groundDots = [];
    for (let i = 0; i < 25; i++) {
      groundDots.push({
        x: Math.random() * canvas.width,
        y: groundY + 8 + Math.random() * 18,
        width: Math.random() < 0.5 ? 4 : 8
      });
    }

    let gameStarted = false;
    let isGameOver = false;
    let score = 0;
    let highScore = 480;
    let frame = 0;
    let speed = 3.6; // Gerçek Chrome dinazoru hızında akıcı ve adil başlangıç
    let spawnTimer = 0;

    // Zıplama Sesi
    function playJumpSound() {
      if (!window.AudioEngine) return;
      window.AudioEngine.init();
      const audioCtx = window.AudioEngine.ctx;
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }

    // Skor 100 Barajı Sesi
    function playBeep100() {
      if (!window.AudioEngine) return;
      window.AudioEngine.init();
      const audioCtx = window.AudioEngine.ctx;
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.setValueAtTime(950, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }

    function doJump() {
      if (isGameOver) return;
      if (!gameStarted) {
        gameStarted = true;
        const hint = document.getElementById('dinoStartHint');
        if (hint) hint.style.display = 'none';
      }
      if (dino.isGrounded) {
        dino.vy = -9.2; // Yumuşak ve dengeli zıplama
        dino.isGrounded = false;
        playJumpSound();
      }
    }

    this.keyHandler = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        doJump();
      }
    };

    window.addEventListener('keydown', this.keyHandler);
    canvas.addEventListener('click', doJump);
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      doJump();
    }, { passive: false });

    const self = this;
    // Dinazor Ölümü: Kullanıcının şartı: "ÖLÜRSEDE SAYFA MAİN MENÜYE ATICAK"
    const handleDinoCrash = () => {
      isGameOver = true;
      if (window.AudioEngine) window.AudioEngine.play('fail');
      if (onError) onError();

      // 1.0 saniye sonra kullanıcıyı doğrudan Title Screen / Ana Menüye fırlatır!
      self.crashTimeout = setTimeout(() => {
        if (window.returnToMainMenu) {
          window.returnToMainMenu();
        } else {
          location.reload();
        }
      }, 1000);
    };

    window.__triggerDinoCrashForTest = handleDinoCrash;

    // OYUN DÖNGÜSÜ (RENDER & UPDATE)
    const update = () => {
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Bulutlar
      ctx.fillStyle = '#3c4043';
      clouds.forEach(c => {
        if (gameStarted && !isGameOver) {
          c.x -= c.speed;
          if (c.x < -60) c.x = canvas.width + 40;
        }
        ctx.fillRect(c.x, c.y, 36, 10);
        ctx.fillRect(c.x + 8, c.y - 6, 20, 6);
      });

      // 2. Zemin Çizgisi ve Çakıl Taşları
      ctx.strokeStyle = '#5f6368';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      ctx.fillStyle = '#5f6368';
      groundDots.forEach(dot => {
        if (gameStarted && !isGameOver) {
          dot.x -= speed;
          if (dot.x < 0) dot.x = canvas.width + Math.random() * 50;
        }
        ctx.fillRect(dot.x, dot.y, dot.width, 2);
      });

      // 3. Skor Göstergesi (HI 00480  00123)
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#9aa0a6';
      ctx.textAlign = 'right';
      const paddedScore = String(Math.floor(score)).padStart(5, '0');
      const paddedHi = String(highScore).padStart(5, '0');
      ctx.fillText(`HI ${paddedHi}  ${paddedScore}`, canvas.width - 16, 24);

      if (gameStarted && !isGameOver) {
        score += 0.15;
        if (Math.floor(score) > 0 && Math.floor(score) % 100 === 0 && Math.floor(score * 10) % 10 === 0) {
          playBeep100();
        }

        // Hız çok yavaş ve dengeli artar
        if (speed < 7.0) speed += 0.0003;

        // Kaktüs Üretimi (Daha geniş ve adil aralıklar)
        spawnTimer++;
        if (spawnTimer > 110 + Math.random() * 70) {
          spawnTimer = 0;
          const spriteIdx = Math.floor(Math.random() * CACTUS_SPRITES.length);
          const sprite = CACTUS_SPRITES[spriteIdx];
          const cWidth = sprite[0].length * 3;
          const cHeight = sprite.length * 3;
          obstacles.push({
            x: canvas.width + 20,
            y: groundY - cHeight,
            sprite: sprite,
            width: cWidth,
            height: cHeight
          });
        }
      }

      // 4. Kaktüsleri Çiz ve Çarpışmayı Denetle
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        if (gameStarted && !isGameOver) {
          obs.x -= speed;
        }

        drawBitmap(obs.sprite, obs.x, obs.y, 3, '#8ab4f8');

        // Çarpışma Kutusu Kontrolü (Daha esnek hitbox)
        const hitMargin = 8;
        if (
          !isGameOver &&
          dino.x + hitMargin < obs.x + obs.width - hitMargin &&
          dino.x + dino.width - hitMargin > obs.x + hitMargin &&
          dino.y + hitMargin < obs.y + obs.height &&
          dino.y + dino.height > obs.y + hitMargin
        ) {
          handleDinoCrash();
        }

        if (obs.x + obs.width < -20) {
          obstacles.splice(i, 1);
        }
      }

      // 5. Dinazor Fizik & Çizim
      if (gameStarted && !isGameOver) {
        dino.y += dino.vy;
        dino.vy += 0.48; // Yumuşak, havada asılı kalabilen yerçekimi

        if (dino.y >= groundY - dino.height) {
          dino.y = groundY - dino.height;
          dino.vy = 0;
          dino.isGrounded = true;
        }
      }

      // Doğru sprite'ı seç
      let currentSprite = DINO_FRAMES.run1;
      if (isGameOver) {
        currentSprite = DINO_FRAMES.dead;
      } else if (!dino.isGrounded) {
        currentSprite = DINO_FRAMES.jump;
      } else if (gameStarted) {
        currentSprite = (Math.floor(frame / 6) % 2 === 0) ? DINO_FRAMES.run1 : DINO_FRAMES.run2;
      }

      drawBitmap(currentSprite, dino.x, dino.y, pxSize, '#c4c7c5');

      // Oyun Bitti Ekranı
      if (isGameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '900 20px "JetBrains Mono", sans-serif';
        ctx.fillStyle = '#f87171';
        ctx.textAlign = 'center';
        ctx.fillText('G A M E   O V E R', canvas.width / 2, canvas.height / 2 - 10);

        ctx.font = '13px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#cbd5e1';
        ctx.fillText(
          isTr ? 'Bağlantı koptu! Ana menüye dönülüyor...' : 'Connection lost! Returning to main menu...',
          canvas.width / 2,
          canvas.height / 2 + 20
        );
      }

      window.LevelModules['victory'].animFrameId = requestAnimationFrame(update);
    };

    update();
  },

  cleanup: function() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = null;
    }
    if (this.crashTimeout) {
      clearTimeout(this.crashTimeout);
      this.crashTimeout = null;
    }
    if (this.stageTimeouts && this.stageTimeouts.length) {
      this.stageTimeouts.forEach(t => clearTimeout(t));
      this.stageTimeouts = [];
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
  }
};
