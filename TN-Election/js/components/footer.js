// ============================================
// js/components/footer.js
//
// Shared footer markup for TN-Election pages.
// Injects the same footer into every page that includes
// <div id="footer-container"></div>.
// ============================================

function getFooterShareData() {
  const title = 'Tamil Nadu Legislative Election 2026';
  const description =
    document.querySelector('meta[property="og:description"]')?.content ||
    'Explore Tamil Nadu election updates and constituency details.';
  const url = 'https://www.bharathelection.com/';
  const shareText = `${title} - ${description}`;

  return {
    title,
    description,
    url,
    encodedUrl: encodeURIComponent(url),
    encodedTitle: encodeURIComponent(title),
    encodedShareText: encodeURIComponent(shareText),
  };
}

function getFooterIcon(name) {
  const icons = {
    facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M13.5 21v-7h2.3l.4-3h-2.7V9.1c0-.9.3-1.6 1.6-1.6H16V4.8c-.3 0-.9-.1-1.8-.1-2.6 0-4.2 1.6-4.2 4.4V11H7v3h3.1v7h3.4Z"/>
      </svg>
    `,
    instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3Zm0 1.8A3 3 0 0 0 4.8 7.8v8.4a3 3 0 0 0 3 3h8.4a3 3 0 0 0 3-3V7.8a3 3 0 0 0-3-3H7.8Zm8.85 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 1.8A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Z"/>
      </svg>
    `,
    linkedin: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M6.6 8.7a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM5 19V10h3.2v9H5Zm5.2 0V10h3.1v1.3h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V19h-3.2v-3.8c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V19h-3.2Z"/>
      </svg>
    `,
    whatsapp: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.8l1.7-4.8a8.5 8.5 0 1 1 15.8-4.2Zm-8.5-6.7a6.7 6.7 0 0 0-5.7 10.2l.3.5-1 2.8 2.9-.9.5.3A6.7 6.7 0 1 0 12 5.1Zm3.7 8.6c-.2-.1-1.1-.5-1.3-.6-.2-.1-.3-.1-.5.1l-.4.6c-.1.2-.3.2-.5.1a5.4 5.4 0 0 1-1.6-1 5.8 5.8 0 0 1-1.1-1.4c-.1-.2 0-.3.1-.4l.3-.4.2-.3a.4.4 0 0 0 0-.4c-.1-.1-.5-1.2-.7-1.6-.2-.4-.3-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.3 2.3 0 0 0-.7 1.7A4 4 0 0 0 9 13.3a9.2 9.2 0 0 0 3.6 3.1 8.4 8.4 0 0 0 1.2.5 3 3 0 0 0 1.4.1c.4 0 1.1-.5 1.3-1 .2-.6.2-1 .1-1 0-.1-.2-.2-.4-.3Z"/>
      </svg>
    `,
    x: `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M18.9 3H21l-4.6 5.3L21.8 21h-4.7l-3.7-4.8L9.2 21H7.1l5-5.8L2.2 3H7l3.4 4.5L14.4 3h4.5Zm-1.6 16.3H18L6 4.6H5.2l12.1 14.7Z"/>
      </svg>
    `,
  };

  return icons[name] || '';
}

function buildSocialShareLink(platform) {
  const share = getFooterShareData();

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${share.encodedUrl}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${share.encodedUrl}`;
    case 'whatsapp':
      return `https://wa.me/?text=${share.encodedShareText}%20${share.encodedUrl}`;
    case 'x':
      return `https://twitter.com/intent/tweet?text=${share.encodedTitle}&url=${share.encodedUrl}`;
    default:
      return '#';
  }
}

