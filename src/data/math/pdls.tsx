import { pdlModel } from "../../models/math/pdlModel";

let list: pdlModel[] = [];

const d1 = <p>A corrected proof of a lemma in a <a href="https://www.sciencedirect.com/science/article/pii/S0168007298000505">paper of Casanovas</a>.</p>
list.push({path: "pdfs/Simple Theories Upper Bound.pdf", date: "May 2021", title: "An Upper Bound on Partial Types in Simple Theories", description: d1});

const d2 = <p>A quick computation on the number of partial types in o-minimal theories. I show that it has the expected number.</p>
list.push({path: "pdfs/Partial Types in O-Minimal Theories.pdf", date: "Apr 2021", title: "Counting Partial Types in O-Minimal Theories", description: d2});

const d3 = <p>An exposition on the proof that there are (at least) four classes of Keisler's Order.</p>
list.push({path: "pdfs/Four Classes in Keisler's Order.pdf", date: "Mar 2021", title: "Four Classes of Keisler's Order", description: d3});

const d4 = <p>The slides used for a graduate talk given at UCLA on ultraproducts.</p>
list.push({path: "pdfs/Ultraproducts Talk.pdf", date: "Nov 12, 2020", title: "Ultraproducts and U Slides", description: d4});

const d5 = <p>My undergraduate thesis written at New College of Florida. I exposited on Morley's Categoricity Theorem and Shelah's Stability Spectrum Theorem, and translated Morley's "topological" definitions into Shelah's.</p>
list.push({path: "pdfs/New College Thesis.pdf", date: "Apr 24, 2018", title: "The Stability of Theories from Categoricity to their Spectrum", description: d5});

const d6 = <p>The slides given for my baccalaureate presentation while defending my thesis at New College of Florida.</p>
list.push({path: "pdfs/New College Thesis Presentation.pdf", date: "Apr 24, 2018", title: "The Stability of Theories from Categoricity to their Spectrum Slides", description: d6});

const d7 = <p>My paper written for the <a href="https://math.uchicago.edu/~may/REU2017/" target="blank">2017 Math REU</a> at the University of Chicago.</p>
list.push({path: "pdfs/Survey of Stability and Saturation.pdf", date: "Oct 11, 2017", title: "Counting and Realizing Types: A Survey of Stability and Saturation", description: d7});

export default list;