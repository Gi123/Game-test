//Получаем и задаём canvas
var canvas = document.getElementById("canvas"); //Getting the canvas from DOM
var ctx = canvas.getContext("2d"); //Getting the context to work with the canvas
canvas.width=360;
canvas.height=640;

var check =false;
var h = 0;
var y = 573;

var myReq;
var start = new Date().getTime();

var startx = 94;
var starty = 540;
var startw = 172;
var starth = 36;
 
//Подгружаем все картинки
var Sky = new Image();
Sky.src = 'images/bg_top.png';
var measure_main = new Image();
measure_main.src = 'images/measure_main.png';
var Robot1 = new Image();
Robot1.src = 'images/robot_1.png';
var Robot2 = new Image();
Robot2.src = 'images/robot_2.png';
var Robot3 = new Image();
Robot3.src = 'images/robot_3.png';
var Scale = new Image();
var Scale1 = new Image();
Scale.src = 'images/scale.png'
Scale1.src = 'images/scale-1.png'
var button = new Image();
button.src = 'images/button.png'
var button2 = new Image();
button2.src = 'images/button_active.png'
var measure1 = new Image();
measure1.src = 'images/measure_1@2x.png'
var measure2 = new Image();
measure2.src = 'images/measure_2@2x.png'
var measure3 = new Image();
measure3.src = 'images/measure_3@2x.png'
var measure4 = new Image();
measure4.src = 'images/measure_4@2x.png'
var measure5 = new Image();
measure5.src = 'images/measure_5@2x.png'
var measure6 = new Image();
measure6.src = 'images/measure_6@2x.png'
var measure7 = new Image();
measure7.src = 'images/measure_7@2x.png'
var measure8 = new Image();
measure8.src = 'images/measure_8@2x.png'
var measure9 = new Image();
measure9.src = 'images/measure_9@2x.png'
var prize = new Image();
prize.src = 'images/rubin.png'
var hammer = new Image();
hammer.src = 'images/hammer.png'
var prize_glow = new Image();
prize_glow.src = 'images/prize_glow.png'
var layer_glow = new Image();
layer_glow.src = 'images/layer_glow.png'


//Стадии игры
var startgame = new Path2D(); 
var stages = {
	start : true,
	tuch : false,
	animation : false,
	end : false
}

//Запуск кода
Draw();

