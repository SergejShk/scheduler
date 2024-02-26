import React, { useEffect, useRef, useMemo } from "react";

export function useOnClickOutside<T extends HTMLDivElement>(
	callback: (evt: MouseEvent) => void,
	containerRefs?: React.RefObject<T>[]
) {
	const containerRef = React.useRef<T>(null);
	const callbackRef = useRef(callback);

	const selectedRefs = useMemo(() => {
		if (containerRefs && containerRefs.length) {
			return containerRefs;
		}

		return [containerRef];
	}, [containerRef, containerRefs]);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const listener = (evt: MouseEvent) => {
			const target = evt.target as HTMLElement;

			const isClickOutsideContainers = selectedRefs.every((selectedRef) => {
				const element = selectedRef.current;
				return !element || !element.contains(target);
			});

			if (isClickOutsideContainers && document.body.contains(target)) {
				callbackRef.current(evt);
			}
		};

		document.body.addEventListener("click", listener, true);

		return () => {
			document.body.removeEventListener("click", listener, true);
		};
	}, [containerRefs, selectedRefs]);

	return containerRef;
}
