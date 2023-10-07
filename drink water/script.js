// Select all small cups, liters, percentage, and remained elements
const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

// Initial function call to update the big cup
updateBigCup();

// Add click event listeners to each small cup
smallCups.forEach((cup, idx) => {
    cup.addEventListener('click', () => highlightCups(idx));
});

// Function to highlight cups based on the clicked index
function highlightCups(idx) {
    // Check if the last cup is full and prevent highlighting it
    if (idx === 7 && smallCups[idx].classList.contains('full')) idx--;
    else if (smallCups[idx].classList.contains('full') && !smallCups[idx].nextElementSibling.classList.contains('full')) {
        idx--;
    }

    // Loop through all small cups to add or remove 'full' class
    smallCups.forEach((cup, idx2) => {
        if (idx2 <= idx) {
            cup.classList.add('full');
        } else {
            cup.classList.remove('full');
        }
    });

    // Update the big cup
    updateBigCup();
}

// Function to update the big cup and liters/percentage display
function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length;
    const totalCups = smallCups.length;
    const maxLiters = 2; // Maximum liters when all cups are full

    if (fullCups === 0) {
        // Hide percentage when there are no filled cups
        percentage.style.visibility = 'hidden';
        percentage.style.height = 0;
    } else {
        // Show percentage and set its height based on filled cups
        percentage.style.visibility = 'visible';
        percentage.style.height = `${(fullCups / totalCups) * 330}px`; // Adjust as needed
        percentage.innerText = `${(fullCups / totalCups) * 100}%`;
    }

    if (fullCups === totalCups) {
        // Hide remained when all cups are full
        remained.style.visibility = 'hidden';
        remained.style.height = 0;
    } else {
        // Show remained liters based on filled cups
        remained.style.visibility = 'visible';
        liters.innerText = `${(maxLiters - (maxLiters * (fullCups / totalCups))).toFixed(2)}L`; // Adjust as needed
    }
}
