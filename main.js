(function () {
  const content = document.getElementById('content');
    const audios = ['bell', 'around', 'the', 'up'].map(id => document.getElementById(id));
    let pressedE = false;

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

    function handleKeyPresses() {
        document.addEventListener('keydown', (event) => {
            const key = event.key.toLowerCase();
            if (key === 'e' && !pressedE) {
                showMessage('Very good.');
                pressedE = true;
                const body = document.body;
                body.style.backgroundImage = "url('assets/monster.webp')";
                body.style.backgroundSize = 'cover';
                body.style.backgroundPosition = 'center';
                body.style.backgroundRepeat = 'no-repeat';
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
    handleKeyPresses();
    playAll();
    setTimeout(showMessage, 10000);
    setTimeout(() => {
        if (!pressedE){
            showMessage('Press E to continue.');
        }
    }, 20000);
  });
})();