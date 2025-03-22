import React, { useState, useRef, useEffect } from "react";

const CardEditor = () => {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [name, setName] = useState("");
  const [font, setFont] = useState("BadaboomBB");
  const [fontSize, setFontSize] = useState(80);
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    if (image) {
      ctx.drawImage(
        image,
        position.x,
        position.y,
        image.width * scale,
        image.height * scale
      );
    }

    
    const frame = new Image();
    frame.src = "public/styles/.png";
    frame.onload = () => {
      ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

      // Draw text over frame
      ctx.font = `${fontSize}px ${font}`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.fillText(name, canvas.width / 2, 100);
    };
  }, [image, scale, position, name, font, fontSize, color]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => setImage(img);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseUp = () => setDragging(false);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "custom-card.png";
    link.click();
  };

  return (
    <div className="container">
      <canvas
        id="canvas"
        ref={canvasRef}
        width="544"
        height="700"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />

      <div className="controls">
        <input type="file" onChange={handleFileUpload} />
        <input type="range" min="0.5" max="2" step="0.01" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <select value={font} onChange={(e) => setFont(e.target.value)}>
          <option>BadaboomBB</option>
          <option>BerlinSansDemiBold</option>
          <option>Komika Hand</option>
        </select>
        <input type="range" min="14" max="200" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default CardEditor;
