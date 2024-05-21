var board = null;
var game = new Chess();
var tour = new Shepherd.Tour({
    useModalOverlay: true,
    defaultStepOptions: {
        cancelIcon: {
            enabled: true
        },
        classes: 'shadow-md bg-purple-dark',
        scrollTo: { behavior: 'smooth', block: 'center' }
    }
});

function startTour() {
    tour.addStep({
        title: 'Welcome to Chess',
        text: 'This tutorial will guide you through the chess game interface.',
        attachTo: {
            element: '#board',
            on: 'top'
        },
        buttons: [
            {
                action: tour.next,
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        title: 'Making Moves',
        text: 'Click and drag a piece to move it according to chess rules.',
        attachTo: {
            element: '#board',
            on: 'bottom'
        },
        buttons: [
            {
                action: tour.next,
                text: 'Next'
            }
        ]
    });

    tour.addStep({
        title: 'Adjust Difficulty',
        text: 'Use this slider to adjust the difficulty level of the computer opponent.',
        attachTo: {
            element: '#skillLevel',
            on: 'top'
        },
        buttons: [
            {
                action: tour.hide,
                text: 'Finish'
            }
        ]
    });

    tour.start();
}

document.getElementById('start-tour').addEventListener('click', startTour);

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: function () {
        board.position(game.fen());
    }
};
board = Chessboard('board', config);

function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false;
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });
    if (move === null) return 'snapback';
}

function makeRandomMove() {
    var possibleMoves = game.moves();
    if (possibleMoves.length === 0) return;
    var randomIdx = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIdx]);
    board.position(game.fen());
}
