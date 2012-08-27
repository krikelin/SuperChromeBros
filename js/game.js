var points = 0;
var lives = 3;
var coins = 0;
function updateHeader() {
	addOrEditTextOverlay("toptext", "Level: 1-1 Coins:" + coins + " Life: " + lives + " Points: " + points, 2, 2);
}
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
function CoinBlockType (level) {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/coin.png")
	});
	
	this.solid = false;
	this.width = 50;
	this.height = 50;
	this.depth = 50;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		currentLevel.scene.remove(this.child.cube);
		this.child.gone = true;
		console.log("A");
		
		coins++;
		console.log("coins", coins);
		if(coins > 99) {
			lives++;
			coinS = 0;
		}
		updateHeader();
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.SphereGeometry(25, 3, 3, 3, 5, 1, 3), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function PipeURightBlockType(level) {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/pipe_right.png")
	});
	this.solid = true;
	this.width = 50;
	this.height = 100;
	this.depth = 50;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(60, 50, 10), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function PipeULeftBlockType(level) {
	this.child = null;
	this.solid = true;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/pipe_left.png")
	});
	this.width = 50;
	this.height = 100;
	this.depth = 50;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(60, 50, 10), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function PipeLeftBlockType(level) {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/pipe_left.png")
	});
	this.width = 40;
	this.height = 100;
	this.depth = 50;
	this.x = 5;
	this.y = 0;
	this.z = 0;
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(40, 50, 10), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.solid = true;
	this.cube = this.create();
}
function PipeRightBlockType(level) {
	this.child = null;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/pipe_right.png")
	});
	this.width = 40;
	this.height = 100;
	this.depth = 50;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(40, 50, 10), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.solid = true;
	this.cube = this.create();
}
/***
@module blocks

**/
function TegelBlockType(level) {
	this.width = 50;
	this.height = 50;
	this.depth = 50;
	this.child = null;
	this.x = 0;
	this.solid = true;
	this.y = 0;
	this.z = 0;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/tegel.png")
	});
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
		if(direction == COLLISION_FROM_BELOW) {
			if(currentLevel.player.move_y > 0) {
			// console.log(scene);
			// console.log(body);
				currentLevel.scene.remove(this.child.cube);
				
				this.child.gone = true;
			}
		}
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function OutDoorBlockType(level) {
	this.width = 50;
	this.height = 50;
	this.depth = 50;
	this.child = null;
	this.x = 0;
	this.y = 0;
	this.z = -2;
	this.solid = false;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/door_out.png")
	});
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 10), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function InDoorBlockType(level) {
	this.width = 50;
	this.height = 50;
	this.depth = 50;
	this.child = null;
	this.x = 0;
	this.y = 0;
	this.solid = false;
	this.z = -2;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/door_in.png")
	});
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 10), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function LightBlockType(level) {
	this.width = 50;
	this.height = 50;
	this.depth = 50;
	this.child = null;
	this.solid = true;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/lightbox.png")
	});
	/***
	@function onCollision
	***/
	this.onCollision = function (body, direction) {
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function StoneBlockType(level) {
	this.width = 50;
	this.height = 50;
	this.child = null;
	this.depth = 50;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.solid = true;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/stone.png")
	});
	this.onCollision = function (body, direction) {
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function GroundBlockType(level) {
	this.width = 50;
	this.height = 50;
	this.depth = 50;
	this.x = 0;
	this.solid = true;
	this.y = 0;
	this.z = 0;
	this.material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("img/" + level.palette + "/ground.png")
	});
	this.onCollision = function (body, direction) {
	
	};
	this.create = function () {
		var cube = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), this.material);
		cube.overdraw = true;
		return cube;
	};
	this.cube = this.create();
}
function collision (body) {
	if(this.gone)
		return;
	
	// TODO Add collision code here
	// If left
	var inVerticalRange = body.y < this.y   && body.y > this.y - body.height;
	var inHorizontalRange = body.x > this.x - body.width && body.x < this.x + this.width;
	var inVerticalRangeC = body.y < this.y - 10 && body.y > this.y - body.height + 10;
	var inHorizontalRangeC = body.x > this.x - body.width + 10 && body.x < this.x + this.width - 10;
	
	var onLeft = body.x > this.x - body.width && body.x < this.x + this.width /2;
	var onRight = body.x < this.x + this.width && body.x > this.x + this.width /2;
	var onTop = body.y < this.y + body.height && body.y > this.y - this.height / 2;
	var onBottom = body.y > this.y - this.height && body.y < this.y - this.height / 2;
	if(this.type.solid) {
		if(body.move_x > 0 ) {
			
			if(onLeft && inVerticalRange) {
				this.type.onCollision(body, COLLISION_FROM_LEFT);
				body.move_x = 0;
				return  COLLISION_FROM_LEFT;
			}
			
		}
		if(body.move_x < 0 ) {
			
			if(onRight && inVerticalRange) {
				this.type.onCollision(body, COLLISION_FROM_LEFT);
				body.move_x = 0;
				return COLLISION_FROM_LEFT;
			 }
			
			
		}
		if(body.move_y < 0 ) {
			
			if((onTop || body.onGround) && inHorizontalRangeC) {
				
				this.type.onCollision(body, COLLISION_FROM_ABOVE);
				body.move_y = 0.1;
			
				currentLevel.foundGround = true;
				return COLLISION_FROM_ABOVE;
			}
			
		}
		if(body.move_y > 0 ) {
			
			if(onBottom && inHorizontalRangeC) {
				this.type.onCollision(body, COLLISION_FROM_BELOW);
				body.move_y = -2;
				return  COLLISION_FROM_BELOW;
			}
			
			
		}
	} else {
		if(inVerticalRange && inHorizontalRange)
			this.type.onCollision(body, 0);
	}
		
	
}
function y_collision (body) {
	if(this.gone)
		return;
	
	// TODO Add collision code here
	// If left
	var inVerticalRange = body.y > this.y  - this.height && body.y < this.y + body.height;
	var inHorizontalRange = body.x > this.x - body.width && body.x < this.x + this.width;
	
	var onLeft = body.x > this.x - body.width && body.x < this.x + this.width /2;
	var onRight = body.x < this.x + this.width && body.x > this.x + this.width /2;
	var onTop = body.y < this.y + body.height && body.y > this.y - this.height / 2;
	var onBottom = body.y > this.y - this.height && body.y < this.y - this.height / 2;
	if(this.move_x > 0 ) {
		
		if(onLeft && inVerticalRange) {
			
			body.move_x = 0;
			return  COLLISION_FROM_LEFT;
		}
		
	}
	if(this.move_x < 0 ) {
		
		if(onRight && inVerticalRange) {
			this.move_x = 0;
			return COLLISION_FROM_LEFT;
		 }
		
		
	}
	if(this.move_y < 0  ) {
		
		if((onTop || currentLevel.foundGround) && inHorizontalRange ) {
			
			this.move_y = 0;
		
			currentLevel.foundGround = true;
			return COLLISION_FROM_ABOVE;
		}
		
	}
	if(this.move_y > 0 ) {
		
		if(onBottom && inHorizontalRange) {
			this.move_y = -2;
			return  COLLISION_FROM_BELOW;
		}
		
		
	}
	
		
	
}
var COLLISION_FROM_LEFT = 0;
var COLLISION_FROM_UP = 1;
var COLLISION_FROM_DOWN = 2;
var COLLISION_FROM_RIGHT = 3;
var COLLISION_FROM_BEHIND = 4;
var COLLISION_FROM_FRONT = 5;
var COLLISION_FROM_ABOVE = 6;
var COLLISION_FROM_BELOW= 6;
function Block(level, x, y, z, type) {
	this.type = type;

	this.type.child = this;
	
	// // console.log(this.cube);
	this.gone = false;
	this.x = x;
	this.y = y;
	this.z = z;
	this.width = type.width;
	this.height = type.height;
	this.depth = type.depth;
	this.cube = this.type.cube;
	this.cube.position.x = x;
	this.cube.position.y = y;
	this.cube.position.z = z;
	
	/***
	@function isCollison
	@description Check if the body is collision with the block
	@returns pos zero if not, -1 if left, 1 if right, -2 is below, 2 if above
	**/
	this.onCollision = collision;
}
function gamepadConnected(evt)
{
  // // console.log(evt); 
}
function moveAnalogSticks(evt) {
	// // console.log(evt.axis, evt.value);
}
var jump = false;
window.addEventListener("MozGamepadAxisMove", moveAnalogSticks);
window.addEventListener('gamepadConnected', gamepadConnected);
window.addEventListener("scroll", function (e) {

	// console.log(e);
});
window.onkeyup = function (e) {

	
	if(e.keyIdentifier == "Left") {
		walking = false;
		if(currentLevel.player.move_x < 0) {
			//player.move_x = 0;
		}
	} 
	if(e.keyIdentifier == "Right") {
		walking = false;
		if(currentLevel.player.move_x > 0) {
			//player.move_x = 0;
			
		}
	}
	if(e.keyIdentifier == "Up" ) {
		for(var i = 0; i < currentLevel.departures.length; i++) {
		}
		if(currentLevel.player.move_z < 0) {
	//		player.move_z = 0;
		}
	}
	if(e.keyIdentifier == "Down" ) {
		if(currentLevel.player.move_z > 0) {
//			player.move_z = 0;
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
	// // console.log(e);
	if(e.keyIdentifier == "Left") {
		if(currentLevel.player.move_x > -5) {
			currentLevel.player.move_x -= 0.5;
			walking = true;
		}
	} 
	if(e.keyIdentifier == "Up") {
	//	player.move_z = -5;
		for(var i = 0; i < currentLevel.departures.length; i++) {
			var departure = currentLevel.departures[i];
			console.log(departure);
			if(
			currentLevel.player.x > departure.x * 50 - currentLevel.player.width &&
			currentLevel.player.x < departure.x * 50 + 50 && 
			currentLevel.player.y < departure.y * 50 + currentLevel.player.y &&
			currentLevel.player.y > departure.y * 50 - 50/2
			) {
				loadLevel(departure.target.level, departure.target.x, departure.target.y);
			}
		}
	} 
	if(e.keyIdentifier == "Down") {
	//	player.move_z = 5;
		for(var i = 0; i < currentLevel.departures.length; i++) {
			var departure = currentLevel.departures[i];
			console.log(departure);
			if(
			currentLevel.player.x > departure.x * 50 - currentLevel.player.width &&
			currentLevel.player.x < departure.x * 50 + 50 && 
			currentLevel.player.y < departure.y * 50 + currentLevel.player.y &&
			currentLevel.player.y > departure.y * 50 - 50/2
			) {
				loadLevel(departure.target.level, departure.target.x, departure.target.y);
			}
		}
	} 
	if(e.keyIdentifier == "Right") {
		if(currentLevel.player.move_x < 5) {
			currentLevel.player.move_x +=.5;
			walking = true;
		}
	}
	if(e.keyIdentifier == "U+0020") {
		//if(currentLevel.player.onGround) 
		{
			currentLevel.player.onGround = false;
			currentLevel.player.move_y = 6;
			jump=true;
		}
	}
};
/**
@module sprites
**/
function Enemy () {
	var mario_material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("mario.png")
	});
	this.mario = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 0), mario_material);
	this.onGround = false;
	this.mario.position.x = 0;
	this.mario.position.y = 0;
	this.mario.position.z =  0;
	this.depth = 50;
	this._z = 0;
	this.mario.width = 50;
	this.mario.height = 50;
	this.width = 50;
	this.height = 50;
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
	this.collision = y_collision;
	/**
	@function play
	Play actions
	**/
	this.play = function () {
		//// console.log("A", this.onGround);
		
		if(!self.onGround && !jump) 
		{
		
			this.move_y -= 0.1;
			// // console.log(this.move_y);
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
		for(var i = 0; i < currentLevel.blocks.length; i++) {
			var block = currentLevel.blocks[i];
			if(this.collision(block) == COLLISION_FROM_LEFT) {
				this.move_x = -this.move_x;
			}
			if(this.collision(block) == COLLISION_FROM_RIGHT) {
				this.move_x = this.move_x;
			}
		}
		this.player.set_camera();
		if(this.y < 0) {
			die();
			
		}
	};
	
	var self = this;
}
var walking = false;
/**
@class MarioBody
**/
function MarioBody() {	
	var mario_material = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("mario.png")
	});
	this.mario = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 0), mario_material);
	this.onGround = false;
	this.mario.position.x = 0;
	this.mario.position.y = 0;
	this.mario.position.z =  0;
	this.depth = 50;
	this._z = 0;
	this.mario.width = 50;
	this.mario.height = 50;
	this.width = 50;
	this.height = 50;
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
		//// console.log("A", this.onGround);
			
		if(!self.onGround && !jump) 
		{
		
			this.move_y -= 0.1;
			// // console.log(this.move_y);
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
		if(this.move_x > 0 && !walking) {
			this.move_x -= 0.05;
		}
		if(this.move_x < 0  && !walking) {
			this.move_x += 0.05;
		}
		if(this.y < -100) {
			die();
		}
		
		this.set_camera();
	};
	/**
	@description Synchronize camera
	**/
	this.set_camera = function () {
		
		
		if(currentLevel != null) {
			this.camera_x = currentLevel.player.x;
			if(this.camera_y < currentLevel.height - window.innerHeight /2  + 50) {
				this.camera_y = currentLevel.height - window.innerHeight /2 + 50
			}
			if(this.camera_x < currentLevel.width - window.innerWidth / 3) {
				this.camera_x = currentLevel.width - window.innerWidth/ 3;
			}
			
			currentLevel.camera.position.x = this.camera_x;
		currentLevel.camera.position.y = this.camera_y;
		}
		
		
		//// console.log(camera_z);
	};
	var self = this;
}
/***
@class Level
@description Creates a new level
@param url The url to the level file
***/
function Level(url, dest_x, dest_y) {
	this.url = url;
	this.start_x = 0;
	this.start_y = 0;
	this.width  = 0;
	this.height = 0;
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 11000);
	this.camera.position.z = 1200;
	this.camera.position.y = 202;
	this.camera.rotation.y = -.0;
	this.player = null;
	// scene
	
	// material 
	this.mario = new MarioBody();
