class Menu{

    constructor(ctx, title) {
        this.ctx = ctx;
        this.title = title;

        this.isHidden = false;
        this.isSoundOn = true;

        this.height = 200;
        this.width = 300;
        this.x = 163;
        this.y = 200;

        this.startButtonX = 170;
        this.startButtonY = 310;
        this.startButtonHeight = 100;
        this.startButtonWidth = 100;

        this.soundButtonX = 380;
        this.soundButtonY = 320;
        this.soundButtonHeight = 75;
        this.soundButtonWidth = 75;

        this.startImage = new Image();
        this.soundImage = new Image();
        this.menuItemSlow = new MenuItem(ctx, 310, 280, 30, 30, "slow", 310, 299, false, this);
        this.menuItemMedium = new MenuItem(ctx, 350, 280, 30, 50, "medium", 350, 299, true, this);
        this.menuItemFast = new MenuItem(ctx, 410, 280, 30, 23, "fast", 410, 299, false, this);
    }

    drawMenu() {
        if (this.isHidden === false){
            this._drawBackground();
            this._drawTitle();
            this._drawImages();
            this._drawSnakeSpeedChoice();
        }
    }

    click(x, y) {
        if (x >= this.x && x <= (this.width + this.x) && y >= this.y && y <= (this.height + this.y)) {
           //if user clicked menu
            this._startClick(x, y);
            this._soundClick(x, y);
            this.menuItemSlow.click(x,y);
            this.menuItemMedium.click(x,y);
            this.menuItemFast.click(x,y);
        }
    }

    _startClick(x, y) {
        //do it because start image takes not all area of rectangle
        const startImageOffsetX = 15;
        const startImageOffsetY = 25;
        if (x >= (this.startButtonX + startImageOffsetX) && x <= (this.startButtonWidth + this.startButtonX - startImageOffsetX) && y >= (this.startButtonY + startImageOffsetY) && y <= (this.startButtonHeight + this.startButtonY - startImageOffsetY)) {
            this.isHidden = true;
            startGame();
        }
    }

    _soundClick(x, y) {
        //do it because sound image takes not all area of rectangle
        const soundImageOffsetX = 5;
        const soundImageOffsetY = 21;
        if (x >= (this.soundButtonX + soundImageOffsetX) && x <= (this.soundButtonWidth + this.soundButtonX - soundImageOffsetX) && y >= (this.soundButtonY + soundImageOffsetY) && y <= (this.soundButtonHeight + this.soundButtonY - soundImageOffsetY)) {
            this.isSoundOn = !this.isSoundOn;
        }
    }

    _drawBackground() {
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
    }

    _drawImages() {
        if (this.isSoundOn) {
            this.soundImage.src = "img/sound-on.png";
            this.ctx.drawImage(this.soundImage, this.soundButtonX, this.soundButtonY, this.soundButtonWidth, this.soundButtonHeight);
        } else {
            this.soundImage.src = "img/sound-off.png";
            this.ctx.drawImage(this.soundImage, this.soundButtonX, this.soundButtonY, this.soundButtonWidth, this.soundButtonHeight);
        }


        this.startImage.src = "img/start-img.png";
        this.ctx.drawImage(this.startImage, this.startButtonX, this.startButtonY, this.startButtonWidth, this.startButtonHeight);
    }

    _drawTitle() {

        this.ctx.fillStyle = "white";
        this.ctx.font = "45px Changa one";
        this.ctx.fillText(this.title, 215, 240);

        this.ctx.strokeStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(163, 250);
        this.ctx.lineTo(463, 250);
        this.ctx.stroke();

    }

    _drawSnakeSpeedChoice() {

        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Changa one";
        this.ctx.fillText("Snake speed:", 190, 300);

        this.menuItemSlow.draw();

        this.menuItemMedium.draw();

        this.menuItemFast.draw();
    }

    menuItemWasClicked() {
        this.menuItemSlow.isSelected = false;
        this.menuItemMedium.isSelected = false;
        this.menuItemFast.isSelected = false;
    }

    getMenuItemChoice() {

        if (this.menuItemSlow.isSelected){
            return "slow";
        }

        if (this.menuItemMedium.isSelected){
            return "medium";
        }

        if (this.menuItemFast.isSelected){
            return "fast";
        }
    }
}

class MenuItem{

    constructor(ctx, x, y, height, width, text, textX, textY, isSelected, menu) {
        this.ctx = ctx;
        this.text = text;

        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.isSelected = isSelected;
        this.selectedColor = "red";
        this.notSelectedColor = "white";
        this.textX = textX;
        this.textY = textY;
        this.menu = menu;
    }

    draw() {

        if (this.isSelected){
            this.ctx.strokeStyle = this.selectedColor;
        } else {
            this.ctx.strokeStyle = this.notSelectedColor;
        }

        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        this.ctx.font = "15px Changa one";
        this.ctx.fillText(this.text, this.textX, this.textY);
    }

    click(x, y) {
        if (x >= this.x && x <= (this.width + this.x) && y >= this.y && y <= (this.height + this.y)) {
            this.menu.menuItemWasClicked();
            this.isSelected = !this.isSelected;
        }
    }
}


