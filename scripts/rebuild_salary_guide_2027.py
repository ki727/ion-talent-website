#!/usr/bin/env python3
"""Rebuild only the approved ION 2027 salary-guide PDF and its cover asset."""
import re
from pathlib import Path
import fitz
from PIL import Image
import cairosvg
from io import BytesIO

ROOT=Path(__file__).resolve().parents[1]
RES=ROOT/'public/resources'
SRC=RES/'ion-talent-uae-saudi-salary-hiring-guide-2027.pdf'
WEBP=RES/'salary-guide-cover.webp'
# Glyph-level repair keeps all tables, amounts, colours, and original PDF layout.
doc=fitz.open(SRC)
assert len(doc)==16
cache={}
def maps(xref):
    if xref in cache:return cache[xref]
    obj=doc.xref_get_key(xref,'ToUnicode')[1]
    if not obj.endswith(' R'):
        cache[xref]=({},{});return cache[xref]
    raw=doc.xref_stream(int(obj.split()[0])).decode(errors='replace')
    m={}
    for ln in raw.splitlines():
        a=re.search(r'<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>\s*$',ln)
        if a:m[int(a[1],16)]=chr(int(a[2],16))
        a=re.search(r'<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>\s+<([0-9a-fA-F]+)>\s*$',ln)
        if a:
            s,e,uc=(int(z,16) for z in a.groups())
            m.update({n:chr(uc+n-s) for n in range(s,e+1)})
    cache[xref]=(m,{v:k for k,v in m.items()})
    return cache[xref]
rx_bt=re.compile(rb'BT(.*?)ET',re.S)
rx_tok=re.compile(rb'(/\w+)\s+[-+0-9.]+\s+Tf|(<[0-9A-Fa-f]+>)\s*Tj|(\[[^\]]+\])\s*TJ',re.S)
changed=0
for pi,page in enumerate(doc):
    fonts={a[4]:maps(a[0]) for a in page.get_fonts(full=True)}
    xref=page.get_contents()[0];data=bytearray(doc.xref_stream(xref)); patches=[]
    for m in rx_bt.finditer(data):
        font=None;chars=[]
        for t in rx_tok.finditer(m.group(1)):
            if t[1]:font=t[1].decode()[1:]
            if (t[2] or t[3]) and font in fonts:
                cmap,inv=fonts[font];value=t[2] or t[3];offset=t.start(2) if t[2] else t.start(3)
                for h in re.finditer(rb'<([0-9A-Fa-f]+)>',value):
                    for n in range(0,len(h.group(1)),2):
                        byte=int(h.group(1)[n:n+2],16)
                        chars.append((cmap.get(byte,'?'),m.start(1)+offset+h.start(1)+n,inv))
        string=''.join(c[0] for c in chars)
        for match in re.finditer('2026',string):
            # Actual research conducted 9 September 2026; do NOT falsify the cut-off date.
            if pi==15 and ('Research cut-off:' in string or '9 September 2026' in string):continue
            old,position,inv=chars[match.start()+3]
            if '7' in inv:
                patches.append((position,('%02X'%inv['7']).encode()))
            else:
                # A 7 is already drawn above this digit by the earlier year update.
                patches.append((position,b''))
    for position,replacement in sorted(patches,reverse=True):
        data[position:position+2]=replacement
        changed+=1
    doc.update_stream(xref,bytes(data),compress=True)
