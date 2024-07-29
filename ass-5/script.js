document.getElementById('startButton').addEventListener('click', function() {
    let timeRemaining = parseInt(document.getElementById('timeInput').value);
    const timerDisplay = document.getElementById('timerDisplay');

    if (isNaN(timeRemaining) || timeRemaining <= 0) {
        alert('Please enter a valid number greater than zero.');
        return;
    }

    timerDisplay.textContent = timeRemaining;

    const countdown = setInterval(() => {
        timeRemaining -= 1;
        timerDisplay.textContent = timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(countdown);
            alert("Time's up!");
        }
    }, 1000);
});
