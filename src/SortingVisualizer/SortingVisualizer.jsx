import React from 'react';
import { getMergeSortAnimations } from '../SortingAlgo/MergeSort.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
    }

    setArrayLength() {
        let size = document.getElementById("arraySize").value;
        if (size < 450 && size > 0) {
            NUMBER_OF_ARRAY_BARS = size;
            if (size <= 10) {
                ANIMATION_SPEED_MS = 20;
            }
            else if (size <= 50) {
                ANIMATION_SPEED_MS = 15;
            }
            else if (size <= 100) {
                ANIMATION_SPEED_MS = 10;
            }
            else if (size <= 200) {
                ANIMATION_SPEED_MS = 5;
            }
            else if (size <= 300) {
                ANIMATION_SPEED_MS = 1;
            }
        } else {
            window.alert("Array length must be more than 0 and must not exceed 300")
        }
        this.resetArray();
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort() {
        window.alert('not yet available')
    }

    // NOTE: This method will only work if your sorting algorithms actually return
    // the sorted arrays; if they return the animations (as they currently do), then
    // this method will be broken.
    // testSortingAlgorithms() {
    //     for (let i = 0; i < 100; i++) {
    //         const array = [];
    //         const length = randomIntFromInterval(1, 1000);
    //         for (let i = 0; i < length; i++) {
    //             array.push(randomIntFromInterval(-1000, 1000));
    //         }
    //         const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    //         const mergeSortedArray = getMergeSortAnimations(array.slice());
    //         console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    //     }
    // }

    render() {
        const { array } = this.state;

        return (
            <section className="container">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}></div>
                    ))}
                </div>
                <div className="buttons">
                    <button className="button" onClick={() => this.resetArray()}><a>Generate New Array</a></button>
                    <button className="button" onClick={() => this.mergeSort()}><a>Merge Sort</a></button>
                    <button className="button" onClick={() => this.bubbleSort()}><a>Bubble Sort</a></button>
                    <input type="text" id="arraySize" placeholder="Array Size"></input>
                    <button className="button" onClick={() => this.setArrayLength()}><a>Change Array Length</a></button>
                </div>
            </section>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//     if (arrayOne.length !== arrayTwo.length) return false;
//     for (let i = 0; i < arrayOne.length; i++) {
//         if (arrayOne[i] !== arrayTwo[i]) {
//             return false;
//         }
//     }
//     return true;
// }