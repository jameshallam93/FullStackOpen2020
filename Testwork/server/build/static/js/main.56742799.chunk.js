(this.webpackJsonpsandbox=this.webpackJsonpsandbox||[]).push([[0],{38:function(t,n,e){},39:function(t,n,e){"use strict";e.r(n);var c=e(0),o=e(2),r=e.n(o),a=e(15),i=e.n(a),u=e(6),s=e(4),l=function(t){var n=t.note,e=t.toggleImportance,o=t.handleDelete,r=n.important?"make not important":"make important";return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("li",{className:"note",children:n.content}),Object(c.jsx)("button",{onClick:e,children:r}),Object(c.jsx)("button",{onClick:o,children:"Delete "})]})},j=function(t){var n=t.message;return null===n?null:(console.log(n),Object(c.jsx)("div",{className:"error",children:n}))},d=e(3),b=e.n(d),f="/api/notes",h=function(){return b.a.get(f).then((function(t){return t.data}))},m=function(t){return b.a.post(f,t).then((function(t){return t.data}))},O=function(t,n){return console.log("ID: ".concat(t,", baseurl: ").concat(f)),b.a.put("".concat(f,"/").concat(t),n).then((function(t){return t.data}))},p=function(t){b.a.delete("".concat(f,"/").concat(t))},g=function(t){t.notes;var n=Object(o.useState)("a new note.."),e=Object(s.a)(n,2),r=e[0],a=e[1],i=Object(o.useState)([]),d=Object(s.a)(i,2),b=d[0],f=d[1],g=Object(o.useState)(!0),x=Object(s.a)(g,2),v=x[0],S=x[1],k=Object(o.useState)(null),w=Object(s.a)(k,2),D=w[0],I=w[1];Object(o.useEffect)((function(){h().then((function(t){f(t)}))}),[]);var C=v?b:b.filter((function(t){return!0===t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes"}),Object(c.jsx)(j,{message:D}),Object(c.jsxs)("button",{onClick:function(){return S(!v)},children:["Show ",v?"important":"all"]}),Object(c.jsx)("ul",{children:C.map((function(t){return Object(c.jsx)(l,{note:t,handleDelete:function(){return n=t.id,p(n),void f(b.filter((function(t){return t.id!==n})));var n},toggleImportance:function(){return function(t){var n=b.find((function(n){return n.id===t})),e=Object(u.a)(Object(u.a)({},n),{},{important:!n.important});O(t,e).then((function(n){f(b.map((function(e){return e.id!==t?e:n})))})).then(console.log("Note importance now set to ".concat(n.important))).catch((function(e){I("Error: ".concat(e," : ").concat(n.content," was already deleted")),setTimeout((function(){I(null)}),5e3),f(b.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault(),console.log("button pressed",t.target);var n={content:r,date:(new Date).toISOString(),important:Math.random()<.5};m(n).then((function(t){f(b.concat(t))}))},children:[Object(c.jsx)("input",{value:r,onChange:function(t){console.log(t.target.value),a(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]})]})};e(38);i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.56742799.chunk.js.map