async function handleInstagramShare(event) {
  event.preventDefault();
  const share = getFooterShareData();

  if (navigator.share) {
    try {
      await navigator.share({
        title: share.title,
        text: share.description,
        url: share.url,
      });
      return;
    } catch (error) {
      if (error && error.name === 'AbortError') {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(share.url);
    window.alert('Link copied. You can now paste it on Instagram.');
  } catch (error) {
    window.prompt('Copy this link to share on Instagram:', share.url);
  }
}

function bindFooterInteractions(root) {
  const instagramButton = root.querySelector('[data-social="instagram"]');
  if (instagramButton) {
    instagramButton.addEventListener('click', handleInstagramShare);
  }
}

function buildFooter() {
  const footerHTML = `
    <div class="page-footer">
      <div class="page-footer__inner">
        <div class="page-footer__content">
          <p class="page-footer__copy">
            Crafted with <span class="page-footer__heart">&#10084;&#65039;</span> by <strong>Gradious</strong>
          </p>
          <p class="page-footer__description">
            Bharath Election 2026.com is a crowdsourced initiative for visualizing the 2026 Election details of Tamil Nadu state.
            It is not a source of data.
          </p>
          <div class="page-footer__builtby">
            <span>Built by</span>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28 0H0V12.5926C0.296296 23.6296 10.2222 26.963 14 28C26.7407 24.4444 27.5556 16.8889 28 12.5926V0Z" fill="#F55533"/>
              <path d="M8.14844 9.62958C8.14844 6.43861 10.7352 3.85181 13.9262 3.85181H19.704V9.62958C19.704 12.8206 17.1172 15.4074 13.9262 15.4074C10.7352 15.4074 8.14844 12.8206 8.14844 9.62958Z" fill="white"/>
              <path d="M16.4433 9.6296C16.4433 11.0205 15.3157 12.1481 13.9248 12.1481C12.5338 12.1481 11.4062 11.0205 11.4062 9.6296C11.4062 8.23866 12.5338 7.11108 13.9248 7.11108C15.3157 7.11108 16.4433 8.23866 16.4433 9.6296Z" fill="#F55533"/>
              <path d="M8.14844 20.4445C8.14844 18.5627 9.67399 17.0371 11.5558 17.0371H19.8521C19.8521 18.919 18.3266 20.4445 16.4447 20.4445H8.14844Z" fill="white"/>
            </svg>
            <span>Gradious</span>
          </div>
        </div>
        <div class="page-footer__brand">
          <a href="./index.html">
            <span style="display: block;">Home</span>
          </a>
          <a href="./candidates.html">
            <span style="display: block; margin-top: 8px;">Candidates</span>
          </a>
          <a href="./bigfights.html">
            <span style="display: block; margin-top: 8px">Big Fights</span>
          </a>
          <a href="./results.html">
            <span style="display: block; margin-top: 8px">2021 Results</span>
          </a>
        </div>
        <div class="page-footer__brand">
          <a href="./about.html">
            <span style="display: block;">About us</span>
          </a>
          <span style="display: block; margin-top: 8px;">Our Team</span>
          <a href="./disclaimer.html">
            <span style="display: block; margin-top: 8px; margin-bottom: 8px;">Disclaimer</span>
          </a>
          <div class="page-footer__social page-footer__social--disclaimer" aria-label="Share this page on social media">
            <a
              class="page-footer__social-link page-footer__social-link--facebook"
              href="${buildSocialShareLink('facebook')}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share this page on Facebook"
            >
              ${getFooterIcon('facebook')}
            </a>
            <a
              class="page-footer__social-link page-footer__social-link--instagram"
              href="#"
              data-social="instagram"
              aria-label="Share this page for Instagram"
            >
              ${getFooterIcon('instagram')}
            </a>
            <a
              class="page-footer__social-link page-footer__social-link--linkedin"
              href="${buildSocialShareLink('linkedin')}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share this page on LinkedIn"
            >
              ${getFooterIcon('linkedin')}
            </a>
            <a
              class="page-footer__social-link page-footer__social-link--whatsapp"
              href="${buildSocialShareLink('whatsapp')}"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share this page on WhatsApp"
            >
              ${getFooterIcon('whatsapp')}
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  const footerRoot = document.getElementById('footer-container');
  if (!footerRoot) {
    console.warn('footer.js: No element with id="footer-container" found.');
    return;
  }

  footerRoot.innerHTML = footerHTML;
  bindFooterInteractions(footerRoot);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildFooter);
} else {
  buildFooter();
}