//	alert(mario);
	this.player = this.mario;
	this.mario.play();
	this.scene.add(this.mario.mario);
	this.foundGround = [];
	this.parseBlock = function (_block, type) {
		var type_id = _block.type;
		var left = _block.x;
		console.log(_block);
		var top = _block.y;
		var zz = _block.z ;
		var repeat = _block.repeat;
		if(typeof(repeat) === "undefined") {
			repeat = { x:1, y:1, z :1};
			
		} 
		// Choose type
		if(type_id > 0) {
			
			//// console.log(repeat);
			for(var x = 0; x < repeat.x; x++) {
				for(var y = 0; y < repeat.y; y++) {
					for(var z = 0; z < repeat.z; z++) {
						// console.log("GF");
						var type = null;
						
						switch(type_id) {
							case 1:
								type = new GroundBlockType(level);
								break;
							case 2:
								type = new StoneBlockType(level);
								break;
							case 3:
								type = new TegelBlockType(level);
								break;
							case 4:
								type = new LightBlockType(level);
								break;
							case 5:
								type = new PipeLeftBlockType(level);
								break;
							case 6:
								type = new PipeRightBlockType(level);
								break;
							case 7:
								type = new PipeULeftBlockType(level);
								break;
							case 8:
								type = new PipeURightBlockType(level);
								break;
							case 8:
								type = new InDoorBlockType(level);
								break;
							case 9:
								type = new OutDoorBlockType(level);
								break;
							case 10:
								type = new CoinBlockType(level);
								break;
						}
						console.log(x);
						var block = new Block(level, (left + x) * 50 + type.x, (top + y) * 50 + type.y, (zz + z) * 50 + type.z,  type);
						
						this.blocks.push(block);
					}
				}
			}
			
		}
		switch(type_id) {
			case 1:
				type = new GroundBlockType(level);
				break;
			case 2:
				type = new StoneBlockType(level);
				break;
			case 3:
				type = new TegelBlockType(level);
				break;
			case 4:
				type = new LightBlockType(level);
				break;
			case 5:
				type = new PipeLeftBlockType(level);
				break;
			case 6:
				type = new PipeRightBlockType(level);
				break;
			case 7:
				type = new PipeULeftBlockType(level);
				break;
			case 8:
				type = new PipeURightBlockType(level);
				break;
			case 8:
				type = new InDoorBlockType(level);
				break;
			case 9:
				type = new OutDoorBlockType(level);
				break;
			case 10:
				type = new CoinBlockType(level);
				break;
		}
		console.log(x);
		var block = new Block(level, (left ) * 50 + type.x, (top ) * 50 + type.y, (zz) * 50 + type.z,  type);
		
		return (block);
		
	};
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
	this.ambientLight = new THREE.AmbientLight(0x555555);
	this.scene.add(this.ambientLight);

	
	
	// add directional light source
	this.directionalLight = new THREE.DirectionalLight(0xffffff);
	this.directionalLight.position.set(1, 1, 1).normalize();
	this.scene.add(this.directionalLight);
	

	/*
	 * wait for texture image to load before
	 * starting the animation
	 */ 
	
	
	var self = this;
	var xmlHttp = new XMLHttpRequest();
	
	xmlHttp.open("GET", url+"?c="+Math.random(), false);
	xmlHttp.send();
	this.blocks = [];
	this.sprites = [];
	this.departures = [];
	// // console.log(xmlHttp);
	var level = eval("(" + xmlHttp.responseText + ")");
	console.log("level", level);
	document.body.style.background = level.background;
	this.start_x = level.start.x * 50;
	
	this.start_y = level.start.y * 50;
	if(typeof(dest_x) !== "undefined") {
		this.start_x = dest_x * 50;
	}
	if(typeof(dest_y) !== "undefined") {
		this.start_y = dest_y * 50;
	}
	
	this.width = level.width * 50;
	this.height = level.height * 50;
	console.log("start", this.start_y);
	this.palette = level.palette;
	if(typeof(level.departures) !== "undefined") {
		console.log("Found departures");
		for(var i = 0; i < level.departures.length; i++) {
			this.departures.push(level.departures[i]);
			console.log("A");
		}
	}
	console.log(level.blocks);
	for(var i = 0; i < level.blocks.length; i++) {
		var _block = level.blocks[i];
		console.log(_block);
		if(isNaN(_block.type)) {
			var type = tileset[_block.type];
			for(var i =0 ; i <  type.length; i++) {
				var block = type[i];
				
				block.x += _block.x;
				block.y += _block.y;
				block.z += _block.z;
				this.blocks.push(this.parseBlock(block, type));
				
			}
			continue;
		} 
		console.log("FG");
		this.blocks.push(this.parseBlock(_block, _block.type));
	
		
	}
	if(typeof(level.labels) !== "undefined") {
		for(var i = 0; i < level.labels.length; i++) {
			var label = level.labels[i];
			var text3d = new THREE.TextGeometry(label.text, {
				size: 25,
				height:10,
				font: "helvetiker"
			});
			text3d.computeBoundingBox();
			var textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: true } );
		
			var text = new THREE.Mesh( text3d, textMaterial);
			text.position.x = label.x * 50;
			text.position.y = label.y * 50;
			text.depth = 1;
			text.position.z = -50;

			text.rotation.x = 0;
			text.rotation.y = 0;
			var parent = new THREE.Object3D();
			this.scene.add( text );
		}
	}
	if(false) {
		this.width = level.split(/\n/g)[0].length; // width;
	
		this.height = level.split(/\n/g).length -1;
		// // console.log(this);
		this.blocks = [];
		var n = 0;
		for(var y = 0; y < this.height; y++) {
			n++;
			for(var x = n; x < this.width; x++) {
				
				var b = level[x + y * this.width]; // Get character
				var type_id = parseInt(b);
				var top = /*50 * this.height -*/ y * 50;
				var left = (x - (y+1)) * 50;
				// // console.log("F");
				if(b == "P") { // If player	
					// // console.log("DADAA");
					player.x = x;
					// // console.log(y);
					player.y = y * 50;
				}
				
			}
		}
	}
	this.activate = function () {
		currentLevel = this;
		for(var i = 0; i < this.blocks.length; i++) {
			// console.log("F");
			 // console.log(block);
			var block = this.blocks[i];
			this.scene.add(block.cube);
		}
		this.player.x = this.start_x;
		this.player.y = this.start_y;
		this.player.set_camera();
		
		// alert("A");
	};
}
var dragging = false;
var middle = window.innerWidth /2;
var diff = 0;
document.onmousedown = function (e) {
	dragging = true;
	// console.log(middle);
	diff = middle - e.x;
	prevY = -(e.y - window.innerHeight);
	
	currentLevel.player.move_y = -( e.y - window.innerHeight)*0.02;
	prevY = y;
		
		
};
var currentAngle = 0;
window.onmouseup = function (e) {
	dragging = false;
	middle = e.x + diff;
walking = false;
};
var angle = 0;
var prevY = 0;
window.onmousemove = function (e) {
	
	/*if(dragging) 
	{
		// // console.log("dragging");
	
		// // console.log(e);
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		angle = ((e.x + diff) / width) ;

	// console.log("middle", diff, e.x + diff,angle);
	angle *=0.9;
		// // console.log(angle);
		camera.rotation.y = angle;
	}*/
	/*if(e.y < window.innerHeight /1.25 ) {
		
		
		if(e.x > window.innerWidth /2) {
			if(currentLevel.player.move_x < 3)
			currentLevel.player.move_x += 0.5 * ((window.innerWidth - e.x) / (window.innerWidth /2)) ;
			walking = true;
		}
		if(e.x < window.innerWidth /2) {
			if(currentLevel.player.move_x > -3)
			currentLevel.player.move_x += 0.5 * -(window.innerWidth /2 - e.x) / (window.innerWidth/2);
			walking = true;
		}
	} else {
		walking = false;
	}*/
};
function animate(lastTime){
	// update
	var date = new Date();
	var time = date.getTime();
	var timeDiff = time - lastTime;
	
//    three.cube.rotation.y += angleChange;
	lastTime = time;
	
	// render
	renderer.render(currentLevel.scene, currentLevel.camera);
	currentLevel.camera.aspect = window.innerWidth / window.innerHeight;
	for(var i = 0; i < currentLevel.sprites.length; i++) {
		var sprite = currentLevel.sprites[i];
		sprite.play();
	}
	// request new frame
	requestAnimFrame(function(){
		animate(lastTime);
	});
}
function gameTick () {
	//// console.log("F");
	var a = (currentLevel.player.onGround + " a");
	currentLevel.foundGround = false;
	currentLevel.player.set_camera();
	
	for(var i = 0; i < currentLevel.blocks.length; i++) {
		var block = currentLevel.blocks[i];
		
		block.onCollision(currentLevel.player); 
	
	}
	currentLevel.player.onGround = currentLevel.foundGround;
	// console.log("D", player.onGround);
	var a = (currentLevel.foundGround);
	currentLevel.player.play();
	var b = (currentLevel.foundGround);
	// // console.log(a, b);
	}
