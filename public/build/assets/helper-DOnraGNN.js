import{j as a}from"./app-DzMduIpi.js";const n=r=>{const{type:e,value:s,prefix:t}=r;let i="",l=t;return e=="h1"?(i="text__h1",l=""):e=="li"&&(i="text__li",l=l),a.jsxs("div",{className:"line",children:[a.jsx("p",{className:"line__prefxix",children:l}),a.jsxs("p",{className:i,children:[s," ",a.jsx("br",{})]})]})},x=r=>{if(!r||r.length==0)return;let e=0,s="";return r.split(`
`).map((t,i)=>t.trim().startsWith("#")?(e=0,n({prefix:s,value:t.slice(1).toUpperCase(),type:"h1"})):t.trim().startsWith("-")?(e+=1,n({prefix:(e-1+1).toString(),value:t.slice(1).toUpperCase(),type:"li"})):(e=0,n({prefix:s,value:t})))};export{x as f};