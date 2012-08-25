	
window.requestAnimFrame = (function(callback){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};
})();

function TegelBlockType() {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("tegel.png")
	});
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		if(direction == COLLISION_FROM_BELOW) {
			console.log(scene);
			console.log(body);
				scene.remove(this.child.cube);
				
			this.child.gone = true;
		}
	};
}
function LightBlockType() {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("lightbox.png")
	});
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
	};
}
function StoneBlockType() {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("stone.png")
	});
	this.onCollision = function (body, direction) {
	};
}
function GroundBlockType() {
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("ground.png")
	});
	this.onCollision = function (body, direction) {
	
	};
}
var foundGround = false;
var COLLISION_FROM_LEFT = 0;
var COLLISION_FROM_UP = 1;
var COLLISION_FROM_DOWN = 2;
var COLLISION_FROM_RIGHT = 3;
var COLLISION_FROM_BEHIND = 4;
var COLLISION_FROM_FRONT = 5;
var COLLISION_FROM_ABOVE = 6;
var COLLISION_FROM_BELOW= 6;
function Block(x, y, z, type) {
	this.type = type;
	
	this.type.child = this;
	this.cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), type.material);
	this.cube.overdraw = true;
	// console.log(this.cube);
	this.gone = false;
	this.x = x;
	this.y = y;
	this.z = z;
	this.cube.position.x = x;
	this.cube.position.y = y;
	this.cube.position.z = z;
	
	/***
	@function isCollison
	@description Check if the body is collision with the block
	@returns pos zero if not, -1 if left, 1 if right, -2 is below, 2 if above
	**/
	this.onCollision = function (body) {
		if(this.gone)
			return;
		// TODO Add collision code here
		// If left
		if(body.move_x > 0 && body.x < this.x && body.x > this.x - 52  && body.y > this.y - 50 && body.y < this.y + 30  && body.z < this.z + 50 && body.z > this.z - 50) {
			body.move_x = -0;
			
			this.type.onCollision(body, COLLISION_FROM_LEFT);
			return;
		}
		// If right
		if(body.move_x < 0 && body.x > this.x && body.x < this.x + 52 && body.y > this.y - 42 && body.y < this.y + 32  && body.z < this.z + 50 && body.z > this.z - 50) {
			body.move_x = -0;
		//	body.x = this.x + 50;
		
			this.type.onCollision(body, COLLISION_FROM_RIGHT);
			return;
		}
		// If above
		
		// If below
		if(body.move_y > 0 && body.y < this.y + 30 && body.y > this.y - 50 && body.x > this.x - 50 && body.x < this.x + 50 && body.z < this.z + 50 && body.z > this.z - 50) {
			body.move_y = -2;
			
			this.type.onCollision(body, COLLISION_FROM_BELOW);
			return;
		}
	
		// console.log(body.move_y);
		if(!jump && body.move_y <= 0 && body.x > this.x - 50 && body.x < this.x + 50 && body.y > this.y - 50 && body.y < this.y + 50 && body.z < this.z + 50 && body.z > this.z - 50) {
			if(body.move_y <0)
			body.move_y = 0;
			
			foundGround = true;
			this.type.onCollision(body, COLLISION_FROM_ABOVE);
		//	console.log("AGFA");
		return;
		} 
		
		
		// If behind
		if(body.move_z > 0 && body.x < this.x + 50 && body.x > this.x - 52  && body.y > this.y - 50 && body.y < this.y + 30  && body.z < this.z + 50 && body.z > this.z - 50) {
			body.move_z = -0;
			
			this.type.onCollision(body, COLLISION_FROM_BEHIND);
			return;
		}
		// If in front
		if(body.move_z < 0 && body.x > this.x && body.x < this.x + 52 && body.y > this.y - 42 && body.y < this.y + 32  && body.z < this.z + 50 && body.z > this.z  - 50) {
			body.move_z = -0;
		//	body.x = this.x + 50;
			this.type.onCollision(body, COLLISION_FROM_FRONT);
			return;
			
		}
		
		
		
	};
}
function gamepadConnected(evt)
{
  // console.log(evt); 
}
function moveAnalogSticks(evt) {
	// console.log(evt.axis, evt.value);
}
var jump = false;
window.addEventListener("MozGamepadAxisMove", moveAnalogSticks);
window.addEventListener('gamepadConnected', gamepadConnected);
window.addEventListener("scroll", function (e) {

	console.log(e);
});
window.onkeyup = function (e) {

	
	if(e.keyIdentifier == "Left") {
		if(player.move_x < 0)
		player.move_x = 0;
	} 
	if(e.keyIdentifier == "Right") {
		if(player.move_x > 0)
		player.move_x = 0;
	}
	if(e.keyIdentifier == "Up" ) {
		if(player.move_z < 0) {
			player.move_z = 0;
		}
	}
	if(e.keyIdentifier == "Down" ) {
		if(player.move_z > 0) {
			player.move_z = 0;
		}
	}
	if(e.keyIdentifier == "U+0020") {
	//	if(player.onGround) 
		{
			//alert("A");
			
			
			
		}
	}
};
window.onkeydown = function (e) {
	// console.log(e);
	if(e.keyIdentifier == "Left") {
		player.move_x = -5;
	} 
	if(e.keyIdentifier == "Up") {
		player.move_z = -5;
	} 
	if(e.keyIdentifier == "Down") {
		player.move_z = 5;
	} 
	if(e.keyIdentifier == "Right") {
		player.move_x = 5;
	}
	if(e.keyIdentifier == "U+0020") {
//		if(player.onGround) 
		{
			player.onGround = false;
			player.move_y = 4;
			jump=true;
		}
	}
};
function MarioBody() {	
	var mario_material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("mario.png")
	});
	this.mario = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 0), mario_material);
	this.onGround = false;
	this.mario.position.x = 0;
	this.mario.position.y = 0;
	this.mario.position.z =  0;
	this._z = 0;
	this.camera_x = 0;
	this.camera_y = 0;
	this.camera_zoom = 0;
	this.player_x = 0;
	this.player_y = 0;
	this.move_x = 0;
	this.move_y = 0;
	this.move_z = 0;
	this.__defineGetter__("x", function () {
		return this._x;
	});
	this.__defineSetter__("x", function (x) {
		this._x = x;
		this.mario.position.x = x;
	});
	this.__defineGetter__("y", function () {
		
		return this._y;
	});
	this.__defineSetter__("y", function (y) {
		
		this._y = y;
		this.mario.position.y = y;
		
	});
	this.__defineGetter__("z", function () {
		
		return this._z;
	});
	this.__defineSetter__("z", function (z) {
		
		this._z = z;
		this.mario.position.y = z;
		
	});
	this.x = 0;
	this.y = 150;
	
	/**
	@function play
	Play actions
	**/
	this.play = function () {
		//console.log("A", this.onGround);
			
		if(!self.onGround && !jump) 
		{
		
			this.move_y -= 0.1;
			// console.log(this.move_y);
		} else {
			
			//alert("C");
			
		}
		if(jump) {
			jump = false;
		}
		
		this.x += self.move_x;
		this.y += self.move_y;
		this.z += self.move_z;
		self.mario.position.x = this.x;
		self.mario.position.y = this.y;
		self.mario.position.z = this.z;
		
		this.camera();
	};
	/**
	@description Synchronize camera
	**/
	this.camera = function () {
		camera_x = self.x;
		camera_y = self.y + 120;
		camera_z = self.z;
		if(camera_y < 300) {
			camera_y = 300;
		}
		if(camera_x < window.innerWidth / 3) {
			camera_x =  window.innerWidth / 3;
		}
		camera.position.x = camera_x;
		camera.position.y = camera_y;
		//console.log(camera_z);
	};
	var self = this;
}
/***
@class Level
@description Creates a new level
@param url The url to the level file
***/
function Level(url) {
	this.start_x = 0;
	this.start_y = 0;
	var self = this;
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url+"?c="+Math.random(), false);
	xmlHttp.send();
	this.blocks = [];
	// console.log(xmlHttp);
	var level = eval("(" + xmlHttp.responseText + ")");
	for(var i = 0; i < level.blocks.length; i++) {
		var _block = level.blocks[i];
		var left = _block.x;
		
		var top = _block.y;
		var zz = _block.z ;
		var repeat = _block.repeat;
		if(typeof(repeat) === "undefined") {
			repeat = { x:1, y:1, z :1};
		} 
		var type_id = _block.type;
		// Choose type
		if(type_id > 0) {
			
			console.log(repeat);
			for(var x = 0; x < repeat.x; x++) {
				for(var y = 0; y < repeat.y; y++) {
					for(var z = 0; z < repeat.z; z++) {
						console.log("GF");
						var type = null;
						switch(type_id) {
							case 1:
								type = new GroundBlockType();
								break;
							case 2:
								type = new StoneBlockType();
								break;
							case 3:
								type = new TegelBlockType();
								break;
							case 4:
								type = new LightBlockType();
								break;
							case -1:
								self.start_x = x;
								self.start_y = y;
						}
						var block = new Block((left + x) * 50, (top + y) * 50, (zz + z) * 50,  type);
						
						this.blocks.push(block);
						
					}
				}
			}
		}
		
	}
	
	if(false) {
		this.width = level.split(/\n/g)[0].length; // width;
	
		this.height = level.split(/\n/g).length -1;
		// console.log(this);
		this.blocks = [];
		var n = 0;
		for(var y = 0; y < this.height; y++) {
			n++;
			for(var x = n; x < this.width; x++) {
				
				var b = level[x + y * this.width]; // Get character
				var type_id = parseInt(b);
				var top = /*50 * this.height -*/ y * 50;
				var left = (x - (y+1)) * 50;
				// console.log("F");
				if(b == "P") { // If player	
					// console.log("DADAA");
					player.x = x;
					// console.log(y);
					player.y = y * 50;
				}
				
			}
		}
	}
	this.activate = function () {
		currentLevel = this;
		for(var i = 0; i < this.blocks.length; i++) {
			console.log("F");
			 console.log(block);
			var block = this.blocks[i];
			scene.add(block.cube);
		}
		player.camera();
		// alert("A");
	};
}
var dragging = false;
var middle = window.innerWidth /2;
var diff = 0;
document.onmousedown = function (e) {
	dragging = true;
	console.log(middle);
	diff = middle - e.x;
};
var currentAngle = 0;
window.onmouseup = function (e) {
	dragging = false;
	middle = e.x + diff;

};
var angle = 0;
window.onmousemove = function (e) {
	
	if(dragging) {
		// console.log("dragging");
	
		// console.log(e);
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		angle = ((e.x + diff) / width) ;

	console.log("middle", diff, e.x + diff,angle);
	angle *=0.9;
		// console.log(angle);
		camera.rotation.y = angle;
	}
};
var currentLevel = null;
function animate(lastTime, angularSpeed, three){
	// update
	var date = new Date();
	var time = date.getTime();
	var timeDiff = time - lastTime;
	var angleChange = angularSpeed * timeDiff * 2 * Math.PI / 1000;
//    three.cube.rotation.y += angleChange;
	lastTime = time;
	
	// render
	three.renderer.render(three.scene, three.camera);
	
	// request new frame
	requestAnimFrame(function(){
		animate(lastTime, angularSpeed, three);
	});
}
function gameTick () {
	//console.log("F");
	var a = (player.onGround + " a");
	foundGround = false;
	for(var i = 0; i < currentLevel.blocks.length; i++) {
		var block = currentLevel.blocks[i];
		block.onCollision(player); 
	
	}
	player.onGround = foundGround;
	var a = (foundGround);
	player.play();
	var b = (foundGround);
	// console.log(a, b);
	}
