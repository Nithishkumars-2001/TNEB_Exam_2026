/* TNEB Exam Guide — shared behaviour */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Q&A accordion (event delegation, works for any count) ---------- */
  document.querySelectorAll('.qa-list').forEach(function (list) {
    list.addEventListener('click', function (e) {
      var btn = e.target.closest('.qa-q');
      if (!btn) return;
      var item = btn.closest('.qa-item');
      var ans = item.querySelector('.qa-a');
      var isOpen = item.classList.contains('open');

      // close others in the same list for a cleaner reading flow
      list.querySelectorAll('.qa-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.qa-a').style.maxHeight = null;
          openItem.querySelector('.qa-q').setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        ans.style.maxHeight = null;
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        ans.style.maxHeight = ans.scrollHeight + 40 + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Live search / filter across Q&A ---------- */
  document.querySelectorAll('[data-qa-search]').forEach(function (input) {
    var listId = input.getAttribute('data-qa-search');
    var list = document.getElementById(listId);
    var counter = document.querySelector('[data-qa-count="' + listId + '"]');
    if (!list) return;
    var items = Array.from(list.querySelectorAll('.qa-item'));
    var total = items.length;

    function runFilter() {
      var term = input.value.trim().toLowerCase();
      var visible = 0;
      items.forEach(function (item) {
        var text = item.textContent.toLowerCase();
        var match = term === '' || text.indexOf(term) !== -1;
        item.setAttribute('data-hidden', match ? 'false' : 'true');
        if (match) visible++;
      });
      if (counter) counter.textContent = visible + ' / ' + total + ' questions';
    }

    input.addEventListener('input', runFilter);
    runFilter();
  });

  /* ---------- Expand all / collapse all ---------- */
  document.querySelectorAll('[data-qa-expand]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = document.getElementById(btn.getAttribute('data-qa-expand'));
      if (!list) return;
      list.querySelectorAll('.qa-item').forEach(function (item) {
        item.classList.add('open');
        var ans = item.querySelector('.qa-a');
        ans.style.maxHeight = ans.scrollHeight + 40 + 'px';
        item.querySelector('.qa-q').setAttribute('aria-expanded', 'true');
      });
    });
  });
  document.querySelectorAll('[data-qa-collapse]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = document.getElementById(btn.getAttribute('data-qa-collapse'));
      if (!list) return;
      list.querySelectorAll('.qa-item.open').forEach(function (item) {
        item.classList.remove('open');
        item.querySelector('.qa-a').style.maxHeight = null;
        item.querySelector('.qa-q').setAttribute('aria-expanded', 'false');
      });
    });
  });

  /* ---------- Highlight active nav link based on current file ---------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-tneb .nav-link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Back to top button ---------- */
  var backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('show', window.scrollY > 400);
    });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Contact form (client-side only demo validation) ---------- */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var alertBox = document.getElementById('contactAlert');
      if (contactForm.checkValidity() === false) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }
      alertBox.classList.remove('d-none');
      alertBox.textContent = 'Thanks! Your message has been noted. Our team will get back to you shortly (demo form — no data is sent to a server).';
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }

  /* ---------- Newsletter form (footer) ---------- */
  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.newsletter-msg');
      if (msg) {
        msg.textContent = 'Subscribed! You will get study alerts on this device (demo only).';
        msg.classList.remove('d-none');
      }
      form.reset();
    });
  });

});
