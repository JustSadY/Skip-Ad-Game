// ANA OYUN MOTORU & SEVİYE YÖNETİCİSİ (MAIN.JS)

/* ========================================================= */
/* 1. ÇOKLU DİL SÖZLÜĞÜ (I18N)                               */
/* ========================================================= */
const translations = {
  tr: {
    game_title_1: "REKLAMI",
    game_title_2: "GEÇ!",
    game_tagline: "Oyuna girmek istiyorsun. Ama internetin reklamları buna izin vermiyor. Tek bir görevin var: Reklamı geçmek.",
    btn_play: "REKLAMI GEÇ",
    btn_settings: "⚙️ AYARLAR",
    settings_title: "Oyun Ayarları",
    settings_lang_title: "Dil / Language",
    settings_lang_desc: "Oyun arayüz dili",
    settings_sound_title: "Ses Efektleri",
    settings_sound_desc: "Tıklama, sayaç ve hata sesleri",
    settings_volume_title: "Ses Seviyesi",
    settings_volume_desc: "Genel ses şiddeti",
    settings_shake_title: "Ekran Sarsıntısı",
    settings_shake_desc: "Hatalı hamlelerde titreşim efekti",
    settings_fs_title: "Tam Ekran Modu",
    settings_fs_desc: "Daha odaklı bir deneyim için",
    btn_fs_enter: "⛶ Tam Ekran",
    btn_fs_exit: "✕ Çıkış",
    level_prefix: "BÖLÜM",
    bcvc_target_prefix: "Hedef:",
    bcvc_wait_text: "Lütfen bekleyin:",
    bcvc_sec_unit: "sn",
    btn_skip_ad: "REKLAMI GEÇ",
    fake_ad_title: "⚡ K-T-A 7 ULTRA SÜRÜM",
    fake_ad_desc: "Beklenen açık dünya oyunu yayında! Oyunu hemen başlatmak için aşağıdaki butona basın.",
    fake_ad_btn: "OYUNU BAŞLAT (68 GB)",
    toast_wait: "Lütfen 5 saniye bekleyin! Reklamı henüz geçemezsiniz!",
    toast_fake_click: "Sponsorlu reklama tıkladınız! Gerçek 'REKLAMI GEÇ' butonunu bulun!",
    toast_level_success: "Harika! Reklamı geçtiniz, sıradaki aşama yükleniyor..."
  },
  en: {
    game_title_1: "SKIP",
    game_title_2: "AD!",
    game_tagline: "You want to play the game. But internet ads won't let you. You have only one objective: Skip the ad.",
    btn_play: "SKIP AD",
    btn_settings: "⚙️ SETTINGS",
    settings_title: "Game Settings",
    settings_lang_title: "Language / Dil",
    settings_lang_desc: "Game interface language",
    settings_sound_title: "Sound Effects",
    settings_sound_desc: "Click, timer, and error sounds",
    settings_volume_title: "Volume Level",
    settings_volume_desc: "Master audio volume",
    settings_shake_title: "Screen Shake",
    settings_shake_desc: "Vibration effect on wrong moves",
    settings_fs_title: "Fullscreen Mode",
    settings_fs_desc: "For a more immersive experience",
    btn_fs_enter: "⛶ Fullscreen",
    btn_fs_exit: "✕ Exit",
    level_prefix: "LEVEL",
    bcvc_target_prefix: "Destination:",
    bcvc_wait_text: "Please wait:",
    bcvc_sec_unit: "s",
    btn_skip_ad: "SKIP AD",
    fake_ad_title: "⚡ K-T-A 7 ULTRA EDITION",
    fake_ad_desc: "The anticipated open-world game is live! Click the button below to launch the game immediately.",
    fake_ad_btn: "LAUNCH GAME (68 GB)",
    toast_wait: "Please wait 5 seconds! You cannot skip the ad yet!",
    toast_fake_click: "Sponsored ad clicked! Find the real 'SKIP AD' button!",
    toast_level_success: "Awesome! You skipped the ad, loading next level..."
  }
};

