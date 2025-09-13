
document.addEventListener('DOMContentLoaded', function () {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.getElementById('envelope');
    const heartsContainer = document.getElementById('hearts-container');
    const floatingHearts = document.getElementById('floating-hearts');
    const fullscreenLetter = document.getElementById('fullscreen-letter');
    const closeBtn = document.getElementById('close-btn');
    const mainContainer = document.getElementById('main-container');
    const notification = document.getElementById('notification');

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }, 1000);
  
    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");
        star.textContent = "★"; // Estrella
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.fontSize = Math.random() * 30 + 20 + "px"; // Tamaños diferentes
        star.style.animationDuration = (Math.random() * 3 + 2) + "s";
        
        heartsContainer.appendChild(star);
      
        setTimeout(() => {
          star.remove();
        }, 5000);
      }
      
      // Estrellas flotantes
      function createFloatingStar() {
        const star = document.createElement("div");
        star.classList.add("star");
        star.textContent = "★";
        star.style.left = Math.random() * 100 + "vw";
        star.style.fontSize = Math.random() * 20 + 10 + "px";
      
        floatingHearts.appendChild(star);
      
        setTimeout(() => {
          star.remove();
        }, 4000);
      }
      setInterval(createStar, 800);
      setInterval(createFloatingStar, 1200);    

    function openEnvelope() {
        envelope.classList.add('open');
        mainContainer.classList.add('open-envelope');

        setTimeout(() => {
            fullscreenLetter.classList.add('active');
            document.body.style.overflow = 'hidden';
            createStarExplosion();
        }, 1000);

        createInitialHearts();
    }
    function closeFullscreenLetter() {
        fullscreenLetter.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            envelope.classList.remove('open');
            mainContainer.classList.remove('open-envelope');
        }, 300);
    }

    envelopeWrapper.addEventListener('click', openEnvelope);
    closeBtn.addEventListener('click', closeFullscreenLetter);

    fullscreenLetter.addEventListener('click', function (e) {
        if (e.target === fullscreenLetter) {
            closeFullscreenLetter();
        }
    });


        function createStarExplosion() {
            const explosionContainer = document.createElement('div');
            explosionContainer.style.position = 'fixed';
            explosionContainer.style.top = '50%';
            explosionContainer.style.left = '50%';
            explosionContainer.style.transform = 'translate(-50%, -50%)';
            explosionContainer.style.zIndex = '100';
            document.body.appendChild(explosionContainer);
        
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.innerHTML = '★'; // Estrella
                star.classList.add('star-explosion');
        
                // Ángulo y distancia aleatoria
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 300 + 150;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
        
                // Variables para la animación
                star.style.setProperty('--tx', tx + 'px');
                star.style.setProperty('--ty', ty + 'px');
        
                // Tamaño y color
                star.style.fontSize = (Math.random() * 20 + 14) + 'px';
                star.style.color = 'yellow';
        
                explosionContainer.appendChild(star);
            }
        
            setTimeout(() => {
                explosionContainer.remove();
            }, 1500);
        }
        

    const specialName = document.querySelector('.special-name');
    setInterval(() => {
        specialName.style.transform = `rotate(${Math.random() * 8 - 4}deg)`;
    }, 2000);

    createFloatingHearts();

    function playSound() {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(context.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(440, context.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0.3, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);

            oscillator.start();
            oscillator.stop(context.currentTime + 0.5);
        } catch (e) {
            console.log("Audio no soportado en este navegador");
        }
    }

    envelopeWrapper.addEventListener('click', playSound);
});
