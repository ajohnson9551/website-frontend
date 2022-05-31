let about = new Map();

const mathDesc = 
<div className="justifyMe">
	<p>Here you can find a selection of math papers written by myself over the course of my education. Often papers were written alongside reading courses and as such references are sometimes not given - I can recommend supplementary texts upon request. The image above is a qualifying exam problem done on a blackboard sometime in 2019.</p>
	<p>
		My main mathematical interests are set theory and model theory. At UCLA I passed the Basic, Algebra, and Logic qualifying exams and also have coursework in analysis and other branches. I enjoy teaching and have seven years of experience as a TA.
	</p>
</div>;
about.set("math", {imgPath: "images/math.jpg", desc: mathDesc, vert: false});

const llDesc = 
<div className="justifyMe">
	<p>The autopilot for my lunar lander game was trained using an <a href="https://en.wikipedia.org/wiki/Evolutionary_algorithm">evolutionary algorithm</a>. Each member of a population is scored based a provided fitness function, and the highest scoring members create children who inherit the "genes" (here, neural network parameters) of the parents with a small chance of mutation. Over several generations, the population's fitness will trend upward. Supervised training (e.g. gradient descent) is infeasible for training the autopilot since it is difficult to correlate small changes in network parameters to final score. Of independent interest, evolutionary algorithms have <a href="https://projecteuler.net/problem=185">diverse applications</a>.</p>

	<p>Try to land as well as the autopilot! Use the arrow keys to control the lunar lander with autopilot disabled.</p>

	<p><a href="https://github.com/ajohnson9551/neuralnetworkevolution">View on GitHub</a></p>
</div>
about.set("lunarlander", {imgPath: "images/lunarlander.jpg", desc: llDesc, vert: false});

const cryptoDesc = 
<div>
	<div className="justifyMe">
		<p>This public key cryptography demo is based on the <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">RSA System</a>, at the heart of which is Fermat's Little Theorem: </p>
	</div>
	
	<div className="text-center">
		<p>
			a^p ≡ a (mod p)
		</p>
	</div>
	<div className="justifyMe">
		<p>whenever p is prime. This theorem has the simple explanation that the multiplicative group of integers mod p has order p - 1. A basic padding scheme is used to harden against letter frequency attacks, though the message length is still recoverable and my implementation uses very small keys compared to real-world implementations.</p>

		<p>Every message needs a modulus, both to encrypt and decrypt. The public key is shared freely and used to encrypt messages, but only the private key can decrypt them. As a side note, the keys are interchangeable (i.e. the public key can also decrypt a message encrypted using the private key) so the owner of the private key can prove they posses it without sharing the key itself.</p>
	</div>
	

	<div className="disclaimer">
		<p>DISCLAIMER: Do not rely on this demo to secure sensitive data!</p>
	</div>
</div>;
about.set("cryptography", {imgPath: "images/cryptography.jpg", desc: cryptoDesc, vert: false});

const welcomeDesc = 
<div className="welcomeText centerMe spaceMe justifyMe">
	<p>Welcome! My name is Alexander Johnson. I am a software developer with a background in mathematics. Here you will find an interactive showcase of several of my projects and an assortment of mathematical writings. <a href="https://github.com/ajohnson9551/website-frontend">This website</a> was made using React with TypeScript and is hosted on an Amazon S3 bucket. Scripts must be enabled to view the interactive content!
	</p>

	<h5 className="text-center"><a href="https://github.com/ajohnson9551">GitHub</a></h5>
</div>
about.set("welcome", {imgPath:"images/welcome.jpg", desc: welcomeDesc, vert: true});

const drDesc = 
<div className="justifyMe">
	<p>This digit recognizer was trained using data from <a href="http://yann.lecun.com/exdb/mnist/">The MNIST Database</a>. The above image shows how a convolutional neural network can be configured in my framework. The trainer will then perform gradient descent on the network's parameters to classify any problem it is given. An implementation of back propagation was written from scratch that can train a network with any combination of layers. <a href="https://aparapi.com/">Aparapi</a> was used to parallelize the training with available hardware.</p>

	<p>Click and drag to draw, and move slowly for a denser line. You can draw on top of the training digits, or clear the canvas using the reset button. Write freely in your own script, though the recognizer works best if digits are scaled and centered similarly to the training data. The network used on this website achieves a score of 97% accuracy on training and test data.
	</p>
	<p><a href="https://github.com/ajohnson9551/gradientneuralnetwork/tree/aparapi">View on GitHub</a></p>
</div>;
about.set("digitrecognition", {imgPath:"images/digitrecognition.jpg", desc: drDesc, vert: false});

const contactDesc = 
	<div className="spaceMe centerMe">
		<h5>
			Email: <a href="mailto:ajohnson9551@gmail.com">ajohnson9551@gmail.com</a>
		</h5>
	</div>;
about.set("contact", {imgPath:"images/contact.jpg", desc: contactDesc, vert: true});

export default about;