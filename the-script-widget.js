(function () {
  'use strict';

  // ── CONFIG ──
  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var FIRM   = script.getAttribute('data-firm')  || 'Your Firm';
  var COLOR  = script.getAttribute('data-color') || '#0f1f3d';
  var LOGO   = script.getAttribute('data-logo')  || '';

  var NAVY      = '#0f1f3d';
  var GOLD      = '#c9933a';
  var GOLD_LIGHT= '#e8b86d';
  var BORDER    = '#e2e8f0';
  var SLATE     = '#64748b';
  var CREAM     = '#faf8f5';

  var ENDPOINT  = 'https://effulgent-marshmallow-334527.netlify.app/.netlify/functions/';

  // ── FONTS ──
  if (!document.getElementById('ts-font')) {
    var link = document.createElement('link');
    link.id   = 'ts-font';
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }

  // ── STYLES ──
  var css = `
    #ts-fab {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 99998;
      display: flex;
      align-items: center;
      gap: 10px;
      height: 52px;
      padding: 0 20px 0 10px;
      border-radius: 30px;
      background: ${NAVY};
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(15,31,61,0.35);
      font-family: 'DM Sans', sans-serif;
      transition: transform 0.2s, box-shadow 0.2s;
      animation: ts-pulse 2.5s ease-out infinite;
    }
    #ts-fab:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 28px rgba(15,31,61,0.45);
      animation: none;
    }
    @keyframes ts-pulse {
      0%   { box-shadow: 0 4px 20px rgba(15,31,61,0.35), 0 0 0 0 rgba(201,147,58,0.4); }
      70%  { box-shadow: 0 4px 20px rgba(15,31,61,0.35), 0 0 0 10px rgba(201,147,58,0); }
      100% { box-shadow: 0 4px 20px rgba(15,31,61,0.35), 0 0 0 0 rgba(201,147,58,0); }
    }
    #ts-fab .ts-fab-icon {
      width: 34px; height: 34px; border-radius: 50%;
      background: ${GOLD};
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    #ts-fab .ts-fab-icon svg { width: 16px; height: 16px; }
    #ts-fab .ts-fab-label {
      font-family: 'Playfair Display', serif;
      font-size: 15px; font-weight: 700; color: #fff; white-space: nowrap; letter-spacing: -0.3px;
    }
    #ts-fab .ts-fab-label span { color: ${GOLD_LIGHT}; }

    #ts-overlay {
      position: fixed; inset: 0; z-index: 99999;
      background: rgba(10,20,40,0.45);
      opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
    }
    #ts-overlay.ts-open { opacity: 1; pointer-events: all; }

    #ts-panel {
      position: fixed; top: 0; right: 0; bottom: 0;
      width: 420px; max-width: 100vw;
      z-index: 100000;
      background: #fff;
      box-shadow: -8px 0 48px rgba(15,31,61,0.18);
      display: flex; flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
      font-family: 'DM Sans', sans-serif;
      overflow: hidden;
    }
    #ts-panel.ts-open { transform: translateX(0); }

    .ts-header {
      background: ${NAVY};
      padding: 16px 18px;
      display: flex; align-items: center; justify-content: space-between;
      flex-shrink: 0;
    }
    .ts-header-left { display: flex; align-items: center; gap: 10px; }
    .ts-header-icon {
      width: 34px; height: 34px; border-radius: 50%;
      background: ${GOLD};
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .ts-header-icon svg { width: 15px; height: 15px; }
    .ts-header-title {
      font-family: 'Playfair Display', serif;
      font-size: 17px; font-weight: 700; color: #fff; line-height: 1.1;
    }
    .ts-header-title span { color: ${GOLD_LIGHT}; }
    .ts-header-firm { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }
    .ts-close {
      width: 30px; height: 30px; border-radius: 50%;
      background: rgba(255,255,255,0.12); border: none; cursor: pointer;
      color: rgba(255,255,255,0.8); font-size: 16px; line-height: 1;
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Sans', sans-serif;
      transition: background 0.15s;
    }
    .ts-close:hover { background: rgba(255,255,255,0.22); }

    .ts-body { flex: 1; overflow-y: auto; padding: 20px; }
    .ts-body::-webkit-scrollbar { width: 4px; }
    .ts-body::-webkit-scrollbar-track { background: transparent; }
    .ts-body::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 4px; }

    /* SELECTOR SCREEN */
    .ts-selector-intro {
      font-size: 13px; color: ${SLATE}; margin-bottom: 16px; line-height: 1.55;
    }
    .ts-tool-cards { display: flex; flex-direction: column; gap: 10px; }
    .ts-tool-card {
      display: flex; align-items: center; gap: 13px;
      padding: 14px 15px;
      border: 1.5px solid ${BORDER};
      border-radius: 12px; cursor: pointer;
      background: #fff;
      transition: border-color 0.15s, background 0.15s, transform 0.12s;
    }
    .ts-tool-card:hover {
      border-color: ${NAVY}; background: #f8fafc; transform: translateX(3px);
    }
    .ts-tool-card-icon {
      width: 42px; height: 42px; border-radius: 10px;
      background: ${NAVY};
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; font-size: 19px;
    }
    .ts-tool-card-text { flex: 1; }
    .ts-tool-card-title { font-size: 13.5px; font-weight: 700; color: ${NAVY}; margin-bottom: 3px; }
    .ts-tool-card-desc { font-size: 11.5px; color: ${SLATE}; line-height: 1.4; }
    .ts-tool-card-arrow { color: #cbd5e1; font-size: 18px; flex-shrink: 0; transition: color 0.15s; }
    .ts-tool-card:hover .ts-tool-card-arrow { color: ${NAVY}; }

    /* TOOL SCREEN */
    .ts-back {
      display: flex; align-items: center; gap: 6px;
      background: none; border: none; cursor: pointer;
      font-size: 12.5px; font-weight: 600; color: ${SLATE};
      font-family: 'DM Sans', sans-serif;
      padding: 0; margin-bottom: 18px;
      transition: color 0.15s;
    }
    .ts-back:hover { color: ${NAVY}; }

    .ts-tool-title {
      font-family: 'Playfair Display', serif;
      font-size: 19px; font-weight: 700; color: ${NAVY};
      margin-bottom: 6px;
    }
    .ts-tool-desc { font-size: 13px; color: ${SLATE}; margin-bottom: 18px; line-height: 1.5; }

    .ts-field { margin-bottom: 14px; }
    .ts-field label {
      display: block; font-size: 12px; font-weight: 600; color: ${NAVY};
      margin-bottom: 6px; letter-spacing: 0.1px;
    }
    .ts-field .ts-req { color: #b91c1c; }
    .ts-field textarea, .ts-field input, .ts-field select {
      width: 100%; padding: 10px 12px;
      border: 1.5px solid ${BORDER}; border-radius: 9px;
      font-size: 13px; font-family: 'DM Sans', sans-serif;
      color: #0f172a; background: #fff; outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      appearance: none;
    }
    .ts-field textarea { min-height: 100px; resize: vertical; line-height: 1.45; }
    .ts-field textarea:focus, .ts-field input:focus, .ts-field select:focus {
      border-color: ${NAVY}; box-shadow: 0 0 0 3px rgba(15,31,61,0.07);
    }
    .ts-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

    .ts-btn-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
    .ts-btn-primary {
      flex: 1; padding: 11px 16px; background: ${NAVY}; color: #fff;
      border: none; border-radius: 9px; font-size: 13px; font-weight: 700;
      font-family: 'DM Sans', sans-serif; cursor: pointer;
      transition: background 0.15s, transform 0.1s;
    }
    .ts-btn-primary:hover { background: #1a3258; }
    .ts-btn-primary:active { transform: scale(0.98); }
    .ts-btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }
    .ts-btn-secondary {
      padding: 11px 14px; background: #fff; color: #0f172a;
      border: 1.5px solid ${BORDER}; border-radius: 9px;
      font-size: 13px; font-weight: 600; font-family: 'DM Sans', sans-serif;
      cursor: pointer; transition: border-color 0.15s;
    }
    .ts-btn-secondary:hover { border-color: #94a3b8; }
    .ts-btn-secondary:disabled { opacity: 0.5; cursor: not-allowed; }

    .ts-status { font-size: 12px; color: ${SLATE}; min-height: 18px; margin-top: 8px; }
    .ts-status.ts-err { color: #b91c1c; }
    .ts-status.ts-ok  { color: #0b5a1f; }

    .ts-output-wrap { margin-top: 18px; }
    .ts-output-label {
      font-size: 11px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; color: ${SLATE}; margin-bottom: 8px;
    }
    .ts-output-box {
      white-space: pre-wrap; background: #f8fafc;
      border: 1px solid ${BORDER}; border-radius: 10px;
      padding: 14px; font-size: 13px; line-height: 1.65;
      color: #0f172a; min-height: 80px; font-family: 'DM Sans', sans-serif;
    }
    .ts-tip { margin-top: 10px; font-size: 11.5px; color: ${SLATE}; line-height: 1.5; }

    /* INTERVIEW BUCKETS */
    .ts-bucket {
      background: #f8fafc; border: 1px solid ${BORDER};
      border-radius: 10px; padding: 13px 15px; margin-bottom: 10px;
    }
    .ts-bucket-title {
      font-size: 13px; font-weight: 700; color: ${NAVY};
      margin-bottom: 8px; display: flex; align-items: center; gap: 7px;
    }
    .ts-bucket-title::before {
      content: ''; display: inline-block; width: 7px; height: 7px;
      border-radius: 50%; background: ${GOLD}; flex-shrink: 0;
    }
    .ts-bucket ol { margin: 0 0 0 18px; padding: 0; }
    .ts-bucket li { font-size: 13px; line-height: 1.5; margin-bottom: 6px; color: #0f172a; }

    /* COMP RANGES */
    .ts-ranges-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
    .ts-range-card {
      background: #f8fafc; border: 1px solid ${BORDER};
      border-radius: 10px; padding: 12px 14px;
    }
    .ts-range-label {
      font-size: 10px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; color: ${SLATE}; margin-bottom: 5px;
    }
    .ts-range-value { font-size: 13.5px; font-weight: 600; color: ${NAVY}; line-height: 1.4; }
    .ts-confidence { font-size: 11.5px; color: ${SLATE}; margin-bottom: 12px; line-height: 1.5; }
    .ts-position-card {
      background: #fff9f0; border: 1px solid #f0d9b5;
      border-radius: 10px; padding: 13px; margin-bottom: 12px;
    }
    .ts-position-label {
      font-size: 10px; font-weight: 700; letter-spacing: 1px;
      text-transform: uppercase; color: ${GOLD}; margin-bottom: 8px;
    }
    .ts-narrative {
      background: #f8fafc; border: 1px solid ${BORDER};
      border-radius: 10px; padding: 14px;
      font-size: 13px; line-height: 1.65; color: #0f172a;
    }
    .ts-narrative-heading { font-weight: 800; color: ${NAVY}; margin: 14px 0 6px; }
    .ts-narrative-para { margin-bottom: 8px; }
    .ts-narrative-ul { margin: 0 0 8px 18px; padding: 0; }
    .ts-narrative-ul li { margin-bottom: 5px; }
    .ts-disclaimer {
      margin-top: 10px; font-size: 11px; color: ${SLATE};
      line-height: 1.5; padding: 10px 12px;
      background: #f8fafc; border-radius: 8px; border: 1px solid ${BORDER};
    }

    .ts-footer {
      padding: 12px 18px; border-top: 1px solid ${BORDER};
      background: #f8fafc; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .ts-powered {
      font-size: 10.5px; color: #94a3b8; letter-spacing: 0.3px;
    }
    .ts-powered a { color: #94a3b8; text-decoration: none; }
    .ts-powered a:hover { color: ${GOLD}; }
  `;

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── PENCIL ICON SVG ──
  var PENCIL_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';
  var BACK_ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';

  // ── DOM ──
  // FAB button
  var fab = document.createElement('button');
  fab.id = 'ts-fab';
  fab.innerHTML = '<div class="ts-fab-icon">' + PENCIL_SVG + '</div><span class="ts-fab-label">The Script<span>™</span></span>';

  // Overlay
  var overlay = document.createElement('div');
  overlay.id = 'ts-overlay';

  // Panel
  var panel = document.createElement('div');
  panel.id = 'ts-panel';

  var firmDisplay = LOGO
    ? '<img src="' + LOGO + '" style="height:18px;max-width:80px;object-fit:contain;" alt="' + FIRM + '" />'
    : FIRM;

  panel.innerHTML = `
    <div class="ts-header">
      <div class="ts-header-left">
        <div class="ts-header-icon">${PENCIL_SVG}</div>
        <div>
          <div class="ts-header-title">The Script<span>™</span></div>
          <div class="ts-header-firm">${firmDisplay}</div>
        </div>
      </div>
      <button class="ts-close" id="ts-close-btn">✕</button>
    </div>
    <div class="ts-body" id="ts-body"></div>
    <div class="ts-footer">
      <div class="ts-powered">Powered by <a href="https://thirdactadvisors.com" target="_blank">Third Act Advisors, LLC</a></div>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  var body = document.getElementById('ts-body');

  // ── OPEN / CLOSE ──
  function openPanel() {
    overlay.classList.add('ts-open');
    panel.classList.add('ts-open');
    fab.style.display = 'none';
    showSelector();
  }

  function closePanel() {
    overlay.classList.remove('ts-open');
    panel.classList.remove('ts-open');
    fab.style.display = 'flex';
  }

  fab.addEventListener('click', openPanel);
  overlay.addEventListener('click', closePanel);
  document.getElementById('ts-close-btn').addEventListener('click', closePanel);

  // ── SELECTOR SCREEN ──
  var TOOLS = [
    { key: 'cover-letter', icon: '✉️', title: 'Cover Letter Creator',        desc: 'Tailored to the job description & your resume' },
    { key: 'thank-you',    icon: '🤝', title: 'Thank-You Email Writer',       desc: 'Reference a key moment from your interview' },
    { key: 'interview',    icon: '💬', title: 'Interview Question Generator', desc: '12 questions grouped by theme' },
    { key: 'compensation', icon: '💰', title: 'Compensation Positioning',     desc: 'Market range by role, level & geography' },
  ];

  function showSelector() {
    body.innerHTML = '<div class="ts-selector-intro">Choose a tool to get started. Each one takes less than 2 minutes.</div><div class="ts-tool-cards" id="ts-tool-cards"></div>';
    var cards = document.getElementById('ts-tool-cards');
    TOOLS.forEach(function(t) {
      var card = document.createElement('div');
      card.className = 'ts-tool-card';
      card.innerHTML = '<div class="ts-tool-card-icon">' + t.icon + '</div><div class="ts-tool-card-text"><div class="ts-tool-card-title">' + t.title + '</div><div class="ts-tool-card-desc">' + t.desc + '</div></div><div class="ts-tool-card-arrow">›</div>';
      card.addEventListener('click', function() { showTool(t.key); });
      cards.appendChild(card);
    });
  }

  // ── TOOL SCREENS ──
  function showTool(key) {
    body.scrollTop = 0;
    if (key === 'cover-letter') showCoverLetter();
    else if (key === 'thank-you') showThankYou();
    else if (key === 'interview') showInterview();
    else if (key === 'compensation') showCompensation();
  }

  function backBtn() {
    var btn = document.createElement('button');
    btn.className = 'ts-back';
    btn.innerHTML = BACK_ARROW + ' All tools';
    btn.addEventListener('click', showSelector);
    return btn;
  }

  function escHtml(s) {
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  // ── COVER LETTER ──
  function showCoverLetter() {
    body.innerHTML = '';
    body.appendChild(backBtn());
    var wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ts-tool-title">Cover Letter Creator</div>
      <div class="ts-tool-desc">Paste the job description and your resume. Click Generate.</div>
      <div class="ts-field"><label>Job description <span class="ts-req">*</span></label><textarea id="ts-cl-job" placeholder="Paste the job description here…"></textarea></div>
      <div class="ts-field"><label>Your resume <span class="ts-req">*</span></label><textarea id="ts-cl-resume" placeholder="Paste your resume here…"></textarea></div>
      <div class="ts-btn-row">
        <button class="ts-btn-primary" id="ts-cl-gen">Generate cover letter</button>
        <button class="ts-btn-secondary" id="ts-cl-copy" disabled>Copy</button>
        <button class="ts-btn-secondary" id="ts-cl-clear">Clear</button>
      </div>
      <div class="ts-status" id="ts-cl-status"></div>
      <div id="ts-cl-out-wrap" style="display:none;">
        <div class="ts-output-wrap"><div class="ts-output-label">Your cover letter</div><div class="ts-output-box" id="ts-cl-out"></div></div>
      </div>
      <div class="ts-tip">Tip: Review and personalize before sending.</div>
    `;
    body.appendChild(wrap);

    var genBtn = document.getElementById('ts-cl-gen');
    var copyBtn = document.getElementById('ts-cl-copy');
    var clearBtn = document.getElementById('ts-cl-clear');
    var statusEl = document.getElementById('ts-cl-status');
    var outEl = document.getElementById('ts-cl-out');
    var outWrap = document.getElementById('ts-cl-out-wrap');

    clearBtn.addEventListener('click', function() {
      document.getElementById('ts-cl-job').value = '';
      document.getElementById('ts-cl-resume').value = '';
      outEl.textContent = ''; outWrap.style.display = 'none';
      statusEl.textContent = ''; statusEl.className = 'ts-status';
      copyBtn.disabled = true; genBtn.disabled = false; genBtn.textContent = 'Generate cover letter';
    });

    copyBtn.addEventListener('click', async function() {
      await navigator.clipboard.writeText(outEl.textContent);
      statusEl.textContent = 'Copied!'; statusEl.className = 'ts-status ts-ok';
      setTimeout(function() { statusEl.textContent = ''; }, 1500);
    });

    genBtn.addEventListener('click', async function() {
      var job = document.getElementById('ts-cl-job').value.trim();
      var resume = document.getElementById('ts-cl-resume').value.trim();
      if (!job || !resume) { statusEl.textContent = 'Please complete both fields.'; statusEl.className = 'ts-status ts-err'; return; }
      genBtn.disabled = true; genBtn.textContent = 'Generating…';
      statusEl.textContent = 'Generating your cover letter…'; statusEl.className = 'ts-status';
      outWrap.style.display = 'none'; copyBtn.disabled = true;
      try {
        var resp = await fetch(ENDPOINT + 'cover-letter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job, resume }) });
        var data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Request failed');
        outEl.textContent = data.coverLetter;
        outWrap.style.display = 'block'; copyBtn.disabled = false;
        statusEl.textContent = ''; body.scrollTop = body.scrollHeight;
      } catch(e) { statusEl.textContent = 'Error: ' + e.message; statusEl.className = 'ts-status ts-err'; }
      finally { genBtn.disabled = false; genBtn.textContent = 'Generate cover letter'; }
    });
  }

  // ── THANK-YOU EMAIL ──
  function showThankYou() {
    body.innerHTML = '';
    body.appendChild(backBtn());
    var wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ts-tool-title">Thank-You Email Writer</div>
      <div class="ts-tool-desc">Paste the job description and resume, add one memorable interview detail.</div>
      <div class="ts-field"><label>Job description <span class="ts-req">*</span></label><textarea id="ts-ty-job" placeholder="Paste the job description here…"></textarea></div>
      <div class="ts-field"><label>Your resume <span class="ts-req">*</span></label><textarea id="ts-ty-resume" placeholder="Paste your resume here…"></textarea></div>
      <div class="ts-field"><label>Memorable interview detail <span class="ts-req">*</span></label><textarea id="ts-ty-note" style="min-height:80px;" placeholder="e.g. They mentioned a need for better reporting; I shared how I reduced prep time by 30%…"></textarea></div>
      <div class="ts-field" style="max-width:180px;"><label>Tone</label><select id="ts-ty-tone"><option value="warm">Warm</option><option value="formal">Formal</option><option value="energized">Energized</option></select></div>
      <div class="ts-btn-row">
        <button class="ts-btn-primary" id="ts-ty-gen">Generate email</button>
        <button class="ts-btn-secondary" id="ts-ty-copy" disabled>Copy</button>
        <button class="ts-btn-secondary" id="ts-ty-clear">Clear</button>
      </div>
      <div class="ts-status" id="ts-ty-status"></div>
      <div id="ts-ty-out-wrap" style="display:none;">
        <div class="ts-output-wrap"><div class="ts-output-label">Your thank-you email</div><div class="ts-output-box" id="ts-ty-out"></div></div>
      </div>
      <div class="ts-tip">Tip: Review and personalize before sending.</div>
    `;
    body.appendChild(wrap);

    var genBtn = document.getElementById('ts-ty-gen');
    var copyBtn = document.getElementById('ts-ty-copy');
    var clearBtn = document.getElementById('ts-ty-clear');
    var statusEl = document.getElementById('ts-ty-status');
    var outEl = document.getElementById('ts-ty-out');
    var outWrap = document.getElementById('ts-ty-out-wrap');

    clearBtn.addEventListener('click', function() {
      ['ts-ty-job','ts-ty-resume','ts-ty-note'].forEach(function(id) { document.getElementById(id).value = ''; });
      document.getElementById('ts-ty-tone').value = 'warm';
      outEl.textContent = ''; outWrap.style.display = 'none';
      statusEl.textContent = ''; statusEl.className = 'ts-status';
      copyBtn.disabled = true; genBtn.disabled = false; genBtn.textContent = 'Generate email';
    });

    copyBtn.addEventListener('click', async function() {
      await navigator.clipboard.writeText(outEl.textContent);
      statusEl.textContent = 'Copied!'; statusEl.className = 'ts-status ts-ok';
      setTimeout(function() { statusEl.textContent = ''; }, 1500);
    });

    genBtn.addEventListener('click', async function() {
      var job = document.getElementById('ts-ty-job').value.trim();
      var resume = document.getElementById('ts-ty-resume').value.trim();
      var interviewNote = document.getElementById('ts-ty-note').value.trim();
      var tone = document.getElementById('ts-ty-tone').value;
      if (!job || !resume || !interviewNote) { statusEl.textContent = 'Please complete all fields.'; statusEl.className = 'ts-status ts-err'; return; }
      genBtn.disabled = true; genBtn.textContent = 'Generating…';
      statusEl.textContent = 'Generating your thank-you email…'; statusEl.className = 'ts-status';
      outWrap.style.display = 'none'; copyBtn.disabled = true;
      try {
        var resp = await fetch(ENDPOINT + 'thank-you', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job, resume, interviewNote, tone }) });
        var data = await resp.json();
        if (!resp.ok) throw new Error(data.error || 'Request failed');
        outEl.textContent = data.thankYouEmail;
        outWrap.style.display = 'block'; copyBtn.disabled = false;
        statusEl.textContent = ''; body.scrollTop = body.scrollHeight;
      } catch(e) { statusEl.textContent = 'Error: ' + e.message; statusEl.className = 'ts-status ts-err'; }
      finally { genBtn.disabled = false; genBtn.textContent = 'Generate email'; }
    });
  }

  // ── INTERVIEW QUESTIONS ──
  function showInterview() {
    body.innerHTML = '';
    body.appendChild(backBtn());
    var wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ts-tool-title">Interview Question Generator</div>
      <div class="ts-tool-desc">Paste a job description and get 12 likely questions grouped into 3 buckets.</div>
      <div class="ts-field"><label>Role title <span style="font-weight:400;color:${SLATE}">(optional)</span></label><input type="text" id="ts-iq-role" placeholder="e.g. Product Manager, Sales Director" /></div>
      <div class="ts-two-col">
        <div class="ts-field"><label>Role stage</label><select id="ts-iq-stage"><option value="ic">Individual Contributor</option><option value="manager">Manager</option><option value="director" selected>Director</option><option value="vp">VP</option></select></div>
        <div class="ts-field"><label>Seniority</label><select id="ts-iq-seniority"><option value="junior">Junior</option><option value="mid" selected>Mid</option><option value="exec">Exec</option></select></div>
      </div>
      <div class="ts-field"><label>Job description <span class="ts-req">*</span></label><textarea id="ts-iq-job" placeholder="Paste the job description here…"></textarea></div>
      <div class="ts-field"><label>Resume <span style="font-weight:400;color:${SLATE}">(optional)</span></label><textarea id="ts-iq-resume" placeholder="Paste your resume here (optional)…"></textarea></div>
      <div class="ts-btn-row">
        <button class="ts-btn-primary" id="ts-iq-gen">Generate questions</button>
        <button class="ts-btn-secondary" id="ts-iq-clear">Clear</button>
      </div>
      <div class="ts-status" id="ts-iq-status"></div>
      <div id="ts-iq-out" style="margin-top:16px;"></div>
      <div class="ts-tip">Edit these questions to match your personal style before the interview.</div>
    `;
    body.appendChild(wrap);

    var genBtn = document.getElementById('ts-iq-gen');
    var clearBtn = document.getElementById('ts-iq-clear');
    var statusEl = document.getElementById('ts-iq-status');
    var outEl = document.getElementById('ts-iq-out');

    clearBtn.addEventListener('click', function() {
      document.getElementById('ts-iq-role').value = '';
      document.getElementById('ts-iq-stage').value = 'director';
      document.getElementById('ts-iq-seniority').value = 'mid';
      document.getElementById('ts-iq-job').value = '';
      document.getElementById('ts-iq-resume').value = '';
      outEl.innerHTML = ''; statusEl.textContent = ''; statusEl.className = 'ts-status';
      genBtn.disabled = false; genBtn.textContent = 'Generate questions';
    });

    genBtn.addEventListener('click', async function() {
      var jobDescription = document.getElementById('ts-iq-job').value.trim();
      if (!jobDescription) { statusEl.textContent = 'Please paste a job description.'; statusEl.className = 'ts-status ts-err'; return; }
      genBtn.disabled = true; genBtn.textContent = 'Generating…';
      statusEl.textContent = 'Generating interview questions…'; statusEl.className = 'ts-status';
      outEl.innerHTML = '';
      try {
        var payload = { jobDescription: jobDescription, resume: document.getElementById('ts-iq-resume').value.trim(), roleTitle: document.getElementById('ts-iq-role').value.trim(), roleStage: document.getElementById('ts-iq-stage').value, seniority: document.getElementById('ts-iq-seniority').value };
        var res = await fetch(ENDPOINT + 'generate-interview-questions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        var raw = await res.text(); var data = {};
        try { data = JSON.parse(raw); } catch(e) { data = { error: raw }; }
        if (!res.ok) throw new Error(data.error || 'Request failed');
        outEl.innerHTML = (data.buckets || []).map(function(b) {
          return '<div class="ts-bucket"><div class="ts-bucket-title">' + escHtml(b.bucket_name || '') + '</div><ol>' + (b.questions || []).map(function(q) { return '<li>' + escHtml(q) + '</li>'; }).join('') + '</ol></div>';
        }).join('');
        statusEl.textContent = ''; body.scrollTop = body.scrollHeight;
      } catch(e) { statusEl.textContent = e.message || String(e); statusEl.className = 'ts-status ts-err'; }
      finally { genBtn.disabled = false; genBtn.textContent = 'Generate questions'; }
    });
  }

  // ── COMPENSATION ──
  function showCompensation() {
    body.innerHTML = '';
    body.appendChild(backBtn());
    var wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="ts-tool-title">Compensation Positioning</div>
      <div class="ts-tool-desc">Get a market range estimate based on your role, level, and geography.</div>
      <div class="ts-two-col">
        <div class="ts-field"><label>Function <span class="ts-req">*</span></label><select id="ts-cp-fn" required><option value="" disabled selected>Select</option><option>Sales</option><option>Marketing</option><option>Operations</option><option>Finance</option><option>HR / People</option><option>Customer Success</option><option>Product</option><option>IT / Engineering</option><option>Other</option></select></div>
        <div class="ts-field"><label>Level <span class="ts-req">*</span></label><select id="ts-cp-level" required><option value="" disabled selected>Select</option><option value="IC">Individual Contributor</option><option value="Manager">Manager</option><option value="Director">Director</option><option value="VP">VP</option><option value="C-Suite">C-Suite</option></select></div>
        <div class="ts-field"><label>Experience <span class="ts-req">*</span></label><select id="ts-cp-exp" required><option value="" disabled selected>Select</option><option value="0–2 (Entry level / Recent grad)">0–2 years</option><option value="3–7">3–7 years</option><option value="8–15">8–15 years</option><option value="16–25">16–25 years</option><option value="25+">25+ years</option></select></div>
        <div class="ts-field"><label>Geography <span class="ts-req">*</span></label><select id="ts-cp-geo" required><option value="" disabled selected>Select</option><option value="High Cost Metro">High Cost Metro (NYC, SF, Boston, Seattle, LA, Chicago)</option><option value="Major Metro">Major Metro (Austin, Denver, Atlanta, Miami, Dallas)</option><option value="Mid Market">Mid Market</option><option value="Remote National">Remote National</option></select></div>
        <div class="ts-field"><label>Industry <span class="ts-req">*</span></label><select id="ts-cp-ind" required><option value="" disabled selected>Select</option><option>SaaS / Cloud</option><option>Enterprise Software</option><option>Finance / FinTech</option><option>Healthcare / MedTech</option><option>Cybersecurity</option><option>Manufacturing</option><option>Consulting / Professional Services</option><option>Retail / Consumer</option><option>Education / EdTech</option><option>Media</option><option>Nonprofit</option><option>Other</option></select></div>
        <div class="ts-field"><label>Company size <span class="ts-req">*</span></label><select id="ts-cp-size" required><option value="" disabled selected>Select</option><option>Startup</option><option>Growth Stage</option><option>Enterprise</option></select></div>
        <div class="ts-field"><label>Current base <span style="font-weight:400;color:${SLATE}">(optional)</span></label><input type="text" id="ts-cp-base" inputmode="numeric" placeholder="e.g. 120000" /></div>
        <div class="ts-field"><label>Current total <span style="font-weight:400;color:${SLATE}">(optional)</span></label><input type="text" id="ts-cp-total" inputmode="numeric" placeholder="e.g. 155000" /></div>
      </div>
      <div class="ts-field" style="max-width:200px;"><label>Equity <span style="font-weight:400;color:${SLATE}">(optional)</span></label><select id="ts-cp-eq"><option value="" disabled selected>Select</option><option value="No">No</option><option value="Yes">Yes</option></select></div>
      <div class="ts-btn-row">
        <button class="ts-btn-primary" id="ts-cp-gen">Generate report</button>
        <button class="ts-btn-secondary" id="ts-cp-clear">Clear</button>
      </div>
      <div class="ts-status" id="ts-cp-status"></div>
      <div id="ts-cp-out-wrap" style="display:none; margin-top:16px;"></div>
      <div class="ts-disclaimer">This tool provides generalized market estimates. Results are informational only and are not a guarantee of compensation.</div>
    `;
    body.appendChild(wrap);

    var genBtn = document.getElementById('ts-cp-gen');
    var clearBtn = document.getElementById('ts-cp-clear');
    var statusEl = document.getElementById('ts-cp-status');
    var outWrap = document.getElementById('ts-cp-out-wrap');
    var g = function(id) { return document.getElementById(id); };

    var sanitizeMoney = function(v) { if (!v) return ''; var n = String(v).replace(/[^0-9]/g,''); return n ? Number(n) : ''; };
    var formatUSD = function(n) { var num = Number(n); if (!isFinite(num)) return ''; return num.toLocaleString('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}); };
    var rangeLine = function(r) { if (!r||!isFinite(r.low)||!isFinite(r.mid)||!isFinite(r.high)) return ''; return formatUSD(r.low)+' to '+formatUSD(r.high)+' (midpoint '+formatUSD(r.mid)+')'; };
    var pctVsMid = function(c,m) { c=Number(c);m=Number(m); if(!isFinite(c)||!isFinite(m)||m===0) return null; return ((c-m)/m)*100; };
    var posInBand = function(c,lo,hi) { c=Number(c);lo=Number(lo);hi=Number(hi); if(!isFinite(c)||!isFinite(lo)||!isFinite(hi)||hi===lo) return null; return (c-lo)/(hi-lo); };
    var clamp01 = function(x) { return Math.max(0,Math.min(1,x)); };
    var describeBand = function(p) { if(p===null) return ''; if(p<0) return 'below the estimated range'; if(p>1) return 'above the estimated range'; return 'within the estimated range'; };
    var approxPct = function(p) { if(p===null) return ''; if(p<0) return 'below the range'; if(p>1) return 'above the range'; return 'around the '+Math.round(clamp01(p)*100)+'th percentile'; };
    var fmtPct = function(x) { if(x===null||!isFinite(x)) return ''; var r=Math.round(x); return (r>0?'+':'')+r+'%'; };

    var BOLD_H = new Set(['market context','why this range moves','questions to clarify','reminder']);
    var norm = function(s) { return String(s||'').replace(/\s+/g,' ').trim().toLowerCase(); };
    var renderNarrative = function(text) {
      var raw = String(text||'').trim(); if(!raw) return '<div style="color:#64748b;">No narrative returned.</div>';
      var lines = raw.split(/\r?\n/); var html=''; var bulletsOpen=false;
      var closeBullets = function() { if(bulletsOpen){html+='</ul>';bulletsOpen=false;} };
      lines.forEach(function(lineRaw) {
        var line=String(lineRaw||'').trim(); if(!line){closeBullets();return;}
        if(BOLD_H.has(norm(line))){closeBullets();html+='<div class="ts-narrative-heading">'+escHtml(line)+'</div>';return;}
        if(line.startsWith('- ')){var bt=line.slice(2).trim();if(!bulletsOpen){html+='<ul class="ts-narrative-ul">';bulletsOpen=true;}html+='<li>'+escHtml(bt)+'</li>';return;}
        closeBullets();html+='<div class="ts-narrative-para">'+escHtml(line)+'</div>';
      });
      closeBullets(); return html;
    };

    clearBtn.addEventListener('click', function() {
      ['ts-cp-fn','ts-cp-level','ts-cp-exp','ts-cp-geo','ts-cp-ind','ts-cp-size','ts-cp-eq'].forEach(function(id){var s=g(id);if(s)s.selectedIndex=0;});
      g('ts-cp-base').value=''; g('ts-cp-total').value='';
      statusEl.textContent=''; statusEl.className='ts-status';
      outWrap.style.display='none'; outWrap.innerHTML='';
      genBtn.disabled=false; genBtn.textContent='Generate report';
    });

    genBtn.addEventListener('click', async function() {
      var required = ['ts-cp-fn','ts-cp-level','ts-cp-exp','ts-cp-geo','ts-cp-ind','ts-cp-size'];
      if (required.some(function(id){return !g(id).value;})) { statusEl.textContent='Please complete all required fields.'; statusEl.className='ts-status ts-err'; return; }
      genBtn.disabled=true; genBtn.textContent='Generating…';
      statusEl.textContent='Generating report…'; statusEl.className='ts-status';
      outWrap.style.display='none'; outWrap.innerHTML='';
      var payload = { functionGroup:g('ts-cp-fn').value, level:g('ts-cp-level').value, experience:g('ts-cp-exp').value, geography:g('ts-cp-geo').value, industry:g('ts-cp-ind').value, companySize:g('ts-cp-size').value, currentBase:sanitizeMoney(g('ts-cp-base').value)||'', currentTotal:sanitizeMoney(g('ts-cp-total').value)||'', equity:g('ts-cp-eq').value||'' };
      try {
        var controller = new AbortController(); var timeout = setTimeout(function(){controller.abort();},20000);
        var res = await fetch(ENDPOINT+'generate-comp-positioning',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
        clearTimeout(timeout);
        var raw=await res.text(); var data;
        try{data=JSON.parse(raw);}catch(e){throw new Error('Non-JSON response');}
        if(!res.ok||data.error) throw new Error(data.error||('HTTP '+res.status));

        var cb=payload.currentBase, ct=payload.currentTotal, eq=payload.equity;
        var br=data.ranges&&data.ranges.base, tr=data.ranges&&data.ranges.total;
        var hasBase=isFinite(cb)&&cb>0, hasTotal=isFinite(ct)&&ct>0;

        var html = '<div class="ts-confidence" id="ts-cp-conf"></div>';
        html += '<div class="ts-ranges-grid"><div class="ts-range-card"><div class="ts-range-label">Base Salary</div><div class="ts-range-value" id="ts-cp-base-line">—</div></div><div class="ts-range-card"><div class="ts-range-label">Total Compensation</div><div class="ts-range-value" id="ts-cp-total-line">—</div></div></div>';
        if(hasBase||hasTotal) html += '<div class="ts-position-card" id="ts-cp-pos"><div class="ts-position-label">Your Market Position</div><div id="ts-cp-pos-body" style="font-size:13px;line-height:1.65;"></div><div id="ts-cp-pos-note" style="margin-top:8px;font-size:11.5px;color:'+SLATE+';line-height:1.4;"></div></div>';
        html += '<div class="ts-narrative" id="ts-cp-narrative"></div>';

        outWrap.innerHTML = html;
        outWrap.style.display = 'block';

        document.getElementById('ts-cp-base-line').textContent = rangeLine(br) || '—';
        document.getElementById('ts-cp-total-line').textContent = rangeLine(tr) || '—';

        var hasCurrent = !!payload.currentBase||!!payload.currentTotal;
        var senior = payload.level==='VP'||payload.level==='C-Suite'||String(payload.experience||'').includes('16')||String(payload.experience||'').includes('25');
        document.getElementById('ts-cp-conf').textContent = 'Confidence: '+(hasCurrent?'higher':'moderate')+' — '+(senior?'higher variability at senior levels':'normal variability');

        if(hasBase||hasTotal) {
          var lines=[];
          if(hasBase&&br&&isFinite(br.mid)){var pct=pctVsMid(cb,br.mid);var bp=posInBand(cb,br.low,br.high);lines.push('<div style="margin:0 0 5px 0;"><strong>Base vs midpoint:</strong> '+fmtPct(pct)+' ('+describeBand(bp)+', '+approxPct(bp)+')</div>');}
          if(hasTotal&&tr&&isFinite(tr.mid)){var pct2=pctVsMid(ct,tr.mid);var bp2=posInBand(ct,tr.low,tr.high);lines.push('<div style="margin:0 0 5px 0;"><strong>Total vs midpoint:</strong> '+fmtPct(pct2)+' ('+describeBand(bp2)+', '+approxPct(bp2)+')</div>');}
          if(eq==='Yes') lines.push('<div style="margin:8px 0 0 0;"><strong>Equity note:</strong> Equity can materially change total value depending on terms and vesting.</div>');
          document.getElementById('ts-cp-pos-body').innerHTML = lines.join('');
          document.getElementById('ts-cp-pos-note').textContent = 'Directional signal only — assumes similar role scope and performance expectations.';
        }

        document.getElementById('ts-cp-narrative').innerHTML = renderNarrative(data.narrative);
        statusEl.textContent='Report generated.'; statusEl.className='ts-status ts-ok';
        body.scrollTop = body.scrollHeight;
      } catch(e) { statusEl.textContent='Something went wrong: '+(e&&e.message?e.message:String(e)); statusEl.className='ts-status ts-err'; }
      finally { genBtn.disabled=false; genBtn.textContent='Generate report'; }
    });
  }

})();
