import { styler, pointer, listen, action, transform } from "popmotion";
import {
    round,
    toPercentage,
    getParentDimensions,
    insertAfter,
    on,
    createElement,
    getElCoordinates,
    toArray
} from "./functions";
const { transformMap } = transform;

/**
 *  Returns new template string with css position
 * @param {Number} top CSS top position
 * @param {Number} left CSS left position
 */
const ballTemplate = ({ top = 50, left = 50 } = {}) =>
    `<div class="ball" style="top:${top}%; left:${left}%;"><span></span></div>`;

const addPinBtn = document.getElementById("addPinBtn");
const parentContainer = document.getElementsByClassName("parent")[0];
let pointerTracker;
let myMap = new Map();

const updateBallPositions = (ball, { x: left, y: top }) => {
    // console.log(left, top);

    const { ...rest } = myMap.get(ball);
    myMap.set(ball, { ...rest, position: { left, top } });
};

function startTracking({ target }) {
    const { parentNode } = target;
    // parentNode is a div.ball
    if (myMap.has(parentNode)) {
        const { offsetWidth, offsetHeight } = getParentDimensions(parentNode);
        // console.log(offsetWidth, offsetHeight);

        const { ballStyler, left, top } = myMap.get(parentNode);

        const updateAction = coordinates =>
            action(({ update }) => update(coordinates));

        pointerTracker = pointer({
            x: ballStyler.get("x"),
            y: ballStyler.get("y")
        }).start(({ x, y }) => {
            updateAction({ x, y })
                .pipe(
                    transformMap({
                        x: v => {
                            console.log(v, left + v, offsetWidth);
                            console.log(toPercentage(left + v, offsetWidth));

                            return toPercentage(left + v, offsetWidth);
                        },
                        y: v => toPercentage(top + v, offsetHeight)
                    }),
                    transformMap({
                        x: round,
                        y: round
                    })
                )
                .start(v => updateBallPositions(parentNode, v));

            ballStyler.set("x", x);
            ballStyler.set("y", y);
        });
    }
}

function writeToLocalStorage() {
    const positions = toArray(myMap.values()).map(value => value.position);
    // console.log(JSON.stringify(positions));
    localStorage.setItem("positions", JSON.stringify(positions));
}

const stopTracking = () => {
    if (pointerTracker) {
        pointerTracker.stop();
        writeToLocalStorage();
    }
};

function addNewBall(coordinates = { top: 50, left: 50 }) {
    const ball = createElement(ballTemplate(coordinates));
    insertAfter(parentContainer, ball);
    const offsetCoordinates = getElCoordinates(ball);
    myMap.set(ball, {
        ballStyler: styler(ball),
        position: coordinates,
        ...offsetCoordinates
    });

    listen(ball, "mousedown touchstart").start(startTracking);
}

// EVENTS
on(addPinBtn, "click", addNewBall);
listen(document, "mouseup touchend").start(stopTracking);

// test
(function createFrom() {
    const positions = JSON.parse(localStorage.getItem("positions")) || [];
    positions.forEach(coordinates => addNewBall(coordinates));
})();
