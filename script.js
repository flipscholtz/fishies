document.addEventListener('DOMContentLoaded', () => {
    const fishes = document.querySelectorAll('.fish');
    const game = document.getElementById('game');
    let foundCount = 0;

    // Randomly position fish
    fishes.forEach(fish => {
        fish.style.top = `${Math.random() * 80 + 10}%`;
        fish.style.left = `${Math.random() * 80 + 10}%`;
    });

    // Add touch event listener
    game.addEventListener('touchstart', (e) => {
        const target = e.target;

        if (target.classList.contains('fish') && !target.classList.contains('revealed')) {
            target.classList.add('revealed');
            const letter = target.getAttribute('data-letter');

            // Add the letter to the message
            target.innerText = letter;
            foundCount++;

            // Check if the game is complete
            if (foundCount === fishes.length) {
                showEnding();
            }
        }
    });

    // Show the ending
    function showEnding() {
        game.classList.add('revealed');
        fishes.forEach(fish => fish.style.animationDelay = `${Math.random()}s`);
        setTimeout(() => {
            document.body.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #0077be; color: white; font-size: 3rem; font-family: Arial, sans-serif;">
                    Anja ❤️
                </div>`;
        }, 2000);
    }
});