function getStoredLang() {
  try {
    return localStorage.getItem('skip_ad_lang') || 'tr';
  } catch (e) {
    return 'tr';
  }
}

function setStoredLang(val) {
  try {
    localStorage.setItem('skip_ad_lang', val);
  } catch (e) {}
}

window.currentLanguage = getStoredLang();

function t(key) {
  const lang = window.currentLanguage || 'tr';
  return (translations[lang] && translations[lang][key]) ? translations[lang][key] : key;
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  window.currentLanguage = lang;
  setStoredLang(lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  updateChromeHeader();
}

/* ========================================================= */
/* 2. WEB AUDIO API SES MOTORU                               */
/* ========================================================= */
const settings = {
  soundEnabled: true,
  volume: 0.7,
  shakeEnabled: true
};

window.AudioEngine = {
  ctx: null,

  init: function() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  play: function(type) {
    if (!settings.soundEnabled || settings.volume <= 0) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    const baseVol = settings.volume;

    if (type === 'start') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.2);
      gain.gain.setValueAtTime(0.2 * baseVol, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'tick') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.08 * baseVol, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'fail') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.08);
      gain.gain.setValueAtTime(0.25 * baseVol, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'pass') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1);
      osc.frequency.setValueAtTime(659.25, now + 0.2);
      osc.frequency.setValueAtTime(880, now + 0.3);
      gain.gain.setValueAtTime(0.2 * baseVol, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    }
  }
};

/* ========================================================= */
/* ========================================================= */
/* 3. DİNAMİK TELİFSİZ PARODİ OYUN HAVUZU                    */
/* ========================================================= */
const PARODY_GAMES = [
  {
    name: "K-T-A 7",
    slug: "kta-7",
    subtitle: "SAN VARONA • CRIME REPACK",
    file: "KTA7_Full_Setup.pkg",
    size: "68 GB"
  },
  {
    name: "Cybr-Pnuk 2099",
    slug: "cybr-pnuk-2099",
    subtitle: "NEON METROPOLIS • RAYTRACED",
    file: "CybrPnuk_2099_Repack.exe",
    size: "82 GB"
  },
  {
    name: "H4lf-L1fe III",
    slug: "h4lf-l1fe-3",
    subtitle: "G-MAN CHRONICLES • SOURCE 3",
    file: "H4lfL1fe3_Setup_v1.0.bin",
    size: "54 GB"
  },
  {
    name: "Old-Scro1ls VI",
    slug: "old-scro1ls-6",
    subtitle: "HAMMERFELL TALES • PIRATE EDITION",
    file: "OldScro1lsVI_WebRip.iso",
    size: "96 GB"
  },
  {
    name: "R3D-D3AD III",
    slug: "r3d-d3ad-3",
    subtitle: "WILD FRONTIER OUTLAWS",
    file: "R3DD3AD3_DirectPlay.pkg",
    size: "118 GB"
  },
  {
    name: "M1ne-Bl0ck 2",
    slug: "m1ne-bl0ck-2",
    subtitle: "INFINITE VOXEL SURVIVAL",
    file: "M1neBl0ck2_Release.jar",
    size: "16 GB"
  },
  {
    name: "D4rk-S0uls IV",
    slug: "d4rk-s0uls-4",
    subtitle: "PREPARE TO SUFFER",
    file: "D4rkS0uls4_Installer.exe",
    size: "46 GB"
  },
  {
    name: "N4S: Undr-Grnd 3",
    slug: "n4s-undrgrnd-3",
    subtitle: "STREET DRIFT TUNER",
    file: "N4S_UndrGrnd3_Repack.iso",
    size: "42 GB"
  }
];

function getRandomGame() {
  return PARODY_GAMES[Math.floor(Math.random() * PARODY_GAMES.length)];
}

window.currentGame = getRandomGame();

