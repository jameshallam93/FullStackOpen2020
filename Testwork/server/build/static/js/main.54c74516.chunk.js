(this.webpackJsonpsandbox=this.webpackJsonpsandbox||[]).push([[0],{38:function(t,n,e){},39:function(t,n,e){"use strict";e.r(n);var c=e(0),o=e(2),r=e.n(o),a=e(15),i=e.n(a),u=e(6),s=e(4),l=function(t){var n=t.note,e=t.toggleImportance,o=t.handleDelete,r=n.important?"make not important":"make important";return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("li",{className:"note",children:n.content}),Object(c.jsx)("button",{onClick:e,children:r}),Object(c.jsx)("button",{onClick:o,children:"Delete "})]})},j=function(t){var n=t.message;return null===n?null:(console.log(n),Object(c.jsx)("div",{className:"error",children:n}))},d=e(3),b=e.n(d),f="/api/notes",h=function(){return b.a.get(f).then((function(t){return t.data}))},m=function(t){return b.a.post(f,t).then((function(t){return t.data}))},O=function(t,n){return b.a.put("".concat(f,"/").concat(t),n).then((function(t){return t.data}))},p=function(t){b.a.delete("".concat(f,"/").concat(t))},g=function(t){var n=t.notes,e=Object(o.useState)("a new note.."),r=Object(s.a)(e,2),a=r[0],i=r[1],d=Object(o.useState)([]),b=Object(s.a)(d,2),f=b[0],g=b[1],x=Object(o.useState)(!0),v=Object(s.a)(x,2),S=v[0],k=v[1],w=Object(o.useState)(null),D=Object(s.a)(w,2),C=D[0],I=D[1];Object(o.useEffect)((function(){h().then((function(t){g(t)}))}),[]);var N=S?f:f.filter((function(t){return!0===t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes"}),Object(c.jsx)(j,{message:C}),Object(c.jsxs)("button",{onClick:function(){return k(!S)},children:["Show ",S?"important":"all"]}),Object(c.jsx)("ul",{children:N.map((function(t){return Object(c.jsx)(l,{note:t,handleDelete:function(){return n=t.id,p(n),void g(f.filter((function(t){return t.id!==n})));var n},toggleImportance:function(){return function(t){var e=f.find((function(n){return n.id===t})),c=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});O(t,c).then((function(n){g(f.map((function(e){return e.id!==t?e:n})))})).then(console.log("Note importance now set to ".concat(e.important))).catch((function(c){I("Error: ".concat(c," : ").concat(e.content," was already deleted")),setTimeout((function(){I(null)}),5e3),g(n.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault(),console.log("button pressed",t.target);var n={content:a,date:(new Date).toISOString(),important:Math.random()<.5};m(n).then((function(t){g(f.concat(t))}))},children:[Object(c.jsx)("input",{value:a,onChange:function(t){console.log(t.target.value),i(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]})]})};e(38);i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.54c74516.chunk.js.map