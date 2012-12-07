function toRad (d) {
	var r = d*Math.PI/180.0;
	return r;
}

function dot (v1,v2) {
	return v1[0]*v2[0]+v1[1]*v2[1];
}

function n (v) {
	var r = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
	if (r == 0)
		return [0,0];
	return [v[0]/r,v[1]/r];
}

function Car () {
	this.p = [0,0];
	this.v = [0,0];
	this.a = [0,0];
	this.ang = 0;
	this.vang = 0;
	this.mass = 1286; // kg

	this.size = 2;

	this.dir = 0;

	this.engineDist = 45;
	this.controlTiresDist = -45;

	this.smoke0 = new JSSmokeSource();
	particles.sources.push(this.smoke0);
	this.smoke1 = new JSSmokeSource();
	particles.sources.push(this.smoke1);

	this.smoke0.stop = true;
	this.smoke1.stop = true;

	this.engineTorque = 0;
	this.wheelRay = 0.2;

	this.gearRatio = 1;

	this.gearTorque = this.engineTorque/this.gearRatio;
	this.engineRpm = 0;

	this.engine = function () {
		this.engineTorque = this.engineRpm/10;

		this.gearbox();
	}

	this.gearbox = function () {
		this.gearTorque = this.engineTorque*this.gearRatio;
	}

	this.getSpeed = function () {
		return Math.sqrt(this.v[0]*this.v[0]+this.v[1]*this.v[1])+0.001;
	}

	this.getAngle = function (v) {
		var scale = 45/Math.atan(1);
		return (scale*Math.atan2(v[0],v[1]));
	}

	this.applyTorque = function (f,d) {
		this.vang += 0.01*Math.sin(toRad(this.getAngle(f)+this.ang))*(Math.sqrt(f[0]*f[0]+f[1]*f[1]))*d;
	}

	this.applyForce = function (f) {
		this.a[0] += f[0]/this.mass;
		this.a[1] += f[1]/this.mass;
	}

	this.step = function () {
		this.engine();
	
		this.smoke0.p = [this.p[0]+Math.cos(toRad(this.ang+80))*(-45/this.size),this.p[1]+Math.sin(toRad(this.ang+80)*(-45/this.size))];
		this.smoke1.p = [this.p[0]+Math.cos(toRad(this.ang+110))*(-45/this.size),this.p[1]+Math.sin(toRad(this.ang+110)*(-45/this.size))];

		if (Math.abs(dot([Math.cos(toRad(this.ang)),Math.sin(toRad(this.ang))],this.v)) > 14) {
			this.smoke0.stop = false;
			this.smoke1.stop = false;
		}
		else {
			this.smoke0.stop = true;
			this.smoke1.stop = true;
		}

		this.applyForce([Math.cos(toRad(this.ang+90))*this.gearTorque*0.7*3.7 / this.wheelRay ,Math.sin(toRad(this.ang+90))*this.gearTorque*0.7*3.7 / this.wheelRay]);

		this.applyTorque([Math.cos(toRad(this.ang))*this.getSpeed()*this.dir,Math.sin(toRad(this.ang))*this.getSpeed()*this.dir],this.controlTiresDist/this.size);

		//this.engineRpm = this.getSpeed()*this.wheelRay/this.gearRatio*1000;

		this.engineRpm *= 0.999;

		this.dir *= 0.98;

		this.p[0] += this.v[0]/this.size;
		this.p[1] += this.v[1]/this.size;
		this.v[0] += this.a[0];
		this.v[1] += this.a[1];
		this.ang += this.vang;
		this.vang*=0.90;
		this.a[0]*=0.98;
		this.a[1]*=0.98;
		var d = dot(n([Math.cos(toRad(this.ang)),Math.sin(toRad(this.ang))]),n(this.v));
		this.v[0]-=(d*0.99)*Math.cos(toRad(this.ang));
		this.v[1]-=(d*0.99)*Math.sin(toRad(this.ang));
		this.v[0]*=0.90* (1-1/2 * 0.36 * (this.getSpeed()/100)*(this.getSpeed()/100));
		this.v[1]*=0.90* (1-1/2 * 0.36 * (this.getSpeed()/100)*(this.getSpeed()/100));
	}

	this.draw = function () {
		html5.context.save();
		html5.context.fillStyle="white";
		html5.context.translate(this.p[0],this.p[1]);
		html5.context.rotate(toRad(this.ang));
		html5.context.drawImage(html5.image("car"),-25/this.size,-50/this.size, 42/this.size, 106/this.size)
		html5.context.restore();
	}

	this.forward = function () {
		this.engineRpm ++;
	}
	this.backward = function () {
		this.engineRpm *= 0.1;
	}
	
	this.turnLeft = function () {
		this.dir += 0.005;
	}

	this.turnRight = function () {
		this.dir -= 0.005;
	}
	
	this.brake = function () {
		this.v[0] *= 0.96;
		this.v[1] *= 0.96;

		if (this.getSpeed() > 10) {
			this.smoke0.stop = false;
			this.smoke1.stop = false;
		}
	}
}