/* ========================================================= */
/* 4. SEVİYE AKIŞI & RASTGELE SEÇİCİ (TOPLAM 20 SEVİYE)       */
/* ========================================================= */
// 1. Seviye HER ZAMAN: 'bcvc' (link-skip.net/Oyun-Adi)
// 2 - 19 Seviyeleri: 18 benzersiz zorlayıcı bulmaca havuzundan rastgele karıştırılır
// 20. Seviye HER ZAMAN: 'victory' (Yükleme -> Bağlantı Koptu -> Dinazor Oyunu)

const puzzlePool = [
  'captcha',       // Dinamik çoklu bot doğrulaması
  'flee',          // Kaçan buton & dondurucu tuzak
  'popups',        // Pop-up fırtınası & katmanlı pencereler
  'decoys',        // Sahte indirme butonları labirenti
  'timer',         // Donan sayaç & fare hareketi
  'cookie',        // Çerez rıza kabusu & ters çevrilmiş izinler
  'micro_x',       // Mikro kapatma X & sahte çarpılar
  'tabtrick',      // Pop-under sekme hilesi
  'human_calc',    // Bot koruması & Onay kutusu
  'wheel',         // 1.000.000'ıncı ziyaretçi çarkıfeleği & gizli feragat
  'fake_virus',    // Sahte virüs alarmı & tehdidi yoksay
  'slider',        // Jigsaw puzzle parça kaydırıcı
  'find_waldo',    // Kamufle olmuş gizli buton & fener
  'cursor_lag',    // Ters fare / sarhoş imleç fiziği
  'terms_scroll',  // 14 sayfalık kullanıcı sözleşmesi kaydırma
  'broken_button', // Vidaları kopan ve seken bozuk buton
  'password',      // Şifreli indirme kasası & spoiler kutuları
  'audio_captcha', // Sesli ritim & bip sayma robot testi
  'permission_maze', // Nightmare izin labirenti
  'fake_skip', // Nightmare sahte geçiş butonları
  'update_nightmare', // Nightmare sahte güncelleme
  'loading_99', // Nightmare takılan yükleme
  'captcha_marathon', // Nightmare CAPTCHA maratonu
  'download_manager', // Nightmare indirme yöneticisi
  'redirect_chain', // Nightmare yönlendirme zinciri
  'support_bot', // Nightmare destek botu
  'subscription_escape', // Abonelik iptal kabusu
  'overlay_stack', // Katmanli reklam
  'verification_codes', // Dogrulama kodu labirenti
  'checkout_trap', // Sahte odeme duvari
  'upload_errors', // Dosya yukleme hata labirenti
  'survey_escape' // Bitmeyen anket
];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let activeLevelSequence = [];
let currentLevelIndex = 0;
let currentModule = null;
let isLevelTransitioning = false;
let pendingLevelTransition = null;
let levelGeneration = 0;

function generateGameSequence() {
  window.currentGame = getRandomGame(); // Her yeni oyunda farklı bir telifsiz efsane oyun seçilir
  const randomizedMiddles = shuffleArray(puzzlePool);
  // 1: bcvc, 2-19: 18 adet rastgele bulmaca, 20: victory
  activeLevelSequence = ['bcvc', ...randomizedMiddles, 'victory'];
  currentLevelIndex = 0;
}

/* ========================================================= */
/* 4. DOM ELEMANLARI & KONTROLLER                             */
/* ========================================================= */
const titleScreen = document.getElementById('titleScreen');
const gameScreen = document.getElementById('gameScreen');
const startBtn = document.getElementById('startBtn');
const settingsMenuBtn = document.getElementById('settingsMenuBtn');

const chromeTabTitle = document.getElementById('tabTitleText');
const chromeUrlDomain = document.querySelector('.chrome-url-text .url-domain');
const chromeUrlPath = document.querySelector('.chrome-url-text .url-path');
const chromeStageText = document.getElementById('chromeStageText');
const chromeNavRefresh = document.getElementById('navRefreshBtn');
const chromeCloseBtn = document.getElementById('chromeCloseBtn');
const tabCloseBtn = document.getElementById('tabCloseBtn');
const chromeMenuBtn = document.getElementById('chromeMenuBtn');

const viewportContainer = document.getElementById('chromeViewportContainer');
const toastNotice = document.getElementById('toastNotice');
const toastMessage = document.getElementById('toastMessage');

