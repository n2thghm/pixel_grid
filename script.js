class PixelGrid {
    
    gridContainerId = 'pixelart-grid';
    gridSize = 16;
    backgroundColor = '';
    storageName = 'pixelArtGrid';
    colorizedCellIds;
    
    constructor() {
        this.setBackgroundColor();
        this.setColorizedCellsIds();
    }

    init() {
        this.buildGrid();
    }

    buildGrid() {
        const gridContainer = document.getElementById(this.gridContainerId);

        // building rows then columns
        for (let i = 1; i <= this.gridSize; i++) {

            const gridRow = document.createElement('div');
            gridRow.setAttribute('id', `pixelart-grid-row-${i}`);
            gridRow.classList.add('grid-row');

            // building columns
            for (let j = 1; j <= this.gridSize; j++) {

                const gridCell = document.createElement('div');
                
                const cellId = `pixelart-grid-cell-r${i}c${j}`;
                gridCell.setAttribute('id', cellId);
                gridCell.classList.add('grid-cell')
                gridCell.addEventListener('click', (ev) => this.colorizeCell(ev.target))

                if (this.colorizedCellIds.includes(cellId)) {
                    this.setCellBackgroundColor(gridCell);
                }

                gridRow.appendChild(gridCell);
            }
            
            gridContainer.appendChild(gridRow);
        }

        return;
    }

    colorizeCell(el) {
        
        const RGB = `rgb(${chroma(this.backgroundColor).rgb().toString().replaceAll(',', ', ')})`;

        if (el.style.backgroundColor === RGB) {
            this.removeCellBackgroundColor(el);
            return;
        }

        this.setCellBackgroundColor(el);

        return;
    }

    setCellBackgroundColor(el) {
        el.style.backgroundColor = this.backgroundColor;
        this.saveCell(el.id);
    }

    removeCellBackgroundColor(el) {
        el.style.backgroundColor = '';
        this.unsaveCell(el.id);
    }

    saveCell(id) {
        
        if (this.colorizedCellIds.includes(id)) {
            return;
        }

        this.colorizedCellIds.push(id);
        this.storeGrid();

        return;
    }

    unsaveCell(id) {
    
        this.colorizedCellIds = this.colorizedCellIds.filter( item => { return item !== id });
        this.storeGrid();
        
        return;
    }

    storeGrid() {
        localStorage.setItem(this.storageName, this.colorizedCellIds);
    }

    setBackgroundColor() {
        const colorPicker = document.getElementById('color-picker')
        this.backgroundColor = colorPicker.value;
    }

    clearGrid() {
        const cells = document.querySelectorAll('div[id^=pixelart-grid-cell-]');

        cells.forEach(cell => cell.style.backgroundColor = '')
        this.colorizedCellIds = [];
        this.storeGrid();
    }

    setColorizedCellsIds() {
        const savedCellsValues = localStorage.getItem(this.storageName)
        
        if ( savedCellsValues !== null && savedCellsValues !== undefined ) {
            this.colorizedCellIds = savedCellsValues.split(',');

            return;
        }

        this.colorizedCellIds = [];
    }
}

const app = new PixelGrid();
app.init();