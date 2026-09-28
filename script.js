const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const catalogToggle = document.querySelector('#catalogToggle');
const productGrid = document.querySelector('.product-grid');

catalogToggle?.addEventListener('click', () => {
  const expanded = productGrid.classList.toggle('expanded');
  catalogToggle.setAttribute('aria-expanded', expanded);
  catalogToggle.innerHTML = expanded
    ? 'Thu gọn sản phẩm <span>↑</span>'
    : 'Xem tất cả 18 mẫu <span>↓</span>';
});
