import Link from "next/link";
import { content } from "../content";
export const metadata = { title: "The Invisalign Revival Program" };
export default function Page(){return <section className="revival-section legacy-editorial"><div className="eyebrow">THE INVISALIGN REVIVAL PROGRAM</div><h1>Everything between your ad and your chair, handled.</h1><div className="program-list">{content.program.map((item,i)=><article key={item.title}><span>0{i+1}</span><div><h2>{item.title}</h2><p>{item.body}</p></div></article>)}</div><Link className="button" href="/#contact">Get your free Lead Leak Report ↗</Link></section>}