/* AYARLAR ELEMANLARI */
const settingsModal = document.getElementById('settingsModal');
const closeSettingsBtn = document.getElementById('closeSettingsBtn');
const soundToggleCheck = document.getElementById('soundToggleCheck');
const volumeRange = document.getElementById('volumeRange');
const volumeValText = document.getElementById('volumeValText');
const shakeToggleCheck = document.getElementById('shakeToggleCheck');
const fullscreenToggleBtn = document.getElementById('fullscreenToggleBtn');

function showToast(text, icon = '⚠️') {
  // Bildirimler kullanıcı isteğiyle tamamen kaldırıldı
}

function triggerError() {
  window.AudioEngine.play('fail');
  if (settings.shakeEnabled) {
    viewportContainer.classList.add('shake-anim');
    setTimeout(() => viewportContainer.classList.remove('shake-anim'), 350);
  }
}

function updateChromeHeader() {
  if (!activeLevelSequence.length) return;
  const modId = activeLevelSequence[currentLevelIndex];
  const mod = window.LevelModules[modId];
  if (!mod) return;

  const prefix = t('level_prefix');
  chromeStageText.textContent = `${prefix} ${currentLevelIndex + 1} / ${activeLevelSequence.length}`;

  const tabIcon = document.querySelector('#activeChromeTab .tab-icon');
  if (tabIcon) tabIcon.textContent = '🔗';

  if (mod.tabTitle) {
    chromeTabTitle.textContent = mod.tabTitle(window.currentLanguage);
  }

  const protoEl = document.querySelector('.chrome-url-text .url-protocol');
  if (protoEl) protoEl.textContent = 'https://';

  if (mod.url) {
    try {
      const urlObj = new URL(mod.url);
      chromeUrlDomain.textContent = urlObj.hostname;
      chromeUrlPath.textContent = urlObj.pathname;
    } catch(e) {
      chromeUrlDomain.textContent = 'ad-gate.net';
      chromeUrlPath.textContent = `/${modId}`;
    }
  }
}

function loadLevel(index) {
  levelGeneration++;
  if (pendingLevelTransition !== null) {
    clearTimeout(pendingLevelTransition);
    pendingLevelTransition = null;
  }
  if (currentModule && currentModule.cleanup) {
    currentModule.cleanup();
  }

  isLevelTransitioning = false;
  if (viewportContainer) {
    viewportContainer.style.pointerEvents = 'auto';
  }

  currentLevelIndex = index;
  const modId = activeLevelSequence[currentLevelIndex];
  const mod = window.LevelModules[modId];

  if (!mod) {
    console.error('Module not found:', modId);
    return;
  }

  currentModule = mod;
  updateChromeHeader();

  const renderGeneration = levelGeneration;
  mod.render(
    viewportContainer,
    // onComplete callback:
    () => {
      // HIZLI / ÇİFT TIKLAMADA BİRDEN FAZLA BÖLÜM ATLAMASINI KESİN OLARAK ENGELLE
      if (renderGeneration !== levelGeneration || isLevelTransitioning) return;
      isLevelTransitioning = true;
      if (viewportContainer) {
        viewportContainer.style.pointerEvents = 'none'; // Yeni seviye gelene kadar tıklamaları tamamen dondur
      }

      window.AudioEngine.play('pass');
      if (currentLevelIndex < activeLevelSequence.length - 1) {
        const nextIndex = currentLevelIndex + 1;
        pendingLevelTransition = setTimeout(() => {
          pendingLevelTransition = null;
          if (renderGeneration === levelGeneration) loadLevel(nextIndex);
        }, 150);
      } else {
        // 20. Seviye (Final Bölümü)
        loadLevel(activeLevelSequence.length - 1);
      }
    },
    // onError callback:
    () => {
      if (renderGeneration !== levelGeneration || isLevelTransitioning) return;
      triggerError();
    },
    // showToast helper:
    (msg, icon) => {
      showToast(msg, icon);
    },
    // translation helper:
    t
  );
}