var camera = null;
var scene = new THREE.Scene();
var player = null;
var currentLevel = null;
window.onload = function(){
	var angularSpeed = 0.2; // revolutions per second
	var lastTime = 0;
	setInterval( gameTick, 10);
	// renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 11000);
	camera.position.z = 800;
	camera.position.y = 202;
	camera.rotation.y = -.0;
	// scene
   
	// material 
	var mario = new MarioBody();
//	alert(mario);
	player = mario;
	mario.play();
	scene.add(mario.mario);
	
	var firstLevel = new Level("levels/1-1.json");
	currentLevel = firstLevel;
	firstLevel.activate();
  /*  
	var material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("ground.png")
	});

	// cube
	var cube = new THREE.Mesh(new THREE.CubeGeometry(300, 300, 300), material);
	cube.overdraw = true;
	scene.add(cube);

  // add subtle ambient lighting
	
*/
	var ambientLight = new THREE.AmbientLight(0x555555);
	scene.add(ambientLight);

	
	
	// add directional light source
	var directionalLight = new THREE.DirectionalLight(0xffffff);
	directionalLight.position.set(1, 1, 1).normalize();
	scene.add(directionalLight);
	// create wrapper object that contains three.js objects
	var three = {
		renderer: renderer,
		camera: camera,
		scene: scene
	};

	/*
	 * wait for texture image to load before
	 * starting the animation
	 */ 
	var textureImg = new Image();
	textureImg.onload = function(){
		animate(lastTime, angularSpeed, three, this);
	};
	textureImg.src = "crate.jpg";
};
