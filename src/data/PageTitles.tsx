let title = new Map();

const contactTitle = <div className="pageTitle"><h1>Contact</h1></div>;
title.set("contact", contactTitle);

const mathTitle = <div className="pageTitle"><h1><span className="emph">MATHEMATICS</span></h1></div>;
title.set("math", mathTitle);

const llTitle = <div className="pageTitle"><h1>LUNAR <span className="emph">LANDER</span></h1></div>;
title.set("lunarlander", llTitle);

const cryptoTitle = <div className="pageTitle"><h1>PUBLIC KEY <span className="emph">CRYPTOGRAPHY</span></h1></div>;
title.set("cryptography", cryptoTitle);

const drTitle = <div className="pageTitle"><h1>DIGIT <span className="emph">RECOGNITION</span></h1></div>;
title.set("digitrecognition", drTitle);

const welcomeTitle = <div className="pageTitle"><h1>Welcome!</h1></div>;
title.set("welcome", welcomeTitle);

export default title;