const mascotFigures = [...mascotCatalog.characters, ...mascotCatalog.graphics];

function characterPart([type, ...values], paint) {
  if (type === "circle") {
    const [cx, cy, radius] = values;
    return `<circle cx="${cx}" cy="${cy}" r="${radius}"/>`;
  }
  if (type === "rect") {
    const [x, y, width, height, radius] = values;
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}"/>`;
  }
  if (type === "path") return `<path d="${values[0]}"/>`;
  const [points, width] = values;
  const stroke = paint ? ` stroke="${paint}" stroke-width="${width}" stroke-linejoin="round"` : "";
  return `<polygon points="${points}"${stroke}/>`;
}

function graphicPart([type, ...values], ink) {
  if (type === "ring") {
    const [cx, cy, radius, width, color] = values;
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" stroke-width="${width}" stroke="${ink[color]}" fill="none"/>`;
  }
  if (type === "circle") {
    const [cx, cy, radius, color] = values;
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${ink[color]}"/>`;
  }
  if (type === "rect") {
    const [x, y, width, height, radius, color, spacing] = values;
    const gap = spacing?.gap;
    const backing = gap ? `<rect x="${x-gap}" y="${y-gap}" width="${width+2*gap}" height="${height+2*gap}" rx="${radius+gap}" fill="${ink.bg}"/>` : "";
    return backing + `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${ink[color]}"/>`;
  }
  if (type === "path") {
    const [path, color] = values;
    return `<path d="${path}" fill="${ink[color]}"/>`;
  }
  if (type === "line") {
    const [path, width, color] = values;
    return `<path d="${path}" stroke-width="${width}" stroke="${ink[color]}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  const [points, width, color] = values;
  return `<polygon points="${points}" stroke-width="${width}" stroke="${ink[color]}" fill="${ink[color]}" stroke-linejoin="round"/>`;
}

function characterArtMarkup(figure, color, prefix) {
  const paint = `url(#${prefix}-paint)`;
  const [highlightX, highlightY, highlightWidth, highlightHeight, highlightTilt] = figure.hl;
  const [eyeSize, eyeY] = figure.eye;
  const [gap, width, height] = eyeSize === "small" ? [18, 9, 18] : [22, 10.5, 21];
  const eyes = [-1, 1].map(side => {
    const x = 50 + side * gap / 2 - width / 2;
    const y = eyeY - height / 2;
    const glint = color.id === "graphite" ? "" : `<circle class="bot-avatar-eye-glint" cx="${x+width*.66}" cy="${y+4.2}" r="1.8" fill="#fff" opacity=".85"/>`;
    return `<g class="bot-avatar-eye"><rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${width/2}"/>${glint}</g>`;
  }).join("");
  const core = figure.core ? `<circle cx="${figure.core[0]}" cy="${figure.core[1]}" r="${figure.core[2]}" fill="${color.id === "graphite" ? "#15181D" : color.soft}" stroke="${color.lo}" stroke-opacity=".22" stroke-width="1.5"/>` : "";
  return `
    <defs>
      <radialGradient id="${prefix}-paint" gradientUnits="userSpaceOnUse" cx="40" cy="34" r="66" fx="33" fy="25">
        <stop offset="0" stop-color="${color.hi}"/><stop offset=".48" stop-color="${color.base}"/><stop offset="1" stop-color="${color.lo}"/>
      </radialGradient>
      <clipPath id="${prefix}-clip">${figure.prims.map(part => characterPart(part)).join("")}</clipPath>
    </defs>
    <g fill="${paint}">${figure.prims.map(part => characterPart(part, paint)).join("")}</g>
    ${core}
    <ellipse cx="${highlightX}" cy="${highlightY}" rx="${highlightWidth}" ry="${highlightHeight}" transform="rotate(${highlightTilt} ${highlightX} ${highlightY})" clip-path="url(#${prefix}-clip)" fill="#fff" opacity=".42"/>
    <g class="bot-avatar-eyes" fill="${color.deep}">${eyes}</g>`;
}

function renderMascot(figureId, colorId, prefix = "mascot") {
  const figure = mascotFigures.find(item => item.id === figureId);
  const color = mascotCatalog.colors.find(item => item.id === colorId);
  if (!figure || !color) throw new RangeError(`Unknown mascot or color: ${figureId} / ${colorId}`);
  const id = prefix.replace(/[^a-z0-9_-]/gi, "-");
  const ink = { a: color.lo, b: color.id === "graphite" ? color.hi : color.base, bg: color.soft };
  const art = figure.prims
    ? characterArtMarkup(figure, color, id)
    : `<path d="${mascotCatalog.graphicPlate}" fill="${color.soft}" stroke="${color.lo}" stroke-opacity=".16" stroke-width="2"/>
       <g transform="translate(${figure.offsetX ?? 0} 0)">${figure.parts.map(part => graphicPart(part, ink)).join("")}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img">
    <title>${figure.name} · ${color.name}</title>
    <g class="bot-avatar-interaction"><g class="bot-avatar-body">${art}</g></g>
  </svg>`;
}
