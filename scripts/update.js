var animating_blocks = []; // array of objects
// where each object looks like this:
// {
//   "start": {"row": i, "col": j}, // start coordinates
//   "end": {"row": i, "col": j}, // destination coordinates
//   "startTime": time,
//   "action": "spawn" or "slide" or "promote"
// }

var update = function(key) {
    let bool = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    let oldGrid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            oldGrid[i][j] = grid[i][j];
        }
    }

    let timeNow = performance.now();

    animating_blocks = [];

    if (key === 37) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] != 0) {
                    let pos = j-1;
                    while (pos >= 0 && grid[i][pos] === 0) {
                        pos--;
                    }
                    if (pos !== -1 &&
                        grid[i][pos] === grid[i][j] &&
                        bool[i][pos] !== 1) {

                        grid[i][pos] *= 2;
                        score += grid[i][pos];
                        bool[i][pos] = 1;
                        grid[i][j] = 0;

                        let animated_block = {
                            "start": {"row": i, "col": j},
                            "end": {"row": i, "col": pos},
                            "startTime": timeNow,
                            "action": "slide"
                        };
                        animating_blocks.push(animated_block);

                        animated_block = {
                            "start": {"row": i, "col": pos},
                            "end": {"row": i, "col": pos},
                            "startTime": null,
                            "action": "promote"
                        };
                        animating_blocks.push(animated_block);
                    } else {
                        let temp = grid[i][pos+1];
                        grid[i][pos+1] = grid[i][j];
                        grid[i][j] = temp;

                        if (pos !== j-1) { // block will move, start != end
                            let animated_block = {
                                "start": {"row": i, "col": j},
                                "end": {"row": i, "col": pos+1},
                                "startTime": timeNow,
                                "action": "slide"
                            };
                            animating_blocks.push(animated_block);
                        }
                    }
                }
            }
        }

    } else if (key === 39) {
        for (let i = grid.length-1; i >= 0; i--) {
            for (let j = grid.length-1; j >= 0; j--) {
                if (grid[i][j] != 0) {
                    let pos = j+1;
                    while (pos <= 3 && grid[i][pos] === 0) {
                        pos++;
                    }
                    if (pos !== 4 &&
                        grid[i][pos] === grid[i][j] &&
                        bool[i][pos] !== 1) {

                        grid[i][pos] *= 2;
                        score += grid[i][pos];
                        bool[i][pos] = 1;
                        grid[i][j] = 0;

                        let animated_block = {
                            "start": {"row": i, "col": j},
                            "end": {"row": i, "col": pos},
                            "startTime": timeNow,
                            "action": "slide"
                        };
                        animating_blocks.push(animated_block);

                        animated_block = {
                            "start": {"row": i, "col": pos},
                            "end": {"row": i, "col": pos},
                            "startTime": null,
                            "action": "promote"
                        };
                        animating_blocks.push(animated_block);
                    } else {
                        let temp = grid[i][pos-1];
                        grid[i][pos-1] = grid[i][j];
                        grid[i][j] = temp;

                        if (pos !== j+1) { // block will move, start != end
                            let animated_block = {
                                "start": {"row": i, "col": j},
                                "end": {"row": i, "col": pos-1},
                                "startTime": timeNow,
                                "action": "slide"
                            };
                            animating_blocks.push(animated_block);
                        }
                    }
                }
            }
        }

    } else if (key === 38) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[j][i] != 0) {
                    let pos = j-1;
                    while (pos >= 0 && grid[pos][i] === 0) {
                        pos--;
                    }
                    if (pos !== -1 &&
                        grid[pos][i] === grid[j][i] &&
                        bool[pos][i] !== 1) {

                        grid[pos][i] *= 2;
                        score += grid[pos][i];
                        bool[pos][i] = 1;
                        grid[j][i] = 0;

                        let animated_block = {
                            "start": {"row": j, "col": i},
                            "end": {"row": pos, "col": i},
                            "startTime": timeNow,
                            "action": "slide"
                        };
                        animating_blocks.push(animated_block);

                        animated_block = {
                            "start": {"row": pos, "col": i},
                            "end": {"row": pos, "col": i},
                            "startTime": null,
                            "action": "promote"
                        };
                        animating_blocks.push(animated_block);
                    } else {
                        let temp = grid[pos+1][i];
                        grid[pos+1][i] = grid[j][i];
                        grid[j][i] = temp;

                        if (pos !== j-1) { // block will move, start != end
                            let animated_block = {
                                "start": {"row": j, "col": i},
                                "end": {"row": pos+1, "col": i},
                                "startTime": timeNow,
                                "action": "slide"
                            };
                            animating_blocks.push(animated_block);
                        }
                    }
                }
            }
        }
    } else if (key === 40) {
        for (let i = grid.length-1; i >= 0; i--) {
            for (let j = grid.length-1; j >= 0; j--) {
                if (grid[j][i] != 0) {
                    let pos = j+1;
                    while (pos <= 3 && grid[pos][i] === 0) {
                        pos++;
                    }
                    if (pos !== 4 &&
                        grid[pos][i] === grid[j][i] &&
                        bool[pos][i] !== 1) {

                        grid[pos][i] *= 2;
                        score += grid[pos][i];
                        bool[pos][i] = 1;
                        grid[j][i] = 0;

                        let animated_block = {
                            "start": {"row": j, "col": i},
                            "end": {"row": pos, "col": i},
                            "startTime": timeNow,
                            "action": "slide"
                        };
                        animating_blocks.push(animated_block);

                        animated_block = {
                            "start": {"row": pos, "col": i},
                            "end": {"row": pos, "col": i},
                            "startTime": null,
                            "action": "promote"
                        };
                        animating_blocks.push(animated_block);
                    } else {
                        let temp = grid[pos-1][i];
                        grid[pos-1][i] = grid[j][i];
                        grid[j][i] = temp;

                        if (pos !== j+1) { // block will move, start != end
                            let animated_block = {
                                "start": {"row": j, "col": i},
                                "end": {"row": pos-1, "col": i},
                                "startTime": timeNow,
                                "action": "slide"
                            };
                            animating_blocks.push(animated_block);
                        }
                    }
                }
            }
        }
    }

    let change_possible = false;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (0 < i && i < grid.length - 1) {
                if (grid[i-1][j] === grid[i][j] ||
                    grid[i+1][j] === grid[i][j] ||
                    grid[i-1][j] === 0 ||
                    grid[i+1][j] === 0) {
                        change_possible = true;
                    }
            }
            if (0 < j && j < grid[0].length - 1) {
                if (grid[i][j-1] === grid[i][j] ||
                    grid[i][j+1] === grid[i][j] ||
                    grid[i][j-1] === 0 ||
                    grid[i][j+1] === 0) {
                        change_possible = true;
                    }
            }
        }
    }
    if (!change_possible) {
        game_over = true;
        return;
    }

    let change = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (oldGrid[i][j] != grid[i][j]) {
                change++;
            }
        }
    }

    if (change != 0) {
        playSound();
        let randI = Math.floor(Math.random()*4);
        let randJ = Math.floor(Math.random()*4);
        while (grid[randI][randJ] != 0) {
            randI = Math.floor(Math.random()*4);
            randJ = Math.floor(Math.random()*4);
        }

        if (Math.random() >= 0.3) {
            grid[randI][randJ] = 2;
        } else {
            grid[randI][randJ] = 4;
        }

        let animated_block = {
            "start": {"row": randI, "col": randJ},
            "end": {"row": randI, "col": randJ},
            "startTime": timeNow,
            "action": "spawn"
        };
        animating_blocks.push(animated_block);
    }
}
