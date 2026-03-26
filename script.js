/* ═══════════════════════════════════════════════════════
   HELIX: NEON HORIZON. Site JavaScript
   ═══════════════════════════════════════════════════════ */

// ─── DOM REFS ───
const header = document.getElementById('site-header');
const nav = document.getElementById('header-nav');
const mobileBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelectorAll('.header-nav a');
const modalOverlay = document.getElementById('modal-overlay');
const modalPanel = document.getElementById('modal-panel');
const modalBody = document.getElementById('modal-body');
const modalCloseBtn = document.getElementById('modal-close');
const tableTabs = document.querySelectorAll('.table-tab');
const exportBtn = document.getElementById('cg-export');

// ─── MOBILE MENU ───
mobileBtn.addEventListener('click', () => {
  mobileBtn.classList.toggle('is-open');
  nav.classList.toggle('is-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileBtn.classList.remove('is-open');
    nav.classList.remove('is-open');
  });
});

// ─── HEADER SCROLL STATE ───
let lastScroll = 0;
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 80);
  lastScroll = window.scrollY;
}, { passive: true });

// ─── ACTIVE NAV ───
function updateActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const scrollPos = window.scrollY + 160;
  let currentId = '';
  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) currentId = section.id;
  });
  navLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    link.classList.toggle('is-active', sectionId === currentId);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// ─── SCROLL REVEAL ───
function initScrollReveal() {
  const items = document.querySelectorAll(
    '.helix-phase, .char-step, .check-result, .combat-block, .district, ' +
    '.burden-level, .faction, .weapon, .sec-level'
  );
  items.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => observer.observe(el));
}
window.addEventListener('load', initScrollReveal);

// ─── CONSEQUENCE TABLE TABS ───
tableTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tableTabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.table-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.table).classList.add('active');
  });
});

