let Objects = []

function GetAustoneCanvas(){
    let A_Canvas = document.getElementById("austone_canvas")
    if(A_Canvas.localName == "canvas"){
        return A_Canvas
    }else{
        console.warn("Austone Canvas - Element with ID of 'austone_canvas' on a non-canvas object.")
    }
}

function ClearCanvas(){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");

    ctx.clearRect(0,0, A_Canvas.width, A_Canvas.height)
}

function UpdateCanvas(){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");
    ClearCanvas()

    for(const item of Object.values(Objects)){
        if(item.obj == "circle"){
            Circle(item.xPos, item.yPos, item.radius, item.id, item.color)
        }
        if(item.obj == "rect"){
            Rect(item.xPos, item.yPos, item.xSize, item.ySize, item.id, item.color)
        }
        if(item.obj == "line"){
            Line(item.startX, item.startY, item.endX, item.endY, item.thickness, item.id, item.color)
        }
        if(item.obj == "text"){
            Text(item.xPos, item.yPos, item.text, item.fontSize, item.id, item.color, item.font)
        }
        if(item.obj == "webImage"){
            WebImage(item.xPos, item.yPos, item.xSize, item.ySize, item.src, item.id)
        }
    }
}

function Rect(xPos, yPos, xSize, ySize, id, color){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");
    ctx.beginPath(); 
    ctx.fillStyle = color || "black"
    ctx.fillRect(xPos, yPos, xSize, ySize)

    Objects[id] = {
        obj: "rect",
        id: id,
        xPos: xPos,
        yPos: yPos,
        xSize: xSize,
        ySize: ySize,
        color:  color
    }

    return Objects[id]
}

function Circle(xPos, yPos, radius, id, color){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");

    ctx.beginPath();

    ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI);

    ctx.fillStyle = color || "black"
    ctx.fill()

    Objects[id] = {
        obj: "circle",
        id: id,
        xPos: xPos,
        yPos: yPos,
        radius: radius,
        color:  color
    }

    return Objects[id]
}

function Line(startX, startY, endX, endY, thickness, id, color){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");
    ctx.beginPath(); 
    ctx.strokeStyle = color || "black"
    ctx.moveTo(startX, startY)
    ctx.lineTo(endX, endY)
    
    ctx.lineWidth = thickness
    ctx.stroke()

    Objects[id] = {
        obj: "line",
        id: id,
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        thickness: thickness,
        color:  color
    }

    return Objects[id]
}

function Text(xPos, yPos, text, fontSize, id, color, font){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    text = text || "text";

    const ctx = A_Canvas.getContext("2d");
    ctx.beginPath(); 

    ctx.font = fontSize + "px " + font || "serif";
    ctx.fillStyle = color || "black"
    ctx.fillText(text, xPos, yPos);

    Objects[id] = {
        obj: "text",
        id: id,
        xPos: xPos,
        yPos: yPos,
        text:  text,
        fontSize: fontSize,
        color: color,
    }

    return Objects[id]
}

function WebImage(xPos, yPos, xSize, ySize, src, id){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");

    const Img = new Image()
    Img.src = src
    Img.onload = function(){
        ctx.drawImage(Img, xPos, yPos, xSize, ySize);
    }

    Objects[id] = {
        obj: "webImage",
        id: id,
        xPos: xPos,
        yPos: yPos,
        xSize:  xSize,
        ySize: ySize,
        src: src,
    }

    return Objects[id]
}

function SetBackgroundColor(color){
    let A_Canvas = GetAustoneCanvas()
    if(!A_Canvas){
        return
    }

    const ctx = A_Canvas.getContext("2d");

    ctx.clearRect(0,0, A_Canvas.width, A_Canvas.height)
    ctx.fillStyle = color || "black"
    ctx.fillRect(0,0, A_Canvas.width, A_Canvas.height)
}

