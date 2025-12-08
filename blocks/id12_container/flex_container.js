// // FlexContainer 類別
// export class FlexContainer {
//   constructor(options = {}) {
//     this.options = {
//       mode: options.mode || 'split',
//       leftCols: options.leftCols || 6,
//       rightCols: options.rightCols || 6,
//       gap: options.gap || 0,
//       overlap: options.overlap || 0,
//       overlapDirection: options.overlapDirection || 'right'
//     };
//
//     this.element = null;
//   }
//
//   create() {
//     const container = document.createElement('div');
//     container.className = `flex-container flex-container--${this.options.mode}`;
//
//     if (this.options.mode === 'split') {
//       container.style.gap = `${this.options.gap}px`;
//     }
//
//     this.element = container;
//     return container;
//   }
//
//   addColumn(columnOptions = {}) {
//     if (!this.element) this.create();
//
//     const column = new FlexColumn({
//       ...columnOptions,
//       containerMode: this.options.mode,
//       leftCols: this.options.leftCols,
//       rightCols: this.options.rightCols,
//       overlap: this.options.overlap,
//       overlapDirection: this.options.overlapDirection
//     });
//
//     this.element.appendChild(column.create());
//     return column;
//   }
// }
//
// // FlexColumn 類別
// class FlexColumn {
//   constructor(options = {}) {
//     this.options = {
//       position: options.position || 'left',
//       bleed: options.bleed || 'none',
//       bleedAmount: options.bleedAmount || 0,
//       overflow: options.overflow || 'visible',
//       verticalAlign: options.verticalAlign || 'top',
//       containerMode: options.containerMode || 'split',
//       leftCols: options.leftCols || 6,
//       rightCols: options.rightCols || 6,
//       overlap: options.overlap || 0,
//       overlapDirection: options.overlapDirection || 'right'
//     };
//
//     this.element = null;
//   }
//
//   create() {
//     const column = document.createElement('div');
//     column.className = `flex-column flex-column--${this.options.position}`;
//
//     // 設定垂直對齊
//     if (this.options.verticalAlign === 'center') {
//       column.classList.add('flex-column--center');
//     } else if (this.options.verticalAlign === 'bottom') {
//       column.classList.add('flex-column--bottom');
//     }
//
//     // 設定寬度
//     if (this.options.containerMode === 'split') {
//       const cols = this.options.position === 'left' ? this.options.leftCols : this.options.rightCols;
//       column.style.width = `${(cols / 12) * 100}%`;
//     } else {
//       this.applyOverlayStyles(column);
//     }
//
//     // 設定 bleed 效果
//     this.applyBleedStyles(column);
//
//     // 設定 overflow
//     column.style.overflow = this.options.overflow;
//
//     // 建立內容容器
//     const inner = document.createElement('div');
//     inner.className = 'flex-column__inner';
//     column.appendChild(inner);
//
//     this.element = column;
//     this.innerElement = inner;
//     return column;
//   }
//
//   applyOverlayStyles(column) {
//     const leftWidth = (this.options.leftCols / 12) * 100;
//     const rightWidth = (this.options.rightCols / 12) * 100;
//
//     column.style.position = 'absolute';
//
//     if (this.options.position === 'left') {
//       column.style.left = '0';
//       column.style.width = `${leftWidth}%`;
//       column.style.zIndex = this.options.overlapDirection === 'left' ? '2' : '1';
//     } else {
//       const rightOffset = this.options.overlapDirection === 'right'
//         ? leftWidth - this.options.overlap
//         : leftWidth;
//       column.style.left = `${rightOffset}%`;
//       column.style.width = `${rightWidth}%`;
//       column.style.zIndex = this.options.overlapDirection === 'right' ? '2' : '1';
//     }
//   }
//
//   applyBleedStyles(column) {
//     const {bleed, bleedAmount} = this.options;
//
//     if (bleed === 'left' || bleed === 'both') {
//       column.style.marginLeft = `-${bleedAmount}px`;
//       column.style.paddingLeft = `${bleedAmount}px`;
//     }
//
//     if (bleed === 'right' || bleed === 'both') {
//       column.style.marginRight = `-${bleedAmount}px`;
//       column.style.paddingRight = `${bleedAmount}px`;
//     }
//   }
//
//   setContent(content) {
//     if (this.innerElement) {
//       if (typeof content === 'string') {
//         this.innerElement.innerHTML = content;
//       } else {
//         this.innerElement.appendChild(content);
//       }
//     }
//   }
// }
//
// // 應用程式狀態
// const state = {
//   mode: 'split',
//   leftCols: 6,
//   rightCols: 6,
//   gap: 20,
//   overlap: 0,
//   overlapDirection: 'right',
//   leftBleed: 'none',
//   leftBleedAmount: 0,
//   rightBleed: 'none',
//   rightBleedAmount: 0,
//   leftOverflow: 'visible',
//   rightOverflow: 'visible',
//   currentPreset: 'basic'
// };
//
// // 預設配置
// const presets = {
//   basic: {
//     name: '基礎 6-6 分割',
//     mode: 'split',
//     leftCols: 6,
//     rightCols: 6,
//     gap: 20,
//     overlap: 0,
//     overlapDirection: 'right',
//     leftBleed: 'none',
//     leftBleedAmount: 0,
//     rightBleed: 'none',
//     rightBleedAmount: 0,
//     leftOverflow: 'visible',
//     rightOverflow: 'visible'
//   },
//   overlay75: {
//     name: '7-5 重疊',
//     mode: 'overlay',
//     leftCols: 7,
//     rightCols: 5,
//     gap: 0,
//     overlap: 20,
//     overlapDirection: 'right',
//     leftBleed: 'none',
//     leftBleedAmount: 0,
//     rightBleed: 'none',
//     rightBleedAmount: 0,
//     leftOverflow: 'visible',
//     rightOverflow: 'visible'
//   },
//   bleedLeft: {
//     name: '左側圖片突出',
//     mode: 'split',
//     leftCols: 7,
//     rightCols: 5,
//     gap: 20,
//     overlap: 0,
//     overlapDirection: 'right',
//     leftBleed: 'left',
//     leftBleedAmount: 60,
//     rightBleed: 'none',
//     rightBleedAmount: 0,
//     leftOverflow: 'hidden',
//     rightOverflow: 'visible'
//   },
//   fullOverlay: {
//     name: '100% 重疊',
//     mode: 'overlay',
//     leftCols: 12,
//     rightCols: 12,
//     gap: 0,
//     overlap: 100,
//     overlapDirection: 'right',
//     leftBleed: 'none',
//     leftBleedAmount: 0,
//     rightBleed: 'none',
//     rightBleedAmount: 0,
//     leftOverflow: 'visible',
//     rightOverflow: 'visible'
//   },
//   asymmetric: {
//     name: '非對稱佈局',
//     mode: 'split',
//     leftCols: 8,
//     rightCols: 4,
//     gap: 30,
//     overlap: 0,
//     overlapDirection: 'right',
//     leftBleed: 'both',
//     leftBleedAmount: 40,
//     rightBleed: 'none',
//     rightBleedAmount: 0,
//     leftOverflow: 'hidden',
//     rightOverflow: 'visible'
//   }
// };
//
// // 渲染預設按鈕
// function renderPresetButtons() {
//   const container = document.getElementById('presetButtons');
//   container.innerHTML = '';
//
//   Object.entries(presets).forEach(([key, preset]) => {
//     const btn = document.createElement('button');
//     btn.className = 'preset-btn';
//     btn.textContent = preset.name;
//     if (state.currentPreset === key) {
//       btn.classList.add('active');
//     }
//     btn.onclick = () => applyPreset(key);
//     container.appendChild(btn);
//   });
// }
//
// // 應用預設
// function applyPreset(presetKey) {
//   const preset = presets[presetKey];
//   Object.assign(state, preset);
//   state.currentPreset = presetKey;
//   renderAll();
// }
//
// // 渲染控制面板
// function renderControls() {
//   const container = document.getElementById('controls');
//   container.innerHTML = '';
//
//   // 佈局模式
//   container.appendChild(createSelect('佈局模式', 'mode', [
//     {value: 'split', label: 'Split (分割)'},
//     {value: 'overlay', label: 'Overlay (重疊)'}
//   ]));
//
//   // 左欄位數
//   container.appendChild(createRange('左欄位數', 'leftCols', 1, 12));
//
//   // 右欄位數
//   container.appendChild(createRange('右欄位數', 'rightCols', 1, 12));
//
//   // 間距（僅 split 模式）
//   if (state.mode === 'split') {
//     container.appendChild(createRange('間距', 'gap', 0, 100, 'px'));
//   }
//
//   // 重疊相關（僅 overlay 模式）
//   if (state.mode === 'overlay') {
//     container.appendChild(createRange('重疊比例', 'overlap', 0, 100, '%'));
//     container.appendChild(createSelect('重疊方向', 'overlapDirection', [
//       {value: 'right', label: '右欄在上'},
//       {value: 'left', label: '左欄在上'}
//     ]));
//   }
//
//   // 左欄突出
//   container.appendChild(createSelect('左欄突出', 'leftBleed', [
//     {value: 'none', label: '無'},
//     {value: 'left', label: '左側'},
//     {value: 'right', label: '右側'},
//     {value: 'both', label: '雙側'}
//   ]));
//
//   // 左欄突出距離
//   if (state.leftBleed !== 'none') {
//     container.appendChild(createRange('左欄突出距離', 'leftBleedAmount', 0, 200, 'px'));
//   }
//
//   // 左欄溢出
//   container.appendChild(createSelect('左欄溢出', 'leftOverflow', [
//     {value: 'visible', label: '可見'},
//     {value: 'hidden', label: '隱藏'}
//   ]));
// }
//
// // 建立下拉選單
// function createSelect(label, key, options) {
//   const group = document.createElement('div');
//   group.className = 'control-group';
//
//   const labelEl = document.createElement('label');
//   labelEl.textContent = label;
//   group.appendChild(labelEl);
//
//   const select = document.createElement('select');
//   select.value = state[key];
//   select.onchange = (e) => {
//     state[key] = e.target.value;
//     state.currentPreset = 'custom';
//     renderAll();
//   };
//
//   options.forEach(opt => {
//     const option = document.createElement('option');
//     option.value = opt.value;
//     option.textContent = opt.label;
//     select.appendChild(option);
//   });
//
//   group.appendChild(select);
//   return group;
// }
//
// // 建立範圍滑桿
// function createRange(label, key, min, max, unit = '') {
//   const group = document.createElement('div');
//   group.className = 'control-group';
//
//   const labelEl = document.createElement('label');
//   labelEl.textContent = `${label}: ${state[key]}${unit}`;
//   group.appendChild(labelEl);
//
//   const range = document.createElement('input');
//   range.type = 'range';
//   range.min = min;
//   range.max = max;
//   range.value = state[key];
//   range.oninput = (e) => {
//     state[key] = parseInt(e.target.value);
//     labelEl.textContent = `${label}: ${state[key]}${unit}`;
//     state.currentPreset = 'custom';
//     renderPreview();
//     updateCode();
//     updatePreviewLabel();
//   };
//
//   group.appendChild(range);
//   return group;
// }
//
// // 渲染預覽
// function renderPreview() {
//   const container = document.getElementById('preview');
//   container.innerHTML = '';
//
//   const flexContainer = new FlexContainer({
//     mode: state.mode,
//     leftCols: state.leftCols,
//     rightCols: state.rightCols,
//     gap: state.gap,
//     overlap: state.overlap,
//     overlapDirection: state.overlapDirection
//   });
//
//   const containerEl = flexContainer.create();
//
//   // 左欄
//   const leftCol = flexContainer.addColumn({
//     position: 'left',
//     bleed: state.leftBleed,
//     bleedAmount: state.leftBleedAmount,
//     overflow: state.leftOverflow,
//     verticalAlign: 'center'
//   });
//
//   const leftContent = document.createElement('div');
//   leftContent.className = 'demo-box demo-box--left';
//   leftContent.innerHTML = `
//                 <h2>左欄內容</h2>
//                 <p>可以放置圖片或任意元件</p>
//                 <div class="demo-info">
//                     Bleed: ${state.leftBleed}<br>
//                     Amount: ${state.leftBleedAmount}px<br>
//                     Overflow: ${state.leftOverflow}
//                 </div>
//             `;
//   leftCol.setContent(leftContent);
//
//   // 右欄
//   const rightCol = flexContainer.addColumn({
//     position: 'right',
//     bleed: state.rightBleed,
//     bleedAmount: state.rightBleedAmount,
//     overflow: state.rightOverflow,
//     verticalAlign: 'center'
//   });
//
//   const rightContent = document.createElement('div');
//   rightContent.className = 'demo-box demo-box--right';
//   rightContent.innerHTML = `
//                 <h2>右欄內容</h2>
//                 <p>可以放置文字或卡片</p>
//             `;
//   rightCol.setContent(rightContent);
//
//   container.appendChild(containerEl);
// }
//
// // 更新預覽標籤
// function updatePreviewLabel() {
//   const label = document.getElementById('previewLabel');
//   if (state.mode === 'split') {
//     label.textContent = `${state.leftCols}-${state.rightCols} Split`;
//   } else {
//     label.textContent = `${state.leftCols}-${state.rightCols} Overlay ${state.overlap}%`;
//   }
// }
//
// // 更新程式碼展示
// function updateCode() {
//   const code = document.getElementById('codeDisplay');
//   const modeSpecific = state.mode === 'split'
//     ? `gap: ${state.gap}`
//     : `overlap: ${state.overlap},\n  overlapDirection: '${state.overlapDirection}'`;
//
//   code.textContent = `const container = new FlexContainer({
//   mode: '${state.mode}',
//   leftCols: ${state.leftCols},
//   rightCols: ${state.rightCols},
//   ${modeSpecific}
// });
//
// const leftColumn = container.addColumn({
//   position: 'left',
//   bleed: '${state.leftBleed}',
//   bleedAmount: ${state.leftBleedAmount},
//   overflow: '${state.leftOverflow}'
// });
//
// const rightColumn = container.addColumn({
//   position: 'right',
//   bleed: '${state.rightBleed}',
//   bleedAmount: ${state.rightBleedAmount},
//   overflow: '${state.rightOverflow}'
// });
//
// // 設定內容
// leftColumn.setContent(yourLeftContent);
// rightColumn.setContent(yourRightContent);
//
// // 加入到頁面
// document.getElementById('container').appendChild(container.element);`;
// }
//
// // 渲染所有內容
// function renderAll() {
//   renderPresetButtons();
//   renderControls();
//   renderPreview();
//   updateCode();
//   updatePreviewLabel();
// }
//
// // 初始化
// renderAll();
