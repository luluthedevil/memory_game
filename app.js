const section = document.querySelector('section');
const numberOfLives = 5;
let playerLives = numberOfLives;
const playerLivesCount = document.querySelector('span');

// link text
playerLivesCount.textContent = playerLives;

// generate data
const getData = () => [
    {imgScr: './imgs/blackcat.jpg', name: 'Black cat'},
    {imgScr: './imgs/cake.jpg', name: 'Cake'},
    {imgScr: './imgs/dog.jpg', name: 'Dog'},
    {imgScr: './imgs/flower.jpeg', name: 'Flower'},
    {imgScr: './imgs/fox.jpeg', name: 'Fox'},
    {imgScr: './imgs/starrysky.jpg', name: 'Starry sky'},
    {imgScr: './imgs/tiger.jpeg', name: 'Tiger'},
    {imgScr: './imgs/totoro.jpg', name: 'Totoro'},
    {imgScr: './imgs/blackcat.jpg', name: 'Black cat'},
    {imgScr: './imgs/cake.jpg', name: 'Cake'},
    {imgScr: './imgs/dog.jpg', name: 'Dog'},
    {imgScr: './imgs/flower.jpeg', name: 'Flower'},
    {imgScr: './imgs/fox.jpeg', name: 'Fox'},
    {imgScr: './imgs/starrysky.jpg', name: 'Starry sky'},
    {imgScr: './imgs/tiger.jpeg', name: 'Tiger'},
    {imgScr: './imgs/totoro.jpg', name: 'Totoro'}
];

// make cards array random
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

// generate cards
const cardGenerator = () => {
    const cardData = randomize();
    // generate HTML
    cardData.forEach(item => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        // attach info to cards
        face.src = item.imgScr;
        // attach the card name
        card.setAttribute('name', item.name);
        // attach cards to section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e)=>{
            card.classList.toggle('toggleCard');
            checkCards(e);
        });
    });
}

// check cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');
    // logic
    if(flippedCards.length === 2){
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){
            console.log('yay');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        } else{
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1500);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart(":(  Try again!");
            }
        }
    }
    // check if we won the game
    if(toggleCard.length === 16){
        restart(":)  You won!!!");
    }
};

// restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) =>{
        cards[index].classList.remove('toggleCard');
        // randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgScr;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1500);
    });
    playerLives = numberOfLives;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 250);
};

cardGenerator();