//Отрисовка статических элементов
function DrawStaticElement(){
	ctx.drawImage(Sky, 0, 0, Sky.width, Sky.height, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(measure_main, 80, 75, 210, 339);
	ctx.fillStyle = "black";
	ctx.fillRect(0, 604, 360, 36);
	ctx.fillStyle = "#FFFFFF";
	//белый прямоугольник
	ctx.fillRect(240,614,16,16);
	// белый треугольник
	var poly = new Path2D();
	poly.moveTo(100,622);
	poly.lineTo(117,630);
	poly.lineTo(117,614);
	ctx.fill(poly);
	//Рисуется круг внизу
	var circle = new Path2D();
	circle.moveTo(0, 0);
	circle.arc(176, 622, 8, 0, 2 * Math.PI);
	ctx.fill(circle);
}
//Отрисовка шкалы
function drawRect (h) {
	ctx.fillStyle = '#00D355';
		ctx.clearRect(29, 573, 36, -h);
		ctx.fillRect(29, 573, 36, -h);
}
//По идеи функция вывода
function drawResult (count) {
	for(let i = 0; i < count; count++){
		if(i == 0){
			ctx.drawImage(measure2, 80, 80, 210, 332);
			ctx.drawImage(Robot2, 277, 489, 70, 87);
		} else if(i == 1){
			ctx.drawImage(measure3, 80, 80, 210, 332);
			ctx.drawImage(Robot2, 277, 489, 70, 87);
		} else if(i == 2){
			ctx.drawImage(measure4, 80, 80, 210, 332);
			ctx.drawImage(Robot2, 277, 489, 70, 87);
		} else if(i == 3){
			ctx.drawImage(measure5, 80, 80, 210, 332);
			ctx.drawImage(Robot2, 277, 489, 70, 87);
		}else if(i == 4){
			ctx.drawImage(measure6, 80, 80, 210, 332);
			ctx.drawImage(Robot2, 277, 489, 70, 87);
		}else if (i == 5){
			ctx.drawImage(measure7, 80, 80, 210, 332);
			ctx.drawImage(Robot2, 277, 489, 70, 87);
		}else{
			ctx.drawImage(measure9, 80, 80, 210, 332);
			ctx.drawImage(Robot3, 277, 489, 70, 87);
			ctx.drawImage(prize_glow, 120, 65, 123, 123);
			ctx.drawImage(layer_glow, 120, 65, 123, 123);
		}
	}
}
//Функция вращения молота
function drawHammer(_x, _y, _w, _h, _a){
	var dx = _x + _w / 2;
	var dy = _y + _h / 2;
	if (_a){
		_a = _a * (Math.PI / 180);
		ctx.save();
		ctx.translate(dx,dy);
		ctx.rotate(_a);
		ctx.translate(-dx,-dy);
	}
	ctx.drawImage(hammer, _x, _y, _w, _h);
	if(_a)
		ctx.restore()
}

function StartScreen(){
	//Обнуление шкалы
	h = 0;
	y = 573;
	//Картинки
	ctx.drawImage(Robot1, 277, 489, 70, 87);
	ctx.drawImage(Scale, 23, 429, 48, 147);
	ctx.drawImage(Scale1, 23, 429, 48, 147);
	ctx.drawImage(button, 118, 422, 124, 68);
	ctx.drawImage(measure1, 80, 80, 210, 332);
	ctx.drawImage(prize, 150, 93);
	//Прямоугльник для шкалы
	ctx.fillRect(23,573,48,3);
	//Кнопка новая игра
	ctx.beginPath();
	ctx.lineWidth = 2;
	ctx.fillStyle = "#FF42E0";
	ctx.strokeStyle = "#FFFFFF"
	startgame.rect(startx,starty,startw,starth);
	ctx.fill(startgame);
	ctx.strokeRect(startx,starty,startw,starth);
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";
	ctx.font = 'bold 14px Arial';
	ctx.fillText("НОВАЯ ИГРА", 180, 560);

	//Приветствие
	ctx.fillText("Привет!", 180, 510);
	ctx.fillText("Проверим твою силу!", 180, 525);
	//Молот
	drawHammer(190, 380, 101, 111, -45);
}
function TuchScreen(){
	//Картинки
	ctx.drawImage(Robot1, 277, 489, 70, 87);
	ctx.drawImage(button, 118, 422, 124, 68);
	ctx.drawImage(measure1, 80, 80, 210, 332);
	ctx.drawImage(prize, 150, 93);
	ctx.drawImage(hammer, 200, 370, 101, 111);
	//Кнопка удар
	ctx.fillStyle = "#FFDF35";
	startgame.rect(startx,starty,startw,starth);
	ctx.fill(startgame);
	ctx.strokeStyle = "#BB20A2"
	ctx.fillStyle = "#BB20A2";
	ctx.font = 'bold 14px Arial';
	ctx.fillText("УДАР", 180, 561);
	//Текст
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Жми на кнопку", 180, 510);
	ctx.fillText("в нужный момент!", 180, 525);
	//Шкала
	ctx.drawImage(Scale, 23, 429, 48, 147);
	drawRect(h);
	ctx.drawImage(Scale1, 23, 429, 48, 147);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(23, y, 48, 3);
	if (y > 431 && !check){
		y -= 2;
		h += 2;
	}
	else if (y >= 431 && y < 573){
		check = true
		y += 2;	
		h -= 2;
	}else
		check = false;	
}
function endScreen(){
	// Картинки
	ctx.drawImage(button2, 118, 422, 124, 68);
	ctx.drawImage(measure1, 80, 80, 210, 332);
	drawHammer(175, 375, 101, 111, -90);
	//Новая игра
	ctx.fillStyle = "#FF42E0";
	startgame.rect(startx,starty,startw,starth);
	ctx.fill(startgame);
	ctx.fillStyle = "#FFFFFF"
	ctx.textAlign = "center";
	ctx.font = 'bold 14px Arial';
	ctx.fillText("НОВАЯ ИГРА", 180, 560);
	ctx.strokeStyle = "#FFFFFF"
	ctx.strokeRect(startx,starty,startw,starth);
	//Шкала
	ctx.drawImage(Scale, 23, 429, 48, 147);
	drawRect(h);
	ctx.drawImage(Scale1, 23, 429, 48, 147);
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(23, y, 48, 3);

	if(y > 549){
		ctx.drawImage(measure2, 80, 80, 210, 332);
	} else if(y > 525){
		ctx.drawImage(measure3, 80, 80, 210, 332);
	} else if(y > 501){
		ctx.drawImage(measure4, 80, 80, 210, 332);
	} else if(y > 482){
		ctx.drawImage(measure5, 80, 80, 210, 332);
	}else if(y > 463){
		ctx.drawImage(measure6, 80, 80, 210, 332);
	}else if (y > 435){
		ctx.drawImage(measure7, 80, 80, 210, 332);
	}else{
		ctx.drawImage(measure9, 80, 80, 210, 332);
	}
	if(y > 435){
		ctx.drawImage(Robot2, 277, 489, 70, 87);
		ctx.strokeStyle = "#FFFFFF"
		ctx.font = 'bold 14px Arial';
		ctx.fillText("Неплохо!", 180, 510);
		ctx.fillText("Попробуй ещё раз!", 180, 525);
	}else{
		ctx.drawImage(Robot3, 277, 489, 70, 87);
		ctx.drawImage(prize_glow, 120, 65, 123, 123);
		ctx.drawImage(layer_glow, 120, 65, 123, 123);
		ctx.strokeStyle = "#FFFFFF"
		ctx.font = 'bold 14px Arial';
		ctx.fillText("ВОТ ЭТО СИЛА!", 180, 505);
		ctx.fillText("Ты выбил главный приз!", 180, 520);
		ctx.fillStyle = "red"
		ctx.fillText("Рубин!", 180, 535);
	}
	ctx.drawImage(prize, 150, 93);
	cancelAnimationFrame(Draw);
}

function Draw() //Working with graphics
{
	ctx.clearRect(0, 0, canvas.width, canvas.height); //Clearing the canvas
   
	//d.style.left = Math.min(progress / 10, 200) + 'px';
	DrawStaticElement();
	if (stages.start){
		StartScreen();
	} else if(stages.tuch) {
		TuchScreen();
	} else if(stages.end) {
		endScreen();
		return;
	}else if(stages.animation){
			//Картинки
		ctx.drawImage(Robot1, 277, 489, 70, 87);
		ctx.drawImage(button, 118, 422, 124, 68);
		ctx.drawImage(measure1, 80, 80, 210, 332);
		ctx.drawImage(prize, 150, 93);
		//Молот
		drawHammer(175, 375, 101, 111, -45);
		//Шкала
		ctx.drawImage(Scale, 23, 429, 48, 147);
		drawRect(h);
		ctx.drawImage(Scale1, 23, 429, 48, 147);
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(23, y, 48, 3)
		//setTimeout(() => { console.log("ОК"); }, 3000);
		stages.animation = false;
		stages.end = true;
		setTimeout(() => { requestAnimationFrame(Draw); }, 1000);
		return;
		
	}
	requestAnimationFrame(Draw);
	
}
// Add event listener for `click` events.
canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvas.offsetLeft,
        y = event.pageY - canvas.offsetTop;
    // Collision detection between clicked offset and element.
        if (y > starty && y < starty + starth 
            && x > startx && x <  startx + startw) {
				if(stages.start){
					stages.start = false;
					stages.tuch = true;
				} else if(stages.tuch){
					stages.tuch = false;
					stages.animation = true;	
					//stages.animation = true;
				} else if(stages.end){
					stages.end = false;
					stages.start = true;
					Draw();
				}
		}

}, false);

//cancelAnimationFrame(myReq);
var w=window;
requestAnimationFrame=w.requestAnimationFrame||w.webkitCancelAnimationFrame||w.msRequestAnimationFrame||w.mozRequestAnimationFrame;