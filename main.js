(function () {
  const content = document.getElementById('content');
  const audios = ['audio1', 'audio2', 'audio3'].map(id => document.getElementById(id));

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

  function setupVolumes() {
    const controls = document.createElement('div');
    audios.forEach((audio, index) => {
      const label = document.createElement('label');
      label.textContent = `Audio ${index + 1} volume:`;
      const input = document.createElement('input');
      input.type = 'range';
      input.min = 0;
      input.max = 1;
      input.step = 0.01;
      input.value = audio.volume;
      input.addEventListener('input', () => {
        audio.volume = input.value;
      });
      label.appendChild(input);
      controls.appendChild(label);
      controls.appendChild(document.createElement('br'));
    });
    document.body.appendChild(controls);
  }

  function handleClicks() {
    document.addEventListener('click', () => {
      clickCount += 1;
      if (clickCount === 20) {
        const notice = document.createElement('p');
        notice.textContent = 'Stop clicking.';
        content.appendChild(notice);
      }
    });
  }

  function showMessage() {
    const message = document.createElement('p');
    message.textContent = 'Hello!';
    content.appendChild(message);
  }

  window.addEventListener('load', () => {
    playAll();
    setupVolumes();
    handleClicks();
    setTimeout(showMessage, 10000);
  });
})();