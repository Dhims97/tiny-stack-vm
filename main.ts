import{readdirSync as d,readFileSync as f,writeFileSync as w,mkdirSync as m}from'node:fs';
const S='0134488<TTTTTTTT888888848884888T888TTTTTTTTTTTTT26620TTTTTTTTTTT48TTTTTTTTTTTTTT4404',W=[0,1,2,4],O=new Uint8Array(65536);
let L=0;
function r(p,g){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256);
let z=0,y=0,c=0,s=0,i=0;L=0;
for(;;){
if(s===1e6)return 10;
if(c<0||c>=n)return 9;
const o=p[c],v=S.charCodeAt(o)-48;
if(o>83||v>15)return 5;
const q=W[v&3];
if(c+q>=n)return 9;
s++;
if(z<(v>>2))return 2;
c+=1+q;
let R=0;if(o>47&&o<51)R=((p[c-2]|p[c-1]<<8)<<16)>>16;
switch(o){
case 0:return 0;
case 1:if(z>255)return 3;D[z++]=(p[c-1]<<24)>>24;break;
case 2:if(z>255)return 3;D[z++]=p[c-4]|p[c-3]<<8|p[c-2]<<16|p[c-1]<<24;break;
case 3:z--;break;
case 4:if(z>255)return 3;D[z]=D[z-1];z++;break;
case 5:{const t=D[z-1];D[z-1]=D[z-2];D[z-2]=t;break;}
case 6:if(z>255)return 3;D[z]=D[z-2];z++;break;
case 7:{const a=D[z-3];D[z-3]=D[z-2];D[z-2]=D[z-1];D[z-1]=a;break;}
case 23:D[z-1]=-D[z-1]|0;break;
case 27:D[z-1]=~D[z-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=D[z-1],a=D[z-2];
if(o>18&&o<23&&!b)return 4;
const t=o===16?a+b|0:o===17?a-b|0:o===18?Math.imul(a,b):o===19?a/b|0:o===20?a%b|0:o===21?Math.floor((a>>>0)/(b>>>0))|0:o===22?(a>>>0)%(b>>>0)|0:o===24?a&b:o===25?a|b:o===26?a^b:o===28?a<<b:o===29?a>>b:o===30?(a>>>b)|0:o===32?a===b?1:0:o===33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
z-=2;D[z++]=t;break;}
case 48:c+=R;break;
case 49:{const t=D[--z];if(!t)c+=R;break;}
case 50:{const t=D[--z];if(t)c+=R;break;}
case 51:if(y===64)return 7;C[y++]=c;c=p[c-2]|p[c-1]<<8;break;
case 52:if(y===0)return 8;c=C[--y];break;
case 64:{const a=D[z-1];if(a<0||a>255)return 6;D[z-1]=M[a];break;}
case 65:{const a=D[z-1],t=D[z-2];if(a<0||a>255)return 6;z-=2;M[a]=t;break;}
case 80:{const t=String(D[z-1]);if(L+t.length>65536)return 11;z--;O.set(Buffer.from(t),L);L+=t.length;break;}
case 81:if(L>65535)return 11;O[L++]=D[--z]&255;break;
case 82:if(z>255)return 3;D[z++]=i<g.length?g[i++]:-1;break;
case 83:return D[--z]&255;
}}}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',U=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const x of d(I).sort()){
const e=r(f(I+'/'+x+'/program.bin'),f(I+'/'+x+'/input.bin'));
m(U+'/'+x,{recursive:true});
w(U+'/'+x+'/stdout.bin',O.subarray(0,L));
w(U+'/'+x+'/exit.txt',e+'\n');
}
