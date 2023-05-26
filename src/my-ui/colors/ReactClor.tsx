import React, { useState } from 'react';
import { HuePicker } from 'react-color';

const initialColor = {
    h: 0,
    s: 0,
    l: 0
};

export function ReactColorPicker() {
    const [color, setColor] = useState(initialColor);

    function handleChange(newColor) {
        setColor(newColor.hsl);
    }

    return (
        <div>
            <HuePicker color={color} onChange={handleChange} />
            <div>
                <label>Hue: </label>
                <input type="range" min="0" max="360" value={color.h} onChange={e => setColor({ ...color, h: parseInt(e.target.value) })} />
            </div>
            <div>
                <label>Saturation: </label>
                <input type="range" min="0" max="100" value={color.s} onChange={e => setColor({ ...color, s: parseInt(e.target.value) })} />
            </div>
            <div>
                <label>Lightness: </label>
                <input type="range" min="0" max="100" value={color.l} onChange={e => setColor({ ...color, l: parseInt(e.target.value) })} />
            </div>
            <div>
                <label>Selected Color: </label>
                <div style={{ width: '50px', height: '50px', backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)` }}></div>
            </div>
        </div>
    );
}


