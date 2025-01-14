import { JsxteRenderer } from 'jsxte';

const renderer = new JsxteRenderer<string>({
	createElement(type, attributes, children) {
		return children.map(String).join('');
	},
	createFragment(children) {
		return children.map(String).join('');
	},
	createTextNode(text) {
		return text.toString();
	},
});

export function renderJsxToString(element: JSX.Element) {
	return renderer.render(element);
}