var currentLevel = null;
var renderer = null;
function loadLevel (level, x, y) {
	var firstLevel = new Level(level, x, y);
	currentLevel = firstLevel;
	firstLevel.activate();
}
var textOverlays = [];
function addOrEditTextOverlay(id, text, left, top) {
	var txt = document.getElementById("label_" + id);
	if(!txt) {
		txt = document.createElement("span");
		txt.setAttribute("style", "z-index: 12; font-size:35px; font-family: Terminal; color: #FFFFFF; text-shadow: 1px 1px 0px #000000; position: absolute; left: " + left +"px; top: " + top + "px; width:70%; height:32px");
		txt.innerHTML = text;
		txt.setAttribute("id", "label_" + id);
		console.log(txt);
		document.body.appendChild(txt);
	} else {
		txt.innerHTML = text;
	}
}
function die() {
	lives -= 1;
	if(lives > -1) {
		loadLevel(currentLevel.url);
		points = 0;
		lives = 3;
		coins = 0;
	} else {
		loadLevel("levels/1-1.json");
	}
	updateHeader();
}
var tileset = null;
function loadTileSet(url) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", url+"?c=" + Math.random(), false);
	xmlHttp.send(null);
	tileset = eval("(" + xmlHttp.responseText + ")");
}
window.onload = function() {
	var angularSpeed = 0.2; // revolutions per second
	var lastTime = 0;
	setInterval( gameTick, 10);
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	
	// Load Tilese
	loadTileSet("levels/tileset.json");
	// camera
	var textureImg = new Image();
	textureImg.onload = function(){
		animate(lastTime, this);
	};
	textureImg.src = "crate.jpg";
	loadLevel("levels/1-1.json");
	updateHeader();
	
};
