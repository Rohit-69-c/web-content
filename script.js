(() => {
  const rawUrl = window.location.href;
  const ensureClickableUrl = (url) => {
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url.replace(/^\/+/, "")}`;
  };
  const clickableUrl = ensureClickableUrl(rawUrl);
  const pageUrl = encodeURIComponent(clickableUrl);
  const pageTitle = encodeURIComponent(document.title);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${pageTitle}%0A${pageUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`,
    gmail: `mailto:?subject=${pageTitle}&body=${pageTitle}%0A${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${pageTitle}`,
  };

  document.querySelectorAll("[data-share]").forEach((el) => {
    const type = el.getAttribute("data-share");

    if (type === "copy") {
      el.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          el.textContent = "Copied!";
          setTimeout(() => {
            el.textContent = "Copy Link";
          }, 1500);
        } catch {
          alert("Copy failed. Please copy the URL from the browser.");
        }
      });
      return;
    }

    if (shareLinks[type]) {
      el.setAttribute("href", shareLinks[type]);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");
    }
  });
})();