assert changed >= 20, f'Unexpected year replacements: {changed}'
doc.set_metadata({**doc.metadata,'title':'ION Talent UAE & Saudi Arabia Salary & Hiring Guide 2027'})
tmp=RES/'_corrected_inner_2027.pdf'
doc.save(tmp,garbage=4,deflate=True)
doc.close()
inside=fitz.open(tmp)
assert len(inside)==16
# Use the real SVG identity from the website, never AI-drawn text.
svg_path=ROOT/'public/brand/logo-primary-web.svg'
raw=cairosvg.svg2png(url=str(svg_path),output_width=850)
im=Image.open(BytesIO(raw)).convert('RGBA')
alpha=im.getchannel('A')
logo=Image.new('RGBA',im.size,(8,162,163,0))
logo.putalpha(alpha)
logo_path=RES/'_real_teal_logo.png'
logo.save(logo_path)
# Typography + vector geometry follow the approved editorial cover: white, teal, navy,
# restrained lilac washes, authentic logo and technical-line skyline.
navy=(15/255,23/255,42/255)
deep=(11/255,31/255,54/255)
teal=(8/255,162/255,163/255)
teal_dark=(0,117/255,131/255)
slate=(89/255,109/255,129/255)
light=(190/255,205/255,216/255)
mist=(208/255,222/255,230/255)
lilac=(211/255,195/255,238/255)
lilac_mist=(247/255,243/255,253/255)
lilac_pale=(240/255,232/255,251/255)
white=(1,1,1)
w,h=595.92,841.92
cover=fitz.open(); p=cover.new_page(width=w,height=h)
fontroot=Path('/usr/share/fonts/opentype/inter')
fontfiles={'R':'Inter-Regular.otf','M':'Inter-Medium.otf','S':'Inter-SemiBold.otf','B':'InterDisplay-Bold.otf','H':'InterDisplay-ExtraBold.otf'}
for name,f in fontfiles.items():
    path=fontroot/f
    if not path.exists():
        matches=list(Path('/usr/share/fonts').rglob(f))
        assert matches,f'Font missing {f}'
        path=matches[0]
    p.insert_font(fontname=name,fontfile=str(path))
def txt(x,y,s,size,font='R',c=navy):p.insert_text((x,y),s,fontsize=size,fontname=font,color=c)
def line(a,b,c=mist,width=.7,opacity=1):p.draw_line(a,b,color=c,width=width,stroke_opacity=opacity)
def rect(x0,y0,x1,y1,c):p.draw_rect(fitz.Rect(x0,y0,x1,y1),color=None,fill=c)
def poly(points,fill=None,stroke=None,width=.7,opacity=1):
    sh=p.new_shape()
    sh.draw_polyline([fitz.Point(*pt) for pt in points])
    sh.finish(closePath=True,color=stroke,fill=fill,width=width,fill_opacity=opacity,stroke_opacity=opacity)
    sh.commit()
def grid(x0,y0,x1,y1,cols,rows):
    for ix in range(1,cols):line((x0+(x1-x0)*ix/cols,y0+7),(x0+(x1-x0)*ix/cols,y1-2),light,.42,.45)
    for iy in range(1,rows):line((x0+4,y0+(y1-y0)*iy/rows),(x1-4,y0+(y1-y0)*iy/rows),light,.4,.45)
rect(0,0,w,h,white)
poly([(486,0),(w,0),(w,119),(565,104)],lilac_mist)
poly([(562,0),(w,0),(w,88)],lilac_pale,opacity=.62)
p.insert_image(fitz.Rect(48,42,247,95),filename=str(logo_path),keep_proportion=True)
txt(419,74,'RESEARCH  /  INSIGHTS',8.9,'S',slate)
line((51,121),(545,121),lilac,1.2)
rect(51,153,55,290,teal)
txt(69,175,'UAE  /  SAUDI ARABIA',10,'S',teal_dark)
txt(69,231,'UAE & Saudi Arabia',38,'B',navy)
txt(69,276,'Salary & Hiring Guide',37.5,'B',navy)
txt(51,394,'2027',100,'H',teal)
rect(53,415,89,418,teal)
txt(52,445,'Salary benchmarks, hiring outlook and talent intelligence',12.6,'R',slate)
txt(52,463,'for employers and candidates across the GCC.',12.6,'R',slate)
line((52,488),(544,488),lilac,.8)
poly([(295,522),(596,502),(596,743),(82,743)],lilac_mist,opacity=.93)
poly([(379,570),(596,545),(596,743),(260,743)],lilac_pale,opacity=.48)
poly([(0,688),(250,575),(410,744),(0,744)],(244/255,250/255,251/255),opacity=.77)
for off in (0,17,34):
    sh=p.new_shape()
    sh.draw_bezier(fitz.Point(299+off,512),fitz.Point(360+off,555),fitz.Point(430+off,585),fitz.Point(595,583+off))
    sh.finish(color=lilac,width=.55,stroke_opacity=.65);sh.commit()