// ─── MODALS ───
const modalContent = {
  'hook-modal': {
    label: 'HELIX Example / Hook',
    title: 'The job arrives crooked',
    body: `
      <p class="modal-speaker">Alex (driving):</p>
      <p>"Deckard calls. Data retrieval from a drowned server room in the Drain. Double the usual rate."</p>
      <p class="modal-speaker">Sam (pushing back):</p>
      <p>"Why double? What is Deckard not saying?"</p>
      <p class="modal-speaker">Alex:</p>
      <p class="modal-action">Let us ask the Oracle. Rolls Action + Theme. "Conceal... Data."</p>
      <p>"He knows what is on that drive and he is not telling us."</p>
      <div class="modal-narration">That is the Hook. Under five minutes. A job and a seed of trouble.</div>
    `
  },
  'explore-modal': {
    label: 'HELIX Example / Explore',
    title: 'The route gets worse',
    body: `
      <p class="modal-speaker">Alex (driving, framing):</p>
      <p>"Ma Lin's noodle shop, Sector 12. Zero and Kira are at the counter. The question is: what does she know about the drowned server room?"</p>
      <p class="modal-speaker">Sam (pushing back, voicing Ma Lin):</p>
      <p>"You want to go down there? Three levels under? The Canal Rats pulled a body out of there last month. They said the lights were still on."</p>
      <p class="modal-speaker">Sam (as Zero):</p>
      <p class="modal-action">WITS Check. d10 and d12 (Tag stepped up). Gets 7 and 3. One pass. Twist.</p>
      <div class="modal-narration">Rolls d8 on Social Consequence Table. Gets 5: "Deal worse than hoped." The Canal Rats started charging tolls. Double rate or find another way.</div>
      <p class="modal-speaker">Alex:</p>
      <p>"I want to cut. Next scene: the canal entrance on the west side, looking for the smuggler's tunnel."</p>
    `
  },
  'leverage-modal': {
    label: 'HELIX Example / Leverage. THE SWAP',
    title: 'Everything changes',
    body: `
      <p class="modal-speaker">Sam (now driving. was pushing back through Hook and Explore):</p>
      <p>"Server room. Knee-deep in black water. Flickering emergency lights. Kira spots the dead drop."</p>
      <p class="modal-speaker">Sam:</p>
      <p>"Zero pulls up the file index. And she sees what is on the drive. It is not corporate financials. It is medical records. Solvane's experimental chrome testing program. And one of the test subjects is her sister."</p>
      <p class="modal-speaker">Sam (as Zero):</p>
      <p>"Zero is frozen. She is staring at the screen and her hands are shaking."</p>
      <p class="modal-speaker">Alex (now pushing back, as Kira):</p>
      <p>"Kira does not know what Zero just saw. 'Zero. Grab the drive. We do not have time.'"</p>
      <div class="modal-narration">That is the Leverage. The mission just became personal. Nobody planned this moment. It emerged from the collision between Zero's Drive and the fiction.</div>
    `
  },
  'ignite-modal': {
    label: 'HELIX Example / Ignite',
    title: 'The standoff',
    body: `
      <p class="modal-speaker">Alex (pushing back, as Kira):</p>
      <p class="modal-action">NERVE Check to snap Zero out of it. NERVE d8. Gets 6 and 4. Both pass. Full Hit.</p>
      <p>"Kira's voice cuts through. Zero unplugs the drive. 'My sister is on this drive, Kira.'"</p>
      <p class="modal-speaker">Sam (driving):</p>
      <p>"Sergeant Hollis steps through the main entrance. Four operatives behind her. 'Put the drive on the ground.'"</p>
      <p class="modal-speaker">Alex (as Kira):</p>
      <p class="modal-action">NERVE Check with Tag. d10 and d8. Gets 9 and 3. One pass. Twist.</p>
      <p>"'Sergeant. Do you know what you are here to collect?'"</p>
      <div class="modal-narration">Hollis reads the medical records. Her face changes. "Get out. Side tunnel. I will tell them you were gone when we arrived."</div>
    `
  },
  'exhale-modal': {
    label: 'HELIX Example / Exhale',
    title: 'The bill comes due',
    body: `
      <p class="modal-speaker">Mission Burden Check:</p>
      <p>Corp targeted (+1), Identified (+1), Low-security (-1). Net: 1 factor. Roll d6: 3. No Burden increase.</p>
      <p class="modal-speaker">Burden Effects:</p>
      <p>Current Burden 1. Roll 1d6: 5. That is 5+. Economic shock. Rolls d8: 2. Chrome subscription lapse. Zero's Neural Interface starts glitching.</p>
      <p class="modal-speaker">Faction Turn:</p>
      <p>Solvane advances. Dependency Protocol ticks from 2 to 3. Ferrik pressures Deckard. his Willingness shrinks to d6.</p>
      <p class="modal-speaker">Pay & Downtime:</p>
      <p>Sato pays. Burden drops to 0. Kira recovers. Zero repairs the Interface. Twist: the only patch is Solvane firmware. They can see whenever she jacks in.</p>
      <div class="modal-narration">Drive Progress: Zero found her sister's name. Tick 2 segments. Drive is now 2/8.</div>
    `
  }
};

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.modal;
    const content = modalContent[id];
    if (!content) return;
    modalBody.innerHTML = `
      <p class="modal-label">${content.label}</p>
      <h3>${content.title}</h3>
      ${content.body}
    `;
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── PDF CHARACTER SHEET GENERATOR ───
async function generateCharacterPDF() {
  const { PDFDocument, rgb, StandardFonts } = PDFLib;

  const pdfDoc = await PDFDocument.create();
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const courier = await pdfDoc.embedFont(StandardFonts.Courier);
  const courierBold = await pdfDoc.embedFont(StandardFonts.CourierBold);

  const W = 612; const H = 792;
  const M = 36; // margin
  const CW = W - 2 * M; // content width
  const BLACK = rgb(0, 0, 0);
  const GRAY = rgb(0.45, 0.45, 0.45);
  const LIGHT = rgb(0.75, 0.75, 0.75);
  const RULE = rgb(0.82, 0.82, 0.82);
  const WHITE = rgb(1, 1, 1);

  // Get form values
  const val = id => document.getElementById(id)?.value || '';

  const charData = {
    name: val('cg-name'),
    concept: val('cg-concept'),
    guts: val('cg-guts'),
    edge: val('cg-edge'),
    wits: val('cg-wits'),
    nerve: val('cg-nerve'),
    tag1: val('cg-tag1'),
    tag2: val('cg-tag2'),
    tag3: val('cg-tag3'),
    flaw: val('cg-flaw'),
    drive: val('cg-drive'),
    aug1Name: val('cg-aug1-name'),
    aug1Type: val('cg-aug1-type'),
    aug1Ability: val('cg-aug1-ability'),
    aug2Name: val('cg-aug2-name'),
    aug2Type: val('cg-aug2-type'),
    aug2Ability: val('cg-aug2-ability'),
    load: val('cg-load'),
    supply: val('cg-supply'),
    conn1Name: val('cg-conn1-name'),
    conn1Will: val('cg-conn1-will'),
    conn2Name: val('cg-conn2-name'),
    conn2Will: val('cg-conn2-will'),
  };

  // ═══ HELPER FUNCTIONS ═══

  function drawLine(page, x1, y1, x2, y2, color = RULE, thickness = 0.5) {
    page.drawLine({ start: { x: x1, y: y1 }, end: { x: x2, y: y2 }, thickness, color });
  }

  function drawBox(page, x, y, w, h, borderColor = RULE) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor, borderWidth: 0.5 });
  }

  function drawFilledBox(page, x, y, w, h, color = rgb(0.96, 0.96, 0.96)) {
    page.drawRectangle({ x, y, width: w, height: h, color, borderWidth: 0 });
  }

  function drawCheckboxRow(page, x, y, count, size = 12, gap = 4) {
    for (let i = 0; i < count; i++) {
      drawBox(page, x + i * (size + gap), y, size, size);
    }
  }

  function drawLabel(page, x, y, text, size = 6.5) {
    page.drawText(text.toUpperCase(), { x, y, size, font: courierBold, color: GRAY });
  }

  function drawValue(page, x, y, text, size = 9) {
    page.drawText(text, { x, y, size, font: helvetica, color: BLACK });
  }

  function drawBoldValue(page, x, y, text, size = 9) {
    page.drawText(text, { x, y, size, font: helveticaBold, color: BLACK });
  }

  function drawFieldLine(page, x, y, w) {
    drawLine(page, x, y, x + w, y, RULE, 0.4);
  }

  function drawSectionHeader(page, x, y, text, width) {
    drawLine(page, x, y + 10, x + width, y + 10, BLACK, 1);
    page.drawText(text.toUpperCase(), { x, y, size: 8, font: courierBold, color: BLACK });
  }

  // Wrap text helper
  function wrapText(text, font, size, maxWidth) {
    if (!text) return [''];
    const words = text.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
      const test = current ? current + ' ' + word : word;
      if (font.widthOfTextAtSize(test, size) > maxWidth) {
        if (current) lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);
    return lines.length ? lines : [''];
  }


  // ═══ PAGE 1 ═══
  const page1 = pdfDoc.addPage([W, H]);
  let y = H - M;

  // Title
  page1.drawText('HELIX: NEON HORIZON', { x: M, y: y, size: 16, font: courierBold, color: BLACK });
  page1.drawText('CHARACTER SHEET  /  V0.4', { x: M + 220, y: y + 2, size: 7, font: courier, color: GRAY });
  y -= 4;
  drawLine(page1, M, y, M + CW, y, BLACK, 1.5);

  // ── IDENTITY ──
  y -= 20;
  drawSectionHeader(page1, M, y, 'Identity', CW);

  y -= 18;
  drawLabel(page1, M, y + 12, 'Name');
  drawFilledBox(page1, M + 48, y, CW - 48, 16);
  drawBoldValue(page1, M + 52, y + 4, charData.name, 10);

  y -= 22;
  drawLabel(page1, M, y + 12, 'Concept');
  drawFilledBox(page1, M + 48, y, CW - 48, 16);
  drawValue(page1, M + 52, y + 4, charData.concept, 9);

  // ── ATTRIBUTES ──
  y -= 30;
  drawSectionHeader(page1, M, y, 'Attributes', CW);
  page1.drawText('ASSIGN D10, D8, D8, D6', { x: M + CW - 130, y, size: 6, font: courier, color: GRAY });

  y -= 42;
  const attrs = [
    { name: 'GUTS', val: charData.guts, desc: 'Force / Endurance' },
    { name: 'EDGE', val: charData.edge, desc: 'Speed / Reflexes' },
    { name: 'WITS', val: charData.wits, desc: 'Perception / Tech' },
    { name: 'NERVE', val: charData.nerve, desc: 'Composure / Social' },
  ];
  const attrW = (CW - 18) / 4;
  attrs.forEach((attr, i) => {
    const ax = M + i * (attrW + 6);
    drawBox(page1, ax, y, attrW, 36);
    page1.drawText(attr.name, { x: ax + attrW/2 - courierBold.widthOfTextAtSize(attr.name, 10)/2, y: y + 20, size: 10, font: courierBold, color: BLACK });
    const dieText = attr.val || '___';
    page1.drawText(dieText, { x: ax + attrW/2 - helveticaBold.widthOfTextAtSize(dieText, 12)/2, y: y + 5, size: 12, font: helveticaBold, color: BLACK });
  });

  y -= 12;
  page1.drawText('DIE LADDER:  d6  >  d8  >  d10  >  d12', { x: M, y, size: 6, font: courier, color: GRAY });

  // ── TAGS ──
  y -= 22;
  drawSectionHeader(page1, M, y, 'Tags (Choose 3)', CW);
  page1.drawText('WHEN A TAG APPLIES, STEP ONE DIE UP', { x: M + CW - 200, y, size: 6, font: courier, color: GRAY });

  const tags = [
    { label: 'Origin', val: charData.tag1 },
    { label: 'Role', val: charData.tag2 },
    { label: 'Wildcard', val: charData.tag3 },
  ];
  tags.forEach((tag, i) => {
    y -= 18;
    drawLabel(page1, M, y + 12, tag.label);
    drawFilledBox(page1, M + 52, y, CW - 52, 16);
    drawValue(page1, M + 56, y + 4, tag.val);
  });

  // ── FLAW ──
  y -= 26;
  drawSectionHeader(page1, M, y, 'Flaw', CW);
  y -= 18;
  drawFilledBox(page1, M, y, CW, 16);
  drawValue(page1, M + 4, y + 4, charData.flaw);

  // ── DRIVE ──
  y -= 26;
  drawSectionHeader(page1, M, y, 'Drive', CW);
  y -= 18;
  drawFilledBox(page1, M, y, CW, 16);
  drawValue(page1, M + 4, y + 4, charData.drive);

  y -= 20;
  drawLabel(page1, M, y + 6, 'Drive Progress');
  drawCheckboxRow(page1, M + 80, y, 8, 13, 5);

  // ── HARM TRACKS ──
  y -= 28;
  drawSectionHeader(page1, M, y, 'Harm Tracks', CW);
  page1.drawText('MINOR=1 BOX   MAJOR=2   SEVERE=3', { x: M + CW - 190, y, size: 6, font: courier, color: GRAY });

  y -= 22;
  drawLabel(page1, M, y + 6, 'BODY');
  drawCheckboxRow(page1, M + 40, y, 6, 14, 5);
  page1.drawText('BROKEN', { x: M + 40 + 6*(14+5) + 8, y: y + 4, size: 6, font: courierBold, color: GRAY });

  y -= 22;
  drawLabel(page1, M, y + 6, 'NERVE');
  drawCheckboxRow(page1, M + 40, y, 6, 14, 5);
  page1.drawText('BROKEN', { x: M + 40 + 6*(14+5) + 8, y: y + 4, size: 6, font: courierBold, color: GRAY });

  y -= 14;
  page1.drawText('BROKEN: Blaze of Glory (auto Full Hit + Spark, out) / Hold On (Scar) / Burn Permanent (back at 1)', { x: M, y, size: 5.5, font: courier, color: GRAY });

  // ── AUGMENTS ──
  y -= 24;
  drawSectionHeader(page1, M, y, 'Augments', CW);
  page1.drawText('CHROME / SKILL / BOND / GEAR', { x: M + CW - 160, y, size: 6, font: courier, color: GRAY });

  const augments = [
    { name: charData.aug1Name, type: charData.aug1Type, ability: charData.aug1Ability },
    { name: charData.aug2Name, type: charData.aug2Type, ability: charData.aug2Ability },
    { name: '', type: '', ability: '' },
    { name: '', type: '', ability: '' },
  ];

  augments.forEach((aug, i) => {
    y -= 38;
    drawBox(page1, M, y, CW, 34);
    drawLabel(page1, M + 4, y + 24, 'Name & Type');
    drawBoldValue(page1, M + 64, y + 24, aug.name ? `${aug.name} (${aug.type})` : '', 8);
    drawLabel(page1, M + 4, y + 12, 'Starting Ability');
    drawValue(page1, M + 78, y + 12, aug.ability, 7.5);
    // Upgrade checkboxes
    page1.drawText('UPGRADES:', { x: M + 4, y: y + 2, size: 5.5, font: courier, color: GRAY });
    drawCheckboxRow(page1, M + 56, y, 2, 10, 18);
    page1.drawText('1', { x: M + 56 + 12, y: y + 2, size: 6, font: courier, color: GRAY });
    page1.drawText('2', { x: M + 56 + 12 + 28, y: y + 2, size: 6, font: courier, color: GRAY });
  });

  // Footer
  page1.drawText('HELIX: NEON HORIZON  /  V0.4 PLAYTEST  /  CHARACTER SHEET PAGE 1', {
    x: W/2 - courier.widthOfTextAtSize('HELIX: NEON HORIZON  /  V0.4 PLAYTEST  /  CHARACTER SHEET PAGE 1', 5.5)/2,
    y: 20, size: 5.5, font: courier, color: GRAY
  });


  // ═══ PAGE 2 ═══
  const page2 = pdfDoc.addPage([W, H]);
  y = H - M;

  // Title
  page2.drawText('NEON HORIZON', { x: M, y, size: 12, font: courierBold, color: BLACK });
  page2.drawText('LOADOUT / CONNECTIONS / CLOCKS / REFERENCE', { x: M + 130, y: y + 2, size: 6.5, font: courier, color: GRAY });
  y -= 4;
  drawLine(page2, M, y, M + CW, y, BLACK, 1.5);

  const leftW = CW * 0.48;
  const rightX = M + leftW + CW * 0.04;
  const rightW = CW * 0.48;

  // ── LOADOUT ──
  y -= 20;
  drawSectionHeader(page2, M, y, 'Loadout (fill slots during play)', leftW);
  page2.drawText(charData.load.toUpperCase() || 'NORMAL (5 SLOTS)', { x: M + leftW - 90, y, size: 6, font: courier, color: GRAY });

  const slotCount = charData.load.includes('Light') ? 3 : charData.load.includes('Heavy') ? 7 : 5;
  for (let i = 0; i < 7; i++) {
    y -= 20;
    page2.drawText(String(i+1), { x: M, y: y + 4, size: 7, font: courierBold, color: i < slotCount ? BLACK : LIGHT });
    drawBox(page2, M + 14, y, leftW - 56, 16, i < slotCount ? RULE : rgb(0.9,0.9,0.9));
    drawLabel(page2, M + leftW - 38, y + 12, 'Qual');
    drawBox(page2, M + leftW - 38, y, 38, 16, i < slotCount ? RULE : rgb(0.9,0.9,0.9));
  }

  // ── CONNECTIONS ──
  y -= 26;
  drawSectionHeader(page2, M, y, 'Connections', leftW);
  page2.drawText('WILLINGNESS DIE / 1-2 SHRINKS', { x: M + leftW - 160, y, size: 6, font: courier, color: GRAY });

  const connections = [
    { name: charData.conn1Name, will: charData.conn1Will, relation: 'Trusted' },
    { name: charData.conn2Name, will: charData.conn2Will, relation: 'Wants something' },
    { name: '', will: '', relation: '' },
    { name: '', will: '', relation: '' },
  ];

  connections.forEach((conn, i) => {
    y -= 34;
    drawBox(page2, M, y, leftW, 30);
    drawLabel(page2, M + 4, y + 20, 'Name');
    drawValue(page2, M + 32, y + 20, conn.name, 8);
    drawLabel(page2, M + 4, y + 8, 'Relation');
    drawValue(page2, M + 42, y + 8, conn.relation, 7.5);
    drawLabel(page2, M + leftW - 52, y + 20, 'Will');
    drawBoldValue(page2, M + leftW - 28, y + 20, conn.will, 9);
  });

  // ── NOTES ──
  y -= 24;
  drawSectionHeader(page2, M, y, 'Notes', leftW);
  y -= 4;
  const notesBottom = 36;
  drawBox(page2, M, notesBottom, leftW, y - notesBottom);
  let lineY = y - 14;
  while (lineY > notesBottom + 8) {
    drawLine(page2, M + 4, lineY, M + leftW - 4, lineY, rgb(0.9, 0.9, 0.9), 0.3);
    lineY -= 14;
  }

  // ═══ RIGHT COLUMN ═══
  let ry = H - M - 24;

  // ── CLOCKS ──
  drawSectionHeader(page2, rightX, ry, 'Clocks & Progress Tracks', rightW);
  page2.drawText('4=SHORT  6=STANDARD  8=LONG', { x: rightX + rightW - 155, ry, size: 6, font: courier, color: GRAY });

  for (let i = 0; i < 6; i++) {
    ry -= 36;
    drawBox(page2, rightX, ry, rightW, 30);
    drawLabel(page2, rightX + 4, ry + 20, 'Clock Name');
    drawFieldLine(page2, rightX + 56, ry + 20, rightW * 0.5);
    drawCheckboxRow(page2, rightX + 4, ry + 2, 8, 11, 4);
    page2.drawText('THREAT / PROGRESS', { x: rightX + 4 + 8*15 + 6, y: ry + 5, size: 5.5, font: courier, color: GRAY });
  }

  // ── BURDEN & TRACKS ──
  ry -= 28;
  drawSectionHeader(page2, rightX, ry, 'Burden & Resource Tracks', rightW);

  ry -= 16;
  drawLabel(page2, rightX, ry + 6, 'Burden');
  const burdenLabels = ['0', '1', '2', '3', '4'];
  burdenLabels.forEach((b, i) => {
    const bx = rightX + 40 + i * 30;
    drawBox(page2, bx, ry, 24, 14);
    page2.drawText(b, { x: bx + 10, y: ry + 3, size: 8, font: courierBold, color: BLACK });
  });

  ry -= 20;
  drawLabel(page2, rightX, ry + 6, 'Supply Die');
  drawBox(page2, rightX + 56, ry, 40, 14);
  drawBoldValue(page2, rightX + 62, ry + 3, charData.supply, 9);
  page2.drawText('ROLL ON USE / 1-2 SHRINKS', { x: rightX + 102, y: ry + 4, size: 5.5, font: courier, color: GRAY });

  ry -= 20;
  drawLabel(page2, rightX, ry + 6, 'Momentum');
  drawCheckboxRow(page2, rightX + 56, ry, 5, 14, 5);
  page2.drawText('CAP 5 / RESETS EACH SESSION', { x: rightX + 56 + 5*19 + 6, y: ry + 4, size: 5.5, font: courier, color: GRAY });

  // ── HUMANITY CLOCK ──
  ry -= 22;
  drawLabel(page2, rightX, ry + 6, 'Humanity Clock');
  drawCheckboxRow(page2, rightX + 80, ry, 8, 11, 4);
  page2.drawText('STD=1 MIL=2 EXP=3', { x: rightX + 80 + 8*15 + 6, y: ry + 4, size: 5.5, font: courier, color: GRAY });

  // ── SCARS ──
  ry -= 24;
  drawSectionHeader(page2, rightX, ry, 'Scars', rightW);
  page2.drawText('STEP A DIE DOWN WHEN TRIGGERED', { x: rightX + rightW - 170, ry, size: 6, font: courier, color: GRAY });
  for (let i = 0; i < 3; i++) {
    ry -= 18;
    drawFilledBox(page2, rightX, ry, rightW, 14, rgb(0.96, 0.96, 0.96));
    drawBox(page2, rightX, ry, rightW, 14);
  }

  // ── QUICK REFERENCE ──
  ry -= 26;
  drawSectionHeader(page2, rightX, ry, 'Quick Reference', rightW);

  const refs = [
    ['THE CHECK', 'Attr x2. 5+ = Pass. Both = Full Hit. One = Twist. 0 = Miss.'],
    ['SPARK', 'Max face on Full Hit. Bonus effect.'],
    ['CATASTROPHE', 'Double 1s. New bad direction.'],
    ['PERFECT', 'Double max. Extraordinary.'],
    ['ATTACK', 'Full Hit: wpn x2 take higher. Twist: wpn x1.'],
    ['THRESHOLDS', 'Base: <4 Minor(1), 4+ Major(2), 8+ Severe(3). Armor raises both.'],
    ['ARMOR', 'None +0(4/8) Light +2(6/10) Med +3(7/11) Heavy +4(8/12)'],
    ['MOMENTUM', 'Step Up(1) Flash(1) Mitigate(1) Defy(2) Auth(2) Refuse(3)'],
    ['PREP', 'Full Hit=2, Twist=1+comp, Miss=0. Boost/Flash/Mitigate(1) Absorb(2)'],
    ['HELIX', 'Hook > Explore > Leverage(SWAP) > Ignite > Exhale'],
  ];

  refs.forEach(([label, desc]) => {
    ry -= 11;
    page2.drawText(label, { x: rightX, y: ry, size: 5.5, font: courierBold, color: BLACK });
    page2.drawText(desc, { x: rightX + 68, y: ry, size: 5, font: courier, color: GRAY });
  });

  // Footer
  page2.drawText('HELIX: NEON HORIZON  /  V0.4 PLAYTEST  /  CHARACTER SHEET PAGE 2', {
    x: W/2 - courier.widthOfTextAtSize('HELIX: NEON HORIZON  /  V0.4 PLAYTEST  /  CHARACTER SHEET PAGE 2', 5.5)/2,
    y: 20, size: 5.5, font: courier, color: GRAY
  });


  // ═══ SAVE ═══
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${charData.name || 'neon-horizon'}_character_sheet.pdf`.replace(/\s+/g, '_').toLowerCase();
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

exportBtn.addEventListener('click', generateCharacterPDF);

// ─── AUGMENT FILTER TABS ───
document.querySelectorAll('.aug-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.aug-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const type = tab.dataset.augtype;
    document.querySelectorAll('.aug-card').forEach(card => {
      if (type === 'all' || card.dataset.augtype === type) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
