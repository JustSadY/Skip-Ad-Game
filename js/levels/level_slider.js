// LEVEL: Gerçek Geetest Stili Jigsaw Kaydırmalı Puzzle Doğrulaması (Slide Captcha)
window.LevelModules = window.LevelModules || {};

window.LevelModules['slider'] = {
  id: 'slider',
  url: 'https://puzzle-verify.org/slide-check',
  tabTitle: (lang) => lang === 'tr' ? '🧩 Parçayı Yerleştir' : '🧩 Complete the Puzzle',

  render: function(container, onComplete, onError, showToast, t) {
    const isTr = (window.currentLanguage || 'tr') === 'tr';

    // GERÇEK FOTOĞRAF HAVUZU
    const photoPool = [
      'assets/captcha/scenery_1.jpg',
      'assets/captcha/traffic_light_1.jpg',
      'assets/captcha/crosswalk_2.jpg',
      'assets/captcha/bus_1.jpg',
      'assets/captcha/hydrant_1.jpg',
      'assets/captcha/bicycle_1.jpg'
    ];

    const CANVAS_WIDTH = 360;
    const CANVAS_HEIGHT = 170;
    const PIECE_SIZE = 44;
    const TAB_RADIUS = 7;

    // Jigsaw Şekli Çizici (Klasik Geetest / TikTok yapboz dişi ve yuvası)
    function drawJigsawPath(ctx, x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x, y);

      // Üst kenar (dışa doğru yuvarlak çıkıntı)
      ctx.lineTo(x + (w / 2) - r, y);
      ctx.arc(x + (w / 2), y - r + 1, r, 0.72 * Math.PI, 2.28 * Math.PI, false);
      ctx.lineTo(x + w, y);

      // Sağ kenar (dışa doğru yuvarlak çıkıntı)
      ctx.lineTo(x + w, y + (h / 2) - r);
      ctx.arc(x + w + r - 1, y + (h / 2), r, 1.22 * Math.PI, 2.78 * Math.PI, false);
      ctx.lineTo(x + w, y + h);

      // Alt kenar (içe doğru yuvarlak girinti)
      ctx.lineTo(x + (w / 2) + r, y + h);
      ctx.arc(x + (w / 2), y + h - r + 1, r, 0.22 * Math.PI, 1.78 * Math.PI, true);
      ctx.lineTo(x, y + h);

      // Sol kenar (içe doğru yuvarlak girinti)
      ctx.lineTo(x, y + (h / 2) + r);
      ctx.arc(x + r - 1, y + (h / 2), r, 0.72 * Math.PI, 2.28 * Math.PI, true);
      ctx.lineTo(x, y);

      ctx.closePath();
    }

    let currentPhotoIndex = Math.floor(Math.random() * photoPool.length);

    const initPuzzle = () => {
      // Hedef pozisyon (130px ile 270px arası X, 25px ile 85px arası Y)
      const targetX = 135 + Math.floor(Math.random() * 135);
      const targetY = 25 + Math.floor(Math.random() * 60);

      container.innerHTML = `
        <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #090d16; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #fff;">
          
          <div id="sliderCard" style="background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 20px; max-width: 400px; width: 100%; box-shadow: 0 20px 40px rgba(0,0,0,0.6); transition: transform 0.2s;">
            
            <!-- BAŞLIK & YENİLEME -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div>
                <div style="font-size: 14px; font-weight: 800; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
                  <span>🧩</span>
                  <span>${isTr ? 'GÜVENLİK DOĞRULAMASI' : 'SECURITY VERIFICATION'}</span>
                </div>
                <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
                  ${isTr ? 'Kaydırıcıyı çekerek parçayı yerine oturtun' : 'Drag slider to fit the puzzle piece'}
                </div>
              </div>

              <div id="sliderReloadBtn" title="${isTr ? 'Yeni Görsel' : 'New Image'}" style="cursor: pointer; color: #94a3b8; font-size: 18px; padding: 4px; transition: transform 0.2s;" onmouseover="this.style.color='#fff'; this.style.transform='rotate(90deg)';" onmouseout="this.style.color='#94a3b8'; this.style.transform='rotate(0deg)';">
                ↻
              </div>
            </div>

            <!-- BULMACA GÖRSEL ALANI -->
            <div id="puzzleViewBox" style="position: relative; width: ${CANVAS_WIDTH}px; height: ${CANVAS_HEIGHT}px; margin: 0 auto; border-radius: 10px; overflow: hidden; background: #0f172a; border: 2px solid #475569; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);">
              
              <!-- ARKA PLAN CANVAS (GÖRSEL VE DELİK YUVA) -->
              <canvas id="bgCanvas" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}" style="display: block; width: 100%; height: 100%;"></canvas>

              <!-- HAREKETLİ YAPBOZ PARÇASI CANVAS (TAM RESİM KESİĞİ) -->
              <canvas id="pieceCanvas" width="${PIECE_SIZE + 24}" height="${PIECE_SIZE + 24}" style="
                position: absolute;
                top: ${targetY - 10}px;
                left: -10px;
                pointer-events: none;
                filter: drop-shadow(0 3px 8px rgba(0,0,0,0.85));
                transition: filter 0.2s;
              "></canvas>

            </div>

            <!-- GEETEST STİLİ KAYDIRMA ÇUBUĞU -->
            <div style="margin-top: 16px; position: relative; width: ${CANVAS_WIDTH}px; margin-left: auto; margin-right: auto;">
              
              <div id="sliderTrack" style="
                position: relative;
                width: 100%;
                height: 42px;
                background: #0f172a;
                border: 2px solid #334155;
                border-radius: 24px;
                overflow: hidden;
                display: flex;
                align-items: center;
              ">
                <!-- Sürüklenen Yol Dolgusu -->
                <div id="sliderFill" style="position: absolute; left: 0; top: 0; bottom: 0; width: 0px; background: rgba(2, 132, 199, 0.3); border-right: 2px solid #0284c7; transition: width 0.05s ease;"></div>

                <!-- İpucu Metni -->
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; font-size: 12px; font-weight: 600; color: #64748b; letter-spacing: 0.3px;">
                  ${isTr ? 'Kaydırıcıyı Sağa Çekin →' : 'Drag Slider Right →'}
                </div>

                <!-- Input Range -->
                <input type="range" id="sliderRange" min="0" max="${CANVAS_WIDTH - PIECE_SIZE - 10}" value="0" style="
                  position: absolute;
                  inset: 0;
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  cursor: grab;
                  z-index: 10;
                  margin: 0;
                ">

                <!-- Görünür Kaydırma Tutamağı (Handle) -->
                <div id="sliderHandle" style="
                  position: absolute;
                  left: 2px;
                  top: 2px;
                  bottom: 2px;
                  width: 44px;
                  background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
                  border-radius: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;
                  font-weight: 900;
                  font-size: 16px;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.5);
                  pointer-events: none;
                  transition: transform 0.05s ease, background 0.2s;
                ">
                  ➔
                </div>
              </div>

            </div>

            <!-- BİLDİRİM VE DURUM METNİ -->
            <div id="sliderFeedback" style="text-align: center; font-size: 12px; font-weight: 600; color: #94a3b8; margin-top: 10px; min-height: 18px;">
              BotCheck Anti-Spam Shield
            </div>

          </div>

        </div>
      `;

      const bgCanvas = document.getElementById('bgCanvas');
      const pieceCanvas = document.getElementById('pieceCanvas');
      const slider = document.getElementById('sliderRange');
      const handle = document.getElementById('sliderHandle');
      const fill = document.getElementById('sliderFill');
      const feedback = document.getElementById('sliderFeedback');
      const card = document.getElementById('sliderCard');

      if (!bgCanvas || !pieceCanvas) return;

      const bgCtx = bgCanvas.getContext('2d');
      const pieceCtx = pieceCanvas.getContext('2d');

      const img = new Image();
      img.src = photoPool[currentPhotoIndex];
      img.onload = () => {
        // 1. Arka plan görselini ölçekleyerek canvas'a çiz
        bgCtx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // 2. Arka planda HEDEF YUVA (DELİK) oluştur
        bgCtx.save();
        drawJigsawPath(bgCtx, targetX, targetY, PIECE_SIZE, PIECE_SIZE, TAB_RADIUS);
        // Yuva içini yarı saydam siyah ile karart (Geetest tarzı)
        bgCtx.fillStyle = 'rgba(0, 0, 0, 0.68)';
        bgCtx.fill();
        // Yuva sınır çizgisi
        bgCtx.lineWidth = 2;
        bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        bgCtx.setLineDash([4, 3]);
        bgCtx.stroke();
        bgCtx.restore();

        // 3. HAREKETLİ PARÇAYI ÇİZ (TAM HEDEF YUVANIN GÖRSEL KESİTİ)
        pieceCtx.clearRect(0, 0, pieceCanvas.width, pieceCanvas.height);
        pieceCtx.save();
        // Parça canvas'ı üzerinde 10px boşluk bırakarak ortala
        const ox = 10;
        const oy = 10;
        drawJigsawPath(pieceCtx, ox, oy, PIECE_SIZE, PIECE_SIZE, TAB_RADIUS);
        pieceCtx.clip();

        // Görseli hedef yuvanın koordinatlarını denk getirecek şekilde kaydırarak çiz
        pieceCtx.drawImage(
          img,
          -targetX + ox,
          -targetY + oy,
          CANVAS_WIDTH,
          CANVAS_HEIGHT
        );

        // Parça çevresine parlak kenar çizgisi çiz
        pieceCtx.lineWidth = 2.5;
        pieceCtx.strokeStyle = '#38bdf8';
        pieceCtx.setLineDash([]);
        pieceCtx.stroke();
        pieceCtx.restore();
      };

      let isSuccess = false;

      // Kaydırma Olayı
      slider.addEventListener('input', (e) => {
        if (isSuccess) return;
        const val = parseInt(e.target.value);
        
        // Parçayı ve tutamağı tam hizalı hareket ettir
        pieceCanvas.style.left = `${val - 10}px`;
        handle.style.transform = `translateX(${val}px)`;
        fill.style.width = `${val + 22}px`;

        if (window.AudioEngine && val % 18 === 0) {
          window.AudioEngine.play('tick');
        }
      });

      // Bırakma ve Eşleşme Kontrolü
      const checkFit = () => {
        if (isSuccess) return;
        const currentVal = parseInt(slider.value);
        const tolerance = 10; // ±10 piksel adil tolerans

        if (Math.abs(currentVal - targetX) <= tolerance) {
          isSuccess = true;
          // Tam hizaya oturt
          pieceCanvas.style.left = `${targetX - 10}px`;
          handle.style.transform = `translateX(${targetX}px)`;
          fill.style.width = `${targetX + 22}px`;
          
          // Başarı stilleri
          handle.style.background = '#22c55e';
          handle.textContent = '✓';
          pieceCanvas.style.filter = 'drop-shadow(0 0 12px #22c55e)';
          
          feedback.textContent = isTr ? '✓ Başarılı! (0.6s) Reklam geçiliyor...' : '✓ Verified! (0.6s) Skipping ad...';
          feedback.style.color = '#22c55e';
          
          if (window.AudioEngine) window.AudioEngine.play('pass');

          setTimeout(() => {
            onComplete();
          }, 350);
        } else {
          // Hatalı yerleşim: Titreme efekti & başa dön
          onError();
          feedback.textContent = isTr ? '❌ Tam denk getiremediniz! Tekrar deneyin.' : '❌ Not aligned! Try again.';
          feedback.style.color = '#ef4444';
          
          if (card) {
            card.style.transform = 'translateX(-6px)';
            setTimeout(() => card.style.transform = 'translateX(6px)', 80);
            setTimeout(() => card.style.transform = 'translateX(-3px)', 160);
            setTimeout(() => card.style.transform = 'translateX(0)', 240);
          }

          // Kaydırıcıyı başa sar
          slider.value = 0;
          pieceCanvas.style.left = '-10px';
          handle.style.transform = 'translateX(0px)';
          fill.style.width = '0px';

          if (window.AudioEngine) window.AudioEngine.play('fail');
        }
      };

      slider.addEventListener('change', checkFit);
      slider.addEventListener('touchend', checkFit);
      slider.addEventListener('mouseup', checkFit);

      // Yenile butonu
      const reloadBtn = document.getElementById('sliderReloadBtn');
      if (reloadBtn) {
        reloadBtn.addEventListener('click', () => {
          currentPhotoIndex = (currentPhotoIndex + 1) % photoPool.length;
          initPuzzle();
          if (window.AudioEngine) window.AudioEngine.play('tick');
        });
      }
    };

    initPuzzle();
  },

  cleanup: function() {}
};
