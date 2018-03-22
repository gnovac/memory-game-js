var cards = ["ciri.png", "geralt.png", "jaskier.png", "jaskier.png", "iorweth.png", "triss.png", "geralt.png", "yen.png", "ciri.png", "triss.png", "yen.png", "iorweth.png", "draig.png", "draig.png", "emhyr.png", "emhyr.png", "eredin.png", "eredin.png", "geralt2.png", "geralt2.png", "germanin.png", "germanin.png", "imlerith.png", "imlerith.png", "iorweth2.png", "iorweth2.png", "letho.png", "letho.png", "odrin.png", "odrin.png", "triss2.png", "triss2.png", "vernon.png", "vernon.png", "yen2.png", "yen2.png"];
cards.sort(function () {
    return 0.5 - Math.random()
});

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 18;
var second = 0;
var minute = 0;
var hour = 0;
var interval;
//alert(cards[4]);
//console.log(cards);


for (var X = 0; X < cards.length; X++) {
    var cX = document.getElementById('c' + X);
}

$('#btn-start').on('click', game);

function game() {
    function play() {
        $('#btn-start').remove();
        for (i = 0; i < 36; i++) {
            $('.board').append('<div class="card" id="c' + i + '"></div>');
        }
        $('article').append("<div class=\"score\">Turn Counter: 0</div>");
        $('article').append("<div class=\"timer\"></div>");
        catchBoard();
    }
    play();

    //rysowanie tablicy
    function catchBoard() {
        for (let i = 0; i < 36; i++) {
            document.getElementById('c' + i).addEventListener("click", function () {
                revealCard(i);
            });
        };
    };
}

function startTimer() {
    interval = setInterval(function () {
        $('.timer').html(minute + " mins " + second + " secs");
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function revealCard(nr) {
    var opacityValue = $('#c' + nr).css('opacity');

    //alert('Opacity: '+opacityValue);

    if (opacityValue != 0 && lock == false) {
        lock = true;

        //alert(nr);

        var image = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', image);
        $('#c' + nr).addClass('cardA');
        $('#c' + nr).removeClass('card');

        if (oneVisible == false) {
            //first card

            oneVisible = true;
            visible_nr = nr;
            lock = false;
        } else {
            //second card
            if (visible_nr != nr) {
                if (cards[visible_nr] == cards[nr]) {
                    //alert("para");
                    setTimeout(function () {
                        hide2Cards(nr, visible_nr)
                    }, 750);

                } else {
                    //alert("pudło");
                    setTimeout(function () {
                        restore2Cards(nr, visible_nr)
                    }, 1000);

                }

                turnCounter++;
                $('.score').html('Turn counter: ' + turnCounter);
                oneVisible = false;
                if (turnCounter == 1) {
                    second = 0;
                    minute = 0;
                    hour = 0;
                    startTimer();
                }
            } else {
                lock = false;
            }
        }
    }
}



function hide2Cards(nr1, nr2) {
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    pairsLeft--;

    if (pairsLeft == 0) {
        $('.board').html('<h1>You win!<br>Done in ' + turnCounter + ' turns</h1>');
    }

    lock = false;
}

function restore2Cards(nr1, nr2) {
    $('#c' + nr1).css('background-image', 'url(img/karta.png)');
    $('#c' + nr1).addClass('card');
    $('#c' + nr1).removeClass('cardA');

    $('#c' + nr2).css('background-image', 'url(img/karta.png)');
    $('#c' + nr2).addClass('card');
    $('#c' + nr2).removeClass('cardA');

    lock = false;
}