/* ========================================================= */
/* 5. ETKİNLİK DİNLEYİCİLERİ                                 */
/* ========================================================= */

// DİL DEĞİŞİMİ
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
    window.AudioEngine.play('tick');
  });
});

// AYARLAR PENCERESİ
function openSettings() {
  settingsModal.classList.add('active');
}
function closeSettings() {
  settingsModal.classList.remove('active');
}

settingsMenuBtn.addEventListener('click', openSettings);
chromeMenuBtn.addEventListener('click', openSettings);
closeSettingsBtn.addEventListener('click', closeSettings);
settingsModal.addEventListener('click', (e) => {
  if (e.target === settingsModal) closeSettings();
});

soundToggleCheck.addEventListener('change', (e) => {
  settings.soundEnabled = e.target.checked;
});

volumeRange.addEventListener('input', (e) => {
  const val = parseInt(e.target.value);
  settings.volume = val / 100;
  volumeValText.textContent = `${val}%`;
});

shakeToggleCheck.addEventListener('change', (e) => {
  settings.shakeEnabled = e.target.checked;
});

fullscreenToggleBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    fullscreenToggleBtn.textContent = t('btn_fs_exit');
  } else {
    document.exitFullscreen().catch(() => {});
    fullscreenToggleBtn.textContent = t('btn_fs_enter');
  }
});

// ANA MENÜYE DÖN / SIFIRLA
function returnToMainMenu() {
  levelGeneration++;
  if (pendingLevelTransition !== null) {
    clearTimeout(pendingLevelTransition);
    pendingLevelTransition = null;
  }
  if (currentModule && currentModule.cleanup) {
    currentModule.cleanup();
  }
  isLevelTransitioning = false;
  if (viewportContainer) {
    viewportContainer.style.pointerEvents = 'auto';
  }
  gameScreen.classList.add('hidden');
  titleScreen.classList.remove('hidden');
}

window.returnToMainMenu = returnToMainMenu;

window.setChromeUrl = function(domain, path, protocol = '') {
  const protoEl = document.querySelector('.chrome-url-text .url-protocol');
  if (protoEl) protoEl.textContent = protocol;
  if (chromeUrlDomain) chromeUrlDomain.textContent = domain;
  if (chromeUrlPath) chromeUrlPath.textContent = path;
};

window.setChromeTabTitle = function(title, icon) {
  if (chromeTabTitle) chromeTabTitle.textContent = title;
  const tabIcon = document.querySelector('#activeChromeTab .tab-icon');
  if (tabIcon && icon) tabIcon.textContent = icon;
};

chromeCloseBtn.addEventListener('click', returnToMainMenu);
tabCloseBtn.addEventListener('click', returnToMainMenu);

// YENİLE (REFRESH: HER ŞEYİ EN BAŞTAN BAŞLATIR!)
chromeNavRefresh.addEventListener('click', () => {
  window.AudioEngine.play('tick');
  generateGameSequence();
  loadLevel(0);
});

// OYUNA BAŞLA
startBtn.addEventListener('click', () => {
  window.AudioEngine.play('start');
  titleScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  generateGameSequence();
  loadLevel(0);
});

// BAŞLANGIÇTA DİLİ UYGULA
setLanguage(window.currentLanguage);

// TEST / GELİŞTİRİCİ DOSTU HIZLI TEST KANCASI (?level=victory veya ?level=0..9)
try {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('level')) {
    const targetLvl = urlParams.get('level');
    setTimeout(() => {
      titleScreen.classList.add('hidden');
      gameScreen.classList.remove('hidden');
      activeLevelSequence = ['bcvc', ...puzzlePool, 'victory'];
      const idx = (targetLvl === 'victory' || targetLvl === String(activeLevelSequence.length))
        ? activeLevelSequence.indexOf('victory')
        : (isNaN(targetLvl) ? activeLevelSequence.indexOf(targetLvl) : parseInt(targetLvl));
      loadLevel(idx >= 0 ? idx : 0);
    }, 150);
  }
} catch(e) {}
