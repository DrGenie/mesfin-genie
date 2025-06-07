document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navigation
  const mainNav = document.querySelector('.main-nav');
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('sticky', window.scrollY > 150);
  });

  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });

  // Load Theme Preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Publication Filter
  const pubSearch = document.getElementById('pub-search');
  const pubItems = document.querySelectorAll('.pub-item');
  const resetFilter = document.getElementById('reset-filter');

  pubSearch.addEventListener('input', () => {
    const query = pubSearch.value.toLowerCase();
    pubItems.forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  });

  resetFilter.addEventListener('click', () => {
    pubSearch.value = '';
    pubItems.forEach(item => item.style.display = '');
  });

  // Citation Chart
  const ctx = document.getElementById('citationChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
      datasets: [
        {
          label: 'Total Citations per Year',
          data: [50, 120, 200, 300, 450, 600, 700],
          fill: false,
          borderColor: '#005EB8',
          backgroundColor: '#005EB8',
          borderWidth: 2
        },
        {
          label: 'Field-Weighted Citation Impact',
          data: [1.8, 2.0, 2.2, 2.3, 2.5, 2.6, 2.7],
          fill: false,
          borderColor: '#0085CA',
          backgroundColor: '#0085CA',
          borderDash: [5, 5],
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#333' }
        },
        tooltip: {
          backgroundColor: '#2c3e50',
          titleColor: '#fff',
          bodyColor: '#fff'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Citations / Impact', color: '#333' },
          grid: { color: '#e0e0e0' },
          ticks: { color: '#333' }
        },
        x: {
          title: { display: true, text: 'Year', color: '#333' },
          grid: { color: '#e0e0e0' },
          ticks: { color: '#333' }
        }
      }
    }
  });

  // Calendly Widget
  Calendly.initInlineWidget({
    url: 'https://calendly.com/mesfin-genie/office-hours',
    parentElement: document.getElementById('calendly-widget'),
    prefill: {},
    utm: {}
  });

  // QR Code Generation (Placeholder - Replace with actual vCard data)
  const qrCode = new QRCode(document.querySelector('.qr-code'), {
    text: 'BEGIN:VCARD\nVERSION:3.0\nN:Genie;Mesfin;Dr\nORG:University of Newcastle\nTITLE:Lecturer in Health Economics\nEMAIL:mesfin.genie@newcastle.edu.au\nTEL:+61240551075\nURL:https://mesfin-genie.github.io\nEND:VCARD',
    width: 150,
    height: 150
  });
});
