const thoughtEL = document.getElementById('thought');
const thoughtBtn = document.getElementById('thoughtbtn');
const container = document.querySelector('.container');

function generateThought() {
    fetch('https://type.fit/api/quotes')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const quote = data[randomIndex];
                thoughtEL.innerHTML = `"${quote.text}" (-: ${quote.author}`;

                for (let i = 0; i < 20; i++) {
                    createFlower();
                }
            } else {
                thoughtEL.innerHTML = 'No quotes available at the moment';
            }
        })
        .catch(error => {
            thoughtEL.innerHTML = 'Something went wrong (Not motivated)';
        });
        for (let i = 0; i < 20; i++) {
            createFlower();
        }
    }
    
    function createFlower() {
        const flower = document.createElement('div');
        flower.className = 'flower';
        container.appendChild(flower);
    
        const x = Math.random() * container.clientWidth;
        const y = Math.random() * container.clientHeight;
        const duration = Math.random() * 2 + 2;
    
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;
        flower.style.animation = `fall ${duration}s linear`;
    
        setTimeout(() => {
            container.removeChild(flower);
        }, duration * 1000);
    }


thoughtBtn.addEventListener('click', generateThought);
document.addEventListener('DOMContentLoaded',generateThought);


