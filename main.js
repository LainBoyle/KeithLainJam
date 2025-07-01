(function () {
  const content = document.getElementById('content');
  const audios = ['bell', 'audio2', 'audio3'].map(id => document.getElementById(id));

  let clickCount = 0;

  function playAll() {
    audios.forEach(audio => {
      audio.volume = 0.5;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay might be blocked; ignore silently.
        });
      }
    });
  }


  function handleClicks() {
    document.addEventListener('click', () => {
      clickCount += 1;
      if (clickCount === 1) {
        playAll(); // Start audio on first click
      }
      else if (clickCount === 5) {
        showMessage('Stop clicking.');
      }
    });
  }

  function showMessage(text = 'Hello.') {
    const message = document.createElement('p');
    message.textContent = text;
    content.appendChild(message);

    setTimeout(() => {
      message.classList.add('fade-out');
      // Remove the element after fade-out transition (1s)
      setTimeout(() => {
        message.remove();
      }, 1000);
    }, 4000);
  }

  window.addEventListener('load', () => {
    handleClicks();
    playAll();
    setTimeout(showMessage, 10000);
  });
})();