poly([(76,664),(88,649),(127,649),(135,659),(135,744),(76,744)],white,mist,1);grid(79,663,131,742,5,10)
poly([(136,629),(174,584),(202,608),(202,744),(136,744)],white,light,1)
line((174,584),(174,744),light,.8);line((136,629),(202,661),mist,.6)
for i in range(7):
    yy=657+12*i;line((140,yy),(197,yy),mist,.55,.7)
poly([(195,620),(210,608),(241,608),(249,618),(249,744),(195,744)],white,mist,1);grid(198,626,245,741,4,9)
poly([(263,583),(273,550),(320,550),(329,583),(333,744),(259,744)],white,light,1.2)
poly([(276,562),(315,562),(311,585),(296,604),(281,585)],(244/255,250/255,251/255),light,.9)
line((270,609),(325,609),mist,.6)
for yy in range(618,738,13):line((266,yy),(328,yy),mist,.55,.75)
for xx in (284,297,309):line((xx,612),(xx,739),mist,.45,.7)
poly([(340,743),(376,606),(412,743)],white,light,1)
line((376,606),(376,745),mist,.65)
for yy in range(648,734,17):
    span=(yy-606)/137*36;line((376-span,yy),(376+span,yy),mist,.6,.75)
p.draw_circle(fitz.Point(376,661),5.5,color=light,fill=white,width=.9)
rect(454,616,475,744,white);p.draw_rect(fitz.Rect(454,616,475,744),color=light,width=1)
rect(457,582,472,617,white);p.draw_rect(fitz.Rect(457,582,472,617),color=light,width=1)
rect(460,553,469,585,white);p.draw_rect(fitz.Rect(460,553,469,585),color=light,width=.9)
line((464.5,513),(464.5,553),light,.9);line((460,543),(469,543),light,.6)
for xx in (458,462,466,470,474):line((xx,632),(xx,741),mist,.38,.7)
for yy in range(640,735,10):line((455,yy),(474,yy),mist,.4,.6)
poly([(485,623),(513,601),(539,613),(539,744),(485,744)],white,light,1)
line((513,601),(513,744),mist,.7)
for yy in range(640,737,12):line((490,yy),(534,yy),mist,.6,.75)
line((69,744),(545,744),teal_dark,1.4,.55)
rect(0,747,w,h,deep)
rect(51,769,54,808,teal)
txt(67,782,'GCC TALENT INTELLIGENCE',10.1,'S',white)
txt(67,800,'UAE  |  SAUDI ARABIA',9.4,'M',(190/255,208/255,223/255))
line((51,820),(545,820),(80/255,106/255,135/255),.6)
txt(51,835,'IONTALENTGROUP.COM',8.4,'S',white)
final=fitz.open();final.insert_pdf(cover);final.insert_pdf(inside,from_page=1,to_page=15)
final.set_metadata({'title':'ION Talent | UAE & Saudi Arabia Salary & Hiring Guide 2027','author':'ION Talent'})
out=RES/'_final_2027.pdf'
final.save(out,garbage=4,deflate=True)
# Visual identity and page checks.
check=fitz.open(out)
assert len(check)==16
assert '2027' in check[0].get_text()
assert '2026' not in check[0].get_text()
for i in range(1,16):
    text=check[i].get_text()
    assert '20267' not in text and '2026 GCC SALARY' not in text,(i+1,text[:250])
assert sum('2026' in p.get_text() for p in check)==1,'Only historical research cut-off may retain 2026'
for i in range(1,16):
    a=inside[i].get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
    b=check[i].get_pixmap(matrix=fitz.Matrix(1,1),alpha=False)
    assert a.samples==b.samples,f'Interior changed page {i+1}'
pix=check[0].get_pixmap(matrix=fitz.Matrix(2.3,2.3),alpha=False)
pic=Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
pic.save(WEBP,'WEBP',quality=88,method=6)
check.close();final.close();inside.close();cover.close()
out.replace(SRC)
for temp in (tmp,logo_path):temp.unlink(missing_ok=True)
print(f'PASS: {changed} year glyph repairs, 16 pages, 15 interior pages preserved, 1 authentic 2026 research cut-off')
print('FINAL PDF',SRC.stat().st_size,'WEBP',WEBP.stat().st_size)
