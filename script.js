(() => {
  'use strict';

  document.documentElement.classList.add('js-ready');

  const header = document.querySelector('.site-header');
  const navigation = document.querySelector('#mainNav');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileViewport = window.matchMedia('(max-width: 900px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (header && navigation && menuToggle) {
    const setMenuOpen = (open, restoreFocus = false) => {
      const isOpen = open && mobileViewport.matches;
      navigation.classList.toggle('is-open', isOpen);
      navigation.hidden = mobileViewport.matches && !isOpen;
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
      document.body.classList.toggle('menu-open', isOpen);
      if (restoreFocus) menuToggle.focus({ preventScroll: true });
    };

    const syncMenuViewport = () => {
      menuToggle.hidden = !mobileViewport.matches;
      setMenuOpen(false);
    };

    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      setMenuOpen(open);
      if (open) navigation.querySelector('a')?.focus({ preventScroll: true });
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (!header.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false, true);
      }
    });

    mobileViewport.addEventListener('change', syncMenuViewport);
    syncMenuViewport();
  }

  const productGrid = document.querySelector('#productGrid');
  const catalogToggle = document.querySelector('#catalogToggle');
  const catalogCount = document.querySelector('#catalogCount');
  const filterGroup = document.querySelector('.catalog-filters');

  if (productGrid && catalogToggle && catalogCount && filterGroup) {
    const products = [...productGrid.querySelectorAll('.product-card')];
    const filterButtons = [...filterGroup.querySelectorAll('[data-filter]')];
    const initialLimit = 8;
    let selectedFilter = 'all';
    let expanded = false;

    const updateCatalog = () => {
      const matchingProducts = products.filter((product) => (
        selectedFilter === 'all' || product.dataset.category.split(/\s+/).includes(selectedFilter)
      ));
      const visibleProducts = new Set(expanded ? matchingProducts : matchingProducts.slice(0, initialLimit));

      products.forEach((product) => { product.hidden = !visibleProducts.has(product); });
      filterButtons.forEach((button) => {
        const active = button.dataset.filter === selectedFilter;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      productGrid.classList.toggle('is-expanded', expanded);
      catalogCount.textContent = 'Đang xem ' + visibleProducts.size + ' / ' + matchingProducts.length + ' mẫu';
      catalogToggle.hidden = matchingProducts.length <= initialLimit;
      catalogToggle.setAttribute('aria-expanded', String(expanded));
      const indicator = document.createElement('span');
      indicator.setAttribute('aria-hidden', 'true');
      indicator.textContent = expanded ? '−' : '+';
      catalogToggle.replaceChildren(
        expanded ? 'Thu gọn sản phẩm ' : 'Xem thêm ' + Math.max(0, matchingProducts.length - initialLimit) + ' mẫu ',
        indicator,
      );
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        selectedFilter = button.dataset.filter;
        expanded = false;
        updateCatalog();
      });
    });

    catalogToggle.addEventListener('click', () => {
      expanded = !expanded;
      updateCatalog();
      if (!expanded) {
        document.querySelector('#shop')?.scrollIntoView({
          behavior: reducedMotion.matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    });

    updateCatalog();
    filterGroup.hidden = false;
  }

  const dialog = document.querySelector('#productDialog');
  const dialogImage = document.querySelector('#dialogImage');
  const dialogTitle = document.querySelector('#dialogTitle');
  const dialogType = document.querySelector('#dialogType');
  const dialogShopLink = document.querySelector('#dialogShopLink');

  if (dialog && typeof dialog.showModal === 'function' && dialogImage && dialogTitle && dialogType && dialogShopLink) {
    let previousTrigger = null;
    let pointerStartedOnBackdrop = false;

    document.querySelectorAll('[data-quick-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const product = button.closest('.product-card');
        const image = product?.querySelector('.product-image');
        const shopLink = product?.querySelector('.product-heading a');
        if (!product || !image || !shopLink) return;

        previousTrigger = button;
        dialogImage.src = image.src;
        dialogImage.alt = image.alt;
        dialogImage.srcset = image.srcset;
        dialogImage.sizes = '(max-width: 700px) 90vw, 450px';
        dialogTitle.textContent = product.dataset.name;
        dialogType.textContent = product.querySelector('.product-type')?.textContent || '';
        dialogShopLink.href = shopLink.href;
        dialogShopLink.setAttribute('aria-label', 'Xem ' + product.dataset.name + ' trên Shopee');
        dialog.showModal();
        document.body.classList.add('modal-open');
      });
      button.hidden = false;
    });

    const isBackdrop = (event) => {
      if (event.target !== dialog) return false;
      const bounds = dialog.getBoundingClientRect();
      return event.clientX < bounds.left || event.clientX > bounds.right
        || event.clientY < bounds.top || event.clientY > bounds.bottom;
    };

    dialog.addEventListener('pointerdown', (event) => {
      pointerStartedOnBackdrop = isBackdrop(event);
    });

    dialog.addEventListener('click', (event) => {
      if (pointerStartedOnBackdrop && isBackdrop(event)) dialog.close();
      pointerStartedOnBackdrop = false;
    });

    // Native dialog handles Escape and focus trapping; all close paths share cleanup.
    dialog.addEventListener('close', () => {
      document.body.classList.remove('modal-open');
      pointerStartedOnBackdrop = false;
      previousTrigger?.focus({ preventScroll: true });
      previousTrigger = null;
    });
  }
})();
