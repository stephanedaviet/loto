const grid = new Array(3);
// On a 9 dizaines et pour chacune, maximum 3 nombres.
const dizainesCount = new Array(9);
dizainesCount.fill(3);
// On crée un tableau avec tous les nombres tirables, pour les enlever une fois choisi et éviter d'avoir 2 fois le même
const nombresDispos = new Array(9);
for (let i = 0; i < 9; i++) {
    nombresDispos[i] = new Array(9);
    for (let j = 1; j <= 9; j++) {
        nombresDispos[i][j - 1] = (i * 10) + j;
    }
}
nombresDispos[8].push(90);
console.debug(nombresDispos);
// 3 lignes
for (let i = 0; i < 3; i++) {
    grid[i] = new Array(9);
    // 5 nombres par ligne
    let dizainesDispos = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    if (i == 2) {
        // Pas de colonne vide
        const dizainesVides = [];
        for (let j = 0; j < 9; j++) {
            if (dizainesCount[j] == 3) {
                dizainesVides.push(j);
            }
        }
        console.debug(dizainesDispos);
        console.debug(dizainesVides);
        
        const lastLineDizainesDispos = []
        while (lastLineDizainesDispos.length < 5) {
            if (dizainesVides.length > 0) {
                const indexDizaine = dizainesDispos.indexOf(dizainesVides[0]);
                dizainesDispos.splice(indexDizaine, 1);
                lastLineDizainesDispos.push(dizainesVides.splice(0, 1)[0]);
            } else {
                const indexDizaine = Math.floor(Math.random() * dizainesDispos.length);
                const dizaine = dizainesDispos.splice(indexDizaine, 1)[0];
                lastLineDizainesDispos.push(dizaine);
            }
        }
        dizainesDispos = lastLineDizainesDispos;
        console.debug(dizainesDispos);
    }

    for (let j = 0; j < 5; j++) {
        // On peut tirer un nombre dans une des 9 dizaines
        const indexDizaine = Math.floor(Math.random() * dizainesDispos.length);
        const dizaine = dizainesDispos.splice(indexDizaine, 1)[0];
        // Une fois la dizaine choisie, on tire un nombre au sort dans celle-ci
        const indexNombre = Math.floor(Math.random() * nombresDispos[dizaine].length);
        const nombre = nombresDispos[dizaine].splice(indexNombre, 1)[0];
        grid[i][dizaine] = nombre;
        dizainesCount[dizaine] = dizainesCount[dizaine] - 1;
    }
}
console.debug(grid);

for (let j = 0; j < 9; j++) {
    const column = [grid[0][j], grid[1][j], grid[2][j]].filter(e => e != false).sort((a, b) => a - b);
    for (let i = 0; i < 3; i++) {
        if (grid[i][j]) {
            grid[i][j] = column.splice(0, 1);
        }
    }
}

const gridElement = document.getElementById('grid');
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
        const cellule = document.createElement('div');
        cellule.setAttribute("class", "cell");
        if (!grid[i][j]) {
            cellule.setAttribute("class", "cell empty");
        }
        const nombreText = document.createTextNode(grid[i][j] ? grid[i][j] : '');
        cellule.appendChild(nombreText);
        gridElement.appendChild(cellule);
    }
}