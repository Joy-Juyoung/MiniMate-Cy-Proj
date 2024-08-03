export const openPopup = (url, popupRef, userRef, mateRef) => {
  const popupWidth = 1100;
  const popupHeight = 600;

  const screenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screen.left;
  const screenTop =
    window.screenTop !== undefined ? window.screenTop : window.screen.top;

  const screenWidth = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : window.screen.width;

  const left = screenLeft + screenWidth / 2 - popupWidth / 2;
  const top = screenTop + 0;

  const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top}`;

  if (!popupRef.current || popupRef.current.closed) {
    popupRef.current = window.open(url, "_blank", popupFeatures);
  } else {
    popupRef.current.focus();
  }

  if (!userRef.current || userRef.current.closed) {
    userRef.current = window.open(url, "_blank", popupFeatures);
  } else {
    userRef.current.focus();
  }

  if (!mateRef.current || mateRef.current.closed) {
    mateRef.current = window.open(url, "_blank", popupFeatures);
  } else {
    mateRef.current.focus();
  }
};
