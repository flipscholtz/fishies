function generateUniquePositions(numFish, gameWidth, gameHeight) {
    const positions = [];
    const margin = 10; // Minimum distance between fish (in percentage terms)

    // Create a grid of possible positions with the specified margin
    for (let i = margin; i < 100 - margin; i += margin) {
        for (let j = margin; j < 100 - margin; j += margin) {
            positions.push({ x: (i / 100) * gameWidth, y: (j / 100) * gameHeight });
        }
    }

    // Shuffle the positions randomly
    positions.sort(() => Math.random() - 0.5);

    // Return the first `numFish` positions
    return positions.slice(0, numFish);
}

// Use this function to set the initial positions of the fish
function setInitialPositions(fishes) {
    const gameWidth = game.clientWidth;
    const gameHeight = game.clientHeight;
    const positions = generateUniquePositions(fishes.length, gameWidth, gameHeight);

    fishes.forEach((fish, index) => {
        const position = positions[index];
        fish.style.top = `${position.y}px`;
        fish.style.left = `${position.x}px`;
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const fishes = document.querySelectorAll('.fish');
    const game = document.getElementById('game');
    let foundCount = 0;

    // Randomly position fish
    setInitialPositions(fishes);

    fishes.forEach((fish) => {
        console.log("REGISTERING FISH");
        fish.addEventListener("pointerdown", (e) => {
            console.log("FISH POINTERDOWN");
            if (!fish.classList.contains("revealed")) {
                fish.classList.add('revealed');
            const letter = fish.getAttribute('data-letter');

            // Add the letter to the message
            fish.innerText = letter;
            foundCount++;

            // Check if the game is complete
            if (foundCount === fishes.length) {
                showEnding();
            }
            }
        });
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