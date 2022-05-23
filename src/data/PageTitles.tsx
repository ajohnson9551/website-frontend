let title = new Map();

const contactTitle = <div className="pageTitle"><h1>CONTACT</h1></div>;
title.set("contact", contactTitle);

const mathTitle = <div className="pageTitle"><h1>MATHEMATICS</h1></div>;
title.set("math", mathTitle);

const llTitle = <div className="pageTitle"><h1>LUNAR <span className="emph">LANDER</span></h1></div>;
title.set("lunarlander", llTitle);

const cryptoTitle = <div className="pageTitle"><h1>PUBLIC KEY <span className="emph">CRYPTOGRAPHY</span></h1></div>;
title.set("cryptography", cryptoTitle);

const drTitle = <div className="pageTitle"><h1>DIGIT <span className="emph">RECOGNITION</span></h1></div>;
title.set("digitrecognition", drTitle);

const welcomeTitle = <div className="pageTitle"><h1>ALEXANDER <span className="emph">JOHNSON</span></h1></div>;
title.set("welcome", welcomeTitle);

const errorTitle = <div className="pageTitle"><h1>Page not found!</h1></div>;
title.set("error", errorTitle);

export default title;