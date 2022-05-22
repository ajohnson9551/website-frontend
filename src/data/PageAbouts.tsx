let about = new Map();

const mathDesc = <p>Here you can find a selection of math papers written by myself over the course of my education. Often papers were written alongside reading courses and as such references are sometimes not given - I can recommend supplementary texts upon request. The image above is a qualifying exam problem done on a blackboard sometime in 2019.</p>;
about.set("math", {imgPath: "images/math.jpg", desc: mathDesc});

const llDesc = <p>The autopilot for my lunar lander game was trained using an <a href="https://en.wikipedia.org/wiki/Evolutionary_algorithm" target="blank">evolutionary algorithm</a>. Each member of a population is scored based on whatever fitness function the framework is provided, and the highest scoring members create children who inherit the "genes" (here, neural network parameters) of the parents with a small chance of mutation. Over several generations, the fitness of the group trends upward. Supervised training (e.g. gradient descent) is not possible for problems like this since it is unknowable how a small change in parameter will effect the overall performance. Evolutionary algorithms have <a href="https://projecteuler.net/problem=185" target="blank">diverse applications</a>.

Try to land as well as the autopilot! Use the arrow keys to control the lunar lander with autopilot disabled. Score is computed by (100 - Impact Speed) + (0.05 * Remaining Fuel).
</p>
about.set("lunarlander", {imgPath: "images/lunarlander.jpg", desc: llDesc});

const cryptoDesc = <p>This public key cryptography demo is based on the <a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)" target="blank">RSA system</a>, at the heart of which is Fermat's Little Theorem. A basic padding scheme is used to harden against letter frequency attacks, though the message length is still recoverable and my implementation uses very small keys compared to real-world implementations.

Every message needs a modulus, both to encrypt or decrypt. The public key is shared freely and used to encrypt messages, but only the private key can decrypt them. As a side note, the keys are interchangeable (i.e. the public key can also decrypt a message encrypted using the private key) so the owner of the private key can prove they posses it without sharing the key itself.
</p>;
about.set("cryptography", {imgPath: "images/cryptography.jpg", desc: cryptoDesc});

const homeDesc = <p>Welcome to my website! My name is Alexander Johnson, and I am a software developer with a background in mathematics. Here you will find interactive showcases of several of my projects and an assortment of math papers. Everything was created by myself and is hosted on an AWS S3 bucket. Please enable JavaScript to view the interactive content!</p>
about.set("welcome", {imgPath:"images/welcome.jpg", desc: homeDesc});

const drDesc = <p>This digit recognizer was trained using data from <a href="http://yann.lecun.com/exdb/mnist/" target="blank">The MNIST Database</a>. The above image shows how a convolutional neural network is specified in my framework. The system will then attempt to train the network using gradient descent to classify whatever problem it is given. Gradients for each kind of layer were computed by hand, and the back propagation was written from scratch. <a href="https://aparapi.com/" target="blank">Aparapi</a> was used to parallelize the training with available hardware.

Click and drag to draw, and move slowly for a denser line. Feel free to sylize in your own script, though the recognizer works best if digits are scaled and centered similarly to the training data. The network used on this website achieves a score of 97% accuracy on training and test data.
</p>;
about.set("digitrecognition", {imgPath:"images/digitrecognition.jpg", desc: drDesc});

const contactDesc = 
	<div>
		Email:
		<h5>
			<a href="mailto:ajohnson9551@gmail.com">ajohnson9551@gmail.com</a>
		</h5>
	</div>;
about.set("contact", {imgPath:"images/contact.jpg", desc: contactDesc});

export default about;