export function isTagElement(element: JSX.Element | JSX.Element[]): element is JSXTE.TagElement {
	return !!element && typeof element === 'object' && 'tag' in element;
}

export type MaybeRenderProp<T> = JSXTE.ElementChildren | ((api: T) => JSXTE.ElementChildren);

export const transformRenderProp = <T>(prop: MaybeRenderProp<T>, api: T) => {
	return prop instanceof Function ? prop(api) : prop;
};

export type { ContextAccessor } from 'node_modules/jsxte/dist/types/component-api/component-api';
