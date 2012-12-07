function JSParticle () {
    this.p = [0,0];     // position.
    this.v = [0,0];     // vel.
    this.a = [0,0];     // acc.

    this.ang = 0;       // angle
    this.vang = 0;      // angular vel.

    this.life = false;

    this.c = [0,0,0];
    
    this.step = function () {
	this.ang += this.vang;
	this.v[0] += this.a[0];
	this.v[1] += this.a[1];
	this.p[0] += this.v[0];
	this.p[1] += this.v[1];
	this.life --;
    }

    this.draw = function () {
	html5.context.beginPath();
	html5.context.moveTo (this.p[0],this.p[1]);
	html5.context.lineTo (this.p[0]+5*Math.cos(this.toRad(this.ang)),this.p[1]+5*Math.sin(this.toRad(this.ang)));
	html5.context.strokeStyle = "rgba("+Math.floor(this.life*this.c[0])+","+Math.floor(this.life*this.c[1])+","+Math.floor(this.life*this.c[2])+","+0.2+")";
	html5.context.lineWidth = 0;
	html5.context.stroke();

	html5.context.beginPath();
	html5.context.arc(this.p[0], this.p[1], this.life/75.0, 0 , 2 * Math.PI, false);
	html5.context.fillStyle = "rgba("+Math.floor(this.life*this.c[0]*2)+","+Math.floor(this.life*this.c[1])+","+Math.floor(this.life*this.c[2])+","+0.2+")";
	html5.context.fill();
    }

    this.toRad = function (d) {
	var r = d*Math.PI/180.0;
	return r;
    }
}


function JSWaterSource (p,color) {
    this.p = [640/2,480/2];
    if (p)
		this.p = p;

	if (color)
		this.color = color;

    this.time = 0;

    this.step = function () {
	this.time++;
	if (this.time%60 < 50)
		return;

	var ps = new Array();
	var i;

	for (i=0;i<1;i++) {
		var p = new JSParticle();
		p.p[0] = this.p[0];
		p.p[1] = this.p[1];
		p.ang = Math.random()*16;
		p.a = [Math.cos(p.toRad(p.ang))*0,Math.sin(p.toRad(p.ang))*1];
		p.c[0] = this.color[0]*Math.pow((this.time-60),2);
		p.c[1] = this.color[1]*Math.pow((this.time-60),2);
		p.c[2] = this.color[2]*Math.pow((this.time-60),2);
		p.vang = Math.random()*0;
		p.life = 100;
		ps.push(p);
	}

	return ps;
    }
}

function JSSunSource (p) {
    this.p = [640/2,480/2];
    if (p)
	this.p = p;

    this.color = 1;

	this.time = 0;

	this.stop = false;

    this.step = function () {
		if (this.stop)
			return;

		this.time ++;

		var ps = new Array();
		var i;

		for (i=0;i<3;i++) {
			var lp = new JSParticle();
			lp.p[0] = this.p[0];
			lp.p[1] = this.p[1];
			lp.ang = this.time+Math.random()*1;
			lp.v = [Math.random()*0.1,Math.random()*0.1];
			lp.a = [0,-0.001];
			lp.c[0] = 1;
			lp.c[1] = 0.2;
			lp.c[2] = 0;
			lp.life = 500;
			lp.vang = Math.random()*0;
			ps.push(lp);
		}

		return ps;
    }
}

function JSParticleEngine () {
    this.sources = [];

    this.particles = [];

    this.step = function () {
	var i;
	for (i in this.sources) {
	    var p = this.sources[i].step();
	    if (p) {
		var j;
		for (j in p)
			this.particles.push(p[j]);
	    }
	}
    }

    this.draw = function () {
	var i;
	for (i = 0; i < this.particles.length; i++) {
		  if (this.particles[i].life <= 0) { 
			  this.particles.splice(i, 1);
			  i--;
		  }
	}
	for (i in this.particles) {
	    this.particles[i].step();
	    this.particles[i].draw();
	}
	var ctx = html5.context;

	ctx.font = "normal 10px sans-serif";
	ctx.fillStyle = 'white';
	ctx.fillText(""+this.particles.length,20,20);
    }
}
