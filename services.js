(() => {
  'use strict';

  const positions = [
  {
    "id": "01",
    "name": "Toàn bộ mặt trước",
    "group": "front",
    "description": "Bố cục thêu lớn trải trên phần thân trước áo.",
    "shape": "<rect x=\"124\" y=\"97\" width=\"112\" height=\"170\" rx=\"2\"/>"
  },
  {
    "id": "02",
    "name": "Lớn mặt trước",
    "group": "front",
    "description": "Thiết kế cỡ lớn tập trung ở trung tâm mặt trước.",
    "shape": "<rect x=\"143\" y=\"103\" width=\"75\" height=\"96\" rx=\"2\"/>"
  },
  {
    "id": "03",
    "name": "Giữa ngực",
    "group": "front",
    "description": "Hình hoặc chữ nhỏ, đặt ở giữa ngực áo.",
    "shape": "<rect x=\"166\" y=\"109\" width=\"32\" height=\"32\" rx=\"2\"/>"
  },
  {
    "id": "04",
    "name": "Ngang ngực",
    "group": "front",
    "description": "Câu chữ hoặc bố cục trải ngang phần ngực.",
    "shape": "<rect x=\"125\" y=\"114\" width=\"111\" height=\"23\" rx=\"2\"/>"
  },
  {
    "id": "05",
    "name": "Ngực phải",
    "group": "front",
    "description": "Chi tiết nhỏ ở ngực phải, tính theo phía người mặc.",
    "shape": "<rect x=\"128\" y=\"108\" width=\"27\" height=\"27\" rx=\"2\"/>"
  },
  {
    "id": "06",
    "name": "Ngực trái",
    "group": "front",
    "description": "Logo, tên hoặc hình nhỏ ở ngực trái, tính theo phía người mặc.",
    "shape": "<rect x=\"208\" y=\"108\" width=\"27\" height=\"27\" rx=\"2\"/>"
  },
  {
    "id": "07",
    "name": "Tay phải",
    "group": "sleeve",
    "description": "Hình hoặc chữ trên tay áo phải của người mặc.",
    "shape": "<path d=\"M57 94 80 82 94 106 69 121Z\"/>"
  },
  {
    "id": "08",
    "name": "Tay trái",
    "group": "sleeve",
    "description": "Hình hoặc chữ trên tay áo trái của người mặc.",
    "shape": "<path d=\"M266 106 280 82 303 94 291 121Z\"/>"
  },
  {
    "id": "09",
    "name": "Dọc bên phải",
    "group": "front",
    "description": "Bố cục chạy dọc thân trước, phía bên phải người mặc.",
    "shape": "<rect x=\"127\" y=\"92\" width=\"21\" height=\"175\" rx=\"2\"/>"
  },
  {
    "id": "10",
    "name": "Dọc bên trái",
    "group": "front",
    "description": "Bố cục chạy dọc thân trước, phía bên trái người mặc.",
    "shape": "<rect x=\"215\" y=\"92\" width=\"21\" height=\"175\" rx=\"2\"/>"
  },
  {
    "id": "11",
    "name": "Lai trước bên phải",
    "group": "front",
    "description": "Chi tiết nhỏ sát lai trước, phía bên phải người mặc.",
    "shape": "<rect x=\"122\" y=\"286\" width=\"42\" height=\"22\" rx=\"2\"/>"
  },
  {
    "id": "12",
    "name": "Lai trước bên trái",
    "group": "front",
    "description": "Chi tiết nhỏ sát lai trước, phía bên trái người mặc.",
    "shape": "<rect x=\"198\" y=\"286\" width=\"42\" height=\"22\" rx=\"2\"/>"
  },
  {
    "id": "13",
    "name": "Toàn bộ mặt sau",
    "group": "back",
    "description": "Bố cục thêu lớn trải trên phần lưng áo.",
    "shape": "<rect x=\"124\" y=\"97\" width=\"112\" height=\"170\" rx=\"2\"/>"
  },
  {
    "id": "14",
    "name": "Lớn mặt sau",
    "group": "back",
    "description": "Thiết kế cỡ lớn tập trung ở trung tâm lưng áo.",
    "shape": "<rect x=\"143\" y=\"87\" width=\"75\" height=\"96\" rx=\"2\"/>"
  },
  {
    "id": "15",
    "name": "Sau gáy (phía trong)",
    "group": "back",
    "description": "Chi tiết nhỏ phía trong áo, ngay dưới cổ sau.",
    "shape": "<rect x=\"169\" y=\"65\" width=\"22\" height=\"22\" rx=\"2\"/>"
  },
  {
    "id": "16",
    "name": "Ngang vai sau",
    "group": "back",
    "description": "Câu chữ hoặc bố cục chạy ngang phần vai sau.",
    "shape": "<rect x=\"129\" y=\"92\" width=\"103\" height=\"24\" rx=\"2\"/>"
  }
];
  const services = { polo: 'Áo polo', uniform: 'Áo đồng phục', couple: 'Áo đôi' };
  let selectedService = 'polo';
  let selectedColor = 'white';
  let selectedPosition = '06';
  const section = document.querySelector('#services');
  const tabs = [...document.querySelectorAll('[data-service-tab]')];
  const panels = [...document.querySelectorAll('[data-service-panel]')];
  const summary = document.querySelector('#consultationSummary');
  const status = document.querySelector('#consultationStatus');

  const currentPosition = () => positions.find((position) => position.id === selectedPosition);
  const updateSummary = () => {
    const parts = [services[selectedService]];
    if (selectedService === 'polo') parts.push(selectedColor === 'white' ? 'Trắng' : 'Đen');
    parts.push(currentPosition().name);
    if (summary) summary.textContent = parts.join(' · ');
    if (status) status.textContent = '';
  };

  if (section && tabs.length === 3 && panels.length === 3) {
    const selectService = (name, moveFocus = false) => {
      if (!services[name]) return;
      selectedService = name;
      tabs.forEach((tab) => {
        const selected = tab.dataset.serviceTab === name;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        if (selected && moveFocus) tab.focus();
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.servicePanel !== name;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', 'tab-' + panel.dataset.servicePanel);
        panel.tabIndex = 0;
      });
      updateSummary();
    };

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectService(tab.dataset.serviceTab));
      tab.addEventListener('keydown', (event) => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        selectService(tabs[next].dataset.serviceTab, true);
      });
    });
    selectService('polo');
    section.classList.add('is-enhanced');
    section.querySelector('.service-tabs').hidden = false;
  }

  const poloPreview = document.querySelector('#poloPreview');
  const poloNote = document.querySelector('#poloColorNote');
  const swatches = [...document.querySelectorAll('[data-polo-color]')];
  if (poloPreview && poloNote && swatches.length) {
    swatches.forEach((button) => {
      button.addEventListener('click', () => {
        selectedColor = button.dataset.poloColor;
        if (!['white', 'black'].includes(selectedColor)) return;
        poloPreview.src = 'assets/services/polo-' + selectedColor + '.webp';
        poloPreview.srcset = 'assets/services/polo-' + selectedColor + '-520.webp 520w, assets/services/polo-' + selectedColor + '.webp 1000w';
        poloPreview.alt = selectedColor === 'white'
          ? 'Gợi ý phôi áo polo trắng trên ba ma-nơ-canh'
          : 'Ảnh phối màu tham khảo: ba áo polo đen trên ma-nơ-canh';
        poloNote.textContent = selectedColor === 'white'
          ? 'Ảnh minh họa phôi áo polo trắng. Phom áo và màu thực tế được xác nhận khi tư vấn.'
          : 'Màu đen là ảnh phối màu tham khảo từ mẫu polo trắng. Màu thực tế được xác nhận khi tư vấn.';
        swatches.forEach((swatch) => swatch.setAttribute('aria-pressed', String(swatch === button)));
        updateSummary();
      });
    });
    document.querySelector('.polo-colors').hidden = false;
  }

  const placementUI = document.querySelector('.placement-interactive');
  const highlight = document.querySelector('#placementHighlight');
  const neck = document.querySelector('#placementNeck');
  const picker = document.querySelector('#placementSelect');
  const radioButtons = [...document.querySelectorAll('[name="embroidery-position"]')];
  if (placementUI && highlight && neck && picker && radioButtons.length === 16) {
    const selectPosition = (id) => {
      const position = positions.find((item) => item.id === id);
      if (!position) return;
      selectedPosition = id;
      // Shapes come exclusively from the static guide above, never from user input.
      highlight.innerHTML = position.shape;
      const back = position.group === 'back';
      neck.setAttribute('d', back ? 'M142 48 Q180 70 218 48' : 'M142 48 Q180 97 218 48');
      document.querySelector('#placementSvgTitle').textContent = 'Minh họa vị trí thêu: ' + position.name;
      document.querySelector('#placementView').textContent = back ? 'Mặt sau' : 'Mặt trước';
      document.querySelector('#placementName').textContent = position.id + ' / ' + position.name;
      document.querySelector('#placementDescription').textContent = position.description;
      radioButtons.forEach((radio) => { radio.checked = radio.value === id; });
      picker.value = id;
      updateSummary();
    };
    radioButtons.forEach((radio) => radio.addEventListener('change', () => selectPosition(radio.value)));
    picker.addEventListener('change', () => selectPosition(picker.value));
    selectPosition('06');
    placementUI.hidden = false;
    document.querySelector('.positions-fallback').hidden = true;
    document.querySelector('.consultation-brief').hidden = false;
  }

  const copyButton = document.querySelector('#copyConsultation');
  if (copyButton && status) {
    copyButton.addEventListener('click', async () => {
      const lines = [
        'Chào ATUS, mình muốn được tư vấn thiết kế mẫu thêu và thêu theo yêu cầu.',
        'Loại áo: ' + services[selectedService] + '.'
      ];
      if (selectedService === 'polo') lines.push('Màu áo tham khảo: ' + (selectedColor === 'white' ? 'Trắng' : 'Đen') + '.');
      const position = currentPosition();
      lines.push('Vị trí thêu: ' + position.id + ' / ' + position.name + '.');
      lines.push('Mình sẽ gửi thêm hình tham khảo, số lượng và ngày cần áo để ATUS tư vấn, báo giá.');
      const brief = lines.join('\n');
      let copied = false;
      try {
        await navigator.clipboard.writeText(brief);
        copied = true;
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = brief;
        textarea.setAttribute('aria-label', 'Nội dung yêu cầu tư vấn');
        textarea.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0';
        document.body.append(textarea);
        textarea.select();
        try { copied = document.execCommand('copy'); } catch { copied = false; }
        textarea.remove();
        copyButton.focus({ preventScroll: true });
      }
      status.textContent = copied
        ? 'Đã sao chép yêu cầu. Mở Zalo và dán nội dung để gửi cho ATUS.'
        : 'Bạn có thể chọn và sao chép nội dung này để gửi qua Zalo:\n' + brief;
    });
  }
})();
