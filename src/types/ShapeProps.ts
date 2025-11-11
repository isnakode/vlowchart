interface ShapePropsOptions {
	type: string;
	hovered?: boolean;
	attr?: ShapeAttr;
}

export class ShapeProps {
	type: string;
	hovered: boolean;
	attr: ShapeAttr;

	constructor({
		type,
		hovered = false,
		attr = new ShapeAttr()
	}: ShapePropsOptions) {
		this.type = type;
		this.hovered = hovered;
		this.attr = attr;
	}
}


export class ShapeAttr {
	strokeColor?: string;
	fillColor?: string;
	strokeWidth: number;
	textSize: number;
	textAlign: string;
	text: string;

	constructor(
		strokeColor?: string,
		fillColor?: string,
		strokeWidth: number = 2,
		textSize: number = 14,
		textAlign: string = 'center',
		text: string = ''
	) {
		this.strokeColor = strokeColor;
		this.fillColor = fillColor;
		this.strokeWidth = strokeWidth;
		this.textSize = textSize;
		this.textAlign = textAlign;
		this.text = text;
	}
}



