async function fetchBets() {
    const date = document.getElementById('date').value;
    const rank = parseInt(document.getElementById('bet-rank').value);

    if (!date) {
        alert('Please select a date');
        return;
    }

    try {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        const response = await fetch(`http://127.0.0.1:5000/bets?date=${formattedDate}&rank=${rank}`);

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        displayBets(data, rank);
    } catch (error) {
        console.error('Error fetching bets:', error);
        document.getElementById('bets-output').innerHTML = 
            '<p class="error">Error fetching data. Please try again later.</p>';
    }
}

function displayBets(bets, rank) {
    const outputDiv = document.getElementById('bets-output');
    outputDiv.innerHTML = '';

    if (bets.message) {
        outputDiv.innerHTML = `<p class="error">${bets.message}</p>`;
        return;
    }

    let output = `<h2>Top ${rank} Betting Picks</h2>`;
    bets.slice(0, rank).forEach((bet, index) => {
        output += `
            <div class="bet-card">
                <h3>#${index + 1}: ${bet.player} (${bet.team})</h3>
                <p><strong>Type:</strong> ${bet.bet_type}</p>
                <p><strong>Line:</strong> ${bet.line}</p>
                <p><strong>Odds:</strong> ${bet.odds}</p>
                <p><strong>Confidence:</strong> ${bet.confidence}</p>
                <p><strong>Advice:</strong> ${bet.advice}</p>
            </div>
        `;
    });

    outputDiv.innerHTML = output;
}

function resetSelection() {
    document.getElementById('date').value = '';
    document.getElementById('bet-rank').selectedIndex = 0;
    document.getElementById('bets-output').innerHTML = '